namespace LocoFudge {
    import ƒ = FudgeCore;
    export class MainLoop
     {
        static update():void{
            let deltaSeconds: number = ƒ.Loop.timeFrameGame / 1000;

            //Update Camera
            GameManager.camera.cameraMovementUpdate(deltaSeconds);
            //Update World
            //Update UI
            //Update Audio
            //Update Gamestate
            //Update Input
        }
    }
}