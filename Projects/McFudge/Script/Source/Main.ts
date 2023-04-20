namespace McFudge {
  import ƒ = FudgeCore;
  ƒ.Debug.info("Main McFudge running!");

  let viewport: ƒ.Viewport;
  document.addEventListener("interactiveViewportStarted", <EventListener>start);

  /// Graphs and Nodes \\\
  let minecraftGraph: ƒ.Graph = null;
  let testCubeGraph: ƒ.Graph = null;
  let worldNode: ƒ.Node = null;

  /// GraphInstance \\\
  let testCubeInstances: ƒ.GraphInstance[] = null;

  ///WorldParameters\\\
  let worldHightShift: number = -2;

  function start(_event: CustomEvent): void {
    viewport = _event.detail;


    //-----------------------T-E-S-T---A-R-E-A-----------------------\\
    //-----------------------------------------------------------------\\

    ///init Graphs
    minecraftGraph = viewport.getBranch() as ƒ.Graph;
    worldNode = minecraftGraph.getChildrenByName("World")[0];

    ///init world creation GraphInstance
    initWorldCreation(8); // my computer can manage 8*8*8 cubes

    console.warn(8*8*8+" Cubes are generated");
    

    //------------------------T-E-S-T---A-R-E-A----------------------\\
    //-----------------------------------------------------------------\\


    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    // ƒ.Loop.start();  // start the game loop to continuously draw the viewport, update the audiosystem and drive the physics i/a
  }

  function update(_event: Event): void {
    // ƒ.Physics.simulate();  // if physics is included and used
    viewport.draw();
    ƒ.AudioManager.default.update();
  }

  async function initWorldCreation(size: number): Promise<void> {
    testCubeGraph = ƒ.Project.resources["Graph|2023-04-20T13:20:33.233Z|09344"] as ƒ.Graph;
    testCubeInstances = new Array(size * size * size);

    //crating enough cube instances for the Transform parent later.
    for (let i: number = 0; i < (size * size * size); i++) {
      testCubeInstances[i] = await ƒ.Project.createGraphInstance(testCubeGraph); //TODO: Maybe there is a way to clone the Instance?
    }


    let cubeMargin:number=  1.01;
    let cubeIndex:number = 0;
    let cubeList:ƒ.Node[] = new Array(size * size * size);

    for (let x: number = 0; x < size; x++) {
      for (let z: number = 0; z < size; z++) {
        worldHightShift = Math.round((Math.random()) - 2);
        for (let y: number = 0; y < size; y++) {
          cubeList[cubeIndex] = crateCube(cubeIndex, new ƒ.Vector3(x * cubeMargin, (-y + worldHightShift)* cubeMargin, -z * cubeMargin));
          cubeIndex++;
        }
      }
    }
    addCubesToWorld(cubeList);
  }
  function crateCube(index: number, position: ƒ.Vector3): ƒ.Node {
    let cubeTransform: ƒ.Node = new ƒ.Node("INDEX: " + index + " cube");
    cubeTransform.addComponent(new ƒ.ComponentTransform());
    cubeTransform.mtxLocal.translation = position;
    return cubeTransform;
  }
  function addCubesToWorld(cubeTransform: ƒ.Node[]): void {
    if (testCubeInstances == undefined) {
      throw "Here is a problem";
    }
    for (let index: number = 0; index < cubeTransform.length; index++) {
      cubeTransform[index].addChild(testCubeInstances[index]); //TODO: find out how to get the instance of the testCubeInstance. And not the object itself /\/\/DIRTY FIX: crating an array with the instances of the cube
      worldNode.addChild(cubeTransform[index]);
    }

  }
}