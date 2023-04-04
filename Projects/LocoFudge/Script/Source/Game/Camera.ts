namespace LocoFudge {
    import ƒ = FudgeCore;
    export class Camera {

        private canvas: HTMLCanvasElement;

        public root: ƒ.Node;
        //multiply cameras? -> than array. + Active cam
        public componentCamera: ƒ.ComponentCamera;
        public fieldOfView: number = 5;
        public startClipping: number = 0.2;
        public endClipping: number = 10000;

        public init(): void {
            this.canvas = GameManager.canvas;


            //create the camera and add it to the viewport
            this.root = new ƒ.Node("CameraRoot");
            this.root.addComponent(new ƒ.ComponentTransform());
            this.componentCamera = new ƒ.ComponentCamera();

            let aspectRatio: number = this.canvas.clientWidth / this.canvas.clientHeight;

            this.componentCamera.projectCentral(aspectRatio, this.fieldOfView, ƒ.FIELD_OF_VIEW.DIAGONAL, this.startClipping, this.endClipping);

            ///Start Position for FAKE Orthographic View\\\
            this.componentCamera.mtxPivot.translateZ(160);
            this.componentCamera.mtxPivot.translateX(-110);
            this.componentCamera.mtxPivot.translateY(-110);

            ///Start Rotation for FAKE Perspective View\\\
            this.componentCamera.mtxPivot.rotateY(180);
            this.componentCamera.mtxPivot.rotateZ(45);
            this.componentCamera.mtxPivot.rotateX(-45);
            this.root.addComponent(this.componentCamera);
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
            this.componentCamera.mtxPivot.translate(moveDirection);
            //Mouse movement
        }
    }
}