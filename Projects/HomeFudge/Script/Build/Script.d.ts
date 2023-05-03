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
    let _mainCamera: Camera;
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
    class LoadingScreen {
        static init(canvas: HTMLCanvasElement): void;
    }
}
declare namespace HomeFudge {
    import ƒ = FudgeCore;
    let _worldNode: ƒ.Node;
    let _deltaSeconds: number;
    let _viewport: ƒ.Viewport;
}
declare namespace HomeFudge {
    import ƒ = FudgeCore;
    class Mathf {
        /**
         * The function performs linear interpolation between two numbers based on a given ratio.
         *
         * @param a a is a number representing the starting value of the range to interpolate between.
         * @param b The parameter "b" is a number representing the end value of the range to
         * interpolate between.
         * @param t t is a number between 0 and 1 that represents the interpolation factor. It
         * determines how much of the second value (b) should be blended with the first value (a) to
         * produce the final result. A value of 0 means that only the first value should be used, while
         * a
         * @return the linear interpolation value between `a` and `b` based on the value of `t`.
         */
        static lerp(a: number, b: number, t: number): number;
        /**
         * The function calculates the length of a 3D vector using the Pythagorean theorem.
         *
         * @param v A 3-dimensional vector represented as an object with properties x, y, and z.
         * @return The function `vectorLength` returns the length of a 3D vector represented by the
         * input parameter `v`.
         */
        static vectorLength(v: ƒ.Vector3): number;
        static vectorNegate(v: ƒ.Vector3): ƒ.Vector3;
    }
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
    class BeamTurret extends ƒ.Node {
        fire(): void;
        constructor();
    }
}
declare namespace HomeFudge {
    import ƒ = FudgeCore;
    export class Destroyer extends Ship {
        protected maxSpeed: number;
        protected maxAcceleration: number;
        protected velocity: ƒ.Vector3;
        protected healthPoints: number;
        protected maxTurnRate: number;
        private gatlingTurret;
        private beamTurretList;
        weapons: typeof Weapons;
        static graph: ƒ.Graph;
        static mesh: ƒ.Mesh;
        static material: ƒ.Material;
        private initAllConfigs;
        private addWeapons;
        private setAllComponents;
        protected update: () => void;
        alive(): boolean;
        destroyNode(): void;
        getVelocity(): ƒ.Vector3;
        toString(): string;
        fireWeapon(_weapon: Weapons): void;
        fireGatling(): void;
        fireBeam(): void;
        move(moveDirection: ƒ.Vector3): void;
        constructor(startPosition: ƒ.Vector3);
    }
    enum Weapons {
        GatlingTurret = 0,
        BeamTurret = 1,
        RocketPod = 2
    }
    export {};
}
declare namespace HomeFudge {
    import ƒ = FudgeCore;
    class GatlingBullet extends Bullet {
        protected maxLifeTime: number;
        protected maxSpeed: number;
        protected spreadRadius: number;
        private parentVelocity;
        static graph: ƒ.Graph;
        static worldNode: ƒ.Node;
        static mesh: ƒ.Mesh;
        static material: ƒ.Material;
        update: () => void;
        private initBulletConfig;
        alive(): boolean;
        toString(): string;
        destroyNode(): void;
        constructor(spawnTransform: ƒ.Matrix4x4, _parentVelocity: ƒ.Vector3);
    }
}
declare namespace HomeFudge {
    import ƒ = FudgeCore;
    class GatlingTurret extends ƒ.Node {
        headNode: ƒ.Node;
        baseNode: ƒ.Node;
        private shootNode;
        private static headMesh;
        private static baseMesh;
        private static headMaterial;
        private static baseMaterial;
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
        private update;
        moveTurret(xRot: number, yRot: number): void;
        fire(parentVelocity: ƒ.Vector3): void;
        constructor();
    }
}
declare namespace HomeFudge {
    import ƒ = FudgeCore;
    class Camera extends ƒ.Node {
        attachedTo: ƒ.Node;
        camComp: ƒ.ComponentCamera;
        camNode: ƒ.Node;
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
        private static isPressed;
        private static tempPos;
        static init(): void;
        private static update;
        private static moveUpdate;
        private static mouseDown;
        private static mouseUp;
        /**
         * The function checks if any of the mouse buttons in the input array are currently pressed.
         *
         * @param inputs An array of MOUSE_CODE values that represent the mouse buttons being checked
         * for being pressed.
         * @return A boolean value is being returned, which indicates whether the Mouse is pressed.
         */
        static isPressedOne(inputs: Array<MOUSE_CODE>): boolean;
    }
    enum MOUSE_CODE {
        LEFT = 0,
        MIDDLE = 1,
        RIGHT = 2
    }
}
declare namespace HomeFudge {
    import ƒ = FudgeCore;
    class Player extends ƒ.Node {
        destroyer: Destroyer;
        private selectedWeapon;
        private moveDirection;
        private rotDegreeOnMoveSideways;
        private camRotBeforeChange;
        private update;
        constructor(name: string);
    }
}
