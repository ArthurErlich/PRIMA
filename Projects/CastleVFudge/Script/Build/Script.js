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
    //elapsedTime
    let elapsedTimeAnim = 0;
    //ƒ Node and Viewport
    let viewport;
    let alucard = null;
    let floor = null;
    let floorTile_1 = null;
    //Velocety of Player
    let gravity = -0.008;
    let playerFallingSpeed = 0;
    let maxPlayerSpeed = 10;
    let hight = 0;
    //Keyboard input! Bubble Hirachie... Fudge Docu
    document.addEventListener("interactiveViewportStarted", start);
    function start(_event) {
        viewport = _event.detail; //What is a Viewpoert?  
        //move the Cam to the right position
        console.log("moved cam");
        viewport.camera.mtxPivot.translateZ(9);
        viewport.camera.mtxPivot.rotateY(180);
        //get nodes
        alucard = viewport.getBranch().getChildrenByName("Character")[0]; // Character = Charakter!!!
        floor = viewport.getBranch().getChildrenByName("Floor")[0];
        // how to access other Graphs?
        floorTile_1 = viewport.getBranch().getChildrenByName("Platform_4x1")[0];
        console.log(floorTile_1);
        //attach the camera to the player node
        let cNode = new ƒ.Node("Camera");
        cNode.addComponent(viewport.camera);
        alucard.addChild(cNode);
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
        hight = alucard.mtxLocal.translation.y + 0.5; //<-- because i have the wrong mtx matrix!
        let isGrounded = true;
        if (hight > 1) {
            isGrounded = false;
        }
        else {
            isGrounded = true;
        }
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_RIGHT, ƒ.KEYBOARD_CODE.D])) {
            alucard.mtxLocal.translateX(0.005 * ƒ.Loop.timeFrameGame);
            updatePlayerAnim(WalkDirection.RIGHT);
            /*
            let right: ƒ.Vector3 = new ƒ.Vector3(0.001, 0, 0);
            right.scale(ƒ.Loop.timeFrameGame/100);
            playerVelocety.add(right);
            */
        }
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_LEFT, ƒ.KEYBOARD_CODE.A])) {
            alucard.mtxLocal.translateX(-0.005 * ƒ.Loop.timeFrameGame);
            updatePlayerAnim(WalkDirection.LEFT);
            /*
            let left: ƒ.Vector3 = new ƒ.Vector3(-0.001, 0, 0);
            left.scale(ƒ.Loop.timeFrameGame/100);
            playerVelocety.add(left);
            */
        }
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.SPACE, ƒ.KEYBOARD_CODE.W]) && isGrounded) {
            //alucard.mtxLocal.translateY(0.01 * ƒ.Loop.timeFrameGame);a
            playerFallingSpeed = 0.2;
            isGrounded = false;
            /*
            let jumpVelocity: ƒ.Vector3 = new ƒ.Vector3(0, 100, 0);
            playerVelocety.add(jumpVelocity);
            */
        }
        if (!isGrounded) {
            playerFallingSpeed += gravity;
            alucard.mtxLocal.translateY(playerFallingSpeed * ƒ.Loop.timeFrameGame / 10);
            /*
            let deltaGravity: ƒ.Vector3 = gravity;
            deltaGravity.scale(ƒ.Loop.timeFrameGame);
      
            playerVelocety = ƒ.Vector3.SUM(playerVelocety, gravity);
            */
        }
        else {
            playerFallingSpeed = 0;
            alucard.mtxLocal.translation.y = 0; // wont work??
            /*
            playerVelocety = new ƒ.Vector3(playerVelocety.x, 0, playerVelocety.z);
            */
        }
    }
    function movementUpdate() {
        /*
        let deltaVelocity: ƒ.Vector3 = playerVelocety;
        deltaVelocity.scale(ƒ.Loop.timeFrameGame);
     
         alucard.mtxLocal.translate(playerVelocety);
        */
    }
    function updatePlayerAnim(direction) {
        let updateTime = 0.06;
        elapsedTimeAnim += ƒ.Loop.timeFrameGame / 1000;
        if (elapsedTimeAnim >= updateTime && direction == WalkDirection.RIGHT) {
            alucard.getComponent(ƒ.ComponentMaterial).mtxPivot.translateX(0.0625);
            elapsedTimeAnim = 0;
        }
        else if (elapsedTimeAnim >= updateTime && direction == WalkDirection.LEFT) {
            alucard.getComponent(ƒ.ComponentMaterial).mtxPivot.translateX(-0.0625);
            elapsedTimeAnim = 0;
        }
    }
    function generateFloor() {
    }
    let WalkDirection;
    (function (WalkDirection) {
        WalkDirection[WalkDirection["LEFT"] = 0] = "LEFT";
        WalkDirection[WalkDirection["RIGHT"] = 1] = "RIGHT";
    })(WalkDirection || (WalkDirection = {}));
})(Script || (Script = {}));
//# sourceMappingURL=Script.js.map