namespace Script {
  import ƒ = FudgeCore;
  ƒ.Debug.info("Main Program Template running!");

  let viewport: ƒ.Viewport;


  let myHumanoid: ƒ.Node = null;
  let jumpCountdwon: number = 0;
  let jumped: boolean = false;
  let mausePos: ƒ.Vector2 = new ƒ.Vector2(0, 0);

  //document.addEventListener("keydown", handKyboard); this is not the right way!


  //Keyboard input! Bubble Hirachie... Fudge Docu

  document.addEventListener("interactiveViewportStarted", <EventListener>start); // interactiveViewportStarted AutoCamara setup

  document.addEventListener("mousemove", onMauseUpdate, false);

  function onMauseUpdate(e: MouseEvent) {
    mausePos = new ƒ.Vector2(e.pageX, e.pageY);
  }

  function start(_event: CustomEvent): void {
    viewport = _event.detail; //What is a Viewpoert?  


    viewport.camera.mtxPivot.translateZ(9);
    viewport.camera.mtxPivot.rotateY(180);

    myHumanoid = viewport.getBranch().getChildrenByName("Charackter")[0]; // Charakter = Charakter!!!

    //adding node and ataching node
    let cNode = new ƒ.Node("Camera");
    cNode.addComponent(viewport.camera);
    myHumanoid.addChild(cNode);


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
    //myHumanoid.mtxLocal.translateX(ƒ.Loop.timeFrameGame / 10000);
    //how to set vector3 to vector3
    // myHumanoid.mtxLocal
    // viewport.camera.mtxPivot.translateX();
    // viewport.camera.mtxPivot.translateY();


    //dose not work properly
    // viewport.camera.mtxPivot.translate(ƒ.Vector3.SUM(myHumanoid.mtxWorld.translation , new ƒ.Vector3(0, 0, 5)));

    //Just a test
    //myHumanoid.mtxLocal.translateX(-(ƒ.Loop.timeFrameReal/100));

    /*
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


    let pickNodes:ƒ.Pick[] = ƒ.Picker.pickViewport(viewport,mausePos); 
    for (let i : number = 0; i<pickNodes.length; i++){
     // console.info(pickNodes[i].node.name);
    }
    //console.log(viewport.getRayFromClient(mausePos) +"");
 
    jumpCountdwon += ƒ.Loop.timeFrameGame / 1000;
   
   */
    //let movement:ƒ.Vector3 = new ƒ.Vector3(0,0,0); 

    if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_RIGHT, ƒ.KEYBOARD_CODE.D])) {
      myHumanoid.mtxLocal.translateX(0.01 * ƒ.Loop.timeFrameGame);
      //movement = ƒ.Vector3.SUM(movement,new ƒ.Vector3(0.01))
    }

    if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_LEFT, ƒ.KEYBOARD_CODE.A])) {
      myHumanoid.mtxLocal.translateX(-0.01 * ƒ.Loop.timeFrameReal);
    }
    if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_UP, ƒ.KEYBOARD_CODE.W])) {
      myHumanoid.mtxLocal.translateY(0.01 * ƒ.Loop.timeFrameGame);
    }
    if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_DOWN, ƒ.KEYBOARD_CODE.S])) {
      myHumanoid.mtxLocal.translateY(-0.01 * ƒ.Loop.timeFrameGame);
    }


    /* Movment Vector
    movement.normalize;
    movement = movement * ƒ.Loop.timeFrameGame;
    myHumanoid.mtxLocal.translate(movement);
    /*

    viewport.draw();
    // ƒ.AudioManager.default.update();

  }

  //Basic doom programming this is event driven other option Polling-> Asking if this is pressed!
  function handKyboard(ev: KeyboardEvent) {
    if (ev.code == ƒ.KEYBOARD_CODE.D || ev.code == ƒ.KEYBOARD_CODE.ARROW_RIGHT) {
      myHumanoid.mtxLocal.translateX(0.01)

    }
  }
}



