namespace HomeFudge{
    import ƒ = FudgeCore;
    export class LaserTurret extends ƒ.Node{

        constructor(pos:LASER_TURRET_POS){
            super("Laser."+ pos);
        }

    }
    export enum LASER_TURRET_POS{
        RIGHT,
        LEFT,
    }
}