declare namespace CastleV {
    import ƒ = FudgeCore;
    class CollisionDetection {
        static tiles: ƒ.Node[];
        static lastCollisionY: number;
        static updateTiles(tiles: ƒ.Node[]): void;
        static check(playerMtxWorld: ƒ.Matrix4x4): Collision;
        private static getDistance;
    }
    enum Collision {
        NONE = 0,
        LEFT = 1,
        RIGHT = 2,
        DOWN = 3
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
        private maxFallSpeed;
        private TEMPgroundLevel;
        private playerSpeed;
        private material;
        private deltaTimeSeconds;
        private updateTime;
        private elapsedTimeAnim;
        constructor(viewport: ƒ.Viewport);
        update(deltaTimeSeconds: number): void;
        private input;
        private movement;
        private updatePlayerAnim;
    }
}
