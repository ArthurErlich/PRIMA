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
var HomeFudge;
(function (HomeFudge) {
    var ƒ = FudgeCore;
    //TODO:remove class and put it to class GatlingTurret
    class GatTurretHead extends ƒ.Node {
        node = null;
        mesh = null;
        material = null;
        //Getting all resource here
        getResources() {
            let graphID = HomeFudge.gatlingConfig.graphID; //From gatConfig.json
            let graph = ƒ.Project.resources[graphID];
            if (graph == null) {
                console.warn(graph + " not found with ID: " + graphID);
            }
            let nodeName = "GatlingTurretHead";
            this.node = graph.getChildrenByName(nodeName)[0];
            if (this.node == null) {
                console.warn("+\"" + nodeName + "\" not found inside: " + graph.name + "->Graph");
            }
        }
        //Sets the Mesh- and Material - Component.
        setComponents() {
            this.mesh = this.node.getComponent(ƒ.ComponentMesh);
            this.material = this.node.getComponent(ƒ.ComponentMaterial);
            //TODO:remove log
            // console.warn(this.mesh);
            // console.warn(this.material);
        }
        constructor(_transform) {
            super("GatTurretHead");
            this.getResources();
            this.setComponents();
            this.addComponent(this.mesh);
            this.addComponent(this.material);
            this.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(_transform)));
            let shootPosNode = new ƒ.Node("ShootSpawnPos");
            //Grab the Location from Blender\\
            shootPosNode.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(HomeFudge.gatlingConfig.shootNodePosition))); //From gatConfig.json
            this.addChild(shootPosNode);
        }
    }
    HomeFudge.GatTurretHead = GatTurretHead;
})(HomeFudge || (HomeFudge = {}));
var HomeFudge;
(function (HomeFudge) {
    var ƒ = FudgeCore;
    class GatlingTurret extends ƒ.Node {
        async initGatConfigAndAllNodes() {
            let response = await fetch("Configs/gatTurretConfig.json");
            HomeFudge.gatlingConfig = await response.json();
            //TODO:remove Debug
            console.warn(HomeFudge.gatlingConfig);
            // console.warn(gatlingConfig.graphID);
            //TODO: put the classes here and make functions out of it. 
            let base = new HomeFudge.GatlingTurretBase(new ƒ.Vector3(0, 0, 0));
            let head = new HomeFudge.GatTurretHead(HomeFudge.gatlingConfig.headPosition); //From gatConfig.json
            //TODO:remove Debug
            // console.warn(head);
            base.addChild(head);
            this.addChild(base);
        }
        constructor(_transform) {
            super("GatlingTurret");
            this.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(_transform)));
            this.initGatConfigAndAllNodes();
        }
    }
    HomeFudge.GatlingTurret = GatlingTurret;
})(HomeFudge || (HomeFudge = {}));
var HomeFudge;
(function (HomeFudge) {
    //TODO:remove class and put it to class GatlingTurret
    var ƒ = FudgeCore;
    class GatlingTurretBase extends ƒ.Node {
        //Grab the Location from Blender\\
        node = null;
        mesh = null;
        material = null;
        //Getting all resource here
        getResources() {
            let graphID = HomeFudge.gatlingConfig.graphID; //From gatConfig.json
            let graph = ƒ.Project.resources[graphID];
            if (graph == null) {
                console.warn(graph + " not found with ID: " + graphID);
            }
            let nodeName = "GatlingTurretBase";
            this.node = graph.getChildrenByName(nodeName)[0];
            if (this.node == null) {
                console.warn("+\"" + nodeName + "\" not found inside: " + graph.name + "->Graph");
            }
        }
        //Sets the Mesh- and Material - Component.
        setComponents() {
            this.mesh = this.node.getComponent(ƒ.ComponentMesh);
            this.material = this.node.getComponent(ƒ.ComponentMaterial);
        }
        constructor(_transform) {
            super("GatlingTurretBase");
            this.getResources();
            this.setComponents();
            this.addComponent(this.mesh);
            this.addComponent(this.material);
            this.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(_transform)));
        }
    }
    HomeFudge.GatlingTurretBase = GatlingTurretBase;
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
    ///interface for Blender positions for Gatling\\\
    //TODO: Make a config class for loading Gatling configs
    function start(_event) {
        viewport = _event.detail;
        /// ------------T-E-S-T--A-R-E-A------------------\\\
        let gatTurret = new HomeFudge.GatlingTurret(new ƒ.Vector3(0, 0, 0)); //TODO:Check if mesh is correct
        viewport.getBranch().addChild(gatTurret);
        // console.log(" Gatling Turret Node: ");
        // console.log(viewport.getBranch().getChildrenByName("GatlingTurret")[0]);
        // console.log(" First child of Gatling Turret: ");
        // console.log(viewport.getBranch().getChildrenByName("GatlingTurret")[0].getChild(0));
        /// ------------T-E-S-T--A-R-E-A------------------\\\
        ƒ.Loop.addEventListener("loopFrame" /* ƒ.EVENT.LOOP_FRAME */, update);
        // ƒ.Loop.start();  // start the game loop to continuously draw the viewport, update the audiosystem and drive the physics i/a
    }
    function update(_event) {
        // ƒ.Physics.simulate();  // if physics is included and used
        /// ------------T-E-S-T--A-R-E-A------------------\\\
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
        constructor() {
            super("Player");
        }
    }
    HomeFudge.Player = Player;
})(HomeFudge || (HomeFudge = {}));
//# sourceMappingURL=Script.js.map