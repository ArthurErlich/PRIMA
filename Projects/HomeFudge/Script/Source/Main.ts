namespace HomeFudge {
  import ƒ = FudgeCore;
  ƒ.Debug.info("Main Program Template running!");

  let viewport: ƒ.Viewport;
  document.addEventListener("interactiveViewportStarted", <EventListener>start);

  function start(_event: CustomEvent): void {
    viewport = _event.detail;

    /// ------------T-E-S-T--A-R-E-A------------------\\\
    let gatTurret :GattlingTurret = new GattlingTurret(new ƒ.Vector3(0,0,0));//TODO:Add the turret mesh from Blender
    console.log(gatTurret);
    
    viewport.getBranch().addChild(gatTurret);

    /// ------------T-E-S-T--A-R-E-A------------------\\\

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    // ƒ.Loop.start();  // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
  }

  function update(_event: Event): void {
    // ƒ.Physics.simulate();  // if physics is included and used


    /// ------------T-E-S-T--A-R-E-A------------------\\\

    /// ------------T-E-S-T--A-R-E-A------------------\\\

    viewport.draw();
    ƒ.AudioManager.default.update();
  }
}