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
  let camera: ƒ.ComponentCamera;

  /// ------------T-E-S-T--A-R-E-A------------------\\\

  async function start(_event: CustomEvent): Promise<void> {
    viewport = _event.detail;
    _worldNode = viewport.getBranch();
    await loadConfig().then(crateShips).then(() => { console.warn("ConfigLoaded"); });// to create ships. first load configs than the ships etc

    /// ------------T-E-S-T--A-R-E-A------------------\\\


    //TODO move camera to its own class
    camera = viewport.camera;
    camera.projectCentral(camera.getAspect(), camera.getFieldOfView(), ƒ.FIELD_OF_VIEW.DIAGONAL, 0.1, 30000);
    console.warn(camera.getFieldOfView());
    console.warn(camera.getAspect());


    //TODO:remove unused log!
    // console.log(" Gatling Turret Node: ");
    // console.log(viewport.getBranch().getChildrenByName("GatlingTurret")[0]);
    // console.log(" First child of Gatling Turret: ");
    // console.log(viewport.getBranch().getChildrenByName("GatlingTurret")[0].getChild(0));


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
    } else {

    }
    /// ------------T-E-S-T--A-R-E-A------------------\\\

    viewport.draw();
    ƒ.AudioManager.default.update();
  }

  /// ------------T-E-S-T--A-R-E-A------------------\\\
  async function loadConfig() {
    //loads configs
    performance.now();
    console.warn("LoadingConfigs");
    await Config.initConfigs();
  }
  /// ------------T-E-S-T--A-R-E-A------------------\\\

  async function crateShips(): Promise<void> {
    destroyer = new Destroyer(new ƒ.Vector3(0, 0, 0));
    console.warn(destroyer);
    viewport.getBranch().addChild(destroyer);
  }
}