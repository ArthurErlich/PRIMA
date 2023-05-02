namespace HomeFudge {
    import ƒ = FudgeCore;
    export class Destroyer extends Ship {
        protected maxSpeed: number = null;
        protected maxAcceleration: number = null;
        protected velocity: ƒ.Vector3 = null;
        protected healthPoints: number = null;
        protected maxTurnRate: number = null;

        //TODO:make private
        private gatlingTurret: GatlingTurret = null;
        private beamTurretList: BeamTurret[] = null;

        //list of weapons
        public weapons = Weapons;

        static graph: ƒ.Graph = null;
        static mesh: ƒ.Mesh = null;
        static material: ƒ.Material = null;

        private async initAllConfigs(startPosition:ƒ.Vector3) {
            Destroyer.graph = await Ship.getGraphResources(Config.destroyer.graphID);
            let node: ƒ.Node = await Ship.getComponentNode("Destroyer", Destroyer.graph);

            let transNode = new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(startPosition));//TODO: move after turret are loaded!
            this.addComponent(transNode);

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
        public fireGatling(){
            this.gatlingTurret.fire(this.velocity);
        }
        public fireBeam(){
            this.beamTurretList.forEach(turret => {
                turret.fire();
            });
        }
        constructor(startPosition: ƒ.Vector3) {
            super("Destroyer");
            this.initAllConfigs(startPosition);
            ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, this.update);
        }
    }
    enum Weapons{
        GatlingTurret,
        BeamTurret,
        RocketPod
    }
}

