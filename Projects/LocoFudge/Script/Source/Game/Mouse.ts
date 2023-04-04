namespace LocoFudge {
    import ƒ = FudgeCore;
    export class Mouse {
        private mousePos:ƒ.Vector2 = new ƒ.Vector2(0,0);
        private pickedNodes:ƒ.Pick[] = null; 

        public updateMousePos(e:MouseEvent):void{
            this.mousePos.x = e.clientX;
            this.mousePos.y = e.clientY;
        }
        public getMousePos():ƒ.Vector2{
            return this.mousePos;
        }
        public pickNode():void{
           this.pickedNodes = ƒ.Picker.pickViewport(GameManager.viewport, this.mousePos)

            for (let i : number = 0; i<this.pickedNodes.length; i++){
                if(this.pickedNodes[i].node.name.includes("Tile")){

                    //TODO: check if the tile is active/visible
                    if(this.pickedNodes[i].node.getComponent(ƒ.ComponentMaterial).isActive){

                        this.pickedNodes[i].node.getComponent(ƒ.ComponentMaterial).activate(false);
                    }else{
                        this.pickedNodes[i].node.getComponent(ƒ.ComponentMaterial).activate(true);
                    }
                }
              }
        }
    }
}