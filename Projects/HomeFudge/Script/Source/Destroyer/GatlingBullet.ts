namespace HomeFudge {
    import ƒ = FudgeCore;
    //TODO:create a logic for Hit detection. Using a physics engine of Fudge
    export class GatlingBullet extends Bullet {
        protected maxLifeTime: number = null;
        protected maxSpeed: number = null;
        protected spreadRadius: number = null;

        static graph: ƒ.Graph = null;
        static worldNode: ƒ.Node = null;
        static mesh: ƒ.Mesh = null;
        static material: ƒ.Material = null;

        //TODO: try faction out.
        // faction: FACTION="FACTION.A";

        public update(): void {
            //goes out of the update loop as long the date is received into the config variable
            if (this.maxLifeTime == null || this.maxSpeed == null) {
                return
            }
            this.maxLifeTime -= _deltaSeconds;
            this.mtxLocal.translateX(this.maxSpeed * _deltaSeconds);
            if(!this.alive()){
                this.destroyNode();
            }
        }
        //TODO:Remove init configs and make a LoadAllConfigsClass!
        private async initBulletConfig(): Promise<void> {
            GatlingBullet.graph = await Bullet.getGraphResources(Config.gatlingBullet.graphID);

            ///initAttributes\\\
            this.maxLifeTime = Config.gatlingBullet.maxLifeTime;
            this.maxSpeed = Config.gatlingBullet.maxSpeed;

            let node: ƒ.Node = await Bullet.getComponentNode("GatlingBullet", GatlingBullet.graph);
            if (GatlingBullet.mesh == null) {
                GatlingBullet.mesh = node.getComponent(ƒ.ComponentMesh).mesh;
            }
            if (GatlingBullet.material == null) {
                GatlingBullet.material = node.getComponent(ƒ.ComponentMaterial).material;
            }

            this.addComponent(new ƒ.ComponentMesh(GatlingBullet.mesh));
            this.addComponent(new ƒ.ComponentMaterial(GatlingBullet.material));
            

        }

        public alive(): boolean {
            //TODO:put alive check inside bullet update function
            if (this.maxLifeTime == null) {
                return true;
            }
            return this.maxLifeTime >= 0;
        }
        public toString(): string {
            return this.name + "POSITION: " + this.mtxWorld.translation.toString();
        }
        public destroyNode(): void {
            //remove bullet from viewGraph
            //TODO:Verify if it is a valid approach
            this.getParent().removeChild(this);
        }
        constructor(spawnTransform: ƒ.Matrix4x4) {
            super("Gatling");
            this.addComponent(new ƒ.ComponentTransform(spawnTransform));
            this.initBulletConfig();
        }
    }
}