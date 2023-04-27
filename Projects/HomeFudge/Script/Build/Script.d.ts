declare namespace HomeFudge {
    import ƒ = FudgeCore;
    abstract class Bullet extends ƒ.Node {
        abstract maxLifeTime: number;
        abstract maxSpeed: number;
        abstract update(deltaSeconds: number): void;
        abstract alive(): boolean;
        abstract destroyNode(): void;
        abstract toString(): string;
        protected static getGraphResources(graphID: string): Promise<ƒ.Graph>;
        protected static getComponentNode(nodeName: string, graph: ƒ.Graph): Promise<ƒ.Node>;
        constructor(idString: string);
    }
}
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
    export class GatlingBullet extends Bullet {
        maxLifeTime: number;
        maxSpeed: number;
        spreadRadius: number;
        static graph: ƒ.Graph;
        static worldNode: ƒ.Node;
        static mesh: ƒ.Mesh;
        static material: ƒ.Material;
        static bulletConfig: BulletConfig;
        update(deltaSeconds: number): void;
        private initBulletConfig;
        alive(): boolean;
        toString(): string;
        destroyNode(): void;
        constructor(spawnTransform: ƒ.Matrix4x4);
    }
    interface BulletConfig {
        graphID: string;
        maxLifeTime: number;
        maxSpeed: number;
        spreadRadius: number;
        [key: string]: string | number;
    }
    export {};
}
declare namespace HomeFudge {
    import ƒ = FudgeCore;
    class GatlingTurret extends ƒ.Node {
        private headNode;
        private baseNode;
        private shootNode;
        private initGatConfigAndAllNodes;
        private getGraphResources;
        private createNode;
        private createShootPosNode;
        moveTurret(xRot: number, yRot: number): void;
        shoot(worldNode: ƒ.Node): void;
        constructor();
    }
}
declare namespace HomeFudge {
    import ƒ = FudgeCore;
    class JSONparser {
        static toVector3(value: number[]): ƒ.Vector3;
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
    import ƒ = FudgeCore;
    let worldNode: ƒ.Node;
    let bulletList: Bullet[];
}
declare namespace HomeFudge {
    import ƒ = FudgeCore;
    class Player extends ƒ.Node {
        update(deltaSeconds: number): void;
        constructor();
    }
}
