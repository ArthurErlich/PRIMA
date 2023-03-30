namespace CastleV {
    import ƒ = FudgeCore;
    export class CollisionDetection {
        public static tiles: ƒ.Node[] = [];
        public static lastCollisionY: number = 0;

        public static updateTiles(tiles: ƒ.Node[]): void {
            this.tiles = tiles;
        }

        public static check(playerMtxWorld: ƒ.Matrix4x4): Collision {
            let collision: Collision = Collision.NONE;

            for (let tile of CollisionDetection.tiles) {
                //Check if the player is in range of the tile
                let distance: number = this.getDistance(tile.mtxWorld.translation, playerMtxWorld.translation)
                if (distance <= 1) {

                    //transform player position to tile local position/scale/rotation
                    let transformPlayerPos: ƒ.Matrix4x4 = playerMtxWorld;
                    transformPlayerPos.multiply(tile.mtxWorldInverse);

                    //get collision
                    let distanceX: number = transformPlayerPos.translation.x;
                    let distanceY: number = transformPlayerPos.translation.y;
                    //console.log("Y: " + distanceY);

                    let tileOffset: number = 0.5;


                    //TODO: REWORK COLLISION DETECTION!
                    if (distanceX >= -tileOffset && distanceX <= 0) {
                        // console.warn("right");
                        // player.alucard.mtxLocal.translateX(-0.05);
                        collision = Collision.RIGHT;
                    }
                    if (distanceX <= tileOffset && distanceX >= 0) {
                        // console.warn("left");
                        // player.alucard.mtxLocal.translateX(0.05);
                        collision = Collision.LEFT;
                    }
                    if (distanceY <= 1 && distanceX >= 0) {
                        // console.warn("up");
                        // player.alucard.mtxLocal.translateY(0.1);
                        collision = Collision.DOWN;
                        this.lastCollisionY = tile.mtxWorld.translation.y+1;
                    }
                //}
            }
            return collision;
        }
        //Pythagoras
        private static getDistance(_pos1: ƒ.Vector3, _pos2: ƒ.Vector3): number {
            let distance: number = Math.sqrt(Math.pow(_pos1.x - _pos2.x, 2) + Math.pow(_pos1.y - _pos2.y, 2) + Math.pow(_pos1.z - _pos2.z, 2));
            return distance;
        }

    }
    export enum Collision {
        NONE = 0,
        LEFT = 1,
        RIGHT = 2,
        DOWN = 3,
    }
}

/*
for (let tile of tiles) { 
    //Check if the player is in range of the tile
    let distance:number = getDistance(tile.mtxWorld.translation, player.alucard.mtxWorld.translation)
    if (distance <=1.0) {
     
      //transform player position to tile local position/scale/rotation
      let transformPlayerPos:ƒ.Matrix4x4 = player.alucard.mtxWorld;
      transformPlayerPos.multiply(tile.mtxWorldInverse);

      //get collision
      let distanceX:number = transformPlayerPos.translation.x;
      let distanceY:number = transformPlayerPos.translation.y;
      console.log("Y: " + distanceY);
      
      let tileOffset:number =0.5;

      if(distanceX >= -tileOffset && distanceX <= 0){
        console.warn("right");
        player.alucard.mtxLocal.translateX(-0.05);
      }
      if(distanceX <= tileOffset && distanceX >= 0){
        console.warn("left");
        player.alucard.mtxLocal.translateX(0.05);
      }
      if(distanceY <= 1 && distanceX >= 0){
        console.warn("up");
        player.alucard.mtxLocal.translateY(0.1);
      }
      */