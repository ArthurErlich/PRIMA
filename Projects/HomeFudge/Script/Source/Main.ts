namespace HomeFudge {
  import ƒ = FudgeCore;
  ƒ.Debug.info("Main Program Template running!");


  let viewport: ƒ.Viewport;
  document.addEventListener("interactiveViewportStarted", <EventListener>start);


  /// ------------T-E-S-T--A-R-E-A------------------\\\
  let gatTurret: GatlingTurret = null;
  export let worldNode: ƒ.Node = null;

  //Bullet list, every bullet wil register itself here for the update Method.
  ///camera setup for worldsize of 25km\\\
  //TODO:create camera Class
  let camera: ƒ.ComponentCamera;
  
  /// ------------T-E-S-T--A-R-E-A------------------\\\

  //Bullet list, every bullet wil register itself here for the update Method.
  export let bulletList: Bullet[] = new Array();
  export let shipsList:Ship[] = new Array();


  function start(_event: CustomEvent): void {
    viewport = _event.detail;
    worldNode = viewport.getBranch();

    /// ------------T-E-S-T--A-R-E-A------------------\\\
    gatTurret = new GatlingTurret();
    console.warn(gatTurret);
    
    viewport.getBranch().addChild(gatTurret);

    //TODO move camera to its own class
    camera = viewport.camera;
    console.warn(camera.getNear(), camera.getFar());
    camera.projectCentral(camera.getAspect(), camera.getFieldOfView(), ƒ.FIELD_OF_VIEW.DIAGONAL, 0.1, 30000);


    //TODO:remove unused log!
    // console.log(" Gatling Turret Node: ");
    // console.log(viewport.getBranch().getChildrenByName("GatlingTurret")[0]);
    // console.log(" First child of Gatling Turret: ");
    // console.log(viewport.getBranch().getChildrenByName("GatlingTurret")[0].getChild(0));



    /// ------------T-E-S-T--A-R-E-A------------------\\\

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    ƒ.Loop.start(ƒ.LOOP_MODE.TIME_GAME, 30);  // start the game loop to continuously draw the viewport, update the audiosystem and drive the physics i/a
  }

  function update(_event: Event): void {
    // ƒ.Physics.simulate();  // if physics is included and used
    let deltaSeconds: number = ƒ.Loop.timeFrameGame / 1000;

    /// ------------T-E-S-T--A-R-E-A------------------\\\
    gatTurret.update(deltaSeconds);
    if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.SPACE])) {
      //TODO: Logic needs to be moved to GatTurret
      gatTurret.shoot();
      
    }
    if (ƒ.Loop.fpsGameAverage <= 20) {
      console.warn("Active bullets in scene: " + bulletList.length);
      console.warn(ƒ.Loop.fpsGameAverage);
    }else{
      updateBulletList(deltaSeconds);

    }
    /// ------------T-E-S-T--A-R-E-A------------------\\\

    viewport.draw();
    ƒ.AudioManager.default.update();
  }

  /// ------------T-E-S-T--A-R-E-A------------------\\\

  /// ------------T-E-S-T--A-R-E-A------------------\\\

  //Updates all bullets
  //TODO:put alive check inside bullet update function
  /**
   * This function updates a list of bullets by calling their update method and removing any bullets
   * that are no longer alive.
   * 
   * @param deltaSeconds The time elapsed since the last update of the bullet list, measured in
   * seconds. This parameter is used to update the position and state of each bullet in the list.
   */
  function updateBulletList(deltaSeconds: number) {
    for (let index: number = 0; index < bulletList.length; index++) {
      bulletList[index].update(deltaSeconds);
      if (!bulletList[index].alive()) {
        bulletList[index].destroyNode();
        bulletList[index] = null;
      }
    }
    //removes bullet from the update array
    bulletList = bulletList.filter(elements => {
      return (elements != null && elements !== undefined);
    });
    viewport.draw();
    ƒ.AudioManager.default.update();
  }
  function updateShipsList(deltaSeconds: number) {
    for (let index: number = 0; index < bulletList.length; index++) {
      shipsList[index].update(deltaSeconds);
      if (!shipsList[index].alive()) {
        shipsList[index].destroyNode();
        shipsList[index] = null;
      }
    }
    //removes bullet from the update array
    shipsList = shipsList.filter(elements => {
      return (elements != null && elements !== undefined);
    });
    viewport.draw();
    ƒ.AudioManager.default.update();
  }

}