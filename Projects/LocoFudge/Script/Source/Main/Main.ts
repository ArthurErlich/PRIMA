namespace LocoFudge {
  import ƒ = FudgeCore;


  ƒ.Debug.info("LocoEditor is running! 🏃");

 let viewport: ƒ.Viewport;
  document.addEventListener("interactiveViewportStarted", <EventListener>start);
  document.addEventListener("mousemove",onMouseUpdate, false);
  document.addEventListener("mousedown",onMouseClick, false)


  ///Mouse Position Update\\\
  function onMouseUpdate(_event: MouseEvent): void {
    GameManager.getMouse().updateMousePos(_event);
    if(_event.buttons === 2){
      GameManager.getMouse().setAcceleration(new ƒ.Vector2(_event.movementX,_event.movementY));
      GameManager.getCamera().moveCamera(true);

    }else{
      GameManager.getMouse().setAcceleration(ƒ.Vector2.ZERO());//TODO: remove temp fix unused variable
      GameManager.getCamera().moveCamera(false);
    }
    
  }
  ///Mouse Left Click Event\\\
  function onMouseClick(_event: MouseEvent): void {
    console.log(GameManager.getMouse().mousePressed(_event)); // TODO: remove temp test
  }

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
    GameManager.getMouse().setAcceleration(ƒ.Vector2.ZERO());//TODO: fixes the further movement when the mouse is not moving. -->remove temp fix after getting proper implementation
    // ƒ.AudioManager.default.update();
  }
}