namespace LocoFudge {
    import ƒ = FudgeCore;
    export class GameManager {

        private static viewport: ƒ.Viewport = null;
        private static canvas: HTMLCanvasElement = null;
        private static camera: Camera = null;
        private static graph: ƒ.Graph = null; //Graph of all resources
        private static tileGraph: ƒ.Graph[] = new Array(); //Graph of all tiles  //TODO:Finish crating instances of graphs
        private static world: World = null;
        private static mouse: Mouse = null;

        public static initiate(viewport: ƒ.Viewport): void {
            this.viewport = viewport;
            this.canvas = viewport.canvas;
            this.camera = new Camera();
            this.camera.init();
            this.mouse = new Mouse();
            viewport.camera = this.camera.root.getComponent(ƒ.ComponentCamera)

            //TODO:Finish crating instances of graphs
            // this.addTileGraph([
            //     "Graph|2023-04-04T15:30:19.835Z|02723",
            // ]);

            let graphId = "Graph|2023-04-03T21:33:17.373Z|97920";
            this.graph = ƒ.Project.resources[graphId] as ƒ.Graph;
            if (!this.graph) {
                console.error("Graph with resources not found " + graphId);
            }

            this.startWorld();
        }

        ///Getter\\\
        static getViewport(): ƒ.Viewport {
            return this.viewport;
        }
        static getCanvas(): HTMLCanvasElement {
            return this.canvas;
        }
        static getCamera(): Camera {
            return this.camera;
        }
        static getGraph(): ƒ.Graph {
            return this.graph;
        }
        public static getTileGraph(): ƒ.Graph[] {
            return this.tileGraph;
        }
        public static getWorld(): World {
            return this.world;
        }
        public static getMouse(): Mouse {
            return this.mouse;
        }

        public static startWorld(): void {
            let world: World = new World();

            //Generate World size is selectable
            world.generateWorld(WORLDSIZE.Medium);
            this.world = world;
            this.viewport.getBranch().addChild(world.getNode());

            console.log("World generated");
            console.log(world.getNode());
        }

        
        //TODO:Finish crating instances of graphs

        // private static addTileGraph(graphIds:string[]): void {
        //     for (let graphId of graphIds){
        //         let graph:ƒ.Graph = ƒ.Project.resources[graphId] as ƒ.Graph;
        //         if(!graph){
        //             console.error("Graph with resources not found " + graphId);
        //         }else{
        //             this.tileGraph.push(graph);
        //         }
        //     }
        // }
    }
}