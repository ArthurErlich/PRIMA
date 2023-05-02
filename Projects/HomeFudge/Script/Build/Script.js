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
        // hide the cursor when interacting, also suppressing right-click menu
        //TODO:HIDE it ony when using right click!!!
        canvas.addEventListener("mousedown", function () { canvas.requestPointerLock(); });
        canvas.addEventListener("mouseup", function () { document.exitPointerLock(); });
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
    ///TestShip\\\
    let destroyer = null;
    /// ------------T-E-S-T--A-R-E-A------------------\\\
    //Bullet list, every bullet wil register itself here for the update Method.
    ///camera setup for worldSize of 25km\\\
    /// ------------T-E-S-T--A-R-E-A------------------\\\
    async function start(_event) {
        HomeFudge._viewport = _event.detail;
        HomeFudge._viewport.canvas.style.cursor = "url(Textures/AimCurser.svg) 0 0, crosshair";
        HomeFudge._worldNode = HomeFudge._viewport.getBranch();
        console.log(HomeFudge._viewport);
        //Loads Config then initilizes the world 
        await loadConfig().then(initWorld).then(() => {
            let audioComp = new ƒ.ComponentAudio(new ƒ.Audio("Sound/Background/10.Cycles.mp3"), true); //TODO:Move sound to recourses
            console.warn("ConfigsLoaded and world Initialized");
            //Sound by IXION!
            audioComp.volume = 0.1;
            audioComp.play(true);
            HomeFudge._mainCamera.addComponent(audioComp);
        }); // to create ships. first load configs than the ships etc
        async function loadConfig() {
            //loads configs
            performance.now();
            console.warn("LoadingConfigs");
            await HomeFudge.Config.initConfigs();
            HomeFudge.Mouse.init();
        }
        async function initWorld() {
            destroyer = new Array();
            destroyer = initAllDestroyers();
            HomeFudge._viewport.getBranch().addChild(destroyer[0]);
            HomeFudge._mainCamera.attachToShip(destroyer[0]);
        }
        /// ------------T-E-S-T--A-R-E-A------------------\\\
        /// ------------T-E-S-T--A-R-E-A------------------\\\
        ƒ.Loop.addEventListener("loopFrame" /* ƒ.EVENT.LOOP_FRAME */, update);
        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_GAME, 100); // start the game loop to continuously draw the _viewport, update the audiosystem and drive the physics i/a
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
        // let letaimPos:ƒ.Vector3 = getAimPos(); //TODO:Remove unused AmingRayCaster
        /// ------------T-E-S-T--A-R-E-A------------------\\\
        HomeFudge._viewport.draw();
        ƒ.AudioManager.default.update();
    }
    /// ------------T-E-S-T--A-R-E-A------------------\\\
    function getAimPos() {
        let pick = ƒ.Picker.pickCamera(HomeFudge._worldNode.getChildren(), HomeFudge._viewport.camera, HomeFudge.Mouse.pos);
        console.log(pick);
    }
    /// ------------T-E-S-T--A-R-E-A------------------\\\
    function initAllDestroyers() {
        return [new HomeFudge.Destroyer(new ƒ.Vector3(0, 0, 0))];
    }
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
    class Destroyer extends HomeFudge.Ship {
        maxSpeed = null;
        maxAcceleration = null;
        velocity = null;
        healthPoints = null;
        maxTurnRate = null;
        //TODO:make private
        gatlingTurret = null;
        laserTurretList = null;
        static graph = null;
        static worldNode = null;
        static mesh = null;
        static material = null;
        async initAllConfigs() {
            Destroyer.graph = await HomeFudge.Ship.getGraphResources(HomeFudge.Config.destroyer.graphID);
            let node = await Destroyer.getComponentNode("Destroyer", Destroyer.graph);
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
            //TODO: remove temporary WP shooting
            if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.SPACE])) {
                this.gatlingTurret.fire(this.velocity);
            }
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
        constructor(position) {
            super("Destroyer");
            let tempComp = new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(position));
            //ROTATION WILL BREAK OFFSET OF GUNS
            this.addComponent(tempComp);
            this.initAllConfigs();
            ƒ.Loop.addEventListener("loopFrame" /* ƒ.EVENT.LOOP_FRAME */, this.update);
        }
    }
    HomeFudge.Destroyer = Destroyer;
})(HomeFudge || (HomeFudge = {}));
var HomeFudge;
(function (HomeFudge) {
    var ƒ = FudgeCore;
    //TODO:create a logic for Hit detection. Using a physics engine of Fudge
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
            this.mtxLocal.translate(new ƒ.Vector3((2 * this.parentVelocity.x + this.maxSpeed) * HomeFudge._deltaSeconds, 2 * this.parentVelocity.y * HomeFudge._deltaSeconds, 2 * this.parentVelocity.z * HomeFudge._deltaSeconds));
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
            this.parentVelocity = _parentVelocity;
            this.initBulletConfig();
            ƒ.Loop.addEventListener("loopFrame" /* ƒ.EVENT.LOOP_FRAME */, this.update);
        }
    }
    HomeFudge.GatlingBullet = GatlingBullet;
})(HomeFudge || (HomeFudge = {}));
var HomeFudge;
(function (HomeFudge) {
    var ƒ = FudgeCore;
    class GatlingTurret extends ƒ.Node {
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
        /**
         *
         * @param deltaSeconds
         * Don't forget to call this function in the UpdateMethod!!!
         */
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
                new HomeFudge.GatlingBullet(this.shootNode.mtxWorld.clone, parentVelocity);
                this.roundsTimer = 0;
                this.magazineRounds--;
                FudgeCore.Debug.log("RoundsLeft: " + this.magazineRounds);
                this.shootNode.getComponent(ƒ.ComponentAudio).volume = 4;
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
    class LaserTurret extends ƒ.Node {
        constructor() {
            super("Laser.");
        }
    }
    HomeFudge.LaserTurret = LaserTurret;
})(HomeFudge || (HomeFudge = {}));
var HomeFudge;
(function (HomeFudge) {
    class Mathf {
        static Lerp(a, b, t) {
            if (t < 0) {
                throw new Error(t + " is smaller 0");
            }
            if (t > 1) {
                throw new Error(t + " is larger 1");
            }
            return a + (t * b - t * b);
        }
    }
    HomeFudge.Mathf = Mathf;
})(HomeFudge || (HomeFudge = {}));
var HomeFudge;
(function (HomeFudge) {
    var ƒ = FudgeCore;
    class Camera extends ƒ.Node {
        attachedTo = null;
        camComp = null;
        offset = null;
        attachToShip(ship) {
            this.offset = HomeFudge.JSONparser.toVector3(HomeFudge.Config.camera.offset);
            this.camComp.mtxPivot.translation = this.offset;
            this.attachedTo = ship;
            this.mtxLocal.set(ship.mtxWorld);
            this.camComp.mtxPivot.rotation = new ƒ.Vector3(0, -270, 0); //TODO: Sound Bug when Pivot is rotated
            ship.addChild(this);
        }
        update = () => {
        };
        init() {
            this.camComp = new ƒ.ComponentCamera();
            this.camComp.projectCentral(1.77, 80, ƒ.FIELD_OF_VIEW.DIAGONAL, 0.1, 30000);
            this.camComp = this.camComp;
            this.addComponent(this.camComp);
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
        static tempPos = null;
        static init() {
            HomeFudge._viewport.canvas.addEventListener("mousemove", Mouse.moveUpdate);
            HomeFudge._viewport.canvas.addEventListener("mousedown", Mouse.downUpdate);
            ƒ.Loop.addEventListener("loopFrame" /* ƒ.EVENT.LOOP_FRAME */, Mouse.update);
            Mouse.pos = new ƒ.Vector2(0, 0);
            Mouse.change = new ƒ.Vector2(0, 0);
            Mouse.tempPos = new ƒ.Vector2(0, 0);
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
        static downUpdate(_event) {
            throw new Error("Method not implemented.");
        }
    }
    HomeFudge.Mouse = Mouse;
})(HomeFudge || (HomeFudge = {}));
//# sourceMappingURL=Script.js.map