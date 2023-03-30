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
        private gravity;
        private playerSpeed;
        private fallingSpeed;
        private maySpeed;
        private maxFallSpeed;
        private material;
        private deltaTimeSeconds;
        private elapsedTimeAnim;
        constructor(viewport: ƒ.Viewport);
        update(deltaTimeSeconds: number): void;
        private input;
        private movement;
        private updatePlayerAnim;
    }
}
