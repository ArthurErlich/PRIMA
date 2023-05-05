namespace McFudge {
  import ƒ = FudgeCore;
  ƒ.Debug.info("Main McFudge running!");

  let viewport: ƒ.Viewport;
  document.addEventListener("interactiveViewportStarted", <EventListener>start);

  /// Graphs and Nodes \\\
  let gameGraph: ƒ.Graph = null;
  let worldNode: ƒ.Node = null;

  /// colorers \\\
  let cubeColorList: ƒ.Color[] = [
    ƒ.Color.CSS("white"),
    ƒ.Color.CSS("green"),
    ƒ.Color.CSS("blue"),
    ƒ.Color.CSS("yellow")
  ];

  
  
  function start(_event: CustomEvent): void {
    viewport = _event.detail;
    Mouse.init(viewport.canvas);


    //-----------------------T-E-S-T---A-R-E-A-----------------------\\
    //-----------------------------------------------------------------\\

    ///init Graphs
    gameGraph = viewport.getBranch() as ƒ.Graph;
    worldNode = gameGraph.getChildrenByName("World")[0];


    // creating a block instance
    // let instance: Block = new Block(new ƒ.Vector3(0,0,0), ƒ.Color.CSS("red"));
    // viewport.getBranch().addChild(instance);


    generateWorld(10);
    viewport.canvas.addEventListener("pointerdown", pickByCamera);

    //------------------------T-E-S-T---A-R-E-A----------------------\\
    //-----------------------------------------------------------------\\
    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    ƒ.Loop.start(ƒ.LOOP_MODE.FRAME_REQUEST, 15);  // start the game loop to continuously draw the viewport, update the audiosystem and drive the physics i/a
  }

  function update(_event: Event): void {
    let children:ƒ.Node[] = viewport.getBranch().getChildren();
    children.forEach(child => {
      if(child.mtxWorld.translation.y <= -10){
        child.getParent().removeChild(child);
      }
    });

    ƒ.Physics.simulate();  // if physics is included and used
    viewport.draw();
    ƒ.AudioManager.default.update();
  }
  function pickByCamera(_event: PointerEvent): void {
    let picks: ƒ.Pick[] = ƒ.Picker.pickViewport(viewport, new ƒ.Vector2(_event.clientX, _event.clientY));
    picks.sort((_a, _b) => (_a.zBuffer < _b.zBuffer) ? -1 : 1);

    if (_event.button == 1) {
      hitBlockRemove(picks[0]?.node);
      console.log("remove");

    }
    if (_event.button == 2) {
      let normal = picks[0]?.normal;
      let pos = picks[0]?.node.mtxWorld.translation;

      if(pos == undefined){
        return;
      }

      let adPos = new ƒ.Vector3(
        pos.x + normal.x,
        pos.y + normal.y,
        pos.z + normal.z
      );

      hitBlockAdd(adPos);
    }
  }
  function hitBlockRemove(_block: Block) {
    if (!_block)
      return;

    console.log(_block.name);
    _block.getParent().removeChild(_block);

    viewport.draw();
  }
  function hitBlockAdd(adPos: ƒ.Vector3): void {
    crateBlock(adPos);
    viewport.draw();
  }
  function crateBlock(pos: ƒ.Vector3): Block {
    let randomCubeColorIndex: number = Math.floor(Math.random() * (cubeColorList.length));
    let cubeColor: ƒ.Color = cubeColorList[randomCubeColorIndex];
    let instance: Block = new Block(pos, cubeColor);
    let rigidBody:ƒ.ComponentRigidbody = new ƒ.ComponentRigidbody(20,ƒ.BODY_TYPE.DYNAMIC,ƒ.COLLIDER_TYPE.CUBE,ƒ.COLLISION_GROUP.DEFAULT);
    // instance.mtxLocal.scale(new ƒ.Vector3(0.97, 0.97, 0.97));
    instance.addComponent(rigidBody);
    if(pos.y == 0){
      instance.getComponent(ƒ.ComponentRigidbody).typeBody= ƒ.BODY_TYPE.STATIC;
    }
    viewport.getBranch().addChild(instance);
    viewport.draw();
    return instance;
  }
  //world gen
  function generateWorld(size: number) {
    for (let x: number = 0; x < size; x++) {
      for (let y: number = 0; y < 2; y++) {
        for (let z: number = 0; z < size; z++) {
          let tempBlock:Block = crateBlock(new ƒ.Vector3(x, y, z));
          if(y == 0){
            tempBlock.getComponent(ƒ.ComponentRigidbody).typeBody= ƒ.BODY_TYPE.STATIC;
          }
        }
      }
    }
  }
}