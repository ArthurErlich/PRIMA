namespace LocoFudge {
    //the world itself with the tiles Maybe solvable trough fudges nodes
    import ƒ = FudgeCore;

    export class World {
        private node: ƒ.Node = null;
        private worldSize: number = null;
        private tiles: Tile[] = null;

        public generateWorld(worldSize: WORLDSIZE): void {
         
            this.worldSize = worldSize;
            this.node = new ƒ.Node("World");

            this.tiles = new Array(this.worldSize * this.worldSize);
            let x: number = -1; //small fix for array
            let y: number = 0;
            for (let index: number = 0; index < this.worldSize * this.worldSize; index++) {
                if (index % this.worldSize == 0) {
                    x++;
                    y=0;
                }
                this.tiles[index] = new Tile(index,new ƒ.Vector3(x,y,0));
                this.node.appendChild(this.tiles[index].getNode());
                y++;
            }
        }
        
        public getNode(): ƒ.Node {
            return this.node;
        }

    }
    export enum WORLDSIZE {
        "Tiny" = 4,
        "Small" = 16,
        "Medium" = 32,
        "Large" = 64,
    }
}