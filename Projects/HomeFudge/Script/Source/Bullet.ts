namespace HomeFudge {
    import ƒ = FudgeCore;
    export abstract class Bullet extends ƒ.Node {
        abstract lifeTime:number;
        abstract maxSpeed:number;
        abstract graph:ƒ.Graph;
        //abstract faction:string; //may be used later for multiple ships
        abstract update(deltaSeconds:number):void;
        abstract alive():boolean;
        abstract kill():void;
        abstract toString():string;

        constructor(idString:string){
            super("Bullet" + idString);
            //register to updater list
            bulletList.push(this);
        }
    }
}