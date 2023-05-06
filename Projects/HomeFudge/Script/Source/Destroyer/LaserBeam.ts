namespace HomeFudge {
    import ƒ = FudgeCore;
    export class LaserBeam extends ƒ.Node {

        private static graph: ƒ.Graph = null;
        private static mesh: ƒ.Mesh = null;
        private static material: ƒ.Material = null;

        private async init() {
            LaserBeam.graph = await Resources.getGraphResources(Config.laserBeam.graphID);
            let tempResource: ƒ.Node = await Resources.getComponentNode("LaserBeam", LaserBeam.graph);
            LaserBeam.material = tempResource.getComponent(ƒ.ComponentMaterial).material;
            LaserBeam.mesh = tempResource.getComponent(ƒ.ComponentMesh).mesh;


            
            this.addComponents(JSONparser.toVector3(Config.beamTurret.beamPosition));
        }
        private addComponents(pos:ƒ.Vector3) {
            this.addComponent(new ƒ.ComponentMaterial(LaserBeam.material));
            this.addComponent(new ƒ.ComponentMesh(LaserBeam.mesh));
            this.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(pos)));
        }

        constructor( side: string) {
            super("LaserBeam" + side)
            this.init();
        }
    }
}