namespace HomeFudge {
    import ƒ = FudgeCore;
    export class Destroyer extends Ship {
        protected maxSpeed: number = null;
        protected maxAcceleration: number = null;
        protected velocity: ƒ.Vector3 = null;
        protected healthPoints: number = null;
        protected maxTurnRate: number = null;

        //TODO:make private
        public gatlingTurret: GatlingTurret = null;
        public laserTurretList: LaserTurret[] = null;

        static graph: ƒ.Graph = null;
        static worldNode: ƒ.Node = null;//TODO: remove
        static mesh: ƒ.Mesh = null;
        static material: ƒ.Material = null;

        private async initAllConfigs() {
            Destroyer.graph = await Ship.getGraphResources(Config.destroyer.graphID);
            let node: ƒ.Node = await Ship.getComponentNode("Destroyer", Destroyer.graph);

            //init mesh and material
            Destroyer.mesh = node.getComponent(ƒ.ComponentMesh).mesh;
            Destroyer.material = node.getComponent(ƒ.ComponentMaterial).material;

            //init configs
            if(this.velocity == null){
                this.velocity = new ƒ.Vector3(0, 0, 0);
            }
            this.maxAcceleration = Config.destroyer.maxAcceleration;
            this.maxSpeed = Config.destroyer.maxSpeed

            //init Weapons
            this.addWeapons();

            //init Components
            this.setAllComponents();

        }
        private addWeapons(): void {
            this.gatlingTurret = new GatlingTurret();

            this.addChild(this.gatlingTurret);
        }
        private setAllComponents(): void {
            if (Destroyer.material == null || Destroyer.mesh == null) {
                console.warn(this.name + " Mesh and/or Material is missing");
                return;
            }
            this.addComponent(new ƒ.ComponentMaterial(Destroyer.material));
            this.addComponent(new ƒ.ComponentMesh(Destroyer.mesh));
        }
        protected update = (): void => {
            this.mtxLocal.translate(new ƒ.Vector3(
                this.velocity.x * _deltaSeconds,
                this.velocity.y * _deltaSeconds,
                this.velocity.z * _deltaSeconds)); 
        }
        public alive(): boolean {
            //console.error("Method not implemented.");
            return true;
        }
        public destroyNode(): void {
            //console.error("Method not implemented.");
            return null;
        }
        public getVelocity(): ƒ.Vector3 {
            return this.velocity;
        }
        public toString(): string {
            //console.error("Method not implemented.");
            return null;
        }
        public fire(){
            this.gatlingTurret.fire(this.velocity);
        }
        constructor(position: ƒ.Vector3) {
            super("Destroyer");
            let tempComp = new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(position));//TODO: move after turret are loaded!
            //ROTATION WILL BREAK OFFSET OF GUNS
            this.addComponent(tempComp);
            this.initAllConfigs();
            ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, this.update);
        }
    }

}

