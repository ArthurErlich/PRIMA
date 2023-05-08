namespace McFudge{
    import ƒ = FudgeCore;
    export class Block extends ƒ.Node{

        //used once
        static meshCube:ƒ.Mesh = new ƒ.MeshCube();
        static materialCube: ƒ.Material = new ƒ.Material("mtr",ƒ.ShaderFlat,new ƒ.CoatRemissive());// you can also grab the Matrial from the resources!
        constructor(_position : ƒ.Vector3, _color :ƒ.Color){
            super(_position.toString());// always call super!
            //now we add them to the Componnets
            let transform= new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(_position));
            let mesh = new ƒ.ComponentMesh(Block.meshCube);
            let material = new ƒ.ComponentMaterial(Block.materialCube);

            material.clrPrimary = _color;

            
            this.addComponent(transform);
            this.addComponent(mesh);
            this.addComponent(material);

        }
    }
}