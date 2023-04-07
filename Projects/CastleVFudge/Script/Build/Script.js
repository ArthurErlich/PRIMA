"use strict";
/*
namespace CastleV{
    import ƒ = FudgeCore;
    export class AnimController{
        private animations:ƒ.ComponentAnimator[];
        private plaingAnim:ANIMATION_INDEX= null;
        private plaingDirection:ANIMATION_DIRECTION = null;
        private alucardAnimator:ƒ.ComponentAnimator;

        constructor(animator:ƒ.ComponentAnimator){
            this.init(animator)
        }

        public init(animator:ƒ.ComponentAnimator){
            this.setAnimator(animator);
            this.getAnimationsFromResurses();
        }
        
        private getAnimationsFromResurses(){
            this.animations = [
                ƒ.Project.getResourcesByName("Anim_Idl")[0],
                ƒ.Project.getResourcesByName("Anim_StartWalking")[0],
                ƒ.Project.getResourcesByName("Anim_Walking")[0],
            ]
        }
        private setAnimator(animator:ƒ.ComponentAnimator){
            this.alucardAnimator = animator;
        }
        public playAnimation(play:ANIMATION_INDEX,direction:ANIMATION_DIRECTION){
            if((this.plaingAnim == null||this.plaingAnim==play) && (this.plaingDirection == null || this.plaingDirection == direction)){
                this.plaingAnim = play;
                this.plaingDirection = direction;
                this.alucardAnimator = this.animations[ANIMATION_INDEX.Anim_StartWalking];//TODO: Change alucards animator not animations sprite
            }
        }
    }
    export enum ANIMATION_INDEX{
        Anim_Idl,
        Anim_StartWalking,
        Anim_Walking
    }
    export enum ANIMATION_DIRECTION{
        Forward,
        Beckwards
    }
}
*/ 
var CastleV;
(function (CastleV) {
    var ƒ = FudgeCore;
    class CollisionDetection {
        static tiles = [];
        static lastCollision = new ƒ.Vector3(0, 0, 0);
        static setupCollision(floor) {
            let tiles = new Array();
            for (let floorChild of floor.getChildren()) {
                for (let tileChild of floorChild.getChildren()) {
                    tiles.push(tileChild);
                }
            }
            CollisionDetection.updateTiles(tiles);
        }
        static updateTiles(tiles) {
            this.tiles = tiles;
        }
        //TODO: add offset of player speed / 2
        static check(playerMtxWorld) {
            let collision = [Collision.NONE];
            for (let tile of this.tiles) {
                //Check if the player is in range of the tile
                let distance = this.getDistance(tile.mtxWorld.translation, playerMtxWorld.translation);
                if (distance <= 2) {
                    //transform player position to tile local position/scale/rotation
                    let transformPlayerPos = playerMtxWorld.clone; // clone the matrix so it doesn't change the original
                    transformPlayerPos.multiply(tile.mtxWorldInverse);
                    // console.log("PlayerY: " + playerMtxWorld.translation.y);
                    // console.log("PlayerRelativeY: " + transformPlayerPos.translation.y);
                    //get position of tiles
                    let distanceX = transformPlayerPos.translation.x;
                    let distanceY = transformPlayerPos.translation.y;
                    //TODO: REWORK COLLISION DETECTION!
                    //TODO: GET HIGHT AND WIDTH OF TILE 
                    if ((distanceY <= 1 && distanceY >= 0) && (distanceX >= -0.8 && distanceX <= 0.8)) {
                        collision.push(Collision.DOWN);
                        let playerWorldPos = transformPlayerPos.clone;
                        playerWorldPos.multiply(tile.mtxWorld);
                        this.lastCollision = playerWorldPos.translation.clone;
                    }
                    //TODO: Check upper Collision -> prevent drive through walls
                    if ((distanceY <= 1 && distanceY >= 0) && (distanceX >= -0.8 && distanceX <= 0)) {
                        //collision.push(Collision.UP);
                        let playerWorldPos = transformPlayerPos.clone;
                        playerWorldPos.multiply(tile.mtxWorld);
                        this.lastCollision = playerWorldPos.translation.clone;
                    }
                    if ((distanceX >= -0.7 && distanceX <= 0.1) && (distanceY <= 0.8 && distanceY >= 0)) {
                        collision.push(Collision.RIGHT);
                    }
                    if ((distanceX <= 0.8 && distanceX >= 0.1) && (distanceY <= 0.8 && distanceY >= 0)) {
                        collision.push(Collision.LEFT);
                    }
                }
            }
            return collision;
        }
        static getDistance(_pos1, _pos2) {
            let distance = Math.sqrt(Math.pow(_pos1.x - _pos2.x, 2) + Math.pow(_pos1.y - _pos2.y, 2) + Math.pow(_pos1.z - _pos2.z, 2));
            return distance;
        }
    }
    CastleV.CollisionDetection = CollisionDetection;
    //Pythagoras
    let Collision;
    (function (Collision) {
        Collision[Collision["NONE"] = 0] = "NONE";
        Collision[Collision["LEFT"] = 1] = "LEFT";
        Collision[Collision["RIGHT"] = 2] = "RIGHT";
        Collision[Collision["UP"] = 3] = "UP";
        Collision[Collision["DOWN"] = 4] = "DOWN";
    })(Collision = CastleV.Collision || (CastleV.Collision = {}));
})(CastleV || (CastleV = {}));
/*
for (let tile of tiles) {
    //Check if the player is in range of the tile
    let distance:number = getDistance(tile.mtxWorld.translation, player.alucard.mtxWorld.translation)
    if (distance <=1.0) {
     
      //transform player position to tile local position/scale/rotation
      let transformPlayerPos:ƒ.Matrix4x4 = player.alucard.mtxWorld;
      transformPlayerPos.multiply(tile.mtxWorldInverse);

      //get collision
      let distanceX:number = transformPlayerPos.translation.x;
      let distanceY:number = transformPlayerPos.translation.y;
      console.log("Y: " + distanceY);
      
      let tileOffset:number =0.5;

      if(distanceX >= -tileOffset && distanceX <= 0){
        console.warn("right");
        player.alucard.mtxLocal.translateX(-0.05);
      }
      if(distanceX <= tileOffset && distanceX >= 0){
        console.warn("left");
        player.alucard.mtxLocal.translateX(0.05);
      }
      if(distanceY <= 1 && distanceX >= 0){
        console.warn("up");
        player.alucard.mtxLocal.translateY(0.1);
      }
      */ 
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
var CastleV;
(function (CastleV) {
    var ƒ = FudgeCore;
    ƒ.Debug.info("Main Program Template running!");
    ///deltaTimeSeconds\\\
    let deltaTimeSeconds;
    ///ƒ Viewport\\\
    let viewport;
    ///Player\\\
    let player;
    ///AnimationSprite\\\
    let animation = new Array();
    //Keyboard input! Bubble Hirachie... Fudge Docu
    document.addEventListener("interactiveViewportStarted", start);
    function start(_event) {
        viewport = _event.detail;
        ///Create Player\\\
        player = new CastleV.Player(viewport);
        //move the Cam to the right position
        console.log("moved cam");
        viewport.camera.mtxPivot.translateZ(9);
        viewport.camera.mtxPivot.rotateY(180);
        //attach the camera to the player node
        let cNode = new ƒ.Node("Camera");
        cNode.addComponent(viewport.camera);
        player.pivot.addChild(cNode);
        animation = [
            ƒ.Project.getResourcesByName("Anim_Idl")[0],
            ƒ.Project.getResourcesByName("Anim_Walking")[0],
        ];
        player.setAnimation(animation[0]);
        console.log(animation);
        ///Gets Tiles and set them into Collision List\\\
        CastleV.CollisionDetection.setupCollision(viewport.getBranch().getChildrenByName("Floor")[0]);
        //CollisionDetection.updateTiles(tiles.map(x => x));
        //console.log(CollisionDetection.tiles);
        //---------------------------------------S-T-A-R-T---L-O-O-P-----------------------------------------------------------\\
        ƒ.Loop.addEventListener("loopFrame" /* ƒ.EVENT.LOOP_FRAME */, update);
        ƒ.Loop.start(); // start the game loop to continuously draw the viewport, update the audio system and drive the physics i/a
        //------------------------------------------------------------------------------------------------------------------------\\
    }
    ///--------------------------------------U-P-D-A-T-E---------------------------------------------------------------------\\\
    //------------------------------------------------------------------------------------------------------------------------\\
    function update(_event) {
        // ƒ.Physics.simulate();  // if physics is included and used
        ///Update deltaTimeSeconds\\\
        deltaTimeSeconds = ƒ.Loop.timeFrameGame / 1000;
        ///Update Player\\\
        player.update(deltaTimeSeconds); // moved player to player.ts (its own Class) to make code more clear
        //------------------T-E-S-T-------------------------------------------------------T-E-S-T--------------------------------\\
        //Respawn Player if he falls down
        if (player.alucard.mtxLocal.translation.y <= -10) {
            player.alucard.mtxLocal.translation = new ƒ.Vector3(player.pivot.mtxWorld.translation.x, 2, player.pivot.mtxWorld.translation.z);
            player.resetPlayer();
        }
        console.log(player.getSpeed().toString());
        //TODO: Create Animation in Fliped Direction!!
        if ((player.getSpeed().x) > 0) {
            player.setAnimation(animation[1]);
        }
        else if (player.getSpeed().x == 0.0) {
            player.setAnimation(animation[0]);
        }
        else if (player.getSpeed().x < 0) {
            player.setAnimation(animation[1]);
        }
        //-------------------------------------------------------------------------------------------------------------------------\\
        viewport.draw();
        // ƒ.AudioManager.default.update();
    }
})(CastleV || (CastleV = {}));
var CastleV;
(function (CastleV) {
    var ƒ = FudgeCore;
    class Player {
        alucard = null;
        pivot = null;
        maxWalkSpeed = 3;
        gravity = -30;
        fallingSpeed = 0;
        //--> maxFallSpeed is used below, //TODO: check implementation of fall speed
        //If the player falls too fast on a slow computer, the player will fall trough a block.
        //private maxFallSpeed: number = 0.2;
        playerSpeed = new ƒ.Vector3(0, 0, 0);
        material = null;
        ///Animation\\\
        animation = null;
        //deltaTime
        deltaTimeSeconds = 0;
        //animation
        animationDirection;
        /*
        private updateTime: number = 0.045;
        private elapsedTimeAnim: number = 0;
        */
        constructor(viewport) {
            this.alucard = viewport.getBranch().getChildrenByName("Character")[0];
            this.pivot = this.alucard.getChildrenByName("Alucard")[0];
            this.material = this.pivot.getComponent(ƒ.ComponentMaterial);
            this.animation = this.pivot.getComponent(ƒ.ComponentAnimator).animation;
        }
        //updates the Player -> called in Main.ts update Loop
        update(deltaTimeSeconds) {
            this.deltaTimeSeconds = deltaTimeSeconds;
            this.input();
        }
        resetPlayer() {
            this.playerSpeed = new ƒ.Vector3(0, 0, 0);
            this.fallingSpeed = 0;
            this.alucard.mtxLocal.translation = new ƒ.Vector3(0, 1, 0); //TODO: Change to spawnpoint
        }
        setAnimation(animation) {
            // if(this.animation == animation){
            //     return;
            // }
            this.animation = animation;
            this.pivot.getComponent(ƒ.ComponentAnimator).animation = this.animation;
        }
        getSpeed() {
            return this.playerSpeed;
        }
        input() {
            let isGrounded = true;
            this.playerSpeed = new ƒ.Vector3(0, 0, 0);
            //CollisionDetection.check(this.alucard.mtxWorld) <- make that with vector 3 instand of matrix
            if (CastleV.CollisionDetection.check(this.alucard.mtxWorld).find(e => e == CastleV.Collision.DOWN) != CastleV.Collision.DOWN) {
                isGrounded = false;
            }
            else {
                isGrounded = true;
            }
            // console.log(CollisionDetection.check(this.alucard.mtxWorld) != Collision.DOWN);
            // console.log(this.alucard.mtxWorld.translation +"");
            // console.log(CollisionDetection.lastCollisionY);
            if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_RIGHT, ƒ.KEYBOARD_CODE.D]) && !(CastleV.CollisionDetection.check(this.alucard.mtxWorld).find(e => e == CastleV.Collision.RIGHT) == CastleV.Collision.RIGHT)) {
                this.playerSpeed = new ƒ.Vector3(this.maxWalkSpeed * this.deltaTimeSeconds, this.playerSpeed.y, this.playerSpeed.z);
            }
            else if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_LEFT, ƒ.KEYBOARD_CODE.A]) && !(CastleV.CollisionDetection.check(this.alucard.mtxWorld).find(e => e == CastleV.Collision.LEFT) == CastleV.Collision.LEFT)) {
                this.playerSpeed = new ƒ.Vector3(-this.maxWalkSpeed * this.deltaTimeSeconds, this.playerSpeed.y, this.playerSpeed.z);
            }
            if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.SPACE, ƒ.KEYBOARD_CODE.W]) && isGrounded) {
                this.fallingSpeed = 10;
                isGrounded = false;
                /*
                //fixes unlimited upwards speed
                if (this.maxFallSpeed <= this.fallingSpeed) {
                    this.maxFallSpeed = this.fallingSpeed + 0.1;
                }
                */
            }
            if (!isGrounded) {
                //limits the speed of falling
                /*
                if (Math.abs(this.fallingSpeed) <= this.maxFallSpeed) {
                    this.fallingSpeed += this.gravity;
                }
                */
                this.fallingSpeed += this.gravity * this.deltaTimeSeconds;
                this.playerSpeed = new ƒ.Vector3(this.playerSpeed.x, this.fallingSpeed * this.deltaTimeSeconds, this.playerSpeed.z);
            }
            this.movement(isGrounded);
        }
        movement(isGrounded) {
            if (isGrounded) {
                //playerSpeed = new ƒ.Vector3(playerSpeed.y, 0, playerSpeed.z);
                this.fallingSpeed = 0;
                this.alucard.mtxLocal.translate(new ƒ.Vector3(this.playerSpeed.x, 0, this.playerSpeed.z));
                //Rounding is ok for now, grid is 1x1 so player wont be walking on air/ground
                this.alucard.mtxLocal.translation = new ƒ.Vector3(this.alucard.mtxLocal.translation.x, Math.round(CastleV.CollisionDetection.lastCollision.y), this.alucard.mtxLocal.translation.z);
            }
            else {
                this.alucard.mtxLocal.translate(this.playerSpeed);
            }
        }
    }
    CastleV.Player = Player;
})(CastleV || (CastleV = {}));
//# sourceMappingURL=Script.js.map