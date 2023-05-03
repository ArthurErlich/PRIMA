"use strict";
var HomeFudge;
(function (HomeFudge) {
    class Config {
        static gatlingBullet = null;
        static gatlingTurret = null;
        static destroyer = null;
        static camera = null;
        static async initConfigs() {
            let gatTurretResponse = await fetch("Configs/gatTurretConfig.json");
            let gatBulletResponse = await fetch("Configs/gatBulletConfig.json");
            let destroyerResponse = await fetch("Configs/destroyerConfig.json");
            let cameraResponse = await fetch("Configs/cameraConfig.json");
            Config.gatlingBullet = await gatBulletResponse.json();
            Config.gatlingTurret = await gatTurretResponse.json();
            Config.destroyer = await destroyerResponse.json();
            Config.camera = await cameraResponse.json();
        }
    }
    HomeFudge.Config = Config;
})(HomeFudge || (HomeFudge = {}));
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
var HomeFudge;
(function (HomeFudge) {
    var ƒ = FudgeCore;
    ƒ.Debug.info("Main Program Template running!");
    window.addEventListener("load", init);
    let cmpCamera;
    let canvas;
    let viewport;
    let cmpListener;
    function init(_event) {
        HomeFudge._mainCamera = new HomeFudge.Camera("Main");
        cmpCamera = HomeFudge._mainCamera.camComp;
        canvas = document.querySelector("canvas");
        viewport = new ƒ.Viewport();
        cmpListener = new ƒ.ComponentAudioListener();
        let dialog = document.querySelector("dialog");
        dialog.querySelector("h1").textContent = document.title;
        dialog.addEventListener("click", function (_event) {
            dialog.close();
            let graphId = document.head.querySelector("meta[autoView]").getAttribute("autoView");
            startInteractiveViewport(graphId);
        });
        dialog.showModal();
    }
    async function startInteractiveViewport(graphId) {
        // load resources referenced in the link-tag
        HomeFudge.LoadingScreen.init(canvas);
        await FudgeCore.Project.loadResourcesFromHTML();
        FudgeCore.Debug.log("Project:", FudgeCore.Project.resources);
        // pick the graph to show
        let graph = FudgeCore.Project.resources[graphId];
        FudgeCore.Debug.log("Graph:", graph);
        if (!graph) {
            alert("Nothing to render. Create a graph with at least a mesh, material and probably some light");
            return;
        }
        // hide the cursor when right clicking, also suppressing right-click menu
        canvas.addEventListener("mousedown", function (event) {
            if (event.button == 2) {
                canvas.requestPointerLock();
            }
        });
        canvas.addEventListener("mouseup", function (event) {
            if (event.button == 2) {
                document.exitPointerLock();
            }
        });
        viewport.initialize("InteractiveViewport", graph, cmpCamera, canvas);
        // setup audio
        cmpCamera.node.addComponent(cmpListener);
        ƒ.AudioManager.default.listenWith(cmpListener);
        ƒ.AudioManager.default.listenTo(graph);
        ƒ.Debug.log("Audio:", ƒ.AudioManager.default);
        // draw viewport once for immediate feedback
        viewport.draw();
        // dispatch event to signal startup done
        canvas.dispatchEvent(new CustomEvent("interactiveViewportStarted", { bubbles: true, detail: viewport }));
        // setup the viewport
    }
})(HomeFudge || (HomeFudge = {}));
/* This code defines a namespace called `HomeFudge` and exports a class called `JSONparser` with a
static method `toVector3`. The method takes an array of numbers and returns a new instance of the
`ƒ.Vector3` class from the `FudgeCore` library, using the values from the array as its x, y, and z
components. */
var HomeFudge;
/* This code defines a namespace called `HomeFudge` and exports a class called `JSONparser` with a
static method `toVector3`. The method takes an array of numbers and returns a new instance of the
`ƒ.Vector3` class from the `FudgeCore` library, using the values from the array as its x, y, and z
components. */
(function (HomeFudge) {
    var ƒ = FudgeCore;
    class JSONparser {
        /**
         * This function takes an array of three numbers and returns a new Vector3 object with those
         * values.
         *
         * @param value An array of three numbers representing the x, y, and z components of a vector.
         * @return A new instance of the ƒ.Vector3 class with the x, y, and z values set to the values
         * in the input array.
         * @author Arthur Erlich <arthur.erlich@hs-furtwangen.de>
         */
        static toVector3(value) {
            return new ƒ.Vector3(value[0], value[1], value[2]);
        }
    }
    HomeFudge.JSONparser = JSONparser;
})(HomeFudge || (HomeFudge = {}));
var HomeFudge;
(function (HomeFudge) {
    class LoadingScreen {
        static init(canvas) {
            canvas.style.backgroundColor = "#191919";
            let body = document.body;
            let loadText = document.createElement("div");
            loadText.style.fontSize = "44px";
            loadText.innerHTML = "HomeFudge is Loading";
            body.append(loadText);
        }
    }
    HomeFudge.LoadingScreen = LoadingScreen;
})(HomeFudge || (HomeFudge = {}));
var HomeFudge;
(function (HomeFudge) {
    var ƒ = FudgeCore;
    ƒ.Debug.info("Main Program Template running!");
    //@ts-ignore
    document.addEventListener("interactiveViewportStarted", (event) => start(event));
    document.addEventListener("keydown", (event) => continueLoop(event));
    ///World Node\\\
    HomeFudge._worldNode = null;
    ///DeltaSeconds\\\
    HomeFudge._deltaSeconds = null;
    ///Viewport\\\
    HomeFudge._viewport = null;
    ///Player\\\
    let p1 = null;
    /// ------------T-E-S-T--A-R-E-A------------------\\\
    //Bullet list, every bullet wil register itself here for the update Method.
    ///camera setup for worldSize of 25km\\\
    /// ------------T-E-S-T--A-R-E-A------------------\\\
    async function start(_event) {
        HomeFudge._viewport = _event.detail;
        HomeFudge._worldNode = HomeFudge._viewport.getBranch();
        console.log(HomeFudge._viewport);
        //Loads Config then initilizes the world 
        await loadConfig().then(initWorld).then(() => {
            let audioComp = new ƒ.ComponentAudio(new ƒ.Audio("Sound/Background/10.Cycles.mp3"), true); //TODO:Move sound to recourses
            console.warn("ConfigsLoaded and world Initialized");
            //Sound by IXION!
            audioComp.volume = 0.1;
            audioComp.play(true);
            HomeFudge._mainCamera.camNode.addComponent(audioComp);
        }); // to create ships. first load configs than the ships etc
        async function loadConfig() {
            //loads configs
            performance.now();
            console.warn("LoadingConfigs");
            await HomeFudge.Config.initConfigs();
            HomeFudge.Mouse.init();
        }
        async function initWorld() {
            p1 = new HomeFudge.Player("test_P1");
            HomeFudge._viewport.getBranch().addChild(p1);
            HomeFudge._mainCamera.attachToShip(p1.destroyer);
            HomeFudge._viewport.canvas.style.scale = "(0.1,0.1)";
        }
        /// ------------T-E-S-T--A-R-E-A------------------\\\
        /// ------------T-E-S-T--A-R-E-A------------------\\\
        ƒ.Loop.addEventListener("loopFrame" /* ƒ.EVENT.LOOP_FRAME */, update);
        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_GAME, 35); // start the game loop to continuously draw the _viewport, update the audiosystem and drive the physics i/a
    }
    function update(_event) {
        // ƒ.Physics.simulate();  // if physics is included and used
        HomeFudge._deltaSeconds = ƒ.Loop.timeFrameGame / 1000;
        /// ------------T-E-S-T--A-R-E-A------------------\\\
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.DELETE])) {
            ƒ.Loop.stop();
            console.log(HomeFudge._worldNode);
        }
        //TODO: remove error when frames are dropping
        if (ƒ.Loop.fpsGameAverage <= 20) {
            console.warn(ƒ.Loop.fpsGameAverage);
            console.warn("Active bullets in scene: " + HomeFudge._worldNode.getChildrenByName("BulletGatling").length);
            ƒ.Loop.stop();
        }
        if (HomeFudge.Mouse.isPressedOne([HomeFudge.MOUSE_CODE.LEFT])) {
            getPosTest();
        }
        // let aimPos:ƒ.Vector3 = getAimPos(); //TODO:Remove unused AimingRayCaster
        /// ------------T-E-S-T--A-R-E-A------------------\\\
        HomeFudge._viewport.draw();
        ƒ.AudioManager.default.update();
    }
    /// ------------T-E-S-T--A-R-E-A------------------\\\
    function getPosTest() {
        let pickCam = ƒ.Picker.pickCamera(HomeFudge._worldNode.getChildren(), HomeFudge._viewport.camera, HomeFudge.Mouse.pos);
        let pickViewport = ƒ.Picker.pickViewport(HomeFudge._viewport, HomeFudge.Mouse.pos);
        console.log("%c" + "Camera Picker", "background:red");
        pickCam.forEach(element => {
            console.log("%c" + element.posMesh.toString(), "background:yellow");
        });
        console.log("-------------");
        console.log("%c" + "Viewport Picker", "background:red");
        pickViewport.forEach(element => {
            console.log("%c" + element.posMesh.toString(), "background:yellow");
        });
        console.log("-------------");
    }
    /// ------------T-E-S-T--A-R-E-A------------------\\\
    //DEBUG
    function continueLoop(event) {
        if (event.code == "Insert") {
            ƒ.Loop.continue();
        }
    }
})(HomeFudge || (HomeFudge = {}));
var HomeFudge;
(function (HomeFudge) {
    var ƒ = FudgeCore;
    class Mathf {
        /**
         * The function performs linear interpolation between two numbers based on a given ratio.
         *
         * @param a a is a number representing the starting value of the range to interpolate between.
         * @param b The parameter "b" is a number representing the end value of the range to
         * interpolate between.
         * @param t t is a number between 0 and 1 that represents the interpolation factor. It
         * determines how much of the second value (b) should be blended with the first value (a) to
         * produce the final result. A value of 0 means that only the first value should be used, while
         * a
         * @return the linear interpolation value between `a` and `b` based on the value of `t`.
         */
        static lerp(a, b, t) {
            if (t < 0) {
                throw new Error(t + " is smaller 0");
            }
            if (t > 1) {
                throw new Error(t + " is larger 1");
            }
            return a + (t * b - t * b);
        }
        /**
         * The function calculates the length of a 3D vector using the Pythagorean theorem.
         *
         * @param v A 3-dimensional vector represented as an object with properties x, y, and z.
         * @return The function `vectorLength` returns the length of a 3D vector represented by the
         * input parameter `v`.
         */
        static vectorLength(v) {
            return Math.sqrt(v.x * v.x +
                v.y * v.y +
                v.z * v.z);
        }
        static vectorNegate(v) {
            return new ƒ.Vector3(-v.x, -v.y, -v.z);
        }
    }
    HomeFudge.Mathf = Mathf;
})(HomeFudge || (HomeFudge = {}));
var HomeFudge;
(function (HomeFudge) {
    var ƒ = FudgeCore;
    /* This is a TypeScript class definition for an abstract class called `Bullet` that extends the
    `ƒ.Node` class. The `export` keyword makes the class available for use in other modules. */
    class Bullet extends ƒ.Node {
        /**
         * This function retrieves a graph resource from a project in TypeScript.
         *
         * @param graphID A string representing the ID of the graph resource that needs to be
         * retrieved.
         * @return a Promise that resolves to a ƒ.Graph object.
         */
        static async getGraphResources(graphID) {
            let graph = ƒ.Project.resources[graphID];
            if (graph == null) {
                console.warn(graph + " not found with ID: " + graphID);
            }
            return graph;
        }
        /**
         * This function retrieves a specific node from a graph and returns it as a promise.
         *
         * @param nodeName A string representing the name of the node that is being searched for in the
         * graph.
         * @param graph A ƒ.Graph object, which is a container for nodes and their connections in a
         * scene or game world.
         * @return a Promise that resolves to a ƒ.Node object.
         */
        static async getComponentNode(nodeName, graph) {
            let node = graph.getChildrenByName(nodeName)[0];
            if (node == null) {
                console.warn("+\"" + nodeName + "\" not found inside: " + graph.name + "->Graph");
            }
            return node;
        }
        constructor(idString) {
            super("Bullet" + idString);
            HomeFudge._worldNode.addChild(this);
            //register to update event            
        }
    }
    HomeFudge.Bullet = Bullet;
})(HomeFudge || (HomeFudge = {}));
var HomeFudge;
(function (HomeFudge) {
    var ƒ = FudgeCore;
    class Ship extends ƒ.Node {
        /**
         * This function retrieves a graph resource from a project in TypeScript.
         *
         * @param graphID A string representing the ID of the graph resource that needs to be
         * retrieved.
         * @return a Promise that resolves to a ƒ.Graph object.
         */
        static async getGraphResources(graphID) {
            let graph = ƒ.Project.resources[graphID];
            if (graph == null) {
                console.warn(graph + " not found with ID: " + graphID);
            }
            return graph;
        }
        /**
         * This function retrieves a specific node from a graph and returns it as a promise.
         *
         * @param nodeName A string representing the name of the node that is being searched for in the
         * graph.
         * @param graph A ƒ.Graph object, which is a container for nodes and their connections in a
         * scene or game world.
         * @return a Promise that resolves to a ƒ.Node object.
         */
        static async getComponentNode(nodeName, graph) {
            let node = graph.getChildrenByName(nodeName)[0];
            if (node == null) {
                console.warn("+\"" + nodeName + "\" not found inside: " + graph.name + "->Graph");
            }
            return node;
        }
        constructor(name) {
            super("Ship_" + name);
            //register to updater list
            ƒ.Loop.addEventListener("loopFrame" /* ƒ.EVENT.LOOP_FRAME */, () => {
                this.update();
            });
        }
    }
    HomeFudge.Ship = Ship;
})(HomeFudge || (HomeFudge = {}));
var HomeFudge;
(function (HomeFudge) {
    var ƒ = FudgeCore;
    class BeamTurret extends ƒ.Node {
        fire() {
            console.warn("NO FIRE HERE");
        }
        constructor() {
            super("BamTurret");
        }
    }
    HomeFudge.BeamTurret = BeamTurret;
})(HomeFudge || (HomeFudge = {}));
var HomeFudge;
(function (HomeFudge) {
    var ƒ = FudgeCore;
    class Destroyer extends HomeFudge.Ship {
        maxSpeed = null;
        maxAcceleration = null;
        velocity = null;
        healthPoints = null;
        maxTurnRate = null;
        gatlingTurret = null;
        beamTurretList = null;
        //list of weapons
        weapons = Weapons;
        static graph = null;
        static mesh = null;
        static material = null;
        async initAllConfigs(startPosition) {
            Destroyer.graph = await HomeFudge.Ship.getGraphResources(HomeFudge.Config.destroyer.graphID);
            let node = await HomeFudge.Ship.getComponentNode("Destroyer", Destroyer.graph);
            let transNode = new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(startPosition)); //TODO: move after turret are loaded!
            this.addComponent(transNode);
            //init mesh and material
            Destroyer.mesh = node.getComponent(ƒ.ComponentMesh).mesh;
            Destroyer.material = node.getComponent(ƒ.ComponentMaterial).material;
            //init configs
            if (this.velocity == null) {
                this.velocity = new ƒ.Vector3(0, 0, 0);
            }
            this.maxAcceleration = HomeFudge.Config.destroyer.maxAcceleration;
            this.maxSpeed = HomeFudge.Config.destroyer.maxSpeed;
            //init Weapons
            this.addWeapons();
            //init Components
            this.setAllComponents();
        }
        addWeapons() {
            this.gatlingTurret = new HomeFudge.GatlingTurret();
            this.addChild(this.gatlingTurret);
        }
        setAllComponents() {
            if (Destroyer.material == null || Destroyer.mesh == null) {
                console.warn(this.name + " Mesh and/or Material is missing");
                return;
            }
            this.addComponent(new ƒ.ComponentMaterial(Destroyer.material));
            this.addComponent(new ƒ.ComponentMesh(Destroyer.mesh));
        }
        update = () => {
            this.mtxLocal.translate(new ƒ.Vector3(this.velocity.x * HomeFudge._deltaSeconds, this.velocity.y * HomeFudge._deltaSeconds, this.velocity.z * HomeFudge._deltaSeconds));
            //TODO:remove test of gatling rot
            ///TEST----------------TEST\\\
            let tempRotBase = this.gatlingTurret.baseNode.mtxLocal.rotation;
            this.gatlingTurret.baseNode.mtxLocal.rotation = new ƒ.Vector3(tempRotBase.x, -(HomeFudge.Mouse.pos.x - (HomeFudge._viewport.canvas.width / 2)) / Math.PI / 3, tempRotBase.z);
            let tempRotHead = this.gatlingTurret.headNode.mtxLocal.rotation;
            this.gatlingTurret.headNode.mtxLocal.rotation = new ƒ.Vector3(tempRotHead.x, tempRotHead.y, -(HomeFudge.Mouse.pos.y - (HomeFudge._viewport.canvas.height / 2)) / Math.PI / 4);
            ///TEST----------------TEST\\\
        };
        alive() {
            //console.error("Method not implemented.");
            return true;
        }
        destroyNode() {
            //console.error("Method not implemented.");
            return null;
        }
        getVelocity() {
            return this.velocity;
        }
        toString() {
            //console.error("Method not implemented.");
            return null;
        }
        fireWeapon(_weapon) {
            switch (_weapon) {
                case Weapons.BeamTurret:
                    this.fireBeam();
                    break;
                case Weapons.RocketPod:
                    //TODO:Implement Rocket Pod
                    console.error("RocketPod not implement!!");
                    break;
                case Weapons.GatlingTurret:
                    this.fireGatling();
                    break;
                default:
                    break;
            }
        }
        fireGatling() {
            this.gatlingTurret.fire(this.velocity);
            //TODO:remove test
        }
        fireBeam() {
            this.beamTurretList.forEach(turret => {
                turret.fire();
            });
        }
        move(moveDirection) {
            //TODO:Make smooth
            if (HomeFudge.Mathf.vectorLength(moveDirection) >= 0.001) {
                moveDirection.normalize();
            }
            moveDirection.scale(this.maxSpeed);
            this.velocity = moveDirection;
        }
        constructor(startPosition) {
            super("Destroyer");
            this.initAllConfigs(startPosition);
            ƒ.Loop.addEventListener("loopFrame" /* ƒ.EVENT.LOOP_FRAME */, this.update);
        }
    }
    HomeFudge.Destroyer = Destroyer;
    let Weapons;
    (function (Weapons) {
        Weapons[Weapons["GatlingTurret"] = 0] = "GatlingTurret";
        Weapons[Weapons["BeamTurret"] = 1] = "BeamTurret";
        Weapons[Weapons["RocketPod"] = 2] = "RocketPod";
    })(Weapons || (Weapons = {}));
})(HomeFudge || (HomeFudge = {}));
var HomeFudge;
(function (HomeFudge) {
    var ƒ = FudgeCore;
    //TODO:create a logic for Hit detection. Using a physics engine of Fudge
    //TODO:move texturePivot to the Beck
    class GatlingBullet extends HomeFudge.Bullet {
        maxLifeTime = null;
        maxSpeed = null;
        spreadRadius = null;
        parentVelocity = ƒ.Vector3.ZERO();
        static graph = null;
        static worldNode = null;
        static mesh = null;
        static material = null;
        //TODO: try faction out.
        // faction: FACTION="FACTION.A";
        update = () => {
            //goes out of the update loop as long the date is received into the config variable
            if (this.maxLifeTime == null || this.maxSpeed == null) {
                return;
            }
            this.maxLifeTime -= HomeFudge._deltaSeconds;
            this.mtxLocal.translate(new ƒ.Vector3((this.parentVelocity.x + this.maxSpeed) * HomeFudge._deltaSeconds, 2 * this.parentVelocity.y * HomeFudge._deltaSeconds, 2 * this.parentVelocity.z * HomeFudge._deltaSeconds));
            //TODO:Get Distance to Player cam and scale the size a of the mesh to make the bullet better visible at long distance
            //life check.
            if (!this.alive()) {
                this.destroyNode();
            }
        };
        async initBulletConfig() {
            GatlingBullet.graph = await HomeFudge.Bullet.getGraphResources(HomeFudge.Config.gatlingBullet.graphID);
            ///initAttributes\\\
            this.maxLifeTime = HomeFudge.Config.gatlingBullet.maxLifeTime;
            this.maxSpeed = HomeFudge.Config.gatlingBullet.maxSpeed;
            let node = await HomeFudge.Bullet.getComponentNode("GatlingBullet", GatlingBullet.graph);
            if (GatlingBullet.mesh == null) {
                GatlingBullet.mesh = node.getComponent(ƒ.ComponentMesh).mesh;
            }
            if (GatlingBullet.material == null) {
                GatlingBullet.material = node.getComponent(ƒ.ComponentMaterial).material;
            }
            this.addComponent(new ƒ.ComponentMesh(GatlingBullet.mesh));
            this.addComponent(new ƒ.ComponentMaterial(GatlingBullet.material));
        }
        alive() {
            if (this.maxLifeTime == null) {
                return true;
            }
            return this.maxLifeTime >= 0;
        }
        toString() {
            return this.name + "POSITION: " + this.mtxWorld.translation.toString();
        }
        destroyNode() {
            //remove bullet from viewGraph
            //TODO:Verify if it is a valid approach // I need the Super class Bullet because I extended the Bullet Class to GatlingBullet
            ƒ.Loop.removeEventListener("loopFrame" /* ƒ.EVENT.LOOP_FRAME */, this.update);
            try {
                HomeFudge._worldNode.removeChild(this);
            }
            catch (error) {
                console.warn(error);
                ƒ.Loop.stop();
            }
        }
        constructor(spawnTransform, _parentVelocity) {
            super("Gatling");
            this.addComponent(new ƒ.ComponentTransform(spawnTransform));
            ///\\\
            this.parentVelocity = _parentVelocity;
            this.initBulletConfig();
            //TODO:Make that cleaner TEMP FIX 
            let copy = _parentVelocity.clone;
            copy.scale(HomeFudge._deltaSeconds * 5);
            this.mtxLocal.translate(copy);
            ƒ.Loop.addEventListener("loopFrame" /* ƒ.EVENT.LOOP_FRAME */, this.update);
        }
    }
    HomeFudge.GatlingBullet = GatlingBullet;
})(HomeFudge || (HomeFudge = {}));
var HomeFudge;
(function (HomeFudge) {
    var ƒ = FudgeCore;
    class GatlingTurret extends ƒ.Node {
        //TODO: make Private again
        headNode = null;
        baseNode = null;
        shootNode = null;
        static headMesh = null;
        static baseMesh = null;
        static headMaterial = null;
        static baseMaterial = null;
        roundsPerSecond = null;
        reloadsEverySecond = null;
        roundsTimer = 0;
        reloadTimer = 0;
        magazineCapacity = null;
        magazineRounds = null;
        async initConfigAndAllNodes() {
            let graph = await this.getGraphResources(HomeFudge.Config.gatlingTurret.graphID);
            //TODO|ON-HOLD| REWRITE Turret Mesh and Material component gathering and attaching -> like Destroyer Class
            this.headNode = this.createComponents("GatlingTurretHead", HomeFudge.JSONparser.toVector3(HomeFudge.Config.gatlingTurret.headPosition), graph);
            this.baseNode = this.createComponents("GatlingTurretBase", HomeFudge.JSONparser.toVector3(HomeFudge.Config.gatlingTurret.basePosition), graph);
            //TODO:FixWrongShootNode Position. Shoots above the Barrel
            this.shootNode = this.createShootPosNode(HomeFudge.JSONparser.toVector3(HomeFudge.Config.gatlingTurret.shootNodePosition));
            this.roundsPerSecond = HomeFudge.Config.gatlingTurret.roundsPerSeconds;
            this.reloadsEverySecond = HomeFudge.Config.gatlingTurret.reloadTime;
            this.magazineCapacity = HomeFudge.Config.gatlingTurret.magazineCapacity;
            this.magazineRounds = this.magazineCapacity;
            this.shootNode.addComponent(new ƒ.ComponentAudio(new ƒ.Audio("Sound/autocannon.mp3"))); //TODO: REMOVE TEMP AUDIO
            this.headNode.addChild(this.shootNode);
            this.baseNode.addChild(this.headNode);
            this.addChild(this.baseNode);
        }
        async getGraphResources(graphID) {
            let graph = ƒ.Project.resources[graphID];
            if (graph == null) {
                console.warn(graph + " not found with ID: " + graphID);
            }
            return graph;
        }
        createComponents(nodeName, transform, graph) {
            let node = graph.getChildrenByName(nodeName)[0];
            let newNode = new ƒ.Node("nodeName");
            if (node == null) {
                console.warn("+\"" + nodeName + "\" not found inside: " + graph.name + "->Graph");
            }
            switch (nodeName) {
                case "GatlingTurretHead":
                    GatlingTurret.headMaterial = node.getComponent(ƒ.ComponentMaterial).material;
                    GatlingTurret.headMesh = node.getComponent(ƒ.ComponentMesh).mesh;
                    newNode.addComponent(new ƒ.ComponentMaterial(GatlingTurret.headMaterial));
                    newNode.addComponent(new ƒ.ComponentMesh(GatlingTurret.headMesh));
                    break;
                case "GatlingTurretBase":
                    GatlingTurret.baseMaterial = node.getComponent(ƒ.ComponentMaterial).material;
                    GatlingTurret.baseMesh = node.getComponent(ƒ.ComponentMesh).mesh;
                    newNode.addComponent(new ƒ.ComponentMaterial(GatlingTurret.baseMaterial));
                    newNode.addComponent(new ƒ.ComponentMesh(GatlingTurret.baseMesh));
                    break;
                default:
                    console.warn("+\"" + nodeName + "\" no material or mesh found inside: " + graph.name + "->Graph");
                    break;
            }
            newNode.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(transform)));
            return newNode;
        }
        createShootPosNode(transform) {
            let shootPosNode = new ƒ.Node("ShootSpawnPos");
            shootPosNode.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(transform))); //From gatConfig.json
            return shootPosNode;
        }
        update = () => {
            if (this.roundsPerSecond == null || this.reloadsEverySecond == null || this.magazineCapacity == null) {
                return;
            }
            if (this.roundsTimer <= this.roundsPerSecond) {
                this.roundsTimer += HomeFudge._deltaSeconds;
            }
            if (this.reloadTimer <= this.reloadsEverySecond) {
                this.reloadTimer += HomeFudge._deltaSeconds;
            }
            //TODO: don't use lookAt function. Better do the math yourself! -> X is forward in my game. Z Forward is Standard
            // this.baseNode.mtxLocal.lookAt(aimPos, new ƒ.Vector3(0, 1, 0), true);
            // this.headNode.mtxLocal.lookAt(new ƒ.Vector3(aimPos.y, aimPos.z, 0), new ƒ.Vector3(0, 0, -1), true);
            // this.headNode.mtxLocal.rotateX(90);
            //fix rotation after LookAt
        };
        //Base rotates on the Y-Aches, Positive number for up
        //Head rotates on the Z-Aches
        //TODO:create a moveToFunction which is public, turn rate based on maxRotSpeed
        moveTurret(xRot, yRot) {
            if (this.baseNode == null || this.headNode == null) {
                return;
            }
            //TODO:Add clamp for Y-Aches
            this.baseNode.mtxLocal.rotateY(yRot);
            //TODO:Add clamp for Z-Aches
            this.headNode.mtxLocal.rotateZ(xRot);
        }
        /* This code defines a public method `fire()` that is called when the GatlingTurret is supposed
        to fire. It checks if there are any rounds left in the magazine, and if not, it resets the
        reload timer and refills the magazine. It also checks if the reload timer has finished, and
        if not, it returns without firing. If the reload timer has finished and there are rounds
        left in the magazine, it creates a new GatlingBullet object at the position of the shootNode
        and resets the rounds timer. */
        fire(parentVelocity) {
            if (this.magazineRounds <= 0) {
                this.reloadTimer = 0;
                this.magazineRounds = this.magazineCapacity;
            }
            if (this.reloadTimer <= this.reloadsEverySecond) {
                if (this.reloadTimer % 1 == 0) {
                    FudgeCore.Debug.log("TurretReloading");
                }
                return;
            }
            if (this.roundsTimer >= 1 / this.roundsPerSecond) {
                // new GatlingBullet(this.shootNode.mtxWorld.clone, parentVelocity);
                //TODO remove test
                let shot2 = this.shootNode.mtxWorld.clone;
                let shot3 = this.shootNode.mtxWorld.clone;
                let spread1x = Math.random() * 0.2 - (Math.random()) * 0.2;
                let spread1y = Math.random() * 0.2 - (Math.random()) * 0.2;
                let spread1z = Math.random() * 0.2 - (Math.random()) * 0.2;
                let spread2x = Math.random() * 0.5 - (Math.random()) * 0.5;
                let spread2y = Math.random() * 0.5 - (Math.random()) * 0.5;
                let spread2z = Math.random() * 0.5 - (Math.random()) * 0.5;
                shot2.rotate(new ƒ.Vector3(spread1x, spread1y, spread1z));
                shot3.rotate(new ƒ.Vector3(spread2x, spread2y, spread2z));
                new HomeFudge.GatlingBullet(shot2, parentVelocity);
                new HomeFudge.GatlingBullet(shot3, parentVelocity);
                //TEST end
                this.roundsTimer = 0;
                this.magazineRounds--;
                FudgeCore.Debug.log("RoundsLeft: " + this.magazineRounds);
                this.shootNode.getComponent(ƒ.ComponentAudio).volume = 10;
                this.shootNode.getComponent(ƒ.ComponentAudio).play(true);
            }
        }
        constructor() {
            super("GatlingTurret");
            this.initConfigAndAllNodes();
            ƒ.Loop.addEventListener("loopFrame" /* ƒ.EVENT.LOOP_FRAME */, this.update);
        }
    }
    HomeFudge.GatlingTurret = GatlingTurret;
})(HomeFudge || (HomeFudge = {}));
var HomeFudge;
(function (HomeFudge) {
    var ƒ = FudgeCore;
    class Camera extends ƒ.Node {
        attachedTo = null;
        camComp = null;
        camNode = null;
        offset = null;
        attachToShip(ship) {
            this.offset = HomeFudge.JSONparser.toVector3(HomeFudge.Config.camera.offset);
            this.camNode.mtxLocal.translation = this.offset;
            this.attachedTo = ship;
            this.mtxLocal.set(ship.mtxWorld);
            this.camNode.mtxLocal.rotation = new ƒ.Vector3(0, -270, 0); //TODO: Sound Bug when Pivot is rotated 
            //TODO: add node for campComp
            ship.addChild(this);
        }
        update = () => {
            //TODO: remove test rotation
            //  this.mtxLocal.rotateY(10*_deltaSeconds);
        };
        init() {
            this.camComp = new ƒ.ComponentCamera();
            this.camComp.projectCentral(1.77, 75, ƒ.FIELD_OF_VIEW.DIAGONAL, 0.1, 30000);
            this.camNode = new ƒ.Node("camPivotNode");
            this.camNode.addComponent(new ƒ.ComponentTransform());
            this.camNode.addComponent(this.camComp);
            this.addChild(this.camNode);
            this.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(ƒ.Vector3.ZERO())));
        }
        constructor(name) {
            super(name + "Camera");
            this.init();
            ƒ.Loop.addEventListener("loopFrame" /* ƒ.EVENT.LOOP_FRAME */, this.update);
        }
    }
    HomeFudge.Camera = Camera;
})(HomeFudge || (HomeFudge = {}));
var HomeFudge;
(function (HomeFudge) {
    var ƒ = FudgeCore;
    class Mouse {
        static pos = null;
        static change = null;
        static isPressed = new Array(3); // length of MOUSE_CODE enum
        static tempPos = null;
        static init() {
            HomeFudge._viewport.canvas.addEventListener("mousemove", Mouse.moveUpdate);
            HomeFudge._viewport.canvas.addEventListener("mousedown", Mouse.mouseDown);
            HomeFudge._viewport.canvas.addEventListener("mouseup", Mouse.mouseUp);
            Mouse.pos = new ƒ.Vector2(0, 0);
            Mouse.change = new ƒ.Vector2(0, 0);
            Mouse.tempPos = new ƒ.Vector2(0, 0);
            ƒ.Loop.addEventListener("loopFrame" /* ƒ.EVENT.LOOP_FRAME */, Mouse.update);
        }
        static update = () => {
            //P1=Pos
            //P2=TempPos
            //P2-P1
            Mouse.change = new ƒ.Vector2(Mouse.tempPos.x - Mouse.pos.x, Mouse.tempPos.y - Mouse.pos.y);
            Mouse.tempPos = Mouse.pos;
        };
        static moveUpdate = (_event) => {
            Mouse.change = new ƒ.Vector2(_event.movementX, _event.movementY);
            Mouse.pos = new ƒ.Vector2(_event.x, _event.y);
        };
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
    HomeFudge.Mouse = Mouse;
    let MOUSE_CODE;
    (function (MOUSE_CODE) {
        MOUSE_CODE[MOUSE_CODE["LEFT"] = 0] = "LEFT";
        MOUSE_CODE[MOUSE_CODE["MIDDLE"] = 1] = "MIDDLE";
        MOUSE_CODE[MOUSE_CODE["RIGHT"] = 2] = "RIGHT";
    })(MOUSE_CODE = HomeFudge.MOUSE_CODE || (HomeFudge.MOUSE_CODE = {}));
})(HomeFudge || (HomeFudge = {}));
var HomeFudge;
(function (HomeFudge) {
    var ƒ = FudgeCore;
    class Player extends ƒ.Node {
        destroyer = null;
        selectedWeapon = null; //TODO:Check if ok
        moveDirection = ƒ.Vector3.ZERO();
        rotDegreeOnMoveSideways = 2;
        camRotBeforeChange = null;
        update = () => {
            this.camRotBeforeChange = HomeFudge._mainCamera.camComp.mtxPivot.rotation;
            if (HomeFudge.Mouse.isPressedOne([HomeFudge.MOUSE_CODE.LEFT])) {
                this.destroyer.fireWeapon(this.selectedWeapon);
            }
            if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.A])) {
                //LEFT
                this.moveDirection = new ƒ.Vector3(this.moveDirection.x, this.moveDirection.y, -1);
                HomeFudge._mainCamera.camComp.mtxPivot.rotation = new ƒ.Vector3(this.camRotBeforeChange.x, this.rotDegreeOnMoveSideways, this.camRotBeforeChange.z);
            }
            if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.D])) {
                //RIGHT
                this.moveDirection = new ƒ.Vector3(this.moveDirection.x, this.moveDirection.y, 1);
                HomeFudge._mainCamera.camComp.mtxPivot.rotation = new ƒ.Vector3(this.camRotBeforeChange.x, -this.rotDegreeOnMoveSideways, this.camRotBeforeChange.z);
            }
            if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.W])) {
                //FORWARD
                this.moveDirection = new ƒ.Vector3(1, this.moveDirection.y, this.moveDirection.z);
            }
            if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.S])) {
                //BACKWARD
                this.moveDirection = new ƒ.Vector3(-1, this.moveDirection.y, this.moveDirection.z);
            }
            //TODO move if check int a function to initiate the curser
            if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ONE])) {
                //Gatling
                if (this.selectedWeapon != this.destroyer.weapons.GatlingTurret) {
                    this.selectedWeapon = this.destroyer.weapons.GatlingTurret;
                    HomeFudge._viewport.canvas.style.cursor = "url(Textures/MouseAimCurser.png) 16 16, crosshair";
                }
            }
            if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.TWO])) {
                //Beam
                if (this.selectedWeapon != this.destroyer.weapons.BeamTurret) {
                    this.selectedWeapon = this.destroyer.weapons.BeamTurret;
                    HomeFudge._viewport.canvas.style.cursor = "url(Textures/GatlingTurretAimCurser.png) 16 16, crosshair";
                }
            }
            if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.THREE])) {
                //Rocket
                if (this.selectedWeapon != this.destroyer.weapons.RocketPod) {
                    this.selectedWeapon = this.destroyer.weapons.RocketPod;
                }
            }
            this.destroyer.move(this.moveDirection);
            this.moveDirection = ƒ.Vector3.ZERO();
            //TODO: use PlayerCamera instant of mainCamera
            //TODO: pan camera only a specific threshold
            HomeFudge._mainCamera.camComp.mtxPivot.rotation = new ƒ.Vector3(HomeFudge._mainCamera.camComp.mtxPivot.rotation.x, -(HomeFudge.Mouse.pos.x - (HomeFudge._viewport.canvas.width / 2)) / 100, HomeFudge._mainCamera.camComp.mtxPivot.rotation.z);
            HomeFudge._mainCamera.camComp.mtxPivot.rotation = this.camRotBeforeChange; // Resets cam rotation before using the cam rot mouse.
        };
        constructor(name) {
            super(name);
            this.destroyer = new HomeFudge.Destroyer(ƒ.Vector3.ZERO());
            this.addChild(this.destroyer);
            this.selectedWeapon = this.destroyer.weapons.GatlingTurret; //Set WP to one
            HomeFudge._viewport.canvas.style.cursor = "url(Textures/MouseAimCurser.png) 16 16, crosshair"; //TODO: remove temp setting
            ƒ.Loop.addEventListener("loopFrame" /* ƒ.EVENT.LOOP_FRAME */, this.update);
        }
    }
    HomeFudge.Player = Player;
})(HomeFudge || (HomeFudge = {}));
//# sourceMappingURL=Script.js.map