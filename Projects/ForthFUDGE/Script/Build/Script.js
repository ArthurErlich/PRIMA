"use strict";
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    ƒ.Project.registerScriptNamespace(Script); // Register the namespace to FUDGE for serialization
    class CustomComponentScript extends ƒ.ComponentScript {
        // Register the script as component for use in the editor via drag&drop
        static iSubclass = ƒ.Component.registerSubclass(CustomComponentScript);
        // Properties may be mutated by users in the editor via the automatically created user interface
        message = "CustomComponentScript added to ";
        constructor() {
            super();
            // Don't start when running in editor
            if (ƒ.Project.mode == ƒ.MODE.EDITOR)
                return;
            // Listen to this component being added to or removed from a node
            this.addEventListener("componentAdd" /* ƒ.EVENT.COMPONENT_ADD */, this.hndEvent);
            this.addEventListener("componentRemove" /* ƒ.EVENT.COMPONENT_REMOVE */, this.hndEvent);
            this.addEventListener("nodeDeserialized" /* ƒ.EVENT.NODE_DESERIALIZED */, this.hndEvent);
        }
        // Activate the functions of this component as response to events
        hndEvent = (_event) => {
            switch (_event.type) {
                case "componentAdd" /* ƒ.EVENT.COMPONENT_ADD */:
                    ƒ.Debug.log(this.message, this.node);
                    break;
                case "componentRemove" /* ƒ.EVENT.COMPONENT_REMOVE */:
                    this.removeEventListener("componentAdd" /* ƒ.EVENT.COMPONENT_ADD */, this.hndEvent);
                    this.removeEventListener("componentRemove" /* ƒ.EVENT.COMPONENT_REMOVE */, this.hndEvent);
                    break;
                case "nodeDeserialized" /* ƒ.EVENT.NODE_DESERIALIZED */:
                    // if deserialized the node is now fully reconstructed and access to all its components and children is possible
                    break;
            }
        };
    }
    Script.CustomComponentScript = CustomComponentScript;
})(Script || (Script = {}));
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    ƒ.Debug.info("Main Program Template running!");
    let viewport;
    let myHumanoid = null;
    // let jumpCountdwon: number = 0;
    //let jumped: boolean = false;
    let mausePos = new ƒ.Vector2(0, 0);
    //Velocety of Player
    let gravity = -0.008;
    let playerFallingSpeed = 0;
    let hight = 0;
    /*
    let playerVelocety: ƒ.Vector3 = new ƒ.Vector3(0, 0, 0);
    let gravity: ƒ.Vector3 = new ƒ.Vector3(0, -0.000001, 0);
    */
    //document.addEventListener("keydown", handKyboard); this is not the right way!
    //Keyboard input! Bubble Hirachie... Fudge Docu
    document.addEventListener("interactiveViewportStarted", start); // interactiveViewportStarted AutoCamara setup
    document.addEventListener("mousemove", onMauseUpdate, false);
    function onMauseUpdate(e) {
        mausePos = new ƒ.Vector2(e.pageX, e.pageY);
    }
    function start(_event) {
        viewport = _event.detail; //What is a Viewpoert?  
        //move the Cam to the right position
        viewport.camera.mtxPivot.translateZ(9);
        viewport.camera.mtxPivot.rotateY(180);
        //get the player node
        myHumanoid = viewport.getBranch().getChildrenByName("Charackter")[0]; // Charakter = Charakter!!!
        //atach the camera to the player node
        let cNode = new ƒ.Node("Camera");
        cNode.addComponent(viewport.camera);
        myHumanoid.addChild(cNode);
        /*
        let myHumanoid: ƒ.Node = viewport.getBranch().getChildrenByName("Humanoid")[0];
        console.log("Geting Humanoid:"+ myHumanoid);
    
        let myCMPHumanoid: ƒ.ComponentTransform = myHumanoid.getComponent(ƒ.ComponentTransform);
        myCMPHumanoid.mtxLocal.translateX(1);
    
        console.log("Geting Humanoid:"+ myHumanoid);
        */
        // ther is a simpler version to get all this
        ƒ.Loop.addEventListener("loopFrame" /* ƒ.EVENT.LOOP_FRAME */, update);
        ƒ.Loop.start(); // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
    }
    function update(_event) {
        // ƒ.Physics.simulate();  // if physics is included and used
        movementInput();
        //movementUpdate();
        viewport.draw();
        // ƒ.AudioManager.default.update();
    }
    function movementInput() {
        hight = myHumanoid.mtxLocal.translation.y + 0.5; //<-- because i have the wrong mtx matrix!
        let isGrounded = true;
        if (hight > 1) {
            isGrounded = false;
        }
        else {
            isGrounded = true;
        }
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_RIGHT, ƒ.KEYBOARD_CODE.D])) {
            myHumanoid.mtxLocal.translateX(0.01 * ƒ.Loop.timeFrameGame);
            /*
            let right: ƒ.Vector3 = new ƒ.Vector3(0.001, 0, 0);
            right.scale(ƒ.Loop.timeFrameGame/100);
            playerVelocety.add(right);
            */
        }
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_LEFT, ƒ.KEYBOARD_CODE.A])) {
            myHumanoid.mtxLocal.translateX(-0.01 * ƒ.Loop.timeFrameReal);
            /*
            let left: ƒ.Vector3 = new ƒ.Vector3(-0.001, 0, 0);
            left.scale(ƒ.Loop.timeFrameGame/100);
            playerVelocety.add(left);
            */
        }
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.SPACE, ƒ.KEYBOARD_CODE.W]) && isGrounded) {
            //myHumanoid.mtxLocal.translateY(0.01 * ƒ.Loop.timeFrameGame);
            playerFallingSpeed = 0.2;
            isGrounded = false;
            /*
            let jumpVelocity: ƒ.Vector3 = new ƒ.Vector3(0, 100, 0);
            playerVelocety.add(jumpVelocity);
            */
        }
        if (!isGrounded) {
            playerFallingSpeed += gravity;
            myHumanoid.mtxLocal.translateY(playerFallingSpeed * ƒ.Loop.timeFrameGame / 10);
            /*
            let deltaGravity: ƒ.Vector3 = gravity;
            deltaGravity.scale(ƒ.Loop.timeFrameGame);
      
            playerVelocety = ƒ.Vector3.SUM(playerVelocety, gravity);
            */
        }
        else {
            playerFallingSpeed = 0;
            myHumanoid.mtxLocal.translation.y = 0;
            /*
            playerVelocety = new ƒ.Vector3(playerVelocety.x, 0, playerVelocety.z);
            */
        }
    }
    function movementUpdate() {
        /*
        let deltaVelocity: ƒ.Vector3 = playerVelocety;
        deltaVelocity.scale(ƒ.Loop.timeFrameGame);
     
         myHumanoid.mtxLocal.translate(playerVelocety);
        */
    }
})(Script || (Script = {}));
//# sourceMappingURL=Script.js.map