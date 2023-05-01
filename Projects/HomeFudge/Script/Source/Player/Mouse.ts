namespace HomeFudge {
    import ƒ = FudgeCore;
    export class Mouse {

        public static pos: ƒ.Vector2 = null;
        public static change: ƒ.Vector2 = null;

        private static tempPos: ƒ.Vector2 = null;

        public static init(): void {
            _viewport.canvas.addEventListener("mousemove", Mouse.moveUpdate);
            _viewport.canvas.addEventListener("mousedown", Mouse.downUpdate);
            ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, Mouse.update);
            Mouse.pos = new ƒ.Vector2(0, 0);
            Mouse.change = new ƒ.Vector2(0, 0);
            Mouse.tempPos = new ƒ.Vector2(0, 0);

        }

        private static update = (): void => {
            //P1=Pos
            //P2=TempPos
            //P2-P1
            Mouse.change = new ƒ.Vector2(
                Mouse.tempPos.x-Mouse.pos.x,
                Mouse.tempPos.y-Mouse.pos.y
                );
            Mouse.tempPos = Mouse.pos;
        }
        private static moveUpdate = (_event: MouseEvent): void => {
            Mouse.change = new ƒ.Vector2(_event.movementX, _event.movementY);
            Mouse.pos = new ƒ.Vector2(_event.x, _event.y);
        }
        private static downUpdate(_event: MouseEvent) {
            throw new Error("Method not implemented.");
        }

    }


}