namespace HomeFudge {
    import ƒ = FudgeCore;
    export class GatlingTurret extends ƒ.Node {

        private headNode: ƒ.Node = null;
        private baseNode: ƒ.Node= null;
        private shootNode: ƒ.Node= null;

        private async initGatConfigAndAllNodes(): Promise<void> {
            let response: Response = await fetch("Configs/gatTurretConfig.json");
            let gatlingConfig: GatlingTurretConfig = await response.json();

            let graph: ƒ.Graph = await this.getGraphResources(gatlingConfig.graphID);
            this.headNode = this.createNode("GatlingTurretHead", JSONparser.toVector3(gatlingConfig.headPosition), graph);
            this.baseNode = this.createNode("GatlingTurretBase", JSONparser.toVector3(gatlingConfig.basePosition), graph);
            this.shootNode = this.createShootPosNode(JSONparser.toVector3(gatlingConfig.shootNodePosition));

            this.headNode.addChild(this.shootNode);
            this.baseNode.addChild(this.headNode);
            this.addChild(this.baseNode);
        }

        private async getGraphResources(graphID: string): Promise<ƒ.Graph> {
            let graph: ƒ.Graph = <ƒ.Graph>ƒ.Project.resources[graphID]
            if (graph == null) {
                console.warn(graph + " not found with ID: " + graphID);
            }
            return graph;
        }
        private createNode(nodeName: string, transform: ƒ.Vector3, graph: ƒ.Graph): ƒ.Node {
            let node = graph.getChildrenByName(nodeName)[0];
            if (node == null) {
                console.warn("+\"" + nodeName + "\" not found inside: " + graph.name + "->Graph");
            }
            node.addComponent(node.getComponent(ƒ.ComponentMesh));
            node.addComponent(node.getComponent(ƒ.ComponentMaterial));
            node.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(transform)));
            return node;
        }
        private createShootPosNode(transform: ƒ.Vector3): ƒ.Node {
            let shootPosNode: ƒ.Node = new ƒ.Node("ShootSpawnPos");
            shootPosNode.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(transform))); //From gatConfig.json
            return shootPosNode;
        }

        //Base rotates on the Y-Aches, Positive number for up
        //Head rotates on the Z-Aches
        public moveTurret(xRot: number, yRot: number):void {
            if(this.baseNode == null||this.headNode == null){
                return;
            }
            //TODO:Add clamp for Y-Aches
            this.baseNode.mtxLocal.rotateY(yRot);

            //TODO:Add clamp for Z-Aches
            this.headNode.mtxLocal.rotateZ(xRot);
        }

        //spawns every n-seconds a bullet
        public shoot(worldNode:ƒ.Node) {
            //TODO:find a way to create bullet and remove it after hit/lifetime loss.
            worldNode.addChild(new GatlingBullet(this.shootNode.mtxWorld.clone));

        }
        constructor() {
            super("GatlingTurret");
            this.initGatConfigAndAllNodes();
        }
    }
    ///interface for Blender positions and configs for GatlingTurret\\\
    interface GatlingTurretConfig {
        headPosition: number[];
        basePosition: number[];
        shootNodePosition: number[];
        maxRotSpeed: number;
        maxPitch: number;
        minPitch: number;
        graphID: string;

        [key: string]: number[] | number | string;
    }
}