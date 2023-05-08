namespace McFudge{
    import ƒ = FudgeCore;
    export class Steve extends ƒ.Node{
        constructor(){
            super ("steve");

            this.addComponent(new ƒ.ComponentMesh(new ƒ.MeshCube));
            this.addComponent(new ƒ.ComponentMaterial(new ƒ.Material("mat",ƒ.ShaderFlat, new ƒ.CoatRemissive())));
            this.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(new ƒ.Vector3(0,4,0))));
            this.addComponent(new ƒ.ComponentRigidbody(1,ƒ.BODY_TYPE.DYNAMIC,ƒ.COLLIDER_TYPE.CAPSULE,ƒ.COLLISION_GROUP.DEFAULT));
            this.addComponent(new ƒ.ComponentCamera());

            this.getComponent(ƒ.ComponentCamera).activate(true);
            this.getComponent(ƒ.ComponentRigidbody).mtxPivot.scale(new ƒ.Vector3(0.5,0.5,0.5));
            this.getComponent(ƒ.ComponentRigidbody).effectRotation = new ƒ.Vector3(0,1,0);

            this.getComponent(ƒ.ComponentRigidbody).friction = 0;
            this.getComponent(ƒ.ComponentMesh).mtxPivot.scaleX(0.5);
            this.getComponent(ƒ.ComponentMesh).mtxPivot.scaleZ(0.5);

        }
    }
}