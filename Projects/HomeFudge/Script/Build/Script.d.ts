declare namespace HomeFudge {
    export class Config {
        static gatlingBullet: GatlingBulletConfig;
        static gatlingTurret: GatlingTurretConfig;
        static beamTurret: BeamTurretConfig;
        static laserBeam: LaserBeam;
        static destroyer: DestroyerConfig;
        static camera: CameraConfig;
        /**
         * The function initializes configurations by fetching JSON files and assigning their contents
         * to corresponding variables.
         */
        static initConfigs(): Promise<void>;
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
    interface GatlingBulletConfig {
        graphID: string;
        maxLifeTime: number;
        maxSpeed: number;
        spreadRadius: number;
        [key: string]: string | number;
    }
    interface BeamTurretConfig {
        graphID: string;
        maxRotSpeed: number;
        maxPitch: number;
        minPitch: number;
        beamTime: number;
        reloadTime: number;
        range: number;
        basePosition: number[];
        beamPosition: number[];
        [key: string]: string | number | number[];
    }
    interface LaserBeam {
        graphID: string;
        [key: string]: string;
    }
    interface DestroyerConfig {
        graphID: string;
        maxAcceleration: number;
        maxSpeed: number;
        maxTurnSpeed: number;
        maxHealthPoints: number;
        RotThruster_FL: number[];
        RotThruster_FR: number[];
        RotThruster_BL: number[];
        RotThruster_BR: number[];
        [key: string]: string | number | number[];
    }
    interface CameraConfig {
        offset: number[];
        [key: string]: number[];
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
        private static body;
        private static loadText;
        private static loadPNG;
        static init(canvas: HTMLCanvasElement): void;
        static remove(): void;
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
        static DegreeToRadiant(degree: number): number;
        static RadiantToDegree(radiant: number): number;
    }
}
declare namespace HomeFudge {
    import ƒ = FudgeCore;
    class Resources {
        static getGraphResources(graphID: string): Promise<ƒ.Graph>;
        static getComponentNode(nodeName: string, graph: ƒ.Graph): Promise<ƒ.Node>;
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
        protected abstract maxTurnSpeed: number;
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
    enum SIDE {
        LEFT = 0,
        RIGHT = 1
    }
    export class BeamTurret extends ƒ.Node {
        static side: typeof SIDE;
        private static graph;
        private static mesh;
        private static material;
        private rotNode;
        private beam;
        private maxRotSpeed;
        private maxPitch;
        private minPitch;
        private maxBeamTime;
        private maxReloadTime;
        private range;
        private init;
        private addBeam;
        private addComponents;
        private update;
        private rotate;
        fire(): void;
        rotateTo(cordY: number): void;
        constructor(side: number);
    }
    export {};
}
declare namespace HomeFudge {
    import ƒ = FudgeCore;
    enum Weapons {
        GatlingTurret = 0,
        BeamTurret = 1,
        RocketPod = 2
    }
    export class Destroyer extends Ship {
        protected maxSpeed: number;
        protected maxAcceleration: number;
        protected velocity: ƒ.Vector3;
        protected healthPoints: number;
        protected maxTurnSpeed: number;
        private gatlingTurret;
        private beamTurretList;
        private rotation;
        private rotThruster;
        weapons: typeof Weapons;
        static graph: ƒ.Graph;
        static mesh: ƒ.Mesh;
        static material: ƒ.Material;
        private initAllConfigs;
        private addWeapons;
        private addThrusters;
        private setAllComponents;
        private addRigidBody;
        protected update: () => void;
        alive(): boolean;
        destroyNode(): void;
        getVelocity(): ƒ.Vector3;
        toString(): string;
        fireWeapon(_weapon: Weapons): void;
        fireGatling(): void;
        fireBeam(): void;
        move(moveDirection: ƒ.Vector3): void;
        rotate(rotateY: number): void;
        constructor(startPosition: ƒ.Vector3);
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
        private static graph;
        private static mesh;
        private static material;
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
    class LaserBeam extends ƒ.Node {
        private static graph;
        private static mesh;
        private material;
        private init;
        private addComponents;
        constructor(side: string, position: ƒ.Vector3);
    }
}
declare namespace HomeFudge {
    import ƒ = FudgeCore;
    class RotThrusters extends ƒ.Node {
        private static graph;
        private static mesh;
        private static material;
        private static animation;
        private init;
        private createComponents;
        constructor(side: string, position: ƒ.Vector3);
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
    /**
     * The  Mouse class is a TypeScript class that tracks mouse movement and button presses.
     *
     * @static position: ƒ.Vector2;
     * @static movedDistance: ƒ.Vector2;
     * @ArthurErlich <arthur.erlich@hs-furtwangen.de>}
     */
    class Mouse {
        static position: ƒ.Vector2;
        static movedDistance: ƒ.Vector2;
        /**
         * This array should be the same length as the {@link MOUSE_CODE }
         */
        private static isPressed;
        private static tempPos;
        /**
         * This function initializes mouse event listeners and sets up variables for tracking mouse
         * movement.
         * @ArthurErlich <arthur.erlich@hs-furtwangen.de>
         */
        static init(): void;
        /**
         * This is a private static arrow function called `update` that is used to update the
         * `movedDistance` property of the `Mouse` class. It calculates the distance the mouse has
         * moved since the last frame by subtracting the current position of the mouse from the
         * previous position stored in `tempPos`. It then updates `tempPos` to the current position of
         * the mouse so that it can be used to calculate the distance moved in the next frame.
         * @ArthurErlich <arthur.erlich@hs-furtwangen.de>
         */
        private static update;
        /**
         * This is a private static arrow function called `moveUpdate` that is used to update the
         * `position` and `movedDistance` properties of the `Mouse` class when the mouse is moved. It
         * takes a `MouseEvent` object as its parameter and sets the `movedDistance` property to a new
         * `Vector2` object with the `movementX` and `movementY` properties of the `MouseEvent`. It
         * also sets the `position` property to a new `Vector2` object with the `x` and `y` properties
         * of the `MouseEvent`.
        */
        private static moveUpdate;
        /**
         * The function sets the corresponding value in the Mouse.isPressed array based on the button
         * pressed during a mouse down event.
         *
         * @param _event The _event parameter is a MouseEvent object that contains information about
         * the mouse event that occurred, such as the type of event (e.g. mouse down, mouse up, mouse
         * move), the position of the mouse cursor, and which mouse button was pressed.
         */
        private static mouseDown;
        /**
         * The function handles the mouse up event and updates the state of the mouse button that was
         * released.
         *
         * @param _event The _event parameter is a MouseEvent object that contains information about
         * the mouse event that occurred, such as the type of event (e.g. mouseup), the target element
         * that triggered the event, and the position of the mouse cursor at the time of the event.
         */
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
    /**
     * Note: adding buttons means to lengthen the {@link Mouse.isPressed}
     */
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
        private camRotBeforeChange;
        private update;
        constructor(name: string);
    }
}
