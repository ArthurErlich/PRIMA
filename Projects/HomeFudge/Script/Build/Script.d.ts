declare namespace Script {
    import ƒ = FudgeCore;
    class CustomComponentScript extends ƒ.ComponentScript {
        static readonly iSubclass: number;
        message: string;
        constructor();
        hndEvent: (_event: Event) => void;
    }
}
declare namespace HomeFudge {
    import ƒ = FudgeCore;
    class GatTurretHead extends ƒ.Node {
        private node;
        private mesh;
        private material;
        private getResources;
        private setComponents;
        constructor(_transform: ƒ.Vector3);
    }
}
declare namespace HomeFudge {
    import ƒ = FudgeCore;
    class GatlingTurret extends ƒ.Node {
        private initGatConfigAndAllNodes;
        constructor(_transform: ƒ.Vector3);
    }
    interface GatlingTurretConfig {
        headPosition: ƒ.Vector3;
        shootNodePosition: ƒ.Vector3;
        graphID: string;
        [key: string]: ƒ.Vector3 | string;
    }
    let gatlingConfig: GatlingTurretConfig;
}
declare namespace HomeFudge {
    import ƒ = FudgeCore;
    class GatlingTurretBase extends ƒ.Node {
        private node;
        private mesh;
        private material;
        private getResources;
        private setComponents;
        constructor(_transform: ƒ.Vector3);
    }
}
declare namespace HomeFudge {
    import ƒ = FudgeCore;
    class LaserTurret extends ƒ.Node {
        constructor(pos: LASER_TURRET_POS);
    }
    enum LASER_TURRET_POS {
        RIGHT = 0,
        LEFT = 1
    }
}
declare namespace HomeFudge {
}
declare namespace HomeFudge {
    import ƒ = FudgeCore;
    class Player extends ƒ.Node {
        constructor();
    }
}
