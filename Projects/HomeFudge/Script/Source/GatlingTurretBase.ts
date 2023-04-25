namespace HomeFudge {

    //TODO:remove class and put it to class GatlingTurret
    import ƒ = FudgeCore;
    export class GatlingTurretBase extends ƒ.Node {
        //Grab the Location from Blender\\

        private node: ƒ.Node = null;
        private mesh: ƒ.ComponentMesh = null;
        private material: ƒ.ComponentMaterial = null;


        //Getting all resource here
        private getResources() {
            let graphID: string = gatlingConfig.graphID;//From gatConfig.json
            let graph = <ƒ.Graph>ƒ.Project.resources[graphID]
            if (graph == null) {
                console.warn(graph + " not found with ID: " + graphID);
            }
            let nodeName: string = "GatlingTurretBase";
            this.node = graph.getChildrenByName(nodeName)[0];
            if (this.node == null) {
                console.warn("+\"" + nodeName + "\" not found inside: " + graph.name + "->Graph");
            }

        }

        //Sets the Mesh- and Material - Component.
        private setComponents() {
            this.mesh = this.node.getComponent(ƒ.ComponentMesh);
            this.material = this.node.getComponent(ƒ.ComponentMaterial);
        }
        constructor(_transform: ƒ.Vector3) {
            super("GatlingTurretBase");

            this.getResources();
            this.setComponents();

            this.addComponent(this.mesh);
            this.addComponent(this.material);
            this.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(_transform)));
        }

    }
}