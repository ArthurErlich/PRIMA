namespace McFudge{
    import ƒ = FudgeCore;
    export class Block extends ƒ.Node{
        constructor(){
            super("Block");// always call super!
            let meshCube:ƒ.Mesh = new ƒ.MeshCube();
            let materialCube: ƒ.Material = new ƒ.Material("mtr",ƒ.ShaderFlat,new ƒ.CoatRemissive());// you can also grab the Matrial from the resources!
            //now we add them to the Componnets
            
            this.addComponent(new ƒ.ComponentTransform());
            this.addComponent(new ƒ.ComponentMesh(meshCube));
            this.addComponent(new ƒ.ComponentMaterial(materialCube));

        }
    }
}