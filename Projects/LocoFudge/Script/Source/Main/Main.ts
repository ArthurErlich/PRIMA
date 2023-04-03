namespace LocoFudge {
  import ƒ = FudgeCore;


  ƒ.Debug.info("LocoEditor is running! 🏃");

 let viewport: ƒ.Viewport;
  document.addEventListener("interactiveViewportStarted", <EventListener>start);

  function start(_event: CustomEvent): void {
    viewport = _event.detail;
    GameManager.initiate(viewport);
    console.log(GameManager.camera.root);

    console.log(GameManager.graph);
    
    
    
  

    //Create Camera and add it to the viewport
    //Create World

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    ƒ.Loop.start();  // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
  }

  async function update(_event: Event): Promise<void> {

    let deltaSeconds: number = ƒ.Loop.timeFrameGame / 1000;

    //updates the MainLoop
    await MainLoop.update();
    // ƒ.Physics.simulate();  // if physics is included and used
    viewport.draw();
    // ƒ.AudioManager.default.update();
  }
}