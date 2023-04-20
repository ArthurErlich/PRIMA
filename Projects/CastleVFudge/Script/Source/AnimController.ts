
namespace CastleV{
    import ƒ = FudgeCore;
    export class AnimController{

    }
    export enum ANIMATION_DIRECTION{
        Left,
        Right
    }
    export enum ANIMATION_STATES{
        Idling,
        StartWalking,
        Walking
    }
}
        /*
        private animations:ƒ.ComponentAnimator[];
        private plaingAnim:ANIMATION_INDEX= null;
        private plaingDirection:ANIMATION_DIRECTION = null;
        private alucardAnimator:ƒ.ComponentAnimator;

        constructor(animator:ƒ.ComponentAnimator){
            this.init(animator)
        }

        public init(animator:ƒ.ComponentAnimator){
            this.setAnimator(animator);
            this.getAnimationsFromResurses();
        }
        
        private getAnimationsFromResurses(){
            this.animations = [
                ƒ.Project.getResourcesByName("Anim_Idl")[0],
                ƒ.Project.getResourcesByName("Anim_StartWalking")[0],
                ƒ.Project.getResourcesByName("Anim_Walking")[0],
            ]
        }
        private setAnimator(animator:ƒ.ComponentAnimator){
            this.alucardAnimator = animator;
        }
        public playAnimation(play:ANIMATION_INDEX,direction:ANIMATION_DIRECTION){
            if((this.plaingAnim == null||this.plaingAnim==play) && (this.plaingDirection == null || this.plaingDirection == direction)){
                this.plaingAnim = play;
                this.plaingDirection = direction;
                this.alucardAnimator = this.animations[ANIMATION_INDEX.Anim_StartWalking];//TODO: Change alucards animator not animations sprite
            }
        }
    }
    export enum ANIMATION_INDEX{
        Anim_Idl,
        Anim_StartWalking,
        Anim_Walking
    }
    
}
*/