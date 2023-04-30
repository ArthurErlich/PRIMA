declare namespace HomeFudge {
    export class Config {
        static gatlingBullet: GatlingBulletConfig;
        static gatlingTurret: GatlingTurretConfig;
        static destroyer: DestroyerConfig;
        static camera: CameraConfig;
        static initConfigs(): Promise<void>;
    }
    interface CameraConfig {
        offset: number[];
        [key: string]: number[];
    }
    interface GatlingBulletConfig {
        graphID: string;
        maxLifeTime: number;
        maxSpeed: number;
        spreadRadius: number;
        [key: string]: string | number;
    }
    interface DestroyerConfig {
        graphID: string;
        maxAcceleration: number;
        maxSpeed: number;
        maxTurnSpeed: number;
        maxHealthPoints: number;
        [key: string]: string | number;
    }
    interface GatlingTurretConfig {
        graphID: string;
        headPosition: number[];
        basePosition: number[];
        shootNodePosition: number[];
        maxRotSpeed: number;
        maxPitch: number;
        minPitch: number;
        roundsPerSeconds: number;
        reloadTime: number;
        magazineCapacity: number;
        [key: string]: number[] | number | string;
    }
    export {};
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
    class JSONparser {
        /**
         * This function takes an array of three numbers and returns a new Vector3 object with those
         * values.
         *
         * @param value An array of three numbers representing the x, y, and z components of a vector.
         * @return A new instance of the ƒ.Vector3 class with the x, y, and z values set to the values
         * in the input array.
         * @author Arthur Erlich <arthur.erlich@hs-furtwangen.de>
         */
        static toVector3(value: number[]): ƒ.Vector3;
    }
}
declare namespace HomeFudge {
    import ƒ = FudgeCore;
    let _worldNode: ƒ.Node;
    let _deltaSeconds: number;
    let aimPos: ƒ.Vector3;
}
declare namespace HomeFudge {
    import ƒ = FudgeCore;
    abstract class Bullet extends ƒ.Node {
        protected abstract maxLifeTime: number;
        protected abstract maxSpeed: number;
        abstract update(): void;
        abstract destroyNode(): void;
        abstract toString(): string;
        /**
         * This function retrieves a graph resource from a project in TypeScript.
         *
         * @param graphID A string representing the ID of the graph resource that needs to be
         * retrieved.
         * @return a Promise that resolves to a ƒ.Graph object.
         */
        protected static getGraphResources(graphID: string): Promise<ƒ.Graph>;
        /**
         * This function retrieves a specific node from a graph and returns it as a promise.
         *
         * @param nodeName A string representing the name of the node that is being searched for in the
         * graph.
         * @param graph A ƒ.Graph object, which is a container for nodes and their connections in a
         * scene or game world.
         * @return a Promise that resolves to a ƒ.Node object.
         */
        protected static getComponentNode(nodeName: string, graph: ƒ.Graph): Promise<ƒ.Node>;
        constructor(idString: string);
    }
}
declare namespace HomeFudge {
    import ƒ = FudgeCore;
    abstract class Ship extends ƒ.Node {
        protected abstract velocity: ƒ.Vector3;
        protected abstract maxSpeed: number;
        protected abstract maxAcceleration: number;
        protected abstract maxTurnRate: number;
        protected abstract healthPoints: number;
        protected abstract update(): void;
        abstract destroyNode(): void;
        abstract toString(): string;
        /**
         * This function retrieves a graph resource from a project in TypeScript.
         *
         * @param graphID A string representing the ID of the graph resource that needs to be
         * retrieved.
         * @return a Promise that resolves to a ƒ.Graph object.
         */
        protected static getGraphResources(graphID: string): Promise<ƒ.Graph>;
        /**
         * This function retrieves a specific node from a graph and returns it as a promise.
         *
         * @param nodeName A string representing the name of the node that is being searched for in the
         * graph.
         * @param graph A ƒ.Graph object, which is a container for nodes and their connections in a
         * scene or game world.
         * @return a Promise that resolves to a ƒ.Node object.
         */
        protected static getComponentNode(nodeName: string, graph: ƒ.Graph): Promise<ƒ.Node>;
        constructor(name: string);
    }
}
declare namespace HomeFudge {
    import ƒ = FudgeCore;
    class Destroyer extends Ship {
        protected maxSpeed: number;
        protected maxAcceleration: number;
        protected velocity: ƒ.Vector3;
        protected healthPoints: number;
        protected maxTurnRate: number;
        gatlingTurret: GatlingTurret;
        laserTurretList: LaserTurret[];
        static graph: ƒ.Graph;
        static worldNode: ƒ.Node;
        static mesh: ƒ.Mesh;
        static material: ƒ.Material;
        private initAllConfigs;
        private addWeapons;
        private setAllComponents;
        protected update: () => void;
        alive(): boolean;
        destroyNode(): void;
        toString(): string;
        constructor(position: ƒ.Vector3);
    }
}
declare namespace HomeFudge {
    import ƒ = FudgeCore;
    class GatlingBullet extends Bullet {
        protected maxLifeTime: number;
        protected maxSpeed: number;
        protected spreadRadius: number;
        static graph: ƒ.Graph;
        static worldNode: ƒ.Node;
        static mesh: ƒ.Mesh;
        static material: ƒ.Material;
        update: () => void;
        private initBulletConfig;
        alive(): boolean;
        toString(): string;
        destroyNode(): void;
        constructor(spawnTransform: ƒ.Matrix4x4);
    }
}
declare namespace HomeFudge {
    import ƒ = FudgeCore;
    class GatlingTurret extends ƒ.Node {
        private headNode;
        private baseNode;
        private shootNode;
        private roundsPerSecond;
        private reloadsEverySecond;
        private roundsTimer;
        private reloadTimer;
        private magazineCapacity;
        private magazineRounds;
        private initConfigAndAllNodes;
        private getGraphResources;
        private createComponents;
        private createShootPosNode;
        /**
         *
         * @param deltaSeconds
         * Don't forget to call this function in the UpdateMethod!!!
         */
        private update;
        moveTurret(xRot: number, yRot: number): void;
        shoot(): void;
        constructor();
    }
}
declare namespace HomeFudge {
    import ƒ = FudgeCore;
    class LaserTurret extends ƒ.Node {
        constructor();
    }
}
declare namespace HomeFudge {
    class Mathf {
        static Lerp(a: number, b: number, t: number): number;
    }
}
declare namespace HomeFudge {
    import ƒ = FudgeCore;
    class Camera extends ƒ.Node {
        aimPoinz: ƒ.Vector3;
        attachedTo: ƒ.Node;
        private offset;
        attachToShip(ship: ƒ.Node): void;
        private update;
        private init;
        constructor(name: string);
    }
}
declare namespace HomeFudge {
    import ƒ = FudgeCore;
    class Mouse {
        static pos: ƒ.Vector2;
        static change: ƒ.Vector2;
        static init(): void;
        private static update;
    }
}
