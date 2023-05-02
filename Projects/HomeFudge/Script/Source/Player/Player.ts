namespace HomeFudge{
    import ƒ = FudgeCore;
    export class Player extends ƒ.Node{
        public destroyer: Destroyer = null;


        private update = (): void => {
            if(Mouse.isPressedOne([MOUSE_CODE.LEFT])){
                this.destroyer.fireGatling();
            }
            
        }

        constructor(name:string){
            super(name);
            this.destroyer = new Destroyer(ƒ.Vector3.ZERO());
            this.addChild(this.destroyer);
            ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, this.update);
        }
    }
}