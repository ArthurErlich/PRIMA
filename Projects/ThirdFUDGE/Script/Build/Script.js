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
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    ƒ.Debug.info("Main Program Template running!");
    let viewport;
    let myHumanoid = null;
    let jumpCountdwon = 0;
    let jumped = false;
    document.addEventListener("interactiveViewportStarted", start); // interactiveViewportStarted AutoCamara setup
    function start(_event) {
        viewport = _event.detail; //What is a Viewpoert?  
        myHumanoid = viewport.getBranch().getChildrenByName("Charackter")[0];
        /*
        let myHumanoid: ƒ.Node = viewport.getBranch().getChildrenByName("Humanoid")[0];
        console.log("Geting Humanoid:"+ myHumanoid);
    
        let myCMPHumanoid: ƒ.ComponentTransform = myHumanoid.getComponent(ƒ.ComponentTransform);
        myCMPHumanoid.mtxLocal.translateX(1);
    
        console.log("Geting Humanoid:"+ myHumanoid);
        */
        // ther is a simpler version to get all this
        ƒ.Loop.addEventListener("loopFrame" /* ƒ.EVENT.LOOP_FRAME */, update);
        ƒ.Loop.start(); // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
    }
    function update(_event) {
        // ƒ.Physics.simulate();  // if physics is included and used
        //FrameTime???
        myHumanoid.mtxLocal.translateX(ƒ.Loop.timeFrameGame / 10000);
        //myHumanoid.mtxLocal.translateX(-(ƒ.Loop.timeFrameReal/100));
        // jumps the cube after 5 seconds up
        if (jumpCountdwon >= 2.0) {
            if (jumped) {
                jumped = false;
                myHumanoid.mtxLocal.translateY(-1);
            }
            else {
                jumped = true;
                myHumanoid.mtxLocal.translateY(1);
            }
            jumpCountdwon = 0;
        }
        jumpCountdwon += ƒ.Loop.timeFrameGame / 1000;
        viewport.draw();
        ƒ.AudioManager.default.update();
    }
})(Script || (Script = {}));
//# sourceMappingURL=Script.js.map