namespace HomeFudge{
    import ƒ = FudgeCore;
    export class JSONparser{
        public static toVector3(value:number[]):ƒ.Vector3{
            return new ƒ.Vector3(value[0],value[1],value[2]);
        }
    }
}