namespace Script {
  import ƒ = FudgeCore;
  import fu = FudgeCore;

  ƒ.Debug.info("Main Program Template running!");
  
  let viewport: ƒ.Viewport;
  let alucard:ƒ.Node = null;
  let anim:AnimController = null
  
  document.addEventListener("interactiveViewportStarted", <EventListener>start);

  function start(_event: CustomEvent): void {
    viewport = _event.detail;
    alucard = viewport.getBranch().getChildrenByName("Alucard")[0];
    anim = new AnimController();
    anim.
    



    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    // ƒ.Loop.start();  // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
  }

  function update(_event: Event): void {
    // ƒ.Physics.simulate();  // if physics is included and used
    if(fu.Keyboard.isPressedOne([fu.KEYBOARD_CODE.L])){
      //TODO: make anim change
    }

    //TODO: Animation update

    viewport.draw();
    ƒ.AudioManager.default.update();
  }

  //TODO:create animFunction
      //check the played animation (setAnim)
      //is the animation to set falid
}