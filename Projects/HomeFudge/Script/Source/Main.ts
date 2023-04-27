namespace HomeFudge {
  import ƒ = FudgeCore;
  ƒ.Debug.info("Main Program Template running!");

  //TODO:remove temporary exprotetd Viewport
  export let viewport: ƒ.Viewport;
  document.addEventListener("interactiveViewportStarted", <EventListener>start);


  /// ------------T-E-S-T--A-R-E-A------------------\\\
  let gatTurret: GatlingTurret = null;
  
  ///camera setup for worldsize of 25km\\\
  //TODO:create camera Class
  let camera: ƒ.ComponentCamera;

  //Bullet list, every bullet wil riegister itselfe here for the update Methode.
  export let bulletList: Bullet[] = null;

  /// ------------T-E-S-T--A-R-E-A------------------\\\


  function start(_event: CustomEvent): void {
    viewport = _event.detail;

    /// ------------T-E-S-T--A-R-E-A------------------\\\
    gatTurret = new GatlingTurret();//TODO:Check if mesh is correct
    bulletList = new Array();
    viewport.getBranch().addChild(gatTurret);

    //TODO move camera to its own class
    camera = viewport.camera;
    camera.setClipping

    //TODO:remove unused log!
    // console.log(" Gatling Turret Node: ");
    // console.log(viewport.getBranch().getChildrenByName("GatlingTurret")[0]);
    // console.log(" First child of Gatling Turret: ");
    // console.log(viewport.getBranch().getChildrenByName("GatlingTurret")[0].getChild(0));



    /// ------------T-E-S-T--A-R-E-A------------------\\\

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    //TODO:look at ƒ.LOOP_MODE.TIME_GAME, 30
    ƒ.Loop.start(ƒ.LOOP_MODE.TIME_GAME, 30);  // start the game loop to continuously draw the viewport, update the audiosystem and drive the physics i/a
  }

  function update(_event: Event): void {
    // ƒ.Physics.simulate();  // if physics is included and used
    let deltaSeconds: number = ƒ.Loop.timeFrameGame / 1000;
  



    /// ------------T-E-S-T--A-R-E-A------------------\\\
    //TODO: fix "time frameGame is not a valid option for time based shooting"...
    if(ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.SPACE])&& (ƒ.Loop.timeFrameGame % 0.5) == 0){
      gatTurret.shoot(viewport.getBranch());
    }


    let rotX = 0;
    rotX += 1 * deltaSeconds;
    gatTurret.moveTurret(rotX * 2, rotX * 3)

    //Updates all bullets
    //TODO: make a function or method out of that and update it
    for (let index: number = 0; index < bulletList.length; index++) {
      bulletList[index].update(deltaSeconds);
      if (!bulletList[index].alive()) {
        bulletList[index].kill();
        bulletList[index] = null;
      }
    }
    //removes bullet from the update array
    bulletList = bulletList.filter(elements => {
      return (elements != null && elements !== undefined);
    });
  

    /// ------------T-E-S-T--A-R-E-A------------------\\\

    viewport.draw();
    ƒ.AudioManager.default.update();
  }

  /// ------------T-E-S-T--A-R-E-A------------------\\\

  /// ------------T-E-S-T--A-R-E-A------------------\\\

}