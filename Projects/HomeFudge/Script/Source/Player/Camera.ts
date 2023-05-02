namespace HomeFudge{
    import ƒ = FudgeCore;
    export class Camera extends ƒ.Node{
        public attachedTo:ƒ.Node = null;
        public camComp:ƒ.ComponentCamera = null;

        private offset:ƒ.Vector3 = null;

        public attachToShip(ship:ƒ.Node):void{
            this.offset = JSONparser.toVector3(Config.camera.offset);
            this.camComp.mtxPivot.translation = this.offset;
            
            this.attachedTo = ship;
            this.mtxLocal.set(ship.mtxWorld);
            this.camComp.mtxPivot.rotation = new ƒ.Vector3(0,-270,0);//TODO: Sound Bug when Pivot is rotated 
            //TODO: add node for campComp

            ship.addChild(this);

        }
        private update = (): void =>{
            //TODO: remove test rotation
            this.mtxLocal.rotateY(10*_deltaSeconds);

        }
        
        private init(){
            this.camComp = new ƒ.ComponentCamera();
            this.camComp.projectCentral(1.77, 70, ƒ.FIELD_OF_VIEW.DIAGONAL, 0.1, 30000);
            this.camComp = this.camComp;

            this.addComponent(this.camComp);
            this.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(ƒ.Vector3.ZERO())));
            
        }
        constructor(name:string){
            super(name+"Camera");
            this.init();
             ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, this.update);
        }
    }
}
