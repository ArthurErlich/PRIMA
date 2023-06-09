
namespace LocoFudge {
    import ƒ = FudgeCore;
    export class Tile {
        private node: ƒ.Node = null;

        public constructor(index: number, location: ƒ.Vector3) {
            
            //TODO: get the tile from the graph
            //TODO: tiles are not generated
            this.node = new ƒ.Node("Tile" + index);
    
            //TODO: make Tiles with Material and Mesh as references
            let node: ƒ.Node = GameManager.getGraph().getChild(0).getChildrenByName("GrassTile")[0]; 
            this.node.addComponent(new ƒ.ComponentTransform());
            this.node.addComponent(new ƒ.ComponentMaterial(node.getComponent(ƒ.ComponentMaterial).material));
            this.node.addComponent(new ƒ.ComponentMesh(node.getComponent(ƒ.ComponentMesh).mesh));
            
            this.node.mtxLocal.translate(location);
            this.node.getComponent(ƒ.ComponentMesh).mtxPivot.scale(ƒ.Vector3.ONE(0.98));

        }
        public getNode(): ƒ.Node {
            return this.node;
        }
    }
    //the tile type+textures
}
