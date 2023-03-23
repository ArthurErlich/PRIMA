namespace Script {
  import ƒ = FudgeCore;
  ƒ.Debug.info("Main Program Template running!");

  let viewport: ƒ.Viewport;
  let myHumanoid: ƒ.Node = viewport.getBranch().getChildrenByName("Charackter")[0];
  document.addEventListener("interactiveViewportStarted", <EventListener>start); // interactiveViewportStarted AutoCamara setup

  function start(_event: CustomEvent): void {
    viewport = _event.detail; //What is a Viewpoert?  


    /*
    let myHumanoid: ƒ.Node = viewport.getBranch().getChildrenByName("Humanoid")[0];
    console.log("Geting Humanoid:"+ myHumanoid);

    let myCMPHumanoid: ƒ.ComponentTransform = myHumanoid.getComponent(ƒ.ComponentTransform);
    myCMPHumanoid.mtxLocal.translateX(1);
    */
   
    console.log("Geting Humanoid:"+ myHumanoid);


    // ther is a simpler version to get all this

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    ƒ.Loop.start();  // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
  }

  function update(_event: Event): void {
    // ƒ.Physics.simulate();  // if physics is included and used

    //FrameTime???
    myHumanoid.mtxLocal.translateX(ƒ.);


    viewport.draw();
    ƒ.AudioManager.default.update();
  }
}