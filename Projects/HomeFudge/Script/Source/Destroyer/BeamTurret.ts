namespace HomeFudge {
    import ƒ = FudgeCore;
    enum SIDE {
        LEFT,
        RIGHT
    }
    export class BeamTurret extends ƒ.Node {

        public static side: typeof SIDE = SIDE;

        private static graph: ƒ.Graph = null;
        private static mesh: ƒ.Mesh = null;
        private static material: ƒ.Material = null;
        private beam: LaserBeam = null;

        /*
        private maxRotSpeed: number;
        private maxPitch: number;
        private minPitch: number;
        private maxBeamTime: number;
        private maxReloadTime: number;
        private range: number;
        */


        private async init(): Promise<void> {
            BeamTurret.graph = await this.getGraphResources(Config.beamTurret.graphID);
            let resourceNode: ƒ.Node = await this.getComponentNode("BeamTurret", BeamTurret.graph);

            BeamTurret.material = resourceNode.getComponent(ƒ.ComponentMaterial).material;
            BeamTurret.mesh = resourceNode.getComponent(ƒ.ComponentMesh).mesh;

            //TODO:add Left Right check

            //add beam
            let beamPos: ƒ.Vector3 = JSONparser.toVector3(Config.beamTurret.beamPosition);
            this.addBeam();

            //Init turret configs
            /*
            this.maxRotSpeed = Config.beamTurret.maxRotSpeed;
            this.maxPitch = Config.beamTurret.maxPitch;
            this.minPitch = Config.beamTurret.minPitch;
            this.maxBeamTime = Config.beamTurret.beamTime;
            this.maxReloadTime = Config.beamTurret.reloadTime;
            this.range = Config.beamTurret.range;
            */


            this.addComponents();
            this.mtxLocal.rotateX(90);
        }
        private async getGraphResources(graphID: string): Promise<ƒ.Graph> {
            let graph: ƒ.Graph = <ƒ.Graph>ƒ.Project.resources[graphID]
            if (graph == null) {
                console.warn(graph + " not found with ID: " + graphID);
            }
            return graph;
        }
        private async getComponentNode(nodeName: string, graph: ƒ.Graph): Promise<ƒ.Node> {
            let node: ƒ.Node = graph.getChildrenByName(nodeName)[0];
            if (node == null) {
                console.warn("+\"" + nodeName + "\" not found inside: " + graph.name + "->Graph");
            }
            return node;
        }
        private addBeam(): void {
            //TODO: add beam to here
            this.addChild(new LaserBeam("Right"));
        }
        private addComponents() {
            this.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(JSONparser.toVector3(Config.beamTurret.basePosition))));
            this.addComponent(new ƒ.ComponentMaterial(BeamTurret.material));
            this.addComponent(new ƒ.ComponentMesh(BeamTurret.mesh));
        }
        private update = (): void => {
            this.mtxLocal.rotateY(15 * _deltaSeconds);
        }
        public fire() {
            throw new Error("Method not implemented.");
        }

        constructor() {
            super("BeamTurret");
            this.init();
            ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, this.update);
        }
    }
}