namespace HomeFudge {
  import ƒ = FudgeCore;
  ƒ.Debug.info("Main Program Template running!");

  let viewport: ƒ.Viewport;
  document.addEventListener("interactiveViewportStarted", <EventListener>start);


  /// ------------T-E-S-T--A-R-E-A------------------\\\
  let gatTurret: GatlingTurret = null;

  //Bullet list, every bullet wil riegister itselfe here for the update Methode.
  export let bulletList: Bullet[] = null;
  /// ------------T-E-S-T--A-R-E-A------------------\\\


  function start(_event: CustomEvent): void {
    viewport = _event.detail;

    /// ------------T-E-S-T--A-R-E-A------------------\\\
    gatTurret = new GatlingTurret();//TODO:Check if mesh is correct
    bulletList = new Array();
    for (let index = 0; index < 10; index++) {
      gatTurret.shoot(Math.random()*5,index);
    }
    viewport.getBranch().addChild(gatTurret);
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

    let rotX = 0;
    rotX += 1 * deltaSeconds;
    gatTurret.moveTurret(rotX * 2, rotX * 3)

    //Updates all bullets
    for (let index: number = 0; index < bulletList.length; index++) {
      bulletList[index].update(deltaSeconds);
      if (!bulletList[index].alive()) {
        bulletList[index] = null;
      }
    }
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