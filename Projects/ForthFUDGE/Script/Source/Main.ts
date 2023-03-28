namespace Script {
  import ƒ = FudgeCore;
  ƒ.Debug.info("Main Program Template running!");

  let viewport: ƒ.Viewport;


  let myHumanoid: ƒ.Node = null;
  // let jumpCountdwon: number = 0;
  //let jumped: boolean = false;
  let mausePos: ƒ.Vector2 = new ƒ.Vector2(0, 0);

  //Velocety of Player
  let gravity = -0.008;
  let playerFallingSpeed = 0;
  let hight = 0;

  /*
  let playerVelocety: ƒ.Vector3 = new ƒ.Vector3(0, 0, 0);
  let gravity: ƒ.Vector3 = new ƒ.Vector3(0, -0.000001, 0);
  */


  //document.addEventListener("keydown", handKyboard); this is not the right way!


  //Keyboard input! Bubble Hirachie... Fudge Docu

  document.addEventListener("interactiveViewportStarted", <EventListener>start); // interactiveViewportStarted AutoCamara setup

  document.addEventListener("mousemove", onMauseUpdate, false);

  function onMauseUpdate(e: MouseEvent) {
    mausePos = new ƒ.Vector2(e.pageX, e.pageY);
  }

  function start(_event: CustomEvent): void {
    viewport = _event.detail; //What is a Viewpoert?  

    //move the Cam to the right position
    viewport.camera.mtxPivot.translateZ(9);
    viewport.camera.mtxPivot.rotateY(180);
    
    //get the player node
    myHumanoid = viewport.getBranch().getChildrenByName("Charackter")[0]; // Charakter = Charakter!!!
    
    //atach the camera to the player node
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
    
    movementInput();
    //movementUpdate();

    viewport.draw();
    // ƒ.AudioManager.default.update();

  }
  function movementInput() {
    hight = myHumanoid.mtxLocal.translation.y + 0.5 ;//<-- because i have the wrong mtx matrix!
    let isGrounded = true;

    if (hight > 1) {
      isGrounded = false;
    }else{
      isGrounded = true;
    }

    if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_RIGHT, ƒ.KEYBOARD_CODE.D])) {
      myHumanoid.mtxLocal.translateX(0.01 * ƒ.Loop.timeFrameGame);
      /*
      let right: ƒ.Vector3 = new ƒ.Vector3(0.001, 0, 0);
      right.scale(ƒ.Loop.timeFrameGame/100);
      playerVelocety.add(right);
      */

    }
    if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_LEFT, ƒ.KEYBOARD_CODE.A])) {
      myHumanoid.mtxLocal.translateX(-0.01 * ƒ.Loop.timeFrameGame);
      /*
      let left: ƒ.Vector3 = new ƒ.Vector3(-0.001, 0, 0);
      left.scale(ƒ.Loop.timeFrameGame/100);
      playerVelocety.add(left);
      */
    }
    if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.SPACE, ƒ.KEYBOARD_CODE.W]) && isGrounded) {
       //myHumanoid.mtxLocal.translateY(0.01 * ƒ.Loop.timeFrameGame);
       playerFallingSpeed = 0.2;
       isGrounded = false;
      /*
      let jumpVelocity: ƒ.Vector3 = new ƒ.Vector3(0, 100, 0);
      playerVelocety.add(jumpVelocity);
      */
    }

    if (!isGrounded) {
      playerFallingSpeed += gravity;
      myHumanoid.mtxLocal.translateY(playerFallingSpeed* ƒ.Loop.timeFrameGame/10);
      /*
      let deltaGravity: ƒ.Vector3 = gravity;
      deltaGravity.scale(ƒ.Loop.timeFrameGame);

      playerVelocety = ƒ.Vector3.SUM(playerVelocety, gravity);
      */

    } else {
      playerFallingSpeed = 0;
      myHumanoid.mtxLocal.translation.y = 0;

      /*
      playerVelocety = new ƒ.Vector3(playerVelocety.x, 0, playerVelocety.z);
      */
    }
  }
  function movementUpdate() {
    /*
    let deltaVelocity: ƒ.Vector3 = playerVelocety;
    deltaVelocity.scale(ƒ.Loop.timeFrameGame);
 
     myHumanoid.mtxLocal.translate(playerVelocety);
    */
  }
}



