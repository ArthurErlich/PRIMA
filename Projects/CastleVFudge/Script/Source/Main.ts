namespace Script {
  import ƒ = FudgeCore;
  ƒ.Debug.info("Main Program Template running!");

  //elapsedTime
  let elapsedTimeAnim: number = 0;

  //ƒ Node and Viewport
  let viewport: ƒ.Viewport;
  let alucard: ƒ.Node = null;
  let floor: ƒ.Node = null;
  let floorTile_1: ƒ.Node = null;

  //Velocety of Player
  let gravity: number = -0.008;
  let playerFallingSpeed: number = 0;
  let maxPlayerSpeed: number = 10;
  let hight: number = 0;



  //Keyboard input! Bubble Hirachie... Fudge Docu

  document.addEventListener("interactiveViewportStarted", <EventListener>start);

  function start(_event: CustomEvent): void {
    viewport = _event.detail; //What is a Viewpoert?  

    //move the Cam to the right position
    console.log("moved cam");
    viewport.camera.mtxPivot.translateZ(9);
    viewport.camera.mtxPivot.rotateY(180);

    //get nodes
    alucard = viewport.getBranch().getChildrenByName("Character")[0]; // Character = Charakter!!!
    floor = viewport.getBranch().getChildrenByName("Floor")[0];

    // how to access other Graphs?
    floorTile_1 = viewport.getBranch().getChildrenByName("Platform_4x1")[0];
    console.log(floorTile_1);
    
    //attach the camera to the player node
    let cNode = new ƒ.Node("Camera");
    cNode.addComponent(viewport.camera);
    alucard.addChild(cNode);

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    ƒ.Loop.start();  // start the game loop to continuously draw the viewport, update the audio system and drive the physics i/a
  }

  function update(_event: Event): void {
    // ƒ.Physics.simulate();  // if physics is included and used

    movementInput();

    //movementUpdate();

    viewport.draw();
    // ƒ.AudioManager.default.update();

  }
  function movementInput() {
    hight = alucard.mtxLocal.translation.y + 0.5;//<-- because i have the wrong mtx matrix!
    let isGrounded = true;

    if (hight > 1) {
      isGrounded = false;
    } else {
      isGrounded = true;
    }

    if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_RIGHT, ƒ.KEYBOARD_CODE.D])) {
      alucard.mtxLocal.translateX(0.005*ƒ.Loop.timeFrameGame);
      updatePlayerAnim(WalkDirection.RIGHT);

      /*
      let right: ƒ.Vector3 = new ƒ.Vector3(0.001, 0, 0);
      right.scale(ƒ.Loop.timeFrameGame/100);
      playerVelocety.add(right);
      */

    }
    if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_LEFT, ƒ.KEYBOARD_CODE.A])) {
      alucard.mtxLocal.translateX(-0.005*ƒ.Loop.timeFrameGame);
      updatePlayerAnim(WalkDirection.LEFT);

      /*
      let left: ƒ.Vector3 = new ƒ.Vector3(-0.001, 0, 0);
      left.scale(ƒ.Loop.timeFrameGame/100);
      playerVelocety.add(left);
      */
    }
    if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.SPACE, ƒ.KEYBOARD_CODE.W]) && isGrounded) {
      //alucard.mtxLocal.translateY(0.01 * ƒ.Loop.timeFrameGame);a
      playerFallingSpeed = 0.2;
      isGrounded = false;
      /*
      let jumpVelocity: ƒ.Vector3 = new ƒ.Vector3(0, 100, 0);
      playerVelocety.add(jumpVelocity);
      */
    }

    if (!isGrounded) {
      playerFallingSpeed += gravity;
      alucard.mtxLocal.translateY(playerFallingSpeed * ƒ.Loop.timeFrameGame / 10);
      /*
      let deltaGravity: ƒ.Vector3 = gravity;
      deltaGravity.scale(ƒ.Loop.timeFrameGame);

      playerVelocety = ƒ.Vector3.SUM(playerVelocety, gravity);
      */

    } else {
      playerFallingSpeed = 0;
      alucard.mtxLocal.translation.y = 0; // wont work??
      /*
      playerVelocety = new ƒ.Vector3(playerVelocety.x, 0, playerVelocety.z);
      */
    }
  }
  function movementUpdate() {
    /*
    let deltaVelocity: ƒ.Vector3 = playerVelocety;
    deltaVelocity.scale(ƒ.Loop.timeFrameGame);
 
     alucard.mtxLocal.translate(playerVelocety);
    */
  }

  function updatePlayerAnim(direction: WalkDirection): void {
    let updateTime:number = 0.06;
    elapsedTimeAnim += ƒ.Loop.timeFrameGame / 1000;

    if (elapsedTimeAnim >= updateTime && direction == WalkDirection.RIGHT) {

      alucard.getComponent(ƒ.ComponentMaterial).mtxPivot.translateX(0.0625);
      elapsedTimeAnim = 0;
    } else if (elapsedTimeAnim >= updateTime && direction == WalkDirection.LEFT) {

      alucard.getComponent(ƒ.ComponentMaterial).mtxPivot.translateX(-0.0625);
      elapsedTimeAnim = 0;
    }
  }
  function generateFloor():void{

  }
  enum WalkDirection {
    LEFT = 0,
    RIGHT = 1
  }
}



