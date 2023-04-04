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
        canvas;
        root;
        //multiply cameras? -> than array. + Active cam
        componentCamera;
        fieldOfView = 5;
        startClipping = 0.2;
        endClipping = 10000;
        init() {
            this.canvas = LocoFudge.GameManager.canvas;
            //create the camera and add it to the viewport
            this.root = new ƒ.Node("CameraRoot");
            this.root.addComponent(new ƒ.ComponentTransform());
            this.componentCamera = new ƒ.ComponentCamera();
            let aspectRatio = this.canvas.clientWidth / this.canvas.clientHeight;
            this.componentCamera.projectCentral(aspectRatio, this.fieldOfView, ƒ.FIELD_OF_VIEW.DIAGONAL, this.startClipping, this.endClipping);
            ///Start Position for FAKE Orthographic View\\\
            this.componentCamera.mtxPivot.translateZ(160);
            this.componentCamera.mtxPivot.translateX(-110);
            this.componentCamera.mtxPivot.translateY(-110);
            ///Start Rotation for FAKE Perspective View\\\
            this.componentCamera.mtxPivot.rotateY(180);
            this.componentCamera.mtxPivot.rotateZ(45);
            this.componentCamera.mtxPivot.rotateX(-45);
            this.root.addComponent(this.componentCamera);
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
            this.componentCamera.mtxPivot.translate(moveDirection);
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
        selectedTile = null;
        updateMousePos(e) {
            this.mousePos.x = e.clientX;
            this.mousePos.y = e.clientY;
        }
        getMousePos() {
            return this.mousePos;
        }
        pickNode() {
            let pickedNodes = ƒ.Picker.pickViewport(LocoFudge.GameManager.viewport, this.mousePos);
            let selectionNode = LocoFudge.GameManager.graph.getChild(0).getChildrenByName("Selection")[0];
            for (let i = 0; i < pickedNodes.length; i++) {
                //TODO: make a selection add stuff to do ..... etc
                if (pickedNodes[i].node.name.includes("Tile")) {
                    if (this.selectedTile != null) {
                        selectionNode = this.selectedTile.getChildrenByName("Selection")[0];
                        selectionNode.mtxLocal.translateZ(-0.1); //TODO: remove Temp fix
                        selectionNode.mtxLocal.translateY(0.05); //TODO: remove Temp fix
                        selectionNode.mtxLocal.translateX(0.05); //TODO: remove Temp fix
                        LocoFudge.GameManager.graph.getChild(0).addChild(selectionNode);
                    }
                    this.selectedTile = pickedNodes[i].node;
                    this.selectedTile.addChild(selectionNode);
                    selectionNode.mtxLocal.translateZ(0.1); //TODO: remove Temp fix
                    selectionNode.mtxLocal.translateY(-0.05); //TODO: remove Temp fix
                    selectionNode.mtxLocal.translateX(-0.05); //TODO: remove Temp fix
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
            //TODO: make Tiles with Material and Mesh as references
            let node = LocoFudge.GameManager.graph.getChild(0).getChildrenByName("GrassTile")[0];
            this.node.addComponent(new ƒ.ComponentTransform());
            this.node.addComponent(new ƒ.ComponentMaterial(node.getComponent(ƒ.ComponentMaterial).material));
            this.node.addComponent(new ƒ.ComponentMesh(node.getComponent(ƒ.ComponentMesh).mesh));
            this.node.mtxLocal.translate(location);
            this.node.getComponent(ƒ.ComponentMesh).mtxPivot.scale(ƒ.Vector3.ONE(0.98));
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
        static tileGraph = new Array(); //Graph of all tiles  //TODO:Finish crating instances of graphs
        static world = null;
        static mouse = null;
        static initiate(viewport) {
            this.viewport = viewport;
            this.canvas = viewport.canvas;
            this.camera = new LocoFudge.Camera();
            this.camera.init();
            this.mouse = new LocoFudge.Mouse();
            viewport.camera = this.camera.root.getComponent(ƒ.ComponentCamera);
            //TODO:Finish crating instances of graphs
            // this.addTileGraph([
            //     "Graph|2023-04-04T15:30:19.835Z|02723",
            // ]);
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
        static getTileGraph() {
            return this.tileGraph;
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
    document.addEventListener("mousemove", onMouseUpdate, false);
    document.addEventListener("mousedown", onMouseClick, false);
    ///Mouse Position Update\\\
    function onMouseUpdate(_event) {
        LocoFudge.GameManager.mouse.updateMousePos(_event);
    }
    ///Mouse Left Click Event\\\
    function onMouseClick(_event) {
        if (_event.button == 0) {
            LocoFudge.GameManager.mouse.pickNode();
        }
        else if (_event.button == 2) {
            //TODO: right click movement
        }
    }
    function start(_event) {
        viewport = _event.detail;
        LocoFudge.GameManager.initiate(viewport);
        console.log(LocoFudge.GameManager.camera.root);
        console.log(LocoFudge.GameManager.graph);
        //TODOO:may come in handy https://jirkadelloro.github.io/FUDGE/Test/Debug/ScreenToRayToScreen/Test.html
        //Create Camera and add it to the viewport
        //Create World
        ƒ.Loop.addEventListener("loopFrame" /* ƒ.EVENT.LOOP_FRAME */, update);
        ƒ.Loop.start(); // start the game loop to continuously draw the viewport, update the audiosystem and drive the physics i/a
    }
    async function update(_event) {
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
            //TODO:Update World
            //TODO:Update Audio
        }
    }
    LocoFudge.MainLoop = MainLoop;
})(LocoFudge || (LocoFudge = {}));
//# sourceMappingURL=Script.js.map