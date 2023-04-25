namespace HomeFudge {
    import ƒ = FudgeCore;
    export class GattlingTurret extends ƒ.Node {
        private node: ƒ.Node = null;
        private mesh: ƒ.ComponentMesh = null;
        private material: ƒ.ComponentMaterial = null;

        //Grab the Location from Blender\\
        private shootSpawnPos: ƒ.Vector3 = null; //-z achsis is vorward

        //Getting all resource here
        private getResources() {
            let graphID: string = "Graph|2023-04-25T14:30:46.195Z|98798";//TODO:create Graph with all resource
            let graph = <ƒ.Graph>ƒ.Project.resources[graphID]
            if (graph == null) {
                console.warn(graph + " not found wiht ID: " + graphID);
            }
            let nodeName: string = "GattlingTurret";
            this.node = graph.getChildrenByName(nodeName)[0];
            if (this.node == null) {
                console.warn("+\"" + nodeName + "\" not found inside: " + graph.name +"->Graph");
            }

        }

        //Sets the Mesh- and Material - Component.
        private setComponents() {
            this.mesh = this.node.getComponent(ƒ.ComponentMesh);
            this.material = this.node.getComponent(ƒ.ComponentMaterial);
        }
        constructor(_transform: ƒ.Vector3) {
            super("GattlingTurret");

            this.getResources();
            this.setComponents();

            this.addComponent(this.mesh);
            this.addComponent(this.material);
            this.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(_transform)));

            let shootPosNode: ƒ.Node = new ƒ.Node("ShootSpawnPos");
            shootPosNode.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(ƒ.Vector3.ZERO())))//this.shootSpawnPos
            this.addChild(shootPosNode);
        }

    }
}