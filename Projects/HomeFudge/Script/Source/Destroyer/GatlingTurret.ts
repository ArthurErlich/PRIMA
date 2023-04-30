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
        private magazineRounds: number = null;

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
        private update = (): void => {
            if (this.roundsPerSecond == null || this.reloadsEverySecond == null || this.magazineCapacity == null) {
                return;
            }
            if (this.roundsTimer <= this.roundsPerSecond) {
                this.roundsTimer += _deltaSeconds;
            }
            //TODO: think about a reload function
            if (this.reloadTimer <= this.reloadsEverySecond) {
                this.reloadTimer += _deltaSeconds;
            }

            //TODO: don't use lookAt function. Better do the math yourself! -> X is forward in my game. Z Forward is Standard
            this.baseNode.mtxLocal.lookAt(aimPos, new ƒ.Vector3(0, 1, 0), true);
            this.headNode.mtxLocal.lookAt(new ƒ.Vector3(aimPos.y, aimPos.z, 0), new ƒ.Vector3(0, 0, -1), true);
            this.headNode.mtxLocal.rotateX(90);
            //fix rotation after LookAt

        }
        //Base rotates on the Y-Aches, Positive number for up
        //Head rotates on the Z-Aches
        //TODO:create a moveToFunction which is public, turn rate based on maxRotSpeed
        public moveTurret(xRot: number, yRot: number): void {
            if (this.baseNode == null || this.headNode == null) {
                return;
            }
            //TODO:Add clamp for Y-Aches
            this.baseNode.mtxLocal.rotateY(yRot);

            //TODO:Add clamp for Z-Aches
            this.headNode.mtxLocal.rotateZ(xRot);
        }

        /* This code defines a public method `fire()` that is called when the GatlingTurret is supposed
        to fire. It checks if there are any rounds left in the magazine, and if not, it resets the
        reload timer and refills the magazine. It also checks if the reload timer has finished, and
        if not, it returns without firing. If the reload timer has finished and there are rounds
        left in the magazine, it creates a new GatlingBullet object at the position of the shootNode
        and resets the rounds timer. */
        public fire() {
            if (this.magazineRounds <= 0) {
                this.reloadTimer = 0;
                this.magazineRounds = this.magazineCapacity;
            }
            if (this.reloadTimer <= this.reloadsEverySecond) {
                if (this.reloadTimer % 1 == 0) {
                    FudgeCore.Debug.log("TurretReloading")
                }
                return;
            }
            if (this.roundsTimer >= this.roundsPerSecond) {
                new GatlingBullet(this.shootNode.mtxWorld.clone);
                this.roundsTimer = 0;
                this.magazineRounds--;
                FudgeCore.Debug.log("RoundsLeft: " + this.magazineRounds);
            }
        }
        constructor() {
            super("GatlingTurret");
            this.initConfigAndAllNodes();
            ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, this.update);

        }
    }
}