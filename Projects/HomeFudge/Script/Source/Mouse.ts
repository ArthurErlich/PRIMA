namespace HomeFudge{
    import ƒ = FudgeCore;
    export class Mouse {
        public init():void{
            ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, () => {
                this.update();
            });
        }
        private update():void{

        }

    }

}