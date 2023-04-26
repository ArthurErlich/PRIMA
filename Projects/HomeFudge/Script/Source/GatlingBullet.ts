namespace HomeFudge {
    import ƒ = FudgeCore;
    export class GatlingBullet extends Bullet {
        lifeTime: number;
        speed:number;
        // faction: string;

        //TODO: implement bullet updating
        public update(deltaSeconds: number): void {
            // console.warn("Method not implemented.");
            //TODO:implement bullet lifetime degradation
            this.lifeTime -= deltaSeconds;
        }
        public alive():boolean{
            return this.lifeTime>=0;
        }

        public toString(): string {
            return this.name + "POSITION:";
        }
        constructor(lifeTime:number, id:number) {
            super(id.toString());
            this.lifeTime = lifeTime;
            this.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(new ƒ.Vector3(id/10,0,0))));
        }
    }
    //TODO:find a better way for interfaces. Maybe just once in a interface class?
    interface BulletConfig{
        graphID: string;
        [key: string]: string;
    }
}