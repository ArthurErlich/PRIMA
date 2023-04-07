namespace CastleV {
    import ƒ = FudgeCore;
    export class CollisionDetection {
        public static tiles: ƒ.Node[] = [];
        public static lastCollision: ƒ.Vector3 = new ƒ.Vector3(0, 0, 0);


        public static setupCollision(floor : ƒ.Node){
            let tiles: ƒ.Node[] = new Array<ƒ.Node>();
            for (let floorChild of floor.getChildren()) {
                for (let tileChild of floorChild.getChildren()) {
                    tiles.push(tileChild);
                }
            }
            CollisionDetection.updateTiles(tiles);
        }

        public static updateTiles(tiles: ƒ.Node[]): void {
            this.tiles = tiles;
        }

                    //TODO: add offset of player speed / 2
        public static check(playerMtxWorld: ƒ.Matrix4x4): Collision[] {
            let collision: Collision[] = [Collision.NONE];


            for (let tile of this.tiles) {

                //Check if the player is in range of the tile
                let distance: number = this.getDistance(tile.mtxWorld.translation, playerMtxWorld.translation)
                if (distance <= 2) {

                    //transform player position to tile local position/scale/rotation
                    let transformPlayerPos: ƒ.Matrix4x4 = playerMtxWorld.clone; // clone the matrix so it doesn't change the original
                    transformPlayerPos.multiply(tile.mtxWorldInverse);

                    // console.log("PlayerY: " + playerMtxWorld.translation.y);
                    // console.log("PlayerRelativeY: " + transformPlayerPos.translation.y);

                    //get position of tiles
                    let distanceX: number = transformPlayerPos.translation.x;
                    let distanceY: number = transformPlayerPos.translation.y;

                    //TODO: REWORK COLLISION DETECTION!
                    //TODO: GET HIGHT AND WIDTH OF TILE 
                    if ((distanceY <= 1 && distanceY >= 0) && (distanceX >= -0.8 && distanceX <= 0.8)) {
                        collision.push(Collision.DOWN);


                        let playerWorldPos: ƒ.Matrix4x4 = transformPlayerPos.clone;
                        playerWorldPos.multiply(tile.mtxWorld);
                        this.lastCollision = playerWorldPos.translation.clone;
                    }

                    //TODO: Check upper Collision -> prevent drive through walls
                    if ((distanceY <= 1 && distanceY >= 0) && (distanceX >= -0.8 && distanceX <= 0)) {
                        //collision.push(Collision.UP);


                        let playerWorldPos: ƒ.Matrix4x4 = transformPlayerPos.clone;
                        playerWorldPos.multiply(tile.mtxWorld);
                        this.lastCollision = playerWorldPos.translation.clone;
                    }

                    if ((distanceX >= -0.7 && distanceX <= 0.1) && (distanceY <= 0.8 && distanceY >= 0)) {
                        collision.push(Collision.RIGHT);
                    }
                    if ((distanceX <= 0.8 && distanceX >= 0.1) && (distanceY <= 0.8 && distanceY >= 0)) {
                        collision.push(Collision.LEFT);
                    }
                }

            }
            return collision;
        }

        private static getDistance(_pos1: ƒ.Vector3, _pos2: ƒ.Vector3): number {
            let distance: number = Math.sqrt(Math.pow(_pos1.x - _pos2.x, 2) + Math.pow(_pos1.y - _pos2.y, 2) + Math.pow(_pos1.z - _pos2.z, 2));
            return distance;
        }
    }
    //Pythagoras
    export enum Collision {
        NONE = 0,
        LEFT = 1,
        RIGHT = 2,
        UP = 3,
        DOWN = 4,
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