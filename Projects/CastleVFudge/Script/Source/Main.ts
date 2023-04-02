namespace CastleV {
  import ƒ = FudgeCore;
  ƒ.Debug.info("Main Program Template running!");

  ///deltaTimeSeconds\\\
  let deltaTimeSeconds: number;

  ///ƒ Viewport\\\
  let viewport: ƒ.Viewport;

  let floor: ƒ.Node = null;
  let floorTile_1: ƒ.Node = null;

  ///Player\\\
  let player: Player;

  ///Tile Test\\\
  let collisionNode: ƒ.Node = null;


  //Keyboard input! Bubble Hirachie... Fudge Docu

  document.addEventListener("interactiveViewportStarted", <EventListener>start);

  function start(_event: CustomEvent): void {
    viewport = _event.detail;

    ///Create Player\\\
    player = new Player(viewport);


    //move the Cam to the right position
    console.log("moved cam");
    viewport.camera.mtxPivot.translateZ(9);
    viewport.camera.mtxPivot.rotateY(180);

    //get nodes
    floor = viewport.getBranch().getChildrenByName("Floor")[0];
    collisionNode = viewport.getBranch().getChildrenByName("Test")[0];


    // how to access other Graphs? -> recurses
    //floorTile_1 = ƒ.Project.getBranch().getChildrenByName("Platform_4x1")[0];
    console.log(floorTile_1);

    //attach the camera to the player node
    let cNode = new ƒ.Node("Camera");
    cNode.addComponent(viewport.camera);
    player.pivot.addChild(cNode);



    ///Gets Tiles and set them into Collision List\\\
    let tiles: ƒ.Node[] = new Array<ƒ.Node>();
    for (let floorChild of floor.getChildren()) {
      for (let tileChild of floorChild.getChildren()) {
        tiles.push(tileChild);
      }
    }
    CollisionDetection.updateTiles(tiles.map(x => x));
    console.log(CollisionDetection.tiles);

    //---------------------------------------S-T-A-R-T---L-O-O-P-----------------------------------------------------------\\
    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    ƒ.Loop.start();  // start the game loop to continuously draw the viewport, update the audio system and drive the physics i/a
    //------------------------------------------------------------------------------------------------------------------------\\

  }

  ///--------------------------------------U-P-D-A-T-E---------------------------------------------------------------------\\\
  //------------------------------------------------------------------------------------------------------------------------\\
  function update(_event: Event): void {

    // ƒ.Physics.simulate();  // if physics is included and used
    
    ///Update deltaTimeSeconds\\\
    deltaTimeSeconds = ƒ.Loop.timeFrameGame / 1000;

    ///Update Player\\\
    player.update(deltaTimeSeconds); // moved player to player.ts (its own Class) to make code more clear


    //------------------T-E-S-T-------------------------------------------------------T-E-S-T--------------------------------\\

    //Respawn Player if he falls down
    if (player.alucard.mtxLocal.translation.y <= -10) {
      player.alucard.mtxLocal.translation = new ƒ.Vector3(player.pivot.mtxWorld.translation.x, 2, player.pivot.mtxWorld.translation.z);
      player.resetPlayer();
    }

    //-------------------------------------------------------------------------------------------------------------------------\\

    viewport.draw();
    // ƒ.AudioManager.default.update();
  }


}



