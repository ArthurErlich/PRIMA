namespace Script {
  import ƒ = FudgeCore;
  ƒ.Debug.info("Main Program Template running!");

  let viewport: ƒ.Viewport;
  let myHumanoid: ƒ.Node = null;
  let jumpCountdwon: number = 0;
  let jumped: boolean = false;
  document.addEventListener("interactiveViewportStarted", <EventListener>start); // interactiveViewportStarted AutoCamara setup

  function start(_event: CustomEvent): void {
    viewport = _event.detail; //What is a Viewpoert?  

    myHumanoid = viewport.getBranch().getChildrenByName("Charackter")[0];

    /*
    let myHumanoid: ƒ.Node = viewport.getBranch().getChildrenByName("Humanoid")[0];
    console.log("Geting Humanoid:"+ myHumanoid);

    let myCMPHumanoid: ƒ.ComponentTransform = myHumanoid.getComponent(ƒ.ComponentTransform);
    myCMPHumanoid.mtxLocal.translateX(1);

    console.log("Geting Humanoid:"+ myHumanoid);
    */


    // ther is a simpler version to get all this

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    ƒ.Loop.start();  // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
  }

  function update(_event: Event): void {
    // ƒ.Physics.simulate();  // if physics is included and used

    //FrameTime???
    myHumanoid.mtxLocal.translateX(ƒ.Loop.timeFrameGame / 10000);
    //myHumanoid.mtxLocal.translateX(-(ƒ.Loop.timeFrameReal/100));

    // jumps the cube after 5 seconds up
    if (jumpCountdwon >= 2.0) {
      if (jumped) {
        jumped = false;
        myHumanoid.mtxLocal.translateY(-1);
      }
      else {
        jumped = true;
        myHumanoid.mtxLocal.translateY(1);
      }
      jumpCountdwon = 0;
    }

    jumpCountdwon += ƒ.Loop.timeFrameGame / 1000;
    viewport.draw();
    ƒ.AudioManager.default.update();
  }
}