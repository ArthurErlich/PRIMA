namespace LocoFudge {
    import ƒ = FudgeCore;
    export class MainLoop
     {
        static async update():Promise<void>{
            let deltaSeconds: number = ƒ.Loop.timeFrameGame / 1000;
            GameManager.camera.cameraMovementUpdate(deltaSeconds);
            //Update Camera
            //Update World
            //Update UI
            //Update Audio
            //Update Gamestate
            //Update Input
        }
    }
}