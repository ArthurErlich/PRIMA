"use strict";
var McFudge;
(function (McFudge) {
    var ƒ = FudgeCore;
    class Block extends ƒ.Node {
        //used onesce
        static meshCube = new ƒ.MeshCube();
        static materialCube = new ƒ.Material("mtr", ƒ.ShaderFlat, new ƒ.CoatRemissive()); // you can also grab the Matrial from the resources!
        constructor() {
            super("Block"); // always call super!
            //now we add them to the Componnets
            this.addComponent(new ƒ.ComponentTransform());
            this.addComponent(new ƒ.ComponentMesh(Block.meshCube));
            this.addComponent(new ƒ.ComponentMaterial(Block.materialCube));
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
    let minecraftGraph = null;
    let testCubeGraph = null;
    let worldNode = null;
    /// GraphInstance \\\
    let testCubeInstances = null;
    ///WorldParameters\\\
    let worldHightShift = -2;
    function start(_event) {
        viewport = _event.detail;
        //-----------------------T-E-S-T---A-R-E-A-----------------------\\
        //-----------------------------------------------------------------\\
        //@ts-ignore
        viewport.canvas.addEventListener("mouseup", pick);
        //@ts-ignore
        viewport.getBranch().addEventListener("mouseup", hit);
        ///init Graphs
        minecraftGraph = viewport.getBranch();
        worldNode = minecraftGraph.getChildrenByName("World")[0];
        ///init world creation GraphInstance
        let worldSize = 1;
        initWorldCreation(worldSize); // my computer can manage 8*8*8 cubes
        console.warn(worldSize * worldSize * worldSize + " Cubes are generated");
        // creating a block instance
        let instance = new McFudge.Block();
        viewport.getBranch().addChild(instance);
        console.log(instance);
        // end crating a block instance
        //------------------------T-E-S-T---A-R-E-A----------------------\\
        //-----------------------------------------------------------------\\
        ƒ.Loop.addEventListener("loopFrame" /* ƒ.EVENT.LOOP_FRAME */, update);
        // ƒ.Loop.start();  // start the game loop to continuously draw the viewport, update the audiosystem and drive the physics i/a
    }
    function update(_event) {
        // ƒ.Physics.simulate();  // if physics is included and used
        // viewport.draw();
        // ƒ.AudioManager.default.update();
    }
    async function initWorldCreation(size) {
        testCubeGraph = ƒ.Project.resources["Graph|2023-04-20T13:20:33.233Z|09344"];
        testCubeInstances = new Array(size * size * size);
        //crating enough cube instances for the Transform parent later.
        for (let i = 0; i < (size * size * size); i++) {
            testCubeInstances[i] = await ƒ.Project.createGraphInstance(testCubeGraph); //TODO: Maybe there is a way to clone the Instance?
        }
        let cubeMargin = 1.01;
        let cubeIndex = 0;
        let cubeList = new Array(size * size * size);
        for (let x = 0; x < size; x++) {
            for (let z = 0; z < size; z++) {
                worldHightShift = Math.round((Math.random()) - 2);
                for (let y = 0; y < size; y++) {
                    cubeList[cubeIndex] = crateCube(cubeIndex, new ƒ.Vector3(x * cubeMargin, (-y + worldHightShift) * cubeMargin, -z * cubeMargin));
                    cubeIndex++;
                }
            }
        }
        addCubesToWorld(cubeList);
    }
    function pick(_event) {
        viewport.draw;
        viewport.dispatchEvent(_event);
    }
    function hit(event) {
        let node = event.target;
        let cmpPick = node.getComponent(ƒ.ComponentPick);
        console.warn(cmpPick);
    }
    function crateCube(index, position) {
        let cubeTransform = new ƒ.Node("INDEX: " + index + " cube");
        cubeTransform.addComponent(new ƒ.ComponentTransform());
        cubeTransform.mtxLocal.translation = position;
        return cubeTransform;
    }
    function addCubesToWorld(cubeTransform) {
        if (testCubeInstances == undefined) {
            throw "Here is a problem";
        }
        for (let index = 0; index < cubeTransform.length; index++) {
            cubeTransform[index].addChild(testCubeInstances[index]); //TODO: find out how to get the instance of the testCubeInstance. And not the object itself /\/\/DIRTY FIX: crating an array with the instances of the cube
            worldNode.addChild(cubeTransform[index]);
        }
    }
})(McFudge || (McFudge = {}));
//# sourceMappingURL=Script.js.map