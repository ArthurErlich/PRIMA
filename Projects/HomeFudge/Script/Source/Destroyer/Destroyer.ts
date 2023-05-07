namespace HomeFudge {
    import ƒ = FudgeCore;
    export class Destroyer extends Ship {
        protected maxSpeed: number = null;
        protected maxAcceleration: number = null;
        protected velocity: ƒ.Vector3 = null;
        protected healthPoints: number = null;
        protected maxTurnRate: number = null;

        private gatlingTurret: GatlingTurret = null;
        private beamTurretList: BeamTurret[] = new Array(2);

        //list of weapons
        public weapons = Weapons;

        static graph: ƒ.Graph = null;
        static mesh: ƒ.Mesh = null;
        static material: ƒ.Material = null;

        private async initAllConfigs(startPosition: ƒ.Vector3) {
            Destroyer.graph = await Ship.getGraphResources(Config.destroyer.graphID);
            let node: ƒ.Node = await Ship.getComponentNode("Destroyer", Destroyer.graph);

            let transNode = new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(startPosition));//TODO: move after turret are loaded!
            this.addComponent(transNode);

            //init mesh and material
            Destroyer.mesh = node.getComponent(ƒ.ComponentMesh).mesh;
            Destroyer.material = node.getComponent(ƒ.ComponentMaterial).material;

            //init configs
            if (this.velocity == null) {
                this.velocity = new ƒ.Vector3(0, 0, 0);
            }
            this.maxAcceleration = Config.destroyer.maxAcceleration;
            this.maxSpeed = Config.destroyer.maxSpeed

            //init Weapons
            this.addWeapons();

            //init Components
            this.setAllComponents();

            this.addRigidBody();

        }

        private addWeapons(): void {
            this.gatlingTurret = new GatlingTurret();
            this.beamTurretList[0] = new BeamTurret(BeamTurret.side.LEFT);
            this.beamTurretList[1] = new BeamTurret(BeamTurret.side.RIGHT);


            //if one turret is missing
            this.addChild(this.gatlingTurret);
            this.addChild(this.beamTurretList[0]);
            this.addChild(this.beamTurretList[1]);

        }

        private setAllComponents(): void {
            if (Destroyer.material == null || Destroyer.mesh == null) {
                console.warn(this.name + " Mesh and/or Material is missing");
                return;
            }
            this.addComponent(new ƒ.ComponentMaterial(Destroyer.material));
            this.addComponent(new ƒ.ComponentMesh(Destroyer.mesh));
        }
        private addRigidBody() {

        }

        protected update = (): void => {
            this.mtxLocal.translate(new ƒ.Vector3(
                this.velocity.x * _deltaSeconds,
                this.velocity.y * _deltaSeconds,
                this.velocity.z * _deltaSeconds)
            );
            this.mtxLocal.rotateY(5*_deltaSeconds);//TODO:Remove rotation

            //TODO:remove test of gatling rot
            ///TEST----------------TEST\\\
            let tempRotBase: ƒ.Vector3 = this.gatlingTurret.baseNode.mtxLocal.rotation;
            this.gatlingTurret.baseNode.mtxLocal.rotation = new ƒ.Vector3(
                tempRotBase.x,
                -(Mouse.position.x - (_viewport.canvas.width / 2)) / Math.PI / 3,
                tempRotBase.z
            );
            let tempRotHead: ƒ.Vector3 = this.gatlingTurret.headNode.mtxLocal.rotation;
            this.gatlingTurret.headNode.mtxLocal.rotation = new ƒ.Vector3(
                tempRotHead.x,
                tempRotHead.y,
                
            );
            this.beamTurretList[0].rotate(-(Mouse.position.y - (_viewport.canvas.height / 2)) / Math.PI / 4);
            this.beamTurretList[1].rotate(-(Mouse.position.y - (_viewport.canvas.height / 2)) / Math.PI / 4);


            ///TEST----------------TEST\\\
        }
        public alive(): boolean {
            //console.error("Method not implemented.");
            return true;
        }
        public destroyNode(): void {
            //console.error("Method not implemented.");
            return null;
        }
        public getVelocity(): ƒ.Vector3 {
            return this.velocity;
        }
        public toString(): string {
            //console.error("Method not implemented.");
            return null;
        }
        public fireWeapon(_weapon: Weapons) {
            switch (_weapon) {
                case Weapons.BeamTurret:
                    this.fireBeam();
                    break;
                case Weapons.RocketPod:
                    //TODO:Implement Rocket Pod
                    console.error("RocketPod not implement!!");
                    break;
                case Weapons.GatlingTurret:
                    this.fireGatling();
                    break;

                default:
                    break;
            }
        }
        public fireGatling() {
            this.gatlingTurret.fire(this.velocity);
        }
        public fireBeam() {
            this.beamTurretList.forEach(turret => {
                turret.fire();
            });
        }
        public move(moveDirection: ƒ.Vector3) {
            //TODO:Make smooth
            if (Mathf.vectorLength(moveDirection) >= 0.001) {
                moveDirection.normalize();
            }
            moveDirection.scale(this.maxSpeed);
            //TODO:add smooth acceleration
            this.velocity = moveDirection;
        }
        constructor(startPosition: ƒ.Vector3) {
            super("Destroyer");
            this.initAllConfigs(startPosition);
            ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, this.update);
        }
    }
    enum Weapons {
        GatlingTurret,
        BeamTurret,
        RocketPod
    }
}

