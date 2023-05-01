namespace HomeFudge {
  import ƒ = FudgeCore;
  ƒ.Debug.info("Main Program Template running!");


  
  //@ts-ignore
  document.addEventListener("interactiveViewportStarted", (event) => <EventListener>start(event));
  document.addEventListener("keydown", (event) => continueLoop(event))
  

  ///World Node\\\
  export let _worldNode: ƒ.Node = null;

  ///DeltaSeconds\\\
  export let _deltaSeconds: number = null;

  ///Viewport\\\
  export let _viewport: ƒ.Viewport = null;
 
  ///TestShip\\\
  let destroyer: Destroyer[] = null;



  /// ------------T-E-S-T--A-R-E-A------------------\\\
  //Bullet list, every bullet wil register itself here for the update Method.
  ///camera setup for worldSize of 25km\\\
  //TODO:create camera Class

  /// ------------T-E-S-T--A-R-E-A------------------\\\

  async function start(_event: CustomEvent): Promise<void> {
    _viewport = _event.detail;
    _worldNode = _viewport.getBranch();
    
    console.log(_viewport);
    //Loads Config then initilizes the world 
    await loadConfig().then(initWorld).then(() => { 
      let audioComp=new ƒ.ComponentAudio(new ƒ.Audio("Sound/Background/10.Cycles.mp3"), true);
      console.warn("ConfigsLoaded and world Initialized");
      //Sound by IXION!
      audioComp.volume = 0.1;
      audioComp.play(true);
      _mainCamera.addComponent(audioComp);
    });// to create ships. first load configs than the ships etc
    async function loadConfig() {
      //loads configs
      performance.now();
      console.warn("LoadingConfigs");
      await Config.initConfigs();
      Mouse.init();
    }
  
    async function initWorld(): Promise<void> {
      destroyer = new Array();
      destroyer = initAllDestroyers();
      
      _viewport.getBranch().addChild(destroyer[0]);
      _mainCamera.attachToShip(destroyer[0]);   
    }

    /// ------------T-E-S-T--A-R-E-A------------------\\\
    /// ------------T-E-S-T--A-R-E-A------------------\\\

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    ƒ.Loop.start(ƒ.LOOP_MODE.TIME_GAME, 100);  // start the game loop to continuously draw the _viewport, update the audiosystem and drive the physics i/a
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
     
    // let letaimPos:ƒ.Vector3 = getAimPos(); //TODO:Remove unused AmingRayCaster

    /// ------------T-E-S-T--A-R-E-A------------------\\\

    _viewport.draw();
    ƒ.AudioManager.default.update();
  }

  /// ------------T-E-S-T--A-R-E-A------------------\\\
  function getAimPos():void {
    let pick:ƒ.Pick[] = ƒ.Picker.pickCamera(_worldNode.getChildren(),_viewport.camera,Mouse.pos);
    return pick[0].posWorld;
  }
  
  

  /// ------------T-E-S-T--A-R-E-A------------------\\\
  
  function initAllDestroyers(): Destroyer[] {
    return [new Destroyer(new ƒ.Vector3(0, 0, 0))];
  }

  //DEBUG
  function continueLoop(event:KeyboardEvent){
    if(event.code == "Insert"){
      ƒ.Loop.continue();
    }
  }
}