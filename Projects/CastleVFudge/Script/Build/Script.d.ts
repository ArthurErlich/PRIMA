declare namespace Alucard {
    class Alucard {
        maxSpeed: number;
        fallSpeed: number;
        gravity: number;
        update(): void;
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
declare namespace Script {
}
