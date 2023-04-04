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
        generateWorld(worldSize: WorldSize): void;
        getNode(): ƒ.Node;
    }
    enum WorldSize {
        "Tiny" = 4,
        "Small" = 16,
        "Medium" = 32,
        "Large" = 64
    }
}
declare namespace LocoFudge {
    import ƒ = FudgeCore;
    class GameManager {
        static viewport: ƒ.Viewport;
        static canvas: HTMLCanvasElement;
        static camera: Camera;
        static graph: ƒ.Graph;
        static tileGraph: ƒ.Graph[];
        static world: World;
        static mouse: Mouse;
        static initiate(viewport: ƒ.Viewport): void;
        static startWorld(): void;
        static getTileGraph(): ƒ.Graph[];
    }
}
declare namespace LocoFudge {
}
declare namespace LocoFudge {
    class MainLoop {
        static update(): Promise<void>;
    }
}
