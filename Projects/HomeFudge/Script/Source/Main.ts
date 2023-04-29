namespace HomeFudge {
  import ƒ = FudgeCore;
  ƒ.Debug.info("Main Program Template running!");


  let viewport: ƒ.Viewport;
  //@ts-ignore
  document.addEventListener("interactiveViewportStarted", (event) => <EventListener>start(event));

  /// ------------T-E-S-T--A-R-E-A------------------\\\
  let destroyer: Destroyer = null;
  export let _worldNode: ƒ.Node = null;
  export let _deltaSeconds:number = null;

  //Bullet list, every bullet wil register itself here for the update Method.
  ///camera setup for worldSize of 25km\\\
  //TODO:create camera Class
  let camera: ƒ.ComponentCamera;

  /// ------------T-E-S-T--A-R-E-A------------------\\\

  //Bullet list, every bullet wil register itself here for the update Method.
  export let bulletList: Bullet[] = new Array();
  export let shipsList: Ship[] = new Array();




  async function start(_event: CustomEvent): Promise<void> {
    viewport = _event.detail;
    _worldNode = viewport.getBranch();
    await loadConfig().then(crateShips).then(() => { console.warn("ConfigLoaded"); });// to create ships. first load configs than the ships etc

    /// ------------T-E-S-T--A-R-E-A------------------\\\


    //TODO move camera to its own class
    camera = viewport.camera;
    camera.projectCentral(camera.getAspect(), camera.getFieldOfView(), ƒ.FIELD_OF_VIEW.DIAGONAL, 0.1, 30000);


    //TODO:remove unused log!
    // console.log(" Gatling Turret Node: ");
    // console.log(viewport.getBranch().getChildrenByName("GatlingTurret")[0]);
    // console.log(" First child of Gatling Turret: ");
    // console.log(viewport.getBranch().getChildrenByName("GatlingTurret")[0].getChild(0));

    
    console.warn(shipsList);
    console.warn(bulletList);
    
    /// ------------T-E-S-T--A-R-E-A------------------\\\

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    ƒ.Loop.start(ƒ.LOOP_MODE.TIME_GAME, 30);  // start the game loop to continuously draw the viewport, update the audiosystem and drive the physics i/a
  }

  function update(_event: Event): void {
    // ƒ.Physics.simulate();  // if physics is included and used
    _deltaSeconds = ƒ.Loop.timeFrameGame / 1000;

    /// ------------T-E-S-T--A-R-E-A------------------\\\
    
    if (ƒ.Loop.fpsGameAverage <= 20) {
      console.warn("Active bullets in scene: " + bulletList.length);
      console.warn(ƒ.Loop.fpsGameAverage);
    } else {
      updateShipsList(_deltaSeconds);
      updateBulletList(_deltaSeconds);
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
    destroyer = new Destroyer(ƒ.Vector3.ZERO());
    console.warn(destroyer);
    viewport.getBranch().addChild(destroyer);
  }
}