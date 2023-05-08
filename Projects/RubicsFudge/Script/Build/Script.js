"use strict";
var McFudge;
(function (McFudge) {
    var ƒ = FudgeCore;
    class Block extends ƒ.Node {
        //used once
        static meshCube = new ƒ.MeshCube();
        static materialCube = new ƒ.Material("mtr", ƒ.ShaderFlat, new ƒ.CoatRemissive()); // you can also grab the Matrial from the resources!
        constructor(_position, _color) {
            super(_position.toString()); // always call super!
            //now we add them to the Componnets
            let transform = new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(_position));
            let mesh = new ƒ.ComponentMesh(Block.meshCube);
            let material = new ƒ.ComponentMaterial(Block.materialCube);
            material.clrPrimary = _color;
            this.addComponent(transform);
            this.addComponent(mesh);
            this.addComponent(material);
        }
    }
    McFudge.Block = Block;
})(McFudge || (McFudge = {}));
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
var McFudge;
(function (McFudge) {
    var ƒ = FudgeCore;
    ƒ.Debug.info("Main McFudge running!");
    let viewport;
    document.addEventListener("interactiveViewportStarted", start);
    /// Graphs and Nodes \\\
    let gameGraph = null;
    let worldNode = null;
    /// that is steve \\\
    let steve = null;
    /// colorers \\\
    let cubeColorList = [
        ƒ.Color.CSS("white"),
        ƒ.Color.CSS("green"),
        ƒ.Color.CSS("blue"),
        ƒ.Color.CSS("yellow")
    ];
    function start(_event) {
        viewport = _event.detail;
        viewport.physicsDebugMode = ƒ.PHYSICS_DEBUGMODE.COLLIDERS;
        McFudge.Mouse.init(viewport.canvas);
        //-----------------------T-E-S-T---A-R-E-A-----------------------\\
        //-----------------------------------------------------------------\\
        viewport.canvas.addEventListener("pointerdown", pickByCamera);
        ///init Graphs
        gameGraph = viewport.getBranch();
        worldNode = gameGraph.getChildrenByName("World")[0];
        steve = new McFudge.Steve();
        worldNode.addChild(steve);
        generateWorld(5);
        //------------------------T-E-S-T---A-R-E-A----------------------\\
        //-----------------------------------------------------------------\\
        ƒ.Loop.addEventListener("loopFrame" /* ƒ.EVENT.LOOP_FRAME */, update);
        ƒ.Loop.start(ƒ.LOOP_MODE.FRAME_REQUEST, 15); // start the game loop to continuously draw the viewport, update the audiosystem and drive the physics i/a
    }
    function update(_event) {
        let children = viewport.getBranch().getChildren();
        children.forEach(child => {
            if (child.mtxWorld.translation.y <= -10) {
                child.getParent().removeChild(child);
            }
        });
        steve.getComponent(ƒ.ComponentRigidbody).applyForce(new ƒ.Vector3(1, 0, 0));
        ƒ.Physics.simulate(); // if physics is included and used
        viewport.draw();
        ƒ.AudioManager.default.update();
    }
    function pickByCamera(_event) {
        let picks = ƒ.Picker.pickViewport(viewport, new ƒ.Vector2(_event.clientX, _event.clientY));
        picks.sort((_a, _b) => (_a.zBuffer < _b.zBuffer) ? -1 : 1);
        if (_event.button == 1) {
            hitBlockRemove(picks[0]?.node);
            console.log("remove");
        }
        if (_event.button == 2) {
            let normal = picks[0]?.normal;
            let pos = picks[0]?.node.mtxWorld.translation;
            if (pos == undefined) {
                return;
            }
            let adPos = new ƒ.Vector3(pos.x + normal.x, pos.y + normal.y, pos.z + normal.z);
            hitBlockAdd(adPos);
        }
    }
    function hitBlockRemove(_block) {
        if (!_block)
            return;
        console.log(_block.name);
        _block.getParent().removeChild(_block);
        viewport.draw();
    }
    function hitBlockAdd(adPos) {
        crateBlock(adPos);
        viewport.draw();
    }
    function crateBlock(pos) {
        let randomCubeColorIndex = Math.floor(Math.random() * (cubeColorList.length));
        let cubeColor = cubeColorList[randomCubeColorIndex];
        let instance = new McFudge.Block(pos, cubeColor);
        let rigidBody = new ƒ.ComponentRigidbody(1, ƒ.BODY_TYPE.DYNAMIC, ƒ.COLLIDER_TYPE.CUBE, ƒ.COLLISION_GROUP.DEFAULT);
        // instance.mtxLocal.scale(new ƒ.Vector3(0.97, 0.97, 0.97));
        instance.addComponent(rigidBody);
        if (pos.y == 0) {
            instance.getComponent(ƒ.ComponentRigidbody).typeBody = ƒ.BODY_TYPE.STATIC;
            instance.getComponent(ƒ.ComponentRigidbody).restitution = 0;
        }
        viewport.getBranch().addChild(instance);
        viewport.draw();
        return instance;
    }
    //world gen
    function generateWorld(size) {
        for (let x = 0; x < size; x++) {
            for (let y = 0; y < 1; y++) { // set that to 2 for fun
                for (let z = 0; z < size; z++) {
                    let tempBlock = crateBlock(new ƒ.Vector3(x, y, z));
                    if (y == 0) {
                        tempBlock.getComponent(ƒ.ComponentRigidbody).typeBody = ƒ.BODY_TYPE.STATIC;
                    }
                }
            }
        }
    }
})(McFudge || (McFudge = {}));
var McFudge;
(function (McFudge) {
    var ƒ = FudgeCore;
    //TODO: add MouseClickOnce to get a one click press
    /**
     * The  Mouse class is a TypeScript class that tracks mouse movement and button presses.
     *
     * @static position: ƒ.Vector2;
     * @static movedDistance: ƒ.Vector2;
     * @ArthurErlich <arthur.erlich@hs-furtwangen.de>}
     */
    class Mouse {
        static position = new ƒ.Vector2(0, 0);
        static movedDistance = new ƒ.Vector2(0, 0);
        /**
         * This array should be the same length as the {@link MOUSE_CODE }
         */
        static isPressed = new Array(3); // length of MOUSE_CODE enum
        static tempPos = new ƒ.Vector2(0, 0);
        /**
         * This function initializes mouse event listeners and adds them to the canvas and the loop.
         *
         * @param canvas HTMLCanvasElement - This is the canvas element on which the mouse events will
         * be registered and tracked.
         * @ArthurErlich <arthur.erlich@hs-furtwangen.de>
         */
        static init(canvas) {
            canvas.addEventListener("mousemove", Mouse.moveUpdate);
            canvas.addEventListener("mousedown", Mouse.mouseDown);
            canvas.addEventListener("mouseup", Mouse.mouseUp);
            ƒ.Loop.addEventListener("loopFrame" /* ƒ.EVENT.LOOP_FRAME */, Mouse.update);
        }
        /**
         * This is a private static arrow function called `update` that is used to update the
         * `movedDistance` property of the `Mouse` class. It calculates the distance the mouse has
         * moved since the last frame by subtracting the current position of the mouse from the
         * previous position stored in `tempPos`. It then updates `tempPos` to the current position of
         * the mouse so that it can be used to calculate the distance moved in the next frame.
         * @ArthurErlich <arthur.erlich@hs-furtwangen.de>
         */
        static update = () => {
            Mouse.movedDistance.set(Mouse.tempPos.x - Mouse.position.x, Mouse.tempPos.y - Mouse.position.y);
            Mouse.tempPos = Mouse.position;
        };
        /**
         * This is a private static arrow function called `moveUpdate` that is used to update the
         * `position` and `movedDistance` properties of the `Mouse` class when the mouse is moved. It
         * takes a `MouseEvent` object as its parameter and sets the `movedDistance` property to a new
         * `Vector2` object with the `movementX` and `movementY` properties of the `MouseEvent`. It
         * also sets the `position` property to a new `Vector2` object with the `x` and `y` properties
         * of the `MouseEvent`.
        */
        static moveUpdate = (_event) => {
            //switched to set for performance reasons.
            Mouse.movedDistance.set(_event.movementX, _event.movementY);
            Mouse.position.set(_event.clientX, _event.clientY);
        };
        /**
         * The function sets the corresponding value in the Mouse.isPressed array based on the button
         * pressed during a mouse down event.
         *
         * @param _event The _event parameter is a MouseEvent object that contains information about
         * the mouse event that occurred, such as the type of event (e.g. mouse down, mouse up, mouse
         * move), the position of the mouse cursor, and which mouse button was pressed.
         */
        static mouseDown(_event) {
            switch (_event.button) {
                case MOUSE_CODE.RIGHT:
                    Mouse.isPressed[MOUSE_CODE.RIGHT] = MOUSE_CODE.RIGHT;
                    break;
                case MOUSE_CODE.LEFT:
                    Mouse.isPressed[MOUSE_CODE.LEFT] = MOUSE_CODE.LEFT;
                    break;
                case MOUSE_CODE.MIDDLE:
                    Mouse.isPressed[MOUSE_CODE.MIDDLE] = MOUSE_CODE.MIDDLE;
                    break;
                default:
                    break;
            }
        }
        /**
         * The function handles the mouse up event and updates the state of the mouse button that was
         * released.
         *
         * @param _event The _event parameter is a MouseEvent object that contains information about
         * the mouse event that occurred, such as the type of event (e.g. mouseup), the target element
         * that triggered the event, and the position of the mouse cursor at the time of the event.
         */
        static mouseUp(_event) {
            switch (_event.button) {
                case MOUSE_CODE.RIGHT:
                    Mouse.isPressed[MOUSE_CODE.RIGHT] = null;
                    break;
                case MOUSE_CODE.LEFT:
                    Mouse.isPressed[MOUSE_CODE.LEFT] = null;
                    break;
                case MOUSE_CODE.MIDDLE:
                    Mouse.isPressed[MOUSE_CODE.MIDDLE] = null;
                    break;
                default:
                    break;
            }
        }
        /**
         * The function checks if any of the mouse buttons in the input array are currently pressed.
         *
         * @param inputs An array of MOUSE_CODE values that represent the mouse buttons being checked
         * for being pressed.
         * @return A boolean value is being returned, which indicates whether the Mouse is pressed.
         */
        static isPressedOne(inputs) {
            for (let index = 0; index <= Mouse.isPressed.length; index++) {
                for (let inputIndex = 0; inputIndex < inputs.length; inputIndex++) {
                    if (inputs[inputIndex] == Mouse.isPressed[index]) {
                        return true;
                    }
                }
            }
            return false;
        }
    }
    McFudge.Mouse = Mouse;
    /**
     * Note: adding buttons means to lengthen the {@link Mouse.isPressed}
     */
    let MOUSE_CODE;
    (function (MOUSE_CODE) {
        MOUSE_CODE[MOUSE_CODE["LEFT"] = 0] = "LEFT";
        MOUSE_CODE[MOUSE_CODE["MIDDLE"] = 1] = "MIDDLE";
        MOUSE_CODE[MOUSE_CODE["RIGHT"] = 2] = "RIGHT";
    })(MOUSE_CODE = McFudge.MOUSE_CODE || (McFudge.MOUSE_CODE = {}));
})(McFudge || (McFudge = {}));
var McFudge;
(function (McFudge) {
    var ƒ = FudgeCore;
    class Steve extends ƒ.Node {
        constructor() {
            super("steve");
            this.addComponent(new ƒ.ComponentMesh(new ƒ.MeshCube));
            this.addComponent(new ƒ.ComponentMaterial(new ƒ.Material("mat", ƒ.ShaderFlat, new ƒ.CoatRemissive())));
            this.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(new ƒ.Vector3(0, 4, 0))));
            this.addComponent(new ƒ.ComponentRigidbody(1, ƒ.BODY_TYPE.DYNAMIC, ƒ.COLLIDER_TYPE.CAPSULE, ƒ.COLLISION_GROUP.DEFAULT));
            this.addComponent(new ƒ.ComponentCamera());
            this.getComponent(ƒ.ComponentCamera).activate(true);
            this.getComponent(ƒ.ComponentRigidbody).mtxPivot.scale(new ƒ.Vector3(0.5, 0.5, 0.5));
            this.getComponent(ƒ.ComponentRigidbody).effectRotation = new ƒ.Vector3(0, 1, 0);
            this.getComponent(ƒ.ComponentRigidbody).friction = 0;
            this.getComponent(ƒ.ComponentMesh).mtxPivot.scaleX(0.5);
            this.getComponent(ƒ.ComponentMesh).mtxPivot.scaleZ(0.5);
        }
    }
    McFudge.Steve = Steve;
})(McFudge || (McFudge = {}));
//# sourceMappingURL=Script.js.map