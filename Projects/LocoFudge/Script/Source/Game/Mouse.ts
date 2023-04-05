namespace LocoFudge {
    import ƒ = FudgeCore;
    export class Mouse {
        private mousePos: ƒ.Vector2 = new ƒ.Vector2(0, 0);
        private acceleration: ƒ.Vector2 = new ƒ.Vector2(0, 0);
        private selectedTile: ƒ.Node = null;

        public updateMousePos(e: MouseEvent): void {
            this.mousePos.x = e.clientX;
            this.mousePos.y = e.clientY;
        }
        public getMousePos(): ƒ.Vector2 {
            return this.mousePos;
        }
        public mousePressed(_event: MouseEvent): void {
            if (_event.button == 0){
                //TODO: left click movement temporary selection
                this.selectTile();
            } else if (_event.button == 2){
              //TODO: right click movement
            }

        }
        public selectTile(): ƒ.Node {
            let pickedNodes = ƒ.Picker.pickViewport(GameManager.getViewport(), this.mousePos);
            let selectionNode: ƒ.Node = GameManager.getGraph().getChild(0).getChildrenByName("Selection")[0];
          
            for (let i: number = 0; i < pickedNodes.length; i++) {

                //TODO: make a selection add stuff to do ..... etc
                

                if (pickedNodes[i].node.name.includes("Tile")) {
                    if (this.selectedTile != null ) {
                        selectionNode = this.selectedTile.getChildrenByName("Selection")[0];
                        selectionNode.mtxLocal.translateZ(-0.1);//TODO: remove Temp fix
                        selectionNode.mtxLocal.translateY(0.05);//TODO: remove Temp fix
                        selectionNode.mtxLocal.translateX(0.05);//TODO: remove Temp fix

                        GameManager.getGraph().getChild(0).addChild(selectionNode);
                    }
                    this.selectedTile = pickedNodes[i].node;
                    this.selectedTile.addChild(selectionNode);
                    selectionNode.mtxLocal.translateZ(0.1);//TODO: remove Temp fix
                    selectionNode.mtxLocal.translateY(-0.05);//TODO: remove Temp fix
                    selectionNode.mtxLocal.translateX(-0.05);//TODO: remove Temp fix
                }
            }
            return this.selectedTile.getChildrenByName("Track")[0];
        }
        public setAcceleration(speedVector:ƒ.Vector2): void {
            this.acceleration = speedVector;
        }
        public getAcceleration(): ƒ.Vector2 {
            return this.acceleration;
        }
    }
}