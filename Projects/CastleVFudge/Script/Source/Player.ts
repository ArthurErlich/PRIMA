namespace CastleV {
    import ƒ = FudgeCore;

    export class Player {
        public alucard: ƒ.Node = null;
        public pivot: ƒ.Node = null;

        private maxWalkSpeed: number = 3;
        private gravity: number = -30;
        private fallingSpeed: number = 0;
        //--> maxFallSpeed is used below, //TODO: check implementation of fall speed
        private maxFallSpeed: number = 0.2;

        private playerSpeed: ƒ.Vector3 = new ƒ.Vector3(0, 0, 0);
        private material: ƒ.ComponentMaterial = null;

        //deltaTime
        private deltaTimeSeconds: number = 0;

        //animation
        private updateTime: number = 0.045;
        private elapsedTimeAnim: number = 0;

        constructor(viewport: ƒ.Viewport) {
            this.alucard = viewport.getBranch().getChildrenByName("Character")[0];

            this.pivot = this.alucard.getChildrenByName("Alucard")[0]
            this.material = this.pivot.getComponent(ƒ.ComponentMaterial);
        }

        //updates the Player -> called in Main.ts update Loop
        public update(deltaTimeSeconds: number): void {
            this.deltaTimeSeconds = deltaTimeSeconds;
            this.input();
        }

        public resetPlayer(): void {
            this.playerSpeed = new ƒ.Vector3(0, 0, 0);
            this.fallingSpeed = 0;

            this.alucard.mtxLocal.translation = new ƒ.Vector3(0, 1, 0);//TODO: Change to spawnpoint
        }

        private input(): void {
            let isGrounded = true;
            this.playerSpeed = new ƒ.Vector3(0, 0, 0);


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
                this.updatePlayerAnim(WalkDirection.RIGHT);
            }
            else if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_LEFT, ƒ.KEYBOARD_CODE.A]) && !(CollisionDetection.check(this.alucard.mtxWorld).find(e => e == Collision.LEFT) == Collision.LEFT)) {
                this.playerSpeed = new ƒ.Vector3(-this.maxWalkSpeed * this.deltaTimeSeconds, this.playerSpeed.y, this.playerSpeed.z);
                this.updatePlayerAnim(WalkDirection.LEFT);
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

        private updatePlayerAnim(direction: WalkDirection): void {
            this.elapsedTimeAnim += ƒ.Loop.timeFrameGame / 1000;

            if (this.elapsedTimeAnim >= this.updateTime && direction == WalkDirection.RIGHT) {

                this.material.mtxPivot.translateX(0.0625);

                this.elapsedTimeAnim = 0;

            } else if (this.elapsedTimeAnim >= this.updateTime && direction == WalkDirection.LEFT) {

                this.material.mtxPivot.translateX(-0.0625);
                //TODO:Rotate Alucards TexturedMesh
                this.elapsedTimeAnim = 0;
            }
        }

    }
    enum WalkDirection {
        LEFT = 0,
        RIGHT = 1
    }
}