declare namespace HomeFudge {
    import ƒ = FudgeCore;
    abstract class Bullet extends ƒ.Node {
        abstract lifeTime: number;
        abstract speed: number;
        abstract update(deltaSeconds: number): void;
        abstract alive(): boolean;
        abstract toString(): string;
        constructor(id: string);
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
    class GatlingBullet extends Bullet {
        lifeTime: number;
        speed: number;
        update(deltaSeconds: number): void;
        alive(): boolean;
        toString(): string;
        constructor(lifeTime: number, id: number);
    }
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
        shoot(lifeTime: number, id: number): void;
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
    let bulletList: Bullet[];
}
declare namespace HomeFudge {
    import ƒ = FudgeCore;
    class Player extends ƒ.Node {
        update(deltaSeconds: number): void;
        constructor();
    }
}
