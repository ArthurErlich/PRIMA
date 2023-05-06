namespace HomeFudge {
    import ƒ = FudgeCore;
    enum SIDE {
        LEFT,
        RIGHT
    }
    export class BeamTurret extends ƒ.Node {

        public static side: typeof SIDE = SIDE;

        private static graph: ƒ.Graph = null;
        private static mesh: ƒ.Mesh = null;
        private static material: ƒ.Material = null;

        private beam:LaserBeam = null

        
        private maxRotSpeed: number;
        private maxPitch: number;
        private minPitch: number;
        private maxBeamTime: number;
        private maxReloadTime: number;
        private range: number;
        


        private async init(side: SIDE): Promise<void> {
            BeamTurret.graph = await Resources.getGraphResources(Config.beamTurret.graphID);
            let resourceNode: ƒ.Node = await Resources.getComponentNode("BeamTurret", BeamTurret.graph);
            if (BeamTurret.material == null || BeamTurret.mesh) {
                BeamTurret.material = resourceNode.getComponent(ƒ.ComponentMaterial).material;
                BeamTurret.mesh = resourceNode.getComponent(ƒ.ComponentMesh).mesh;
            }

            //Init turret configs
            
            this.maxRotSpeed = Config.beamTurret.maxRotSpeed;
            this.maxPitch = Config.beamTurret.maxPitch;
            this.minPitch = Config.beamTurret.minPitch;
            this.maxBeamTime = Config.beamTurret.beamTime;
            this.maxReloadTime = Config.beamTurret.reloadTime;
            this.range = Config.beamTurret.range;
            
            let turretPos: ƒ.Vector3 = JSONparser.toVector3(Config.beamTurret.basePosition)
            switch (side) {
                case SIDE.LEFT:
                    console.log("adding Beam: LEFT");
                    this.addBeam("LEFT");
                    turretPos.set(turretPos.x, turretPos.y, -turretPos.z)
                    this.addComponents(turretPos);
                    this.mtxLocal.rotateX(-90);

                    //fix Pitch
                    let tempPitch = this.maxPitch;
                    this.maxPitch = this.minPitch;
                    this.minPitch = tempPitch;
                    break;
                case SIDE.RIGHT:
                    console.log("adding Beam: RIGHT");
                    this.addBeam("RIGHT");
                    this.addComponents(turretPos);
                    this.mtxLocal.rotateX(90);
                    break;
                default:
                    break;
            }
        }
        private addBeam(side: string): void {
            let beamPos: ƒ.Vector3 = JSONparser.toVector3(Config.beamTurret.beamPosition);
            this.beam = new LaserBeam(side, beamPos)
            this.addChild(this.beam);

        }
        private addComponents(position: ƒ.Vector3) {
            this.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(position)));
            this.addComponent(new ƒ.ComponentMaterial(BeamTurret.material));
            this.addComponent(new ƒ.ComponentMesh(BeamTurret.mesh));
        }
        private update = (): void => {
            this.rotate(15 * _deltaSeconds);
        }
        public fire() {
            throw new Error("Method not implemented.");
        }
        public rotate(rot:number){
            //ROTATION is only between -180° and 180°. Y starts at 0°
            console.log(Math.round(this.mtxWorldInverse.rotation.y));
            this.mtxLocal.rotateY(rot);
            
        }

        constructor(side: SIDE) {
            super("BeamTurret");
            this.init(side);
            ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, this.update);
        }
    }
}