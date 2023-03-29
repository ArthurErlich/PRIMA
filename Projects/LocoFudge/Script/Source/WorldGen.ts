namespace WorldGen{
    import ƒ = FudgeCore; //importing the fudge namespace -> for getting the Nodes


    // selectable world size in the editor or inside ts for testing
    export enum WorldSize{
        "Small" = 16,
        "Medium" = 32,
        "Large" = 64,
    }


    //the world itself wiht the tiles Mayby solvable trough fudges nodes
    export class World{
        private worldSize: number;
        private array: Tile[];
    }


    export class Tile{
        //coordinats of the tile
        //the tile type+textures
    }

}