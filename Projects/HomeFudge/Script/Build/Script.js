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
    var ƒ = FudgeCore;
    ƒ.Debug.info("Main Program Template running!");
    //@ts-ignore
    document.addEventListener("interactiveViewportStarted", (event) => start(event));
    ///World Node\\\
    HomeFudge._worldNode = null;
    ///DeltaSeconds\\\
    HomeFudge._deltaSeconds = null;
    ///Viewport\\\
    HomeFudge._viewport = null;
    ///Mouse\\\
    /// ------------T-E-S-T--A-R-E-A------------------\\\
    //Bullet list, every bullet wil register itself here for the update Method.
    ///camera setup for worldSize of 25km\\\
    //TODO:create camera Class
    /// ------------T-E-S-T--A-R-E-A------------------\\\
    async function start(_event) {
        HomeFudge._viewport = _event.detail;
        HomeFudge._worldNode = HomeFudge._viewport.getBranch();
        //Loads Config then initilizes the world 
        await loadConfig().then(initWorld).then(() => { console.warn("ConfigsLoaded and world Initialized"); }); // to create ships. first load configs than the ships etc
        /// ------------T-E-S-T--A-R-E-A------------------\\\
        HomeFudge._viewport.camera.projectCentral(1.77, 80, ƒ.FIELD_OF_VIEW.DIAGONAL, 0.1, 30000);
        /// ------------T-E-S-T--A-R-E-A------------------\\\
        ƒ.Loop.addEventListener("loopFrame" /* ƒ.EVENT.LOOP_FRAME */, update);
        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_GAME, 30); // start the game loop to continuously draw the _viewport, update the audiosystem and drive the physics i/a
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
        HomeFudge.aimPos = getAimPos();
        console.log(HomeFudge.Mouse.pos.toString());
        console.log(HomeFudge.Mouse.change.toString());
        /// ------------T-E-S-T--A-R-E-A------------------\\\
        HomeFudge._viewport.draw();
        ƒ.AudioManager.default.update();
    }
    /// ------------T-E-S-T--A-R-E-A------------------\\\
    function getAimPos() {
        let pick = ƒ.Picker.pickCamera(HomeFudge._worldNode.getChildren(), HomeFudge._viewport.camera, new ƒ.Vector2(HomeFudge._viewport.canvas.width / 2, HomeFudge._viewport.canvas.height / 2));
        return pick[0].posWorld;
    }
    HomeFudge.aimPos = ƒ.Vector3.ZERO();
    /// ------------T-E-S-T--A-R-E-A------------------\\\
    async function loadConfig() {
        //loads configs
        performance.now();
        console.warn("LoadingConfigs");
        await HomeFudge.Config.initConfigs();
        HomeFudge.Mouse.init();
    }
    async function initWorld() {
        let destroyer = initDestroyer();
        HomeFudge._viewport.getBranch().addChild(destroyer);
        let camera = initCamera("Main");
        HomeFudge._viewport.getBranch().addChild(camera);
        camera.attachToShip(destroyer);
        //  _viewport.camera.activate(false); //TODO: Make mode for Switching InteractiveCam and PlayerCam
        //  camera.getComponent(ƒ.ComponentCamera).activate(true);
        //  console.log(_worldNode);
    }
    function initDestroyer() {
        return new HomeFudge.Destroyer(new ƒ.Vector3(0, 0, 0));
    }
    function initCamera(name) {
        return new HomeFudge.Camera(name);
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
//TODO:Replace autoView.js inside here
var HomeFudge;
//TODO:Replace autoView.js inside here
(function (HomeFudge) {
    document.addEventListener("startInteractiveViewport", (event) => startInteractiveViewport(event));
    async function startInteractiveViewport(_event) {
        console.warn(_event.detail);
    }
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
            this.velocity = new ƒ.Vector3(0, 0, 0);
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
            //TODO: remove temporary WP shooting
            if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.SPACE])) {
                this.gatlingTurret.shoot();
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
        toString() {
            //console.error("Method not implemented.");
            return null;
        }
        constructor(position) {
            super("Destroyer");
            this.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(position)));
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
            this.mtxLocal.translateX(this.maxSpeed * HomeFudge._deltaSeconds);
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
        constructor(spawnTransform) {
            super("Gatling");
            this.addComponent(new ƒ.ComponentTransform(spawnTransform));
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
        roundsPerSecond = null;
        reloadsEverySecond = null;
        roundsTimer = 0;
        reloadTimer = 0;
        magazineCapacity = null;
        //*1 private magazineRounds: number = null;
        async initConfigAndAllNodes() {
            let graph = await this.getGraphResources(HomeFudge.Config.gatlingTurret.graphID);
            this.headNode = this.createComponents("GatlingTurretHead", HomeFudge.JSONparser.toVector3(HomeFudge.Config.gatlingTurret.headPosition), graph);
            this.baseNode = this.createComponents("GatlingTurretBase", HomeFudge.JSONparser.toVector3(HomeFudge.Config.gatlingTurret.basePosition), graph);
            this.shootNode = this.createShootPosNode(HomeFudge.JSONparser.toVector3(HomeFudge.Config.gatlingTurret.shootNodePosition));
            this.roundsPerSecond = HomeFudge.Config.gatlingTurret.roundsPerSeconds;
            this.reloadsEverySecond = HomeFudge.Config.gatlingTurret.reloadTime;
            this.magazineCapacity = HomeFudge.Config.gatlingTurret.magazineCapacity;
            //*1 this.magazineRounds = this.magazineCapacity;
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
            if (node == null) {
                console.warn("+\"" + nodeName + "\" not found inside: " + graph.name + "->Graph");
            }
            node.addComponent(node.getComponent(ƒ.ComponentMesh));
            node.addComponent(node.getComponent(ƒ.ComponentMaterial));
            node.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(transform)));
            return node;
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
            if (this.roundsPerSecond == null || this.reloadsEverySecond == null || this.magazineCapacity == 0) {
                return;
            }
            if (this.roundsTimer <= this.roundsPerSecond) {
                this.roundsTimer += HomeFudge._deltaSeconds;
            }
            //TODO: think about a reload function
            if (this.reloadTimer <= this.reloadsEverySecond) {
                this.reloadTimer += HomeFudge._deltaSeconds;
            }
            //TODO: don't use lookAt function. Better do the math yourself! -> X is forward in my game. Z Forward is Standard
            this.baseNode.mtxLocal.lookAt(HomeFudge.aimPos, new ƒ.Vector3(0, 1, 0), true);
            this.headNode.mtxLocal.lookAt(new ƒ.Vector3(HomeFudge.aimPos.y, HomeFudge.aimPos.z, 0), new ƒ.Vector3(0, 0, -1), true);
            this.headNode.mtxLocal.rotateX(90);
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
        //spawns every n-seconds a bullet
        shoot() {
            if (this.roundsTimer >= this.roundsPerSecond) {
                new HomeFudge.GatlingBullet(this.shootNode.mtxWorld.clone);
                this.roundsTimer = 0;
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
        aimPoinz = null;
        attachedTo = null;
        offset = null;
        attachToShip(ship) {
            this.attachedTo = ship;
            this.mtxLocal.set(ship.mtxWorld);
        }
        update = () => {
        };
        init() {
            this.offset = HomeFudge.JSONparser.toVector3(HomeFudge.Config.camera.offset);
            this.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(ƒ.Vector3.ZERO())));
            let cameraComponent = new ƒ.ComponentCamera();
            cameraComponent.projectCentral(1.77, 80, ƒ.FIELD_OF_VIEW.DIAGONAL, 0.1, 30000);
            cameraComponent.mtxPivot.rotation.set(0, -90, 0);
            cameraComponent.mtxPivot.translation = this.offset;
            this.addComponent(cameraComponent);
            //TODO:remove debug
            //TEST CUBE
            //  this.addComponent(new ƒ.ComponentMaterial(new ƒ.Material("test",ƒ.ShaderLit)));
            //  this.addComponent(new ƒ.ComponentMesh(new ƒ.MeshCube()));
            //  this.getComponent(ƒ.ComponentMesh).mtxPivot.translation = this.offset;
            HomeFudge._worldNode.addChild(this);
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
    }
    HomeFudge.Mouse = Mouse;
})(HomeFudge || (HomeFudge = {}));
//# sourceMappingURL=Script.js.map