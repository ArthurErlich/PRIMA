declare namespace McFudge {
    import ƒ = FudgeCore;
    class Block extends ƒ.Node {
        static meshCube: ƒ.Mesh;
        static materialCube: ƒ.Material;
        constructor(_position: ƒ.Vector3, _color: ƒ.Color);
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
declare namespace McFudge {
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
         * This function initializes mouse event listeners and adds them to the canvas and the loop.
         *
         * @param canvas HTMLCanvasElement - This is the canvas element on which the mouse events will
         * be registered and tracked.
         * @ArthurErlich <arthur.erlich@hs-furtwangen.de>
         */
        static init(canvas: HTMLCanvasElement): void;
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
declare namespace McFudge {
    import ƒ = FudgeCore;
    class Steve extends ƒ.Node {
        constructor();
    }
}
