"use strict";
var HomeFudge;
(function (HomeFudge) {
    var ƒ = FudgeCore;
    class Bullet extends ƒ.Node {
        constructor(id) {
            super("Bullet" + id);
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
    class GatlingBullet extends HomeFudge.Bullet {
        lifeTime;
        speed;
        // faction: string;
        //TODO: implement bullet updating
        update(deltaSeconds) {
            // console.warn("Method not implemented.");
            //TODO:implement bullet lifetime degradation
            this.lifeTime -= deltaSeconds;
        }
        alive() {
            return this.lifeTime >= 0;
        }
        toString() {
            return this.name + "POSITION:";
        }
        constructor(lifeTime, id) {
            super(id.toString());
            this.lifeTime = lifeTime;
            this.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(new ƒ.Vector3(id / 10, 0, 0))));
        }
    }
    HomeFudge.GatlingBullet = GatlingBullet;
})(HomeFudge || (HomeFudge = {}));
var HomeFudge;
(function (HomeFudge) {
    var ƒ = FudgeCore;
    class GatlingTurret extends ƒ.Node {
        headNode;
        baseNode;
        shootNode;
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
        //Base rotates on the Y-Aches, Positiv number for up
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
        shoot(lifeTime, id) {
            let testBullet = new HomeFudge.GatlingBullet(lifeTime, id);
            //TODO:remove test parant
            this.addChild(testBullet);
        }
        constructor() {
            super("GatlingTurret");
            this.initGatConfigAndAllNodes();
        }
    }
    HomeFudge.GatlingTurret = GatlingTurret;
})(HomeFudge || (HomeFudge = {}));
var HomeFudge;
(function (HomeFudge) {
    var ƒ = FudgeCore;
    class JSONparser {
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
    //Bullet list, every bullet wil riegister itselfe here for the update Methode.
    HomeFudge.bulletList = null;
    /// ------------T-E-S-T--A-R-E-A------------------\\\
    function start(_event) {
        viewport = _event.detail;
        /// ------------T-E-S-T--A-R-E-A------------------\\\
        gatTurret = new HomeFudge.GatlingTurret(); //TODO:Check if mesh is correct
        HomeFudge.bulletList = new Array();
        for (let index = 0; index < 10; index++) {
            gatTurret.shoot(Math.random() * 5, index);
        }
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
        let rotX = 0;
        rotX += 1 * deltaSeconds;
        gatTurret.moveTurret(rotX * 2, rotX * 3);
        //Updates all bullets
        for (let index = 0; index < HomeFudge.bulletList.length; index++) {
            HomeFudge.bulletList[index].update(deltaSeconds);
            if (!HomeFudge.bulletList[index].alive()) {
                HomeFudge.bulletList[index] = null;
            }
        }
        HomeFudge.bulletList = HomeFudge.bulletList.filter(elements => {
            return (elements != null && elements !== undefined);
        });
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
        update(deltaSeconds) {
        }
        constructor() {
            super("Player");
        }
    }
    HomeFudge.Player = Player;
})(HomeFudge || (HomeFudge = {}));
//# sourceMappingURL=Script.js.map