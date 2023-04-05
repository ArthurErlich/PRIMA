declare namespace Script {
    import ƒ = FudgeCore;
    class CustomComponentScript extends ƒ.ComponentScript {
        static readonly iSubclass: number;
        message: string;
        constructor();
        hndEvent: (_event: Event) => void;
    }
}
declare namespace LocoFudge {
    import ƒ = FudgeCore;
    class Camera {
        private canvas;
        root: ƒ.Node;
        componentCamera: ƒ.ComponentCamera;
        fieldOfView: number;
        startClipping: number;
        endClipping: number;
        init(): void;
        cameraMovementUpdate(deltaSeconds: number): void;
    }
}
declare namespace LocoFudge {
    enum State {
        "MainMenu" = 0,
        "Playing" = 1,
        "Pause" = 2,
        "GameOver" = 3
    }
}
declare namespace LocoFudge {
    import ƒ = FudgeCore;
    class Mouse {
        private mousePos;
        private selectedTile;
        updateMousePos(e: MouseEvent): void;
        getMousePos(): ƒ.Vector2;
        pickNode(): void;
    }
}
declare namespace LocoFudge {
    import ƒ = FudgeCore;
    class Tile {
        private node;
        constructor(index: number, location: ƒ.Vector3);
        getNode(): ƒ.Node;
    }
}
declare namespace LocoFudge {
    import ƒ = FudgeCore;
    class World {
        private node;
        private worldSize;
        private tiles;
        generateWorld(worldSize: WORLDSIZE): void;
        getNode(): ƒ.Node;
    }
    enum WORLDSIZE {
        "Tiny" = 4,
        "Small" = 16,
        "Medium" = 32,
        "Large" = 64
    }
}
declare namespace LocoFudge {
    import ƒ = FudgeCore;
    class GameManager {
        private static viewport;
        private static canvas;
        private static camera;
        private static graph;
        private static tileGraph;
        private static world;
        private static mouse;
        static initiate(viewport: ƒ.Viewport): void;
        static getViewport(): ƒ.Viewport;
        static getCanvas(): HTMLCanvasElement;
        static getCamera(): Camera;
        static getGraph(): ƒ.Graph;
        static getTileGraph(): ƒ.Graph[];
        static getWorld(): World;
        static getMouse(): Mouse;
        static startWorld(): void;
    }
}
declare namespace LocoFudge {
}
declare namespace LocoFudge {
    class MainLoop {
        static update(): Promise<void>;
    }
}
