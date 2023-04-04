namespace LocoFudge {
  import ƒ = FudgeCore;


  ƒ.Debug.info("LocoEditor is running! 🏃");

 let viewport: ƒ.Viewport;
  document.addEventListener("interactiveViewportStarted", <EventListener>start);
  document.addEventListener("mousemove",onMauseUpdate, false);
  document.addEventListener("mousedown",onMauseClick, false)

  ///Mouse Position Update\\\
  function onMauseUpdate(_event: MouseEvent): void {
    GameManager.mouse.updateMousePos(_event);
  }
  function onMauseClick(_event: MouseEvent): void {
    GameManager.mouse.pickNode();
  }

  function start(_event: CustomEvent): void {
    viewport = _event.detail;
    GameManager.initiate(viewport);
    console.log(GameManager.camera.root);

    console.log(GameManager.graph);
    
    
    
  //TODOO:may come in handy https://jirkadelloro.github.io/FUDGE/Test/Debug/ScreenToRayToScreen/Test.html

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
  }
}