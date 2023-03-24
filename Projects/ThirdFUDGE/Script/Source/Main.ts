namespace Script {
  import ƒ = FudgeCore;
  ƒ.Debug.info("Main Program Template running!");

  let viewport: ƒ.Viewport;


  let myHumanoid: ƒ.Node = null;
  let jumpCountdwon: number = 0;
  let jumped: boolean = false;
  let mausePos:ƒ.Vector2 = new ƒ.Vector2(0,0);

  document.addEventListener("interactiveViewportStarted", <EventListener>start); // interactiveViewportStarted AutoCamara setup

  document.addEventListener("mousemove",onMauseUpdate, false);


  function onMauseUpdate(e:MouseEvent){
    mausePos = new ƒ.Vector2(e.pageX,e.pageY);
  }

  function start(_event: CustomEvent): void {
    viewport = _event.detail; //What is a Viewpoert?  

    myHumanoid = viewport.getBranch().getChildrenByName("Charackter")[0];
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

    //FrameTime???
    myHumanoid.mtxLocal.translateX(ƒ.Loop.timeFrameGame / 10000);

    //dose not work properly
    //viewport.camera.mtxWorld.translate(ƒ.Vector3.SUM(myHumanoid.mtxWorld.translation , new ƒ.Vector3(0, 0, 5)));
    
    //Just a test
    //myHumanoid.mtxLocal.translateX(-(ƒ.Loop.timeFrameReal/100));

    // jumps the cube after 5 seconds up
    if (jumpCountdwon >= 2.0) {
      if (jumped) {
        jumped = false;
        myHumanoid.mtxLocal.translateY(-1);
      }
      else {
        jumped = true;
        myHumanoid.mtxLocal.translateY(1);
      }
      jumpCountdwon = 0;
    }


    let pickNodes:ƒ.Pick[] = ƒ.Picker.pickViewport(viewport,mausePos); 
    for (let i : number = 0; i<pickNodes.length; i++){
      console.info(pickNodes[i].node.name);
    }
    //console.log(viewport.getRayFromClient(mausePos) +"");
 
    jumpCountdwon += ƒ.Loop.timeFrameGame / 1000;
    viewport.draw();
    ƒ.AudioManager.default.update();
  }
}