namespace HomeFudge {
    import ƒ = FudgeCore;
    export class GatlingTurret extends ƒ.Node {

        private async initGatConfigAndAllNodes(): Promise<void> {
            let response: Response = await fetch("Configs/gatTurretConfig.json");
            gatlingConfig = await response.json();

            //TODO:remove Debug
             console.warn(gatlingConfig);
            // console.warn(gatlingConfig.graphID);

            //TODO: put the classes here and make functions out of it. 
            let base: GatlingTurretBase = new GatlingTurretBase(new ƒ.Vector3(0, 0, 0));
            let head: GatTurretHead = new GatTurretHead(gatlingConfig.headPosition);//From gatConfig.json

            //TODO:remove Debug
            // console.warn(head);

            base.addChild(head);
            this.addChild(base);
        }

        constructor(_transform: ƒ.Vector3) {
            super("GatlingTurret");
            this.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(_transform)));
            this.initGatConfigAndAllNodes()
        }

    }
    export interface GatlingTurretConfig {
        headPosition: ƒ.Vector3;
        shootNodePosition: ƒ.Vector3;
        graphID: string;

        [key: string]: ƒ.Vector3 | string;
    }
    export let gatlingConfig: GatlingTurretConfig;


}