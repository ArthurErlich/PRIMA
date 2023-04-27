namespace HomeFudge {
    import ƒ = FudgeCore;
    export abstract class Bullet extends ƒ.Node {
        abstract maxLifeTime:number;
        abstract maxSpeed:number;

        //abstract faction:string; //may be used later for multiple ships
        abstract update(deltaSeconds:number):void;
        abstract alive():boolean;
        abstract destroyNode():void;
        abstract toString():string;

        //TODO:create static reference to the Component, Mesh and Material
        protected static async getGraphResources(graphID: string): Promise<ƒ.Graph> {
            let graph: ƒ.Graph = <ƒ.Graph>ƒ.Project.resources[graphID]
            if (graph == null) {
                console.warn(graph + " not found with ID: " + graphID);
            }
            return graph;
        }
        protected static async getComponentNode(nodeName: string, graph: ƒ.Graph):  Promise<ƒ.Node> {
            let node:ƒ.Node = graph.getChildrenByName(nodeName)[0];
            if (node == null) {
                console.warn("+\"" + nodeName + "\" not found inside: " + graph.name + "->Graph");
            }
            return node;
        }

        constructor(idString:string){
            super("Bullet" + idString);
            //register to updater list
            bulletList.push(this);
        }
    }
}