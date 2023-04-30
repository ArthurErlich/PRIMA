namespace HomeFudge {
    import ƒ = FudgeCore;
    export class Mouse {

        public static pos: ƒ.Vector2 = null;
        public static change: ƒ.Vector2 = null;

        

        public static init(): void {
            addEventListener("mousemove", Mouse.moveUpdate);
            ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, Mouse.update);
            Mouse.pos = new ƒ.Vector2(0,0);
            Mouse.change = new ƒ.Vector2(0,0);            
                        
        }
        private static update = ():void => {
            Mouse.change = ƒ.Vector2.ZERO();
        }
        private static moveUpdate = (_event:MouseEvent):void => {
            Mouse.change = new ƒ.Vector2(_event.movementX,_event.movementY);
            Mouse.pos = new ƒ.Vector2(_event.x,_event.y);

        }

    }


}