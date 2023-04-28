namespace McFudge{
    import ƒ = FudgeCore;
    export class Block extends ƒ.Node{

        //used onesce
        static meshCube:ƒ.Mesh = new ƒ.MeshCube();
        static materialCube: ƒ.Material = new ƒ.Material("mtr",ƒ.ShaderFlat,new ƒ.CoatRemissive());// you can also grab the Matrial from the resources!
        constructor(){
            super("Block");// always call super!
            //now we add them to the Componnets



            this.addComponent(new ƒ.ComponentTransform());
            this.addComponent(new ƒ.ComponentMesh(Block.meshCube));
            this.addComponent(new ƒ.ComponentMaterial(Block.materialCube));

        }
    }
}