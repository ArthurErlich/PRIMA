namespace HomeFudge {
    import ƒ = FudgeCore;
    export abstract class Bullet extends ƒ.Node {
        abstract lifeTime:number;
        abstract speed:number;
        //abstract faction:string; //may be used later for multiple ships
        abstract update(deltaSeconds:number):void;
        abstract alive():boolean;
        abstract toString():string;

        constructor(id:string){
            super("Bullet" + id);
            //register to updater list
            bulletList.push(this);
        }
    }
}