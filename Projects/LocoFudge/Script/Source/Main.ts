namespace Script {
  import ƒ = FudgeCore;
  import worldGen = WorldGen;
  import gameState = GameState;
  import camera = Camera; // helps to manage multiple cameras

  ƒ.Debug.info("LocoEditor is running! 🏃");

  let viewport: ƒ.Viewport;
  document.addEventListener("interactiveViewportStarted", <EventListener>start);

  function start(_event: CustomEvent): void {
    viewport = _event.detail;

    //Create Camera and add it to the viewport
    //Create World

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    ƒ.Loop.start();  // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
  }

  function update(_event: Event): void {

    //Update Camera
    
    // ƒ.Physics.simulate();  // if physics is included and used
    viewport.draw();
    ƒ.AudioManager.default.update();
  }
}