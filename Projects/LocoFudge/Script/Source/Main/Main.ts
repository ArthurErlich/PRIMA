namespace LocoFudge {
  import ƒ = FudgeCore;


  ƒ.Debug.info("LocoEditor is running! 🏃");

 let viewport: ƒ.Viewport;
  document.addEventListener("interactiveViewportStarted", <EventListener>start);



  

  function start(_event: CustomEvent): void {
    viewport = _event.detail;
    GameManager.initiate(viewport);
      
    
    
  //TODO:may come in handy https://jirkadelloro.github.io/FUDGE/Test/Debug/ScreenToRayToScreen/Test.html

    //Create Camera and add it to the viewport
    //Create World

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    ƒ.Loop.start();  // start the game loop to continuously draw the viewport, update the audiosystem and drive the physics i/a
  }

  async function update(_event: Event): Promise<void> {
    
    await MainLoop.update();
    // ƒ.Physics.simulate();  // if physics is included and used
    viewport.draw();
    // ƒ.AudioManager.default.update();
    GameManager.getMouse().setAcceleration(ƒ.Vector2.ZERO());//TODO: fixes the further movement when the mouse is not moving. -->remove temp fix after getting proper implementation

  }
}