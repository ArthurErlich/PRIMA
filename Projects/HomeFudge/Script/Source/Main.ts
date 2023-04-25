namespace HomeFudge {
  import ƒ = FudgeCore;
  ƒ.Debug.info("Main Program Template running!");

  let viewport: ƒ.Viewport;
  document.addEventListener("interactiveViewportStarted", <EventListener>start);

  ///interface for Blender positions for Gatling\\\
  //TODO: Make a config class for loading Gatling configs



  function start(_event: CustomEvent): void {
    viewport = _event.detail;

    /// ------------T-E-S-T--A-R-E-A------------------\\\
    let gatTurret: GatlingTurret = new GatlingTurret(new ƒ.Vector3(0, 0, 0));//TODO:Check if mesh is correct
    viewport.getBranch().addChild(gatTurret);
    // console.log(" Gatling Turret Node: ");
    // console.log(viewport.getBranch().getChildrenByName("GatlingTurret")[0]);
    // console.log(" First child of Gatling Turret: ");
    // console.log(viewport.getBranch().getChildrenByName("GatlingTurret")[0].getChild(0));



    /// ------------T-E-S-T--A-R-E-A------------------\\\

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    // ƒ.Loop.start();  // start the game loop to continuously draw the viewport, update the audiosystem and drive the physics i/a
  }

  function update(_event: Event): void {
    // ƒ.Physics.simulate();  // if physics is included and used


    /// ------------T-E-S-T--A-R-E-A------------------\\\

    /// ------------T-E-S-T--A-R-E-A------------------\\\

    viewport.draw();
    ƒ.AudioManager.default.update();
  }

  /// ------------T-E-S-T--A-R-E-A------------------\\\

  /// ------------T-E-S-T--A-R-E-A------------------\\\

}