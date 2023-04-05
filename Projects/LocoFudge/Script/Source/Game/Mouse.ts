namespace LocoFudge {
    import ƒ = FudgeCore;
    export class Mouse {
        private mousePos: ƒ.Vector2 = new ƒ.Vector2(0, 0);
        private selectedTile: ƒ.Node = null;

        public updateMousePos(e: MouseEvent): void {
            this.mousePos.x = e.clientX;
            this.mousePos.y = e.clientY;
        }
        public getMousePos(): ƒ.Vector2 {
            return this.mousePos;
        }
        public pickNode(): void {
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
        }
    }
}