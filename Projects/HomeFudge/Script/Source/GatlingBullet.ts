namespace HomeFudge {
    import ƒ = FudgeCore;
    export class GatlingBullet extends Bullet {
        lifeTime: number;
        maxSpeed: number;
        graph:ƒ.Graph;
        worldNode:ƒ.Node;
        // faction: string;

        //TODO: implement bullet updating
        public update(deltaSeconds: number): void {
            // console.warn("Method not implemented.");
            //TODO:implement bullet lifetime degradation and speed from Interface
            this.lifeTime -= deltaSeconds;
            this.mtxLocal.translateX(200 *deltaSeconds);
        }
        public alive(): boolean {
            return this.lifeTime >= 0;
        }
        public toString(): string {
            return this.name + "POSITION:";
        }
        public kill(): void {
            //remove bullet from viewGraph
            //TODO:Verify if it is a valid approach
            this.getParent().removeChild(this);
        }
        constructor(lifeTime: number,spawnTransform:ƒ.Matrix4x4) {
            super("Gatling");
            this.lifeTime = lifeTime;

            //TODO: load components from graph and not crate them on the fly.
            this.addComponent(new ƒ.ComponentTransform(spawnTransform));// right place
            this.addComponent(new ƒ.ComponentMesh(new ƒ.MeshPyramid()));//needs to be laoded from the recources graph
            this.addComponent(new ƒ.ComponentMaterial(new ƒ.Material("test",ƒ.ShaderLit))); //needs to be laoded from the recources graph
            console.warn("Shoot "+ this.name);
        }
    }
    //TODO:find a better way for interfaces. Maybe just once in a interface class?
    //TODO:create GattlincBulletConfig
    interface GatlingBulletConfig {
        graphID: string;
        lifeTime: number;
        maxSpeed: number;
        [key: string]: string|number;
    }
}