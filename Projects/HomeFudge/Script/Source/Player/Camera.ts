namespace HomeFudge{
    import ƒ = FudgeCore;
    export class Camera extends ƒ.Node{
        public aimPoinz:ƒ.Vector3 = null;
        public attachedTo:ƒ.Node = null;
        public camComp:ƒ.ComponentCamera = null;

        private offset:ƒ.Vector3 = null;

        public attachToShip(ship:ƒ.Node):void{
            this.offset = JSONparser.toVector3(Config.camera.offset);
            this.camComp.mtxPivot.translation = this.offset;
            
            this.attachedTo = ship;
            this.mtxLocal.set(ship.mtxWorld);

        }
        private update = (): void =>{    

        }
        
        private init(){
            this.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(ƒ.Vector3.ZERO())));
            let cameraComponent:ƒ.ComponentCamera = new ƒ.ComponentCamera();
            cameraComponent.projectCentral(1.77, 80, ƒ.FIELD_OF_VIEW.DIAGONAL, 0.1, 30000);
            cameraComponent.mtxPivot.rotation.set(0,-90,0);
            this.camComp = cameraComponent;
            this.addComponent(cameraComponent);
            //TODO:remove debug
            //TEST CUBE
            //  this.addComponent(new ƒ.ComponentMaterial(new ƒ.Material("test",ƒ.ShaderLit)));
            //  this.addComponent(new ƒ.ComponentMesh(new ƒ.MeshCube()));
            //  this.getComponent(ƒ.ComponentMesh).mtxPivot.translation = this.offset;
        }
        constructor(name:string){
            super(name+"Camera");
            this.init();
             ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, this.update);
        }
    }
}
