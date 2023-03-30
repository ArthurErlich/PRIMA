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
var CastleV;
(function (CastleV) {
    var ƒ = FudgeCore;
    ƒ.Debug.info("Main Program Template running!");
    //elapsedTime
    let elapsedTimeAnim = 0;
    //deltaTimeSeconds
    let deltaTimeSeconds;
    //ƒ Viewport
    let viewport;
    let floor = null;
    let floorTile_1 = null;
    //Velocety of Player
    let player;
    //Keyboard input! Bubble Hirachie... Fudge Docu
    document.addEventListener("interactiveViewportStarted", start);
    function start(_event) {
        viewport = _event.detail;
        ///Create Player\\\
        player = new CastleV.Player(viewport);
        //alucard = viewport.getBranch().getChildrenByName("Character")[0];
        //move the Cam to the right position
        console.log("moved cam");
        viewport.camera.mtxPivot.translateZ(9);
        viewport.camera.mtxPivot.rotateY(180);
        //get nodes
        floor = viewport.getBranch().getChildrenByName("Floor")[0];
        // how to access other Graphs? -> reacuurses
        //floorTile_1 = ƒ.Resurses.getBranch().getChildrenByName("Platform_4x1")[0];
        console.log(floorTile_1);
        //attach the camera to the player node
        let cNode = new ƒ.Node("Camera");
        cNode.addComponent(viewport.camera);
        player.alucard.addChild(cNode);
        ƒ.Loop.addEventListener("loopFrame" /* ƒ.EVENT.LOOP_FRAME */, update);
        ƒ.Loop.start(); // start the game loop to continuously draw the viewport, update the audio system and drive the physics i/a
    }
    ///--------------------------------------U-P-D-A-T-E---------------------------------------------------------------------\\\
    //------------------------------------------------------------------------------------------------------------------------\\
    function update(_event) {
        // ƒ.Physics.simulate();  // if physics is included and used
        ///Update deltaTimeSeconds\\\
        deltaTimeSeconds = ƒ.Loop.timeFrameGame / 1000;
        ///Update Player\\\
        player.update(deltaTimeSeconds); // moved player to player.ts (its own Class)
        viewport.draw();
        // ƒ.AudioManager.default.update();
    }
})(CastleV || (CastleV = {}));
var CastleV;
(function (CastleV) {
    var ƒ = FudgeCore;
    class Player {
        alucard = null;
        gravity = -1;
        playerSpeed = new ƒ.Vector3(0, 0, 0);
        fallingSpeed = 0;
        maySpeed = 5;
        maxFallSpeed = 1;
        material = null;
        //deltaTime
        deltaTimeSeconds = 0;
        //animation
        elapsedTimeAnim = 0;
        constructor(viewport) {
            this.alucard = viewport.getBranch().getChildrenByName("Character")[0];
            this.material = this.alucard.getComponent(ƒ.ComponentMaterial);
        }
        update(deltaTimeSeconds) {
            this.deltaTimeSeconds = deltaTimeSeconds;
            this.input();
        }
        input() {
            let isGrounded = true;
            this.playerSpeed = new ƒ.Vector3(0, 0, 0);
            if (0.5 < this.alucard.mtxLocal.translation.y + this.fallingSpeed) {
                isGrounded = false;
            }
            else {
                isGrounded = true;
            }
            if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_RIGHT, ƒ.KEYBOARD_CODE.D])) {
                this.playerSpeed = new ƒ.Vector3(5 * this.deltaTimeSeconds, this.playerSpeed.y, this.playerSpeed.z);
                this.updatePlayerAnim(WalkDirection.RIGHT);
            }
            if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_LEFT, ƒ.KEYBOARD_CODE.A])) {
                this.playerSpeed = new ƒ.Vector3(-5 * this.deltaTimeSeconds, this.playerSpeed.y, this.playerSpeed.z);
                this.updatePlayerAnim(WalkDirection.LEFT);
            }
            if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.SPACE, ƒ.KEYBOARD_CODE.W]) && isGrounded) {
                this.fallingSpeed = 0.2;
                this.alucard.mtxLocal.translateY(0);
                isGrounded = false;
            }
            if (!isGrounded) {
                //limits the speed of falling
                if (Math.abs(this.fallingSpeed) <= 0.2) {
                    this.fallingSpeed += this.gravity * this.deltaTimeSeconds;
                }
                this.playerSpeed = new ƒ.Vector3(this.playerSpeed.x, this.fallingSpeed, this.playerSpeed.z);
            }
            this.movement(isGrounded);
        }
        movement(isGrounded) {
            if (isGrounded) {
                //playerSpeed = new ƒ.Vector3(playerSpeed.y, 0, playerSpeed.z);
                this.fallingSpeed = 0;
                this.alucard.mtxLocal.translate(new ƒ.Vector3(this.playerSpeed.x, 0, this.playerSpeed.z));
                this.alucard.mtxLocal.translation = new ƒ.Vector3(this.alucard.mtxLocal.translation.x, 0.5, this.alucard.mtxLocal.translation.z);
            }
            else {
                this.alucard.mtxLocal.translate(this.playerSpeed);
            }
        }
        updatePlayerAnim(direction) {
            let updateTime = 0.06;
            this.elapsedTimeAnim += ƒ.Loop.timeFrameGame / 1000;
            if (this.elapsedTimeAnim >= updateTime && direction == WalkDirection.RIGHT) {
                this.material.mtxPivot.translateX(0.0625);
                this.elapsedTimeAnim = 0;
            }
            else if (this.elapsedTimeAnim >= updateTime && direction == WalkDirection.LEFT) {
                this.material.mtxPivot.translateX(-0.0625);
                this.elapsedTimeAnim = 0;
            }
        }
    }
    CastleV.Player = Player;
    let WalkDirection;
    (function (WalkDirection) {
        WalkDirection[WalkDirection["LEFT"] = 0] = "LEFT";
        WalkDirection[WalkDirection["RIGHT"] = 1] = "RIGHT";
    })(WalkDirection || (WalkDirection = {}));
})(CastleV || (CastleV = {}));
//# sourceMappingURL=Script.js.map