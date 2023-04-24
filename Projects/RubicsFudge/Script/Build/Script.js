"use strict";
var McFudge;
(function (McFudge) {
    var ƒ = FudgeCore;
    class Block extends ƒ.Node {
        //used onesce
        static meshCube = new ƒ.MeshCube();
        static materialCube = new ƒ.Material("mtr", ƒ.ShaderFlat, new ƒ.CoatRemissive()); // you can also grab the Matrial from the resources!
        constructor(_position, _color) {
            super("Block"); // always call super!
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
    /// colorers \\\
    function start(_event) {
        viewport = _event.detail;
        //-----------------------T-E-S-T---A-R-E-A-----------------------\\
        //-----------------------------------------------------------------\\
        ///init Graphs
        gameGraph = viewport.getBranch();
        worldNode = gameGraph.getChildrenByName("World")[0];
        // creating a block instance
        // let instance: Block = new Block(new ƒ.Vector3(0,0,0), ƒ.Color.CSS("red"));
        // viewport.getBranch().addChild(instance);
        for (let x = 0; x < 3; x++) {
            for (let y = 0; y < 3; y++) {
                for (let z = 0; z < 3; z++) {
                    let cubeColor = ƒ.Color.CSS("white");
                    let instance = new McFudge.Block(new ƒ.Vector3(x, y, z), cubeColor);
                    //set color
                    //look at fudge test-> Picking and rays
                    instance.mtxLocal.scale(new ƒ.Vector3(0.97, 0.97, 0.97));
                    viewport.getBranch().addChild(instance);
                }
            }
        }
        //------------------------T-E-S-T---A-R-E-A----------------------\\
        //-----------------------------------------------------------------\\
        ƒ.Loop.addEventListener("loopFrame" /* ƒ.EVENT.LOOP_FRAME */, update);
        // ƒ.Loop.start();  // start the game loop to continuously draw the viewport, update the audiosystem and drive the physics i/a
    }
    function update(_event) {
        // ƒ.Physics.simulate();  // if physics is included and used
        viewport.draw();
        ƒ.AudioManager.default.update();
    }
})(McFudge || (McFudge = {}));
//# sourceMappingURL=Script.js.map