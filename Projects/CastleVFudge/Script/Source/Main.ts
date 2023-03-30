namespace CastleV {
  import ƒ = FudgeCore;
  ƒ.Debug.info("Main Program Template running!");

  //elapsedTime
  let elapsedTimeAnim: number = 0;

  //deltaTimeSeconds
  let deltaTimeSeconds: number;

  //ƒ Viewport
  let viewport: ƒ.Viewport;

  let floor: ƒ.Node = null;
  let floorTile_1: ƒ.Node = null;

  //Velocety of Player
  let player: Player;


  //Keyboard input! Bubble Hirachie... Fudge Docu

  document.addEventListener("interactiveViewportStarted", <EventListener>start);

  function start(_event: CustomEvent): void {
    viewport = _event.detail;



    ///Create Player\\\
    player = new Player(viewport);
    //alucard = viewport.getBranch().getChildrenByName("Character")[0];


    //move the Cam to the right position
    console.log("moved cam");
    viewport.camera.mtxPivot.translateZ(9);
    viewport.camera.mtxPivot.rotateY(180);

    //get nodes
    floor = viewport.getBranch().getChildrenByName("Floor")[0];

    // how to access other Graphs? -> reacuurses
    //floorTile_1 = ƒ.Resurses.getBranch().getChildrenByName("Platform_4x1")[0];
    console.log(floorTile_1);

    //attach the camera to the player node
    let cNode = new ƒ.Node("Camera");
    cNode.addComponent(viewport.camera);
    player.alucard.addChild(cNode);

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    ƒ.Loop.start();  // start the game loop to continuously draw the viewport, update the audio system and drive the physics i/a
  }

  ///--------------------------------------U-P-D-A-T-E---------------------------------------------------------------------\\\
  //------------------------------------------------------------------------------------------------------------------------\\

  function update(_event: Event): void {
    // ƒ.Physics.simulate();  // if physics is included and used
    ///Update deltaTimeSeconds\\\
    deltaTimeSeconds = ƒ.Loop.timeFrameGame / 1000;

    ///Update Player\\\
    player.update(deltaTimeSeconds); // moved player to player.ts (its own Class)

    viewport.draw();
    // ƒ.AudioManager.default.update();

  }

}



