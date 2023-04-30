namespace HomeFudge {
  import ƒ = FudgeCore;
  ƒ.Debug.info("Main Program Template running!");


  let viewport: ƒ.Viewport;
  //@ts-ignore
  document.addEventListener("interactiveViewportStarted", (event) => <EventListener>start(event));

  ///World Node\\\
  export let _worldNode: ƒ.Node = null;

  //DeltaSeconds\\\
  export let _deltaSeconds: number = null;

  ///Mouse\\\


  //Mouse.init();
  /// ------------T-E-S-T--A-R-E-A------------------\\\
  let destroyer: Destroyer = null;
  //Bullet list, every bullet wil register itself here for the update Method.
  ///camera setup for worldSize of 25km\\\
  //TODO:create camera Class

  /// ------------T-E-S-T--A-R-E-A------------------\\\

  async function start(_event: CustomEvent): Promise<void> {
    viewport = _event.detail;
    _worldNode = viewport.getBranch();
    //Loads Config then initilizes the world 
    await loadConfig().then(initWorld).then(() => { console.warn("ConfigsLoaded and world Initialized"); });// to create ships. first load configs than the ships etc

    /// ------------T-E-S-T--A-R-E-A------------------\\\
    viewport.camera.projectCentral(1.77, 80, ƒ.FIELD_OF_VIEW.DIAGONAL, 0.1, 30000);
    /// ------------T-E-S-T--A-R-E-A------------------\\\

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    ƒ.Loop.start(ƒ.LOOP_MODE.TIME_GAME, 30);  // start the game loop to continuously draw the viewport, update the audiosystem and drive the physics i/a
  }

  function update(_event: Event): void {
    // ƒ.Physics.simulate();  // if physics is included and used
    _deltaSeconds = ƒ.Loop.timeFrameGame / 1000;

    /// ------------T-E-S-T--A-R-E-A------------------\\\
    if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.DELETE])) {
      ƒ.Loop.stop();
      console.log(_worldNode);
    }


    //TODO: remove error when frames are dropping
    if (ƒ.Loop.fpsGameAverage <= 20) {
      console.warn(ƒ.Loop.fpsGameAverage);
      console.warn("Active bullets in scene: " + _worldNode.getChildrenByName("BulletGatling").length);
      ƒ.Loop.stop();
    }


     aimPos = getAimPos();
    /// ------------T-E-S-T--A-R-E-A------------------\\\

    viewport.draw();
    ƒ.AudioManager.default.update();
  }

  /// ------------T-E-S-T--A-R-E-A------------------\\\
  function getAimPos(): ƒ.Vector3 {
    let pick:ƒ.Pick[] = ƒ.Picker.pickCamera(_worldNode.getChildren(),viewport.camera,new ƒ.Vector2(viewport.canvas.width/2,viewport.canvas.height/2));
    return pick[0].posWorld;
  }
  export let aimPos:ƒ.Vector3= ƒ.Vector3.ZERO();
  /// ------------T-E-S-T--A-R-E-A------------------\\\
  async function loadConfig() {
    //loads configs
    performance.now();
    console.warn("LoadingConfigs");
    await Config.initConfigs();
  }

  async function initWorld(): Promise<void> {

    let destroyer: ƒ.Node = initDestroyer();
    viewport.getBranch().addChild(destroyer);

    let camera: Camera = initCamera("Main");
    viewport.getBranch().addChild(camera);
    camera.attachToShip(destroyer);
    //  viewport.camera.activate(false); //TODO: Make mode for Switching InteractiveCam and PlayerCam
    //  camera.getComponent(ƒ.ComponentCamera).activate(true);
    //  console.log(_worldNode);

  }
  function initDestroyer(): Destroyer {
    return new Destroyer(new ƒ.Vector3(0, 0, 0));

  }
  function initCamera(name: string): Camera {
    return new Camera(name);
  }
}