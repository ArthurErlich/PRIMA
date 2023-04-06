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
    document.addEventListener("mousemove",onMouseUpdate);
    document.addEventListener("mousedown",onMouseClick);


    ///Mouse Position Update\\\
  function onMouseUpdate(_event: MouseEvent): void {
    GameManager.getMouse().updateMousePos(_event);
    if(_event.buttons === 2){
      GameManager.getMouse().setAcceleration(new ƒ.Vector2(_event.movementX,_event.movementY));
      GameManager.getCamera().moveCameraWithMouse(true); //TODO:Needs to bo remaind. Something to make me understand that.

    }else{
      GameManager.getMouse().setAcceleration(ƒ.Vector2.ZERO());//TODO: remove temp fix unused variable
      GameManager.getCamera().moveCameraWithMouse(false);
    }
    
  }
  ///Mouse Left Click Event\\\
  function onMouseClick(_event: MouseEvent): void {
    console.log(GameManager.getMouse().mousePressed(_event)); // TODO: remove temp test
  }

}