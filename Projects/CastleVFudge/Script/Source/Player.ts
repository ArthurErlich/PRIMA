namespace CastleV {
    import ƒ = FudgeCore;

    export class Player {
        public alucard: ƒ.Node = null;
        private gravity: number = -1;
        private playerSpeed: ƒ.Vector3 = new ƒ.Vector3(0, 0, 0);
        private fallingSpeed:number =0;
        private maySpeed: number = 5;
        private maxFallSpeed: number = 1;
      
        private material: ƒ.ComponentMaterial = null;
        
        //deltaTime
        private deltaTimeSeconds: number = 0;

        //animation
        private elapsedTimeAnim: number = 0;

        constructor(viewport: ƒ.Viewport) {
            this.alucard = viewport.getBranch().getChildrenByName("Character")[0];

            this.material = this.alucard.getComponent(ƒ.ComponentMaterial);
        }

        public update(deltaTimeSeconds:number): void {
            this.deltaTimeSeconds = deltaTimeSeconds;
            this.input();
        }

        private input(): void {
            let isGrounded = true;
            this.playerSpeed = new ƒ.Vector3(0,0,0);
        
            if (0.5 < this.alucard.mtxLocal.translation.y + this.fallingSpeed) {
              isGrounded = false;
            } else {
              isGrounded = true;
            }
        
            if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_RIGHT, ƒ.KEYBOARD_CODE.D])) {
                this.playerSpeed = new ƒ.Vector3(5 * this.deltaTimeSeconds, this.playerSpeed.y, this.playerSpeed.z);
                this.updatePlayerAnim(WalkDirection.RIGHT);
            }
            if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_LEFT, ƒ.KEYBOARD_CODE.A])) {
                this.playerSpeed = new ƒ.Vector3(-5 * this.deltaTimeSeconds, this.playerSpeed.y, this.playerSpeed.z);
              this.updatePlayerAnim(WalkDirection.LEFT);
            }
            if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.SPACE, ƒ.KEYBOARD_CODE.W]) && isGrounded) {
                this.fallingSpeed = 0.2;
                this.alucard.mtxLocal.translateY(0);
              isGrounded = false;
            }
        
            if (!isGrounded ) {
              //limits the speed of falling
              if(Math.abs(this.fallingSpeed) <= 0.2){
                this.fallingSpeed += this.gravity * this.deltaTimeSeconds;
              }
              this.playerSpeed = new ƒ.Vector3(this.playerSpeed.x, this.fallingSpeed, this.playerSpeed.z);
            }

            this.movement(isGrounded);
        }
        
        private movement(isGrounded:boolean): void {
            if (isGrounded) {
                //playerSpeed = new ƒ.Vector3(playerSpeed.y, 0, playerSpeed.z);
                this.fallingSpeed = 0;
                this.alucard.mtxLocal.translate(new ƒ.Vector3(this.playerSpeed.x,0, this.playerSpeed.z));
                this.alucard.mtxLocal.translation = new ƒ.Vector3(this.alucard.mtxLocal.translation.x, 0.5, this.alucard.mtxLocal.translation.z);
              } else {
                this.alucard.mtxLocal.translate(this.playerSpeed);
              }
        }

        private updatePlayerAnim(direction: WalkDirection): void {
            let updateTime: number = 0.06;
            this.elapsedTimeAnim += ƒ.Loop.timeFrameGame / 1000;

            if (this.elapsedTimeAnim >= updateTime && direction == WalkDirection.RIGHT) {

                this.material.mtxPivot.translateX(0.0625);
                this.elapsedTimeAnim = 0;
            } else if (this.elapsedTimeAnim >= updateTime && direction == WalkDirection.LEFT) {

                this.material.mtxPivot.translateX(-0.0625);
                this.elapsedTimeAnim = 0;
            }
        }

    }
    enum WalkDirection {
        LEFT = 0,
        RIGHT = 1
    }
}