declare namespace McFudge {
    import ƒ = FudgeCore;
    class Block extends ƒ.Node {
        static meshCube: ƒ.Mesh;
        static materialCube: ƒ.Material;
        constructor();
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
declare namespace McFudge {
}
