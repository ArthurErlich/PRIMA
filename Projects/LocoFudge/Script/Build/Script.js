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
var LocoFudge;
(function (LocoFudge) {
    var ƒ = FudgeCore;
    class Camera {
        viewport;
        canvas;
        root;
        //multiply cameras? -> than array. + Active cam
        camComp;
        fieldOfView = 5;
        startClipping = 0.2;
        endClipping = 10000;
        init() {
            this.viewport = LocoFudge.GameManager.viewport;
            this.canvas = LocoFudge.GameManager.canvas;
            //create the camera and add it to the viewport
            this.root = new ƒ.Node("CameraRoot");
            this.root.addComponent(new ƒ.ComponentTransform());
            this.camComp = new ƒ.ComponentCamera();
            let aspectRatio = this.canvas.clientWidth / this.canvas.clientHeight;
            this.camComp.projectCentral(aspectRatio, this.fieldOfView, ƒ.FIELD_OF_VIEW.DIAGONAL, this.startClipping, this.endClipping);
            ///Start Position for FAKE Orthographic View\\\
            this.camComp.mtxPivot.translateZ(160);
            this.camComp.mtxPivot.translateX(-110);
            this.camComp.mtxPivot.translateY(-110);
            ///Start Rotation for FAKE Perspective View\\\
            this.camComp.mtxPivot.rotateY(180);
            this.camComp.mtxPivot.rotateZ(45);
            this.camComp.mtxPivot.rotateX(-45);
            this.root.addComponent(this.camComp);
            console.log("Camera initiated");
        }
        ///Camera Controller\\\ 
        cameraMovementUpdate(deltaSeconds) {
            let moveDirection = new ƒ.Vector3(0, 0, 0);
            if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.W, ƒ.KEYBOARD_CODE.ARROW_UP])) {
                moveDirection = new ƒ.Vector3(moveDirection.x, 1, moveDirection.z);
            }
            if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.S, ƒ.KEYBOARD_CODE.ARROW_DOWN])) {
                moveDirection = new ƒ.Vector3(moveDirection.x, -1, moveDirection.z);
            }
            if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.A, ƒ.KEYBOARD_CODE.ARROW_LEFT])) {
                moveDirection = new ƒ.Vector3(1, moveDirection.y, moveDirection.z);
            }
            if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.D, ƒ.KEYBOARD_CODE.ARROW_RIGHT])) {
                moveDirection = new ƒ.Vector3(-1, moveDirection.y, moveDirection.z);
            }
            if (moveDirection.magnitude > 0) {
                moveDirection.normalize();
            }
            moveDirection.scale(10 * deltaSeconds);
            this.camComp.mtxPivot.translate(moveDirection);
            //Mouse movement
        }
    }
    LocoFudge.Camera = Camera;
})(LocoFudge || (LocoFudge = {}));
var LocoFudge;
(function (LocoFudge) {
    let State;
    (function (State) {
        State[State["MainMenu"] = 0] = "MainMenu";
        State[State["Playing"] = 1] = "Playing";
        State[State["Pause"] = 2] = "Pause";
        State[State["GameOver"] = 3] = "GameOver";
    })(State = LocoFudge.State || (LocoFudge.State = {}));
})(LocoFudge || (LocoFudge = {}));
var LocoFudge;
(function (LocoFudge) {
    var ƒ = FudgeCore;
    class Mouse {
        mousePos = new ƒ.Vector2(0, 0);
        pickedNodes = null;
        updateMousePos(e) {
            this.mousePos.x = e.clientX;
            this.mousePos.y = e.clientY;
        }
        getMousePos() {
            return this.mousePos;
        }
        pickNode() {
            this.pickedNodes = ƒ.Picker.pickViewport(LocoFudge.GameManager.viewport, this.mousePos);
            for (let i = 0; i < this.pickedNodes.length; i++) {
                if (this.pickedNodes[i].node.name.includes("Tile")) {
                    //TODO: check if the tile is active/visible
                    if (this.pickedNodes[i].node.getComponent(ƒ.ComponentMaterial).isActive) {
                        this.pickedNodes[i].node.getComponent(ƒ.ComponentMaterial).activate(false);
                    }
                    else {
                        this.pickedNodes[i].node.getComponent(ƒ.ComponentMaterial).activate(true);
                    }
                }
            }
        }
    }
    LocoFudge.Mouse = Mouse;
})(LocoFudge || (LocoFudge = {}));
var LocoFudge;
(function (LocoFudge) {
    var ƒ = FudgeCore;
    class Tile {
        node = null;
        constructor(index, location) {
            //TODO: get the tile from the graph
            //TODO: tiles are not generated
            this.node = new ƒ.Node("Tile" + index);
            let node = LocoFudge.GameManager.graph.getChild(0).getChildrenByName("GrassTile")[0];
            this.node.addComponent(new ƒ.ComponentTransform());
            this.node.addComponent(new ƒ.ComponentMaterial(node.getComponent(ƒ.ComponentMaterial).material));
            this.node.addComponent(new ƒ.ComponentMesh(node.getComponent(ƒ.ComponentMesh).mesh));
            this.node.mtxLocal.translate(location);
            this.node.getComponent(ƒ.ComponentMesh).mtxPivot.scale(ƒ.Vector3.ONE(0.9));
        }
        getNode() {
            return this.node;
        }
    }
    LocoFudge.Tile = Tile;
    //the tile type+textures
})(LocoFudge || (LocoFudge = {}));
var LocoFudge;
(function (LocoFudge) {
    //the world itself with the tiles Maybe solvable trough fudges nodes
    var ƒ = FudgeCore;
    class World {
        node = null;
        worldSize = null;
        tiles = null;
        generateWorld(worldSize) {
            this.worldSize = worldSize;
            this.node = new ƒ.Node("World");
            this.tiles = new Array(this.worldSize * this.worldSize);
            let x = -1; //small fix for array
            let y = 0;
            for (let index = 0; index < this.worldSize * this.worldSize; index++) {
                if (index % this.worldSize == 0) {
                    x++;
                    y = 0;
                }
                this.tiles[index] = new LocoFudge.Tile(index, new ƒ.Vector3(x, y, 0));
                this.node.appendChild(this.tiles[index].getNode());
                y++;
            }
        }
        getNode() {
            return this.node;
        }
    }
    LocoFudge.World = World;
    let WorldSize;
    (function (WorldSize) {
        WorldSize[WorldSize["Tiny"] = 4] = "Tiny";
        WorldSize[WorldSize["Small"] = 16] = "Small";
        WorldSize[WorldSize["Medium"] = 32] = "Medium";
        WorldSize[WorldSize["Large"] = 64] = "Large";
    })(WorldSize = LocoFudge.WorldSize || (LocoFudge.WorldSize = {}));
})(LocoFudge || (LocoFudge = {}));
var LocoFudge;
(function (LocoFudge) {
    var ƒ = FudgeCore;
    class GameManager {
        static viewport = null;
        static canvas = null;
        static camera = null;
        static graph = null; //Graph of all resources
        static world = null;
        static mouse = null;
        static initiate(viewport) {
            this.viewport = viewport;
            this.canvas = viewport.canvas;
            this.camera = new LocoFudge.Camera();
            this.camera.init();
            this.mouse = new LocoFudge.Mouse();
            viewport.camera = this.camera.root.getComponent(ƒ.ComponentCamera);
            let graphId = "Graph|2023-04-03T21:33:17.373Z|97920";
            this.graph = ƒ.Project.resources[graphId];
            if (!this.graph) {
                console.error("Graph with resources not found " + graphId);
            }
            this.startWorld();
        }
        static startWorld() {
            let world = new LocoFudge.World();
            //Generate World size is selectable
            world.generateWorld(LocoFudge.WorldSize.Medium);
            this.world = world;
            this.viewport.getBranch().addChild(world.getNode());
            console.log("World generated");
            console.log(world.getNode());
        }
    }
    LocoFudge.GameManager = GameManager;
})(LocoFudge || (LocoFudge = {}));
var LocoFudge;
(function (LocoFudge) {
    var ƒ = FudgeCore;
    ƒ.Debug.info("LocoEditor is running! 🏃");
    let viewport;
    document.addEventListener("interactiveViewportStarted", start);
    document.addEventListener("mousemove", onMauseUpdate, false);
    document.addEventListener("mousedown", onMauseClick, false);
    ///Mouse Position Update\\\
    function onMauseUpdate(_event) {
        LocoFudge.GameManager.mouse.updateMousePos(_event);
    }
    function onMauseClick(_event) {
        LocoFudge.GameManager.mouse.pickNode();
    }
    function start(_event) {
        viewport = _event.detail;
        LocoFudge.GameManager.initiate(viewport);
        console.log(LocoFudge.GameManager.camera.root);
        console.log(LocoFudge.GameManager.graph);
        //Create Camera and add it to the viewport
        //Create World
        ƒ.Loop.addEventListener("loopFrame" /* ƒ.EVENT.LOOP_FRAME */, update);
        ƒ.Loop.start(); // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
    }
    async function update(_event) {
        let deltaSeconds = ƒ.Loop.timeFrameGame / 1000;
        //updates the MainLoop
        await LocoFudge.MainLoop.update();
        // ƒ.Physics.simulate();  // if physics is included and used
        viewport.draw();
        // ƒ.AudioManager.default.update();
    }
})(LocoFudge || (LocoFudge = {}));
var LocoFudge;
(function (LocoFudge) {
    var ƒ = FudgeCore;
    class MainLoop {
        static async update() {
            let deltaSeconds = ƒ.Loop.timeFrameGame / 1000;
            LocoFudge.GameManager.camera.cameraMovementUpdate(deltaSeconds);
            //Update Camera
            //Update World
            //Update UI
            //Update Audio
            //Update Gamestate
            //Update Input
        }
    }
    LocoFudge.MainLoop = MainLoop;
})(LocoFudge || (LocoFudge = {}));
//# sourceMappingURL=Script.js.map