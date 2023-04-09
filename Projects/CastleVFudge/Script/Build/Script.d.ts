declare namespace CastleV {
    class AnimController {
    }
    enum ANIMATION_STATES {
        Idleing = 0,
        StartWalking = 1,
        Walking = 2
    }
}
declare namespace CastleV {
    import ƒ = FudgeCore;
    class CollisionDetection {
        static tiles: ƒ.Node[];
        static lastCollision: ƒ.Vector3;
        static setupCollision(floor: ƒ.Node): void;
        static updateTiles(tiles: ƒ.Node[]): void;
        static check(playerMtxWorld: ƒ.Matrix4x4): Collision[];
        private static getDistance;
    }
    enum Collision {
        NONE = 0,
        LEFT = 1,
        RIGHT = 2,
        UP = 3,
        DOWN = 4
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
declare namespace CastleV {
}
declare namespace CastleV {
    import ƒ = FudgeCore;
    class Player {
        alucard: ƒ.Node;
        pivot: ƒ.Node;
        private maxWalkSpeed;
        private gravity;
        private fallingSpeed;
        private maxFallingSpeed;
        private playerSpeed;
        private material;
        private animation;
        private deltaTimeSeconds;
        private animationDirection;
        constructor(viewport: ƒ.Viewport);
        update(deltaTimeSeconds: number): void;
        resetPlayer(): void;
        setAnimation(animation: ƒ.Animation): void;
        getSpeed(): ƒ.Vector3;
        private input;
        private movement;
    }
}
