namespace LocoFudge {
    import ƒ = FudgeCore;
    export class MainLoop
     {
        static update():void{
            let deltaSeconds: number = ƒ.Loop.timeFrameGame / 1000;
            
            GameManager.getCamera().cameraMovementUpdate(deltaSeconds);

            
            //TODO:Update World
            //TODO:Update Audio
        }
    }
}