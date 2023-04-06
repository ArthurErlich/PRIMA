namespace Script {
  import ƒ = FudgeCore;
  import fu = FudgeCore;

  ƒ.Debug.info("Main Program Template running!");
  
  let viewport: ƒ.Viewport;
  let alucard:ƒ.Node = null;
  let aluAnimations:fu.AnimationSprite[]
  
  document.addEventListener("interactiveViewportStarted", <EventListener>start);

  function start(_event: CustomEvent): void {
    viewport = _event.detail;
    alucard = viewport.getBranch().getChildrenByName("Alucard")[0];

    //TODO
    aluAnimations = [
      FudgeCore.Project.getResourcesByName("1")[0] as fu.AnimationSprite,
      FudgeCore.Project.getResourcesByName("2")[0] as fu.AnimationSprite,
  ];

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    // ƒ.Loop.start();  // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
  }

  function update(_event: Event): void {
    // ƒ.Physics.simulate();  // if physics is included and used
    if(fu.Keyboard.isPressedOne([fu.KEYBOARD_CODE.L])){
      //TODO: make anim change
    }

    viewport.draw();
    ƒ.AudioManager.default.update();
  }
}