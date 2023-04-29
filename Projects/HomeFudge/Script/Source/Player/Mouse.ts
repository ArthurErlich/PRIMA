namespace HomeFudge {
    import ƒ = FudgeCore;
    export class Mouse {

        public static pos: ƒ.Vector2 = null;
        public static change: ƒ.Vector2 = null;

        

        public static init(): void {
            ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, Mouse.update);
            Mouse.pos = new ƒ.Vector2(0,0);
            Mouse.change = new ƒ.Vector2(0,0);            
                        
        }
        private static update = ():void => {

            Mouse.change = ƒ.Vector2.ZERO();
        }

    }

}