namespace CastleV {
    import ƒ = FudgeCore;

    export class Player {
        public alucard: ƒ.Node = null;
        // public pivot: ƒ.Node = null;
        public meshNode: ƒ.Node = null;

        ///Movement\\\
        private maxWalkSpeed: number = 3;
        private gravity: number = -30;
        private fallingSpeed: number = 0;
        private maxFallingSpeed: number = 40;
        //--> maxFallSpeed is used below, //TODO: check implementation of fall speed
        //If the player falls too fast on a slow computer, the player will fall trough a block.
        //private maxFallSpeed: number = 0.2;
        private playerSpeed: ƒ.Vector3 = new ƒ.Vector3(0, 0, 0);

        ///Material\\\
        private material: ƒ.ComponentMaterial = null;

        ///Animation\\\
        private animation: ƒ.Animation = null;

        ///AnimationSprite\\\
        private animationSprite: ƒ.AnimationSprite[] = new Array();

        ///Audio\\\
        private soundTrack: ƒ.ComponentAudio = null;
        private soundListener: ƒ.ComponentAudioListener = null;


        //deltaTime
        private deltaTimeSeconds: number = 0;
        


        constructor(viewport: ƒ.Viewport) {
            this.alucard = viewport.getBranch().getChildrenByName("Character")[0];
            this.meshNode = this.alucard.getChild(0).getChild(0);

            // this.pivot = this.alucard.getChildrenByName("Alucard")[0];
            this.material = this.meshNode.getComponent(ƒ.ComponentMaterial);
            this.animation = this.meshNode.getComponent(ƒ.ComponentAnimator).animation;

            // audio setup
            this.soundListener = this.alucard.getChild(0).getComponent(ƒ.ComponentAudioListener);
            this.soundTrack = this.alucard.getChild(0).getComponent(ƒ.ComponentAudio);

            //animation
            this.animationSprite = [
                ƒ.Project.getResourcesByName("Anim_Idl")[0] as ƒ.AnimationSprite,
                ƒ.Project.getResourcesByName("Anim_Walking")[0] as ƒ.AnimationSprite,
                ƒ.Project.getResourcesByName("Anim_StartWalk")[0] as ƒ.AnimationSprite,
                ƒ.Project.getResourcesByName("Anim_Falling")[0] as ƒ.AnimationSprite,
              ];
                        
        }

        //updates the Player -> called in Main.ts update Loop
        public update(deltaTimeSeconds: number): void {
            this.deltaTimeSeconds = deltaTimeSeconds;
            this.input();

            if (this.getSpeed().x == 0.0) {
                this.setAnimation(this.animationSprite[0], ANIMATION_DIRECTION.Right);
            }
        }

        public resetPlayer(): void {
            this.playerSpeed = new ƒ.Vector3(0, 0, 0);
            this.fallingSpeed = 0;

            this.alucard.mtxLocal.translation = new ƒ.Vector3(0, 1, 0);//TODO: Change to spawnpoint
        }

        public setAnimation(animation: ƒ.Animation, direction:ANIMATION_DIRECTION):void{
            if(this.animation == animation){
                return;
            }
            if(direction == null){
                direction = ANIMATION_DIRECTION.Right;
            }
            if(direction == ANIMATION_DIRECTION.Right){
                this.meshNode.mtxLocal.rotation = new ƒ.Vector3(0, 0, 0);
            }
            if(direction == ANIMATION_DIRECTION.Left){
                this.meshNode.mtxLocal.rotation = new ƒ.Vector3(0, 180, 0);
            }

            this.animation = animation;
            this.meshNode.getComponent(ƒ.ComponentAnimator).animation = this.animation;
            //TODO: change animation direction by changing the rotation of the mesh component            
        }
        public rotateMesh(rotation: number): void {
            this.meshNode.mtxLocal.rotation.set(0, rotation, 0);
        }

        public getSpeed():ƒ.Vector3{
            return this.playerSpeed;
        }
        public getMaterial():ƒ.ComponentMaterial{
            return this.material;
        }

        private input(): void {
            let isGrounded = true;
            this.playerSpeed = new ƒ.Vector3(0, 0, 0);

            //CollisionDetection.check(this.alucard.mtxWorld) <- make that with vector 3 instand of matrix

            if (CollisionDetection.check(this.alucard.mtxWorld).find(e => e == Collision.DOWN) != Collision.DOWN) {
                isGrounded = false;
            } else {
                isGrounded = true;
            }
            // console.log(CollisionDetection.check(this.alucard.mtxWorld) != Collision.DOWN);
            // console.log(this.alucard.mtxWorld.translation +"");
            // console.log(CollisionDetection.lastCollisionY);


            if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_RIGHT, ƒ.KEYBOARD_CODE.D]) && !(CollisionDetection.check(this.alucard.mtxWorld).find(e => e == Collision.RIGHT) == Collision.RIGHT)) {
                this.playerSpeed = new ƒ.Vector3(this.maxWalkSpeed * this.deltaTimeSeconds, this.playerSpeed.y, this.playerSpeed.z);
                this.setAnimation(this.animationSprite[1], ANIMATION_DIRECTION.Right);                
            }
            else if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_LEFT, ƒ.KEYBOARD_CODE.A]) && !(CollisionDetection.check(this.alucard.mtxWorld).find(e => e == Collision.LEFT) == Collision.LEFT)) {
                this.playerSpeed = new ƒ.Vector3(-this.maxWalkSpeed * this.deltaTimeSeconds, this.playerSpeed.y, this.playerSpeed.z);
                this.setAnimation(this.animationSprite[1], ANIMATION_DIRECTION.Left);                

            }
            if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.SPACE, ƒ.KEYBOARD_CODE.W]) && isGrounded) {
                this.fallingSpeed = 10;
                isGrounded = false;
                
                //fixes unlimited upwards speed bug and sloows down the player when he falls
                if (this.fallingSpeed > this.maxFallingSpeed) {
                    this.fallingSpeed = this.maxFallingSpeed
                }
                
            }

            if (!isGrounded) {
                //limits the speed of falling
                
                if (Math.abs(this.fallingSpeed) > this.maxFallingSpeed) {
                    this.fallingSpeed = this.maxFallingSpeed;
                }
                this.fallingSpeed += this.gravity * this.deltaTimeSeconds;
                
                this.playerSpeed = new ƒ.Vector3(this.playerSpeed.x, this.fallingSpeed * this.deltaTimeSeconds, this.playerSpeed.z);
            }

            this.movement(isGrounded);
        }

        private movement(isGrounded: boolean): void {
            if (isGrounded) {
                //playerSpeed = new ƒ.Vector3(playerSpeed.y, 0, playerSpeed.z);
                this.fallingSpeed = 0;
                this.alucard.mtxLocal.translate(new ƒ.Vector3(this.playerSpeed.x, 0, this.playerSpeed.z));
                //Rounding is ok for now, grid is 1x1 so player wont be walking on air/ground
                this.alucard.mtxLocal.translation = new ƒ.Vector3(this.alucard.mtxLocal.translation.x, Math.round(CollisionDetection.lastCollision.y), this.alucard.mtxLocal.translation.z);

            } else {
                this.alucard.mtxLocal.translate(this.playerSpeed);
            }
        }
    }
}
        
        

        /*
        //TODO:Remove old implementation of Animation
        private updatePlayerAnim(direction: WalkDirection): void {
            this.elapsedTimeAnim += ƒ.Loop.timeFrameGame / 1000;

            if (this.elapsedTimeAnim >= this.updateTime && direction == WalkDirection.RIGHT) {

                this.material.mtxPivot.translateX(0.0625);

                this.elapsedTimeAnim = 0;

            } else if (this.elapsedTimeAnim >= this.updateTime && direction == WalkDirection.LEFT) {

                this.material.mtxPivot.translateX(-0.0625);

                this.elapsedTimeAnim = 0;
            }
        }

        */