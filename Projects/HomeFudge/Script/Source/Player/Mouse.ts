namespace HomeFudge {
    import ƒ = FudgeCore;
    export class Mouse {

        public static pos: ƒ.Vector2 = null;
        public static change: ƒ.Vector2 = null;

        private static isPressed: Array<MOUSE_CODE> = new Array<MOUSE_CODE>(3); // length of MOUSE_CODE enum

        private static tempPos: ƒ.Vector2 = null;

        public static init(): void {
            _viewport.canvas.addEventListener("mousemove", Mouse.moveUpdate);
            _viewport.canvas.addEventListener("mousedown", Mouse.mouseDown);
            _viewport.canvas.addEventListener("mouseup", Mouse.mouseUp);

            Mouse.pos = new ƒ.Vector2(0, 0);
            Mouse.change = new ƒ.Vector2(0, 0);
            Mouse.tempPos = new ƒ.Vector2(0, 0);

            ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, Mouse.update);

        }

        private static update = (): void => {
            //P1=Pos
            //P2=TempPos
            //P2-P1
            Mouse.change = new ƒ.Vector2(
                Mouse.tempPos.x - Mouse.pos.x,
                Mouse.tempPos.y - Mouse.pos.y
            );
            Mouse.tempPos = Mouse.pos;
        }
        private static moveUpdate = (_event: MouseEvent): void => {
            Mouse.change = new ƒ.Vector2(_event.movementX, _event.movementY);
            Mouse.pos = new ƒ.Vector2(_event.x, _event.y);
        }
        private static mouseDown(_event: MouseEvent) {
            switch (_event.button) {
                case MOUSE_CODE.RIGHT:
                    Mouse.isPressed[MOUSE_CODE.RIGHT] = MOUSE_CODE.RIGHT;
                    break;
                case MOUSE_CODE.LEFT:
                    Mouse.isPressed[MOUSE_CODE.LEFT] = MOUSE_CODE.LEFT;
                    break;
                case MOUSE_CODE.MIDDLE:
                    Mouse.isPressed[MOUSE_CODE.MIDDLE] = MOUSE_CODE.MIDDLE;
                    break;

                default:
                    break;
            }
        }
        private static mouseUp(_event: MouseEvent) {
            switch (_event.button) {
                case MOUSE_CODE.RIGHT:
                    Mouse.isPressed[MOUSE_CODE.RIGHT] = null;
                    break;
                case MOUSE_CODE.LEFT:
                    Mouse.isPressed[MOUSE_CODE.LEFT] = null;
                    break;
                case MOUSE_CODE.MIDDLE:
                    Mouse.isPressed[MOUSE_CODE.MIDDLE] = null;
                    break;

                default:
                    break;
            }
        }
        /**
         * The function checks if any of the mouse buttons in the input array are currently pressed.
         * 
         * @param inputs An array of MOUSE_CODE values that represent the mouse buttons being checked
         * for being pressed.
         * @return A boolean value is being returned, which indicates whether the Mouse is pressed.
         */
        public static isPressedOne(inputs:Array<MOUSE_CODE>):boolean{
            for(let index:number = 0; index <= Mouse.isPressed.length; index++){
                for( let inputIndex:number = 0; inputIndex< inputs.length; inputIndex++){
                    if(inputs[inputIndex] == Mouse.isPressed[index]){
                        return true;
                    }
                }
            }
            return false;
        }
    }
    export enum MOUSE_CODE {
        LEFT = 0,
        MIDDLE = 1,
        RIGHT = 2
    }


}