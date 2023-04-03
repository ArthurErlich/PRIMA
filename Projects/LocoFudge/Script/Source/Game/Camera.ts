namespace LocoFudge {
    import ƒ = FudgeCore;
    export class Camera {

        private viewport: ƒ.Viewport;
        private canvas: HTMLCanvasElement;

        public root: ƒ.Node;
        public camComp: ƒ.ComponentCamera;
        public fieldOfView: number = 5;
        public startClipping: number = 0.2;
        public endClipping: number = 10000;

        //multiply cameras? -> than array. + Active cam




        public init(): void {
            this.viewport = GameManager.viewport;
            this.canvas = GameManager.canvas;


            //create the camera and add it to the viewport
            this.root = new ƒ.Node("CameraRoot");
            this.root.addComponent(new ƒ.ComponentTransform());
            this.camComp = new ƒ.ComponentCamera();

            let aspectRatio: number = this.canvas.clientWidth / this.canvas.clientHeight;

            this.camComp.projectCentral(aspectRatio, this.fieldOfView, ƒ.FIELD_OF_VIEW.DIAGONAL, this.startClipping, this.endClipping);

            ///Start Values for FAKE Orthographic View\\\
            this.camComp.mtxPivot.translateZ(160);
            this.camComp.mtxPivot.translateX(-110);
            this.camComp.mtxPivot.translateY(-110);




            this.camComp.mtxPivot.rotateY(180);
            this.camComp.mtxPivot.rotateZ(45);
            this.camComp.mtxPivot.rotateX(-45);
            this.root.addComponent(this.camComp);
            console.log("Camera initiated");
        }

        ///Camera Controller\\\ 
        public cameraMovementUpdate(deltaSeconds: number): void {

            let moveDirection: ƒ.Vector3 = new ƒ.Vector3(0, 0, 0);

            if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.W, ƒ.KEYBOARD_CODE.ARROW_UP])) {
                moveDirection = new ƒ.Vector3(moveDirection.x, 1, moveDirection.z);
            }
            if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.S, ƒ.KEYBOARD_CODE.ARROW_DOWN])) {
                moveDirection = new ƒ.Vector3(moveDirection.x, -1, moveDirection.z);
            }
            if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.A, ƒ.KEYBOARD_CODE.ARROW_LEFT])) {
                moveDirection = new ƒ.Vector3(1, moveDirection.y, moveDirection.z);
            }
            if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.D, ƒ.KEYBOARD_CODE.ARROW_RIGHT])) {
                moveDirection = new ƒ.Vector3(-1, moveDirection.y, moveDirection.z);
            }
            
            if (moveDirection.magnitude > 0) {
                moveDirection.normalize();
            }
            moveDirection.scale(10 * deltaSeconds);
            this.camComp.mtxPivot.translate(moveDirection);


            //Mouse movement
        }
    }
}