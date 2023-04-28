namespace HomeFudge{
    import ƒ = FudgeCore;
    export class Destroyer extends Ship {
        protected velocity: ƒ.Vector3;

        static graph: ƒ.Graph = null;
        static worldNode: ƒ.Node = null;
        static mesh: ƒ.Mesh = null;
        static material: ƒ.Material = null;
        static bulletConfig: DestroyerConfig = null;
        
        public update(deltaSeconds: number): void {
            throw new Error("Method not implemented.");
        }
        public alive(): boolean {
            throw new Error("Method not implemented.");
        }
        public destroyNode(): void {
            throw new Error("Method not implemented.");
        }
        public toString(): string {
            throw new Error("Method not implemented.");
        }
        constructor(){
            super("Destroyer");
        }
    }
    interface DestroyerConfig {
        graphID: string;
        maxLifeTime: number;
        maxSpeed: number;
        spreadRadius: number;
        [key: string]: string | number;
    }
}
