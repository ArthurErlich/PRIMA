namespace HomeFudge {
    import ƒ = FudgeCore;
    export class GatlingTurret extends ƒ.Node {

        private headNode: ƒ.Node = null;
        private baseNode: ƒ.Node = null;
        private shootNode: ƒ.Node = null;

        private roundsPerSecond: number = null;
        private reloadsEverySecond: number = null;
        private roundsTimer: number = 0;
        private reloadTimer: number = 0;

        private magazineCapacity: number = null;
        private magazineRounds:number = null;

        //TODO:Remove init configs and make a LoadAllConfigsClass!
        private async initConfigAndAllNodes(): Promise<void> {

            let graph: ƒ.Graph = await this.getGraphResources(Config.gatlingTurret.graphID);
            this.headNode = this.createComponents("GatlingTurretHead", JSONparser.toVector3(Config.gatlingTurret.headPosition), graph);
            this.baseNode = this.createComponents("GatlingTurretBase", JSONparser.toVector3(Config.gatlingTurret.basePosition), graph);
            this.shootNode = this.createShootPosNode(JSONparser.toVector3(Config.gatlingTurret.shootNodePosition));

            this.roundsPerSecond = Config.gatlingTurret.roundsPerSeconds;
            this.reloadsEverySecond = Config.gatlingTurret.reloadTime;
            this.magazineCapacity = Config.gatlingTurret.magazineCapacity;
            this.magazineRounds = this.magazineCapacity;

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
        private createComponents(nodeName: string, transform: ƒ.Vector3, graph: ƒ.Graph): ƒ.Node {
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
        /**
         * 
         * @param deltaSeconds 
         * Don't forget to call this function in the UpdateMethod!!!
         */
        public update(deltaSeconds: number):void {
            if (this.roundsPerSecond == null || this.reloadsEverySecond == null || this.magazineCapacity == 0) {
                return;
            }
            if (this.roundsTimer <= this.roundsPerSecond) {
                this.roundsTimer += deltaSeconds;
            }
            //TODO: think about a reload function
            if (this.reloadTimer <= this.reloadsEverySecond) {
                this.reloadTimer += deltaSeconds;
            }
        }
        //Base rotates on the Y-Aches, Positive number for up
        //Head rotates on the Z-Aches
        //TODO:create a moveToFunction which is public
        public moveTurret(xRot: number, yRot: number): void {
            if (this.baseNode == null || this.headNode == null) {
                return;
            }
            //TODO:Add clamp for Y-Aches
            this.baseNode.mtxLocal.rotateY(yRot);

            //TODO:Add clamp for Z-Aches
            this.headNode.mtxLocal.rotateZ(xRot);
        }
        //spawns every n-seconds a bullet
        public shoot() {
            if (this.roundsTimer >= this.roundsPerSecond) {
                _worldNode.addChild(new GatlingBullet(this.shootNode.mtxWorld.clone));
                this.roundsTimer = 0;
            }
        }
        constructor() {
            super("GatlingTurret");
            this.initConfigAndAllNodes();
        }
    }
}