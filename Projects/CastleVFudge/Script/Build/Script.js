"use strict";
var Alucard;
(function (Alucard_1) {
    class Alucard {
        maxSpeed = 0;
        fallSpeed = 0;
        gravity = 0;
        update() {
        }
    }
    Alucard_1.Alucard = Alucard;
})(Alucard || (Alucard = {}));
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
    //detlaTimeSeconds
    let detlaTimeSeconds = ƒ.Loop.timeFrameGame;
    //ƒ Node and Viewport
    let viewport;
    let alucard = null;
    let floor = null;
    let floorTile_1 = null;
    //Velocety of Player
    let gravity = -0.008;
    let playerSpeed = new ƒ.Vector3(0, 0, 0);
    let height = 1.5;
    let maxPlayerSpeed = 10;
    //Keyboard input! Bubble Hirachie... Fudge Docu
    document.addEventListener("interactiveViewportStarted", start);
    function start(_event) {
        viewport = _event.detail;
        //move the Cam to the right position
        console.log("moved cam");
        viewport.camera.mtxPivot.translateZ(9);
        viewport.camera.mtxPivot.rotateY(180);
        //get nodes
        alucard = viewport.getBranch().getChildrenByName("Character")[0]; // Character = Charakter!!!
        floor = viewport.getBranch().getChildrenByName("Floor")[0];
        // how to access other Graphs? -> reacuurses
        //floorTile_1 = ƒ.Resurses.getBranch().getChildrenByName("Platform_4x1")[0];
        console.log(floorTile_1);
        //attach the camera to the player node
        let cNode = new ƒ.Node("Camera");
        cNode.addComponent(viewport.camera);
        alucard.addChild(cNode);
        ƒ.Loop.addEventListener("loopFrame" /* ƒ.EVENT.LOOP_FRAME */, update);
        ƒ.Loop.start(); // start the game loop to continuously draw the viewport, update the audio system and drive the physics i/a
    }
    function update(_event) {
        // ƒ.Physics.simulate();  // if physics is included and used
        movementInput();
        movementUpdate();
        viewport.draw();
        // ƒ.AudioManager.default.update();
    }
    function movementInput() {
        let isGrounded = true;
        if (height > 1) {
            isGrounded = false;
        }
        else {
            isGrounded = true;
            //Better test bevor changing!
            /*
            playerFallingSpeed = 0;
            alucard.mtxLocal.translation = new ƒ.Vector3(alucard.mtxLocal.translation.x,0.5,alucard.mtxLocal.translation.z);
            */
        }
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_RIGHT, ƒ.KEYBOARD_CODE.D])) {
            playerSpeed = new ƒ.Vector3(5 * detlaTimeSeconds, playerSpeed.y, playerSpeed.z);
            updatePlayerAnim(WalkDirection.RIGHT);
            //alucard.mtxLocal.translateX(0.005*ƒ.Loop.timeFrameGame);
            /*
            let right: ƒ.Vector3 = new ƒ.Vector3(0.001, 0, 0);
            right.scale(ƒ.Loop.timeFrameGame/100);
            playerVelocety.add(right);
            */
        }
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_LEFT, ƒ.KEYBOARD_CODE.A])) {
            playerSpeed = new ƒ.Vector3(-5 * detlaTimeSeconds, playerSpeed.y, playerSpeed.z);
            updatePlayerAnim(WalkDirection.LEFT);
            //alucard.mtxLocal.translateX(-5*ƒ.Loop.timeFrameGame/1000);
            /*
            let left: ƒ.Vector3 = new ƒ.Vector3(-0.001, 0, 0);
            left.scale(ƒ.Loop.timeFrameGame/100);
            playerVelocety.add(left);
            */
        }
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.SPACE, ƒ.KEYBOARD_CODE.W]) && isGrounded) {
            playerSpeed = new ƒ.Vector3(playerSpeed.x, 0.2, playerSpeed.z);
            isGrounded = false;
            /*
            //alucard.mtxLocal.translateY(0.01 * ƒ.Loop.timeFrameGame);
            playerFallingSpeed = 0.2;
            let jumpVelocity: ƒ.Vector3 = new ƒ.Vector3(0, 100, 0);
            playerVelocety.add(jumpVelocity);
            */
        }
        if (!isGrounded) {
            playerSpeed = new ƒ.Vector3(playerSpeed.x, (gravity + gravity) * detlaTimeSeconds, playerSpeed.z);
            /*
            alucard.mtxLocal.translateY(playerFallingSpeed * ƒ.Loop.timeFrameGame / 10);
            let deltaGravity: ƒ.Vector3 = gravity;
            deltaGravity.scale(ƒ.Loop.timeFrameGame);
      
            playerVelocety = ƒ.Vector3.SUM(playerVelocety, gravity);
            */
        }
    }
    function movementUpdate() {
        //grab the movment vector and add it to the mtx of the player
        //alucard.mtxLocal.translation = new ƒ.Vector3()
        if (height > 1) {
            playerSpeed = new ƒ.Vector3(playerSpeed.y, 0, playerSpeed.z);
            alucard.mtxLocal.translation = new ƒ.Vector3(playerSpeed.y, 0, playerSpeed.z);
        }
        else {
            alucard.mtxLocal.translation = playerSpeed;
        }
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