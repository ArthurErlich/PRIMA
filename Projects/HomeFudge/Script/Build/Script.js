"use strict";
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
            //register to updater list
            HomeFudge.bulletList.push(this);
        }
    }
    HomeFudge.Bullet = Bullet;
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
    //TODO:create a logic for Hit detection.
    class GatlingBullet extends HomeFudge.Bullet {
        maxLifeTime = null;
        maxSpeed = null;
        spreadRadius = null;
        static graph = null;
        static worldNode = null;
        static mesh = null;
        static material = null;
        static bulletConfig = null;
        //TODO: try faction out.
        // faction: string="FACTION.A";
        update(deltaSeconds) {
            //goes out of the update loop as long the date is received into the config variable
            if (this.maxLifeTime == null || this.maxSpeed == null) {
                return;
            }
            this.maxLifeTime -= deltaSeconds;
            this.mtxLocal.translateX(this.maxSpeed * deltaSeconds);
        }
        async initBulletConfig() {
            let response = await fetch("Configs/gatBulletConfig.json");
            GatlingBullet.bulletConfig = await response.json();
            GatlingBullet.graph = await HomeFudge.Bullet.getGraphResources(GatlingBullet.bulletConfig.graphID);
            ///initAttributes\\\
            this.maxLifeTime = GatlingBullet.bulletConfig.maxLifeTime;
            this.maxSpeed = GatlingBullet.bulletConfig.maxSpeed;
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
            //TODO:put alive check inside bullet update function
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
            //TODO:Verify if it is a valid approach
            this.getParent().removeChild(this);
        }
        constructor(spawnTransform) {
            super("Gatling");
            this.addComponent(new ƒ.ComponentTransform(spawnTransform));
            this.initBulletConfig();
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
        async initGatConfigAndAllNodes() {
            let response = await fetch("Configs/gatTurretConfig.json");
            let gatlingConfig = await response.json();
            let graph = await this.getGraphResources(gatlingConfig.graphID);
            this.headNode = this.createNode("GatlingTurretHead", HomeFudge.JSONparser.toVector3(gatlingConfig.headPosition), graph);
            this.baseNode = this.createNode("GatlingTurretBase", HomeFudge.JSONparser.toVector3(gatlingConfig.basePosition), graph);
            this.shootNode = this.createShootPosNode(HomeFudge.JSONparser.toVector3(gatlingConfig.shootNodePosition));
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
        createNode(nodeName, transform, graph) {
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
        //Base rotates on the Y-Aches, Positive number for up
        //Head rotates on the Z-Aches
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
        shoot(worldNode) {
            //TODO:move "shootRPM" and "shootReloadTime" to GatlingTurret Class
            worldNode.addChild(new HomeFudge.GatlingBullet(this.shootNode.mtxWorld.clone));
        }
        constructor() {
            super("GatlingTurret");
            this.initGatConfigAndAllNodes();
        }
    }
    HomeFudge.GatlingTurret = GatlingTurret;
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
    var ƒ = FudgeCore;
    class LaserTurret extends ƒ.Node {
        constructor(pos) {
            super("Laser." + pos);
        }
    }
    HomeFudge.LaserTurret = LaserTurret;
    let LASER_TURRET_POS;
    (function (LASER_TURRET_POS) {
        LASER_TURRET_POS[LASER_TURRET_POS["RIGHT"] = 0] = "RIGHT";
        LASER_TURRET_POS[LASER_TURRET_POS["LEFT"] = 1] = "LEFT";
    })(LASER_TURRET_POS = HomeFudge.LASER_TURRET_POS || (HomeFudge.LASER_TURRET_POS = {}));
})(HomeFudge || (HomeFudge = {}));
var HomeFudge;
(function (HomeFudge) {
    var ƒ = FudgeCore;
    ƒ.Debug.info("Main Program Template running!");
    let viewport;
    document.addEventListener("interactiveViewportStarted", start);
    /// ------------T-E-S-T--A-R-E-A------------------\\\
    let gatTurret = null;
    let shootTime = 0;
    HomeFudge.worldNode = null;
    //Bullet list, every bullet wil register itself here for the update Method.
    HomeFudge.bulletList = null;
    /// ------------T-E-S-T--A-R-E-A------------------\\\
    function start(_event) {
        viewport = _event.detail;
        HomeFudge.worldNode = viewport.getBranch();
        /// ------------T-E-S-T--A-R-E-A------------------\\\
        gatTurret = new HomeFudge.GatlingTurret(); //TODO:Check if mesh is correct
        HomeFudge.bulletList = new Array();
        viewport.getBranch().addChild(gatTurret);
        // console.log(" Gatling Turret Node: ");
        // console.log(viewport.getBranch().getChildrenByName("GatlingTurret")[0]);
        // console.log(" First child of Gatling Turret: ");
        // console.log(viewport.getBranch().getChildrenByName("GatlingTurret")[0].getChild(0));
        /// ------------T-E-S-T--A-R-E-A------------------\\\
        ƒ.Loop.addEventListener("loopFrame" /* ƒ.EVENT.LOOP_FRAME */, update);
        //TODO:look at ƒ.LOOP_MODE.TIME_GAME, 30
        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_GAME, 30); // start the game loop to continuously draw the viewport, update the audiosystem and drive the physics i/a
    }
    function update(_event) {
        // ƒ.Physics.simulate();  // if physics is included and used
        let deltaSeconds = ƒ.Loop.timeFrameGame / 1000;
        /// ------------T-E-S-T--A-R-E-A------------------\\\
        //TODO: fix "time frameGame is not a valid option for time based shooting"...
        shootTime += deltaSeconds;
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.SPACE])) {
            //TODO: Logic needs to be moved to GatTurret
            if (shootTime >= 0.2) {
                gatTurret.shoot(viewport.getBranch());
                shootTime = 0;
            }
        }
        let rotX = 0;
        rotX += 1 * deltaSeconds;
        gatTurret.moveTurret(rotX * 2, rotX * 3);
        //Updates all bullets
        //TODO: make a function or method out of that and update it
        //TODO:put alive check inside bullet update function
        for (let index = 0; index < HomeFudge.bulletList.length; index++) {
            HomeFudge.bulletList[index].update(deltaSeconds);
            if (!HomeFudge.bulletList[index].alive()) {
                HomeFudge.bulletList[index].destroyNode();
                HomeFudge.bulletList[index] = null;
            }
        }
        //removes bullet from the update array
        HomeFudge.bulletList = HomeFudge.bulletList.filter(elements => {
            return (elements != null && elements !== undefined);
        });
        if (ƒ.Loop.fpsGameAverage <= 20) {
            console.warn("Active bullets in scene: " + HomeFudge.bulletList.length);
            console.warn(ƒ.Loop.fpsGameAverage);
        }
        /// ------------T-E-S-T--A-R-E-A------------------\\\
        viewport.draw();
        ƒ.AudioManager.default.update();
    }
    /// ------------T-E-S-T--A-R-E-A------------------\\\
    /// ------------T-E-S-T--A-R-E-A------------------\\\
})(HomeFudge || (HomeFudge = {}));
var HomeFudge;
(function (HomeFudge) {
    var ƒ = FudgeCore;
    class Player extends ƒ.Node {
        //TODO:Crate the player ship
        update(deltaSeconds) {
        }
        constructor() {
            super("Player");
        }
    }
    HomeFudge.Player = Player;
})(HomeFudge || (HomeFudge = {}));
//# sourceMappingURL=Script.js.map