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
    let worldNode: ƒ.Node;
    let bulletList: Bullet[];
    let shipsList: Ship[];
}
declare namespace HomeFudge {
    import ƒ = FudgeCore;
    abstract class Bullet extends ƒ.Node {
        protected abstract maxLifeTime: number;
        protected abstract maxSpeed: number;
        abstract update(deltaSeconds: number): void;
        abstract alive(): boolean;
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
        abstract update(deltaSeconds: number): void;
        abstract alive(): boolean;
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
    export class Destroyer extends Ship {
        protected velocity: ƒ.Vector3;
        static graph: ƒ.Graph;
        static worldNode: ƒ.Node;
        static mesh: ƒ.Mesh;
        static material: ƒ.Material;
        static bulletConfig: DestroyerConfig;
        update(deltaSeconds: number): void;
        alive(): boolean;
        destroyNode(): void;
        toString(): string;
        constructor();
    }
    interface DestroyerConfig {
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
    export class GatlingBullet extends Bullet {
        protected maxLifeTime: number;
        protected maxSpeed: number;
        protected spreadRadius: number;
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
        private roundsPerSecond;
        private reloadsEverySecond;
        private roundsTimer;
        private reloadTimer;
        private magazineCapacity;
        private magazineRounds;
        private static gatlingConfig;
        private initConfigAndAllNodes;
        private getGraphResources;
        private createNode;
        private createShootPosNode;
        /**
         *
         * @param deltaSeconds
         * Don't forget to call this function in the UpdateMethod!!!
         */
        update(deltaSeconds: number): void;
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
