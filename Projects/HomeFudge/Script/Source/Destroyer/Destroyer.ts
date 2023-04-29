namespace HomeFudge {
    import ƒ = FudgeCore;
    export class Destroyer extends Ship {
        protected velocity: ƒ.Vector3 = null;
        protected healthPoints: number = null;

        //TODO:make private
        public gatlingTurret: GatlingTurret = null;
        public laserTurretLiest: LaserTurret[] = null;

        static graph: ƒ.Graph = null;
        static worldNode: ƒ.Node = null;
        static mesh: ƒ.Mesh = null;
        static material: ƒ.Material = null;

        //TODO:Remove init configs and make a LoadAllConfigsClass!
        private async initAllConfigs() {
            Destroyer.graph = await Ship.getGraphResources(Config.destroyer.graphID);
            let node: ƒ.Node = await Destroyer.getComponentNode("Destroyer", Destroyer.graph);

            //init mesh and material
            Destroyer.mesh =  node.getComponent(ƒ.ComponentMesh).mesh;
            Destroyer.material = node.getComponent(ƒ.ComponentMaterial).material;

            //init configs
            this.velocity = new ƒ.Vector3(0, 0, 0);

            //init Weapons
            this.addWeapons();

            //init Components
            this.setAllComponents();
            
        }
        private addWeapons():void{
            this.gatlingTurret = new GatlingTurret();

            this.addChild(this.gatlingTurret);
        }
        private setAllComponents():void{
            if(Destroyer.material == null || Destroyer.mesh == null){
                console.warn(this.name + " Mesh and/or Material is missing");
                return;
            }
            this.addComponent(new ƒ.ComponentMaterial(Destroyer.material));
            this.addComponent(new ƒ.ComponentMesh(Destroyer.mesh));
        }
        public update(): void {
            this.gatlingTurret.update(_deltaSeconds);
            if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.SPACE])) {
                console.log("SpaceBarPressed");
                this.gatlingTurret.shoot();
            }
        }
        public alive(): boolean {
            //console.error("Method not implemented.");
            return true;
        }
        public destroyNode(): void {
            //console.error("Method not implemented.");
            return null;
        }
        public toString(): string {
            //console.error("Method not implemented.");
            return null;
        }

        constructor(position: ƒ.Vector3) {
            super("Destroyer");
            this.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(position)));
            this.initAllConfigs();
        }
    }

}

