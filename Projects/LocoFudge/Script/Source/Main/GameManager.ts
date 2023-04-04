namespace LocoFudge {
    import ƒ = FudgeCore;
    export class GameManager {

        public static viewport: ƒ.Viewport = null;
        public static canvas: HTMLCanvasElement = null;
        public static camera: Camera = null;
        public static graph: ƒ.Graph = null; //Graph of all resources
        public static world: World = null;
        public static mouse: Mouse = null;

        public static initiate(viewport: ƒ.Viewport): void {
            this.viewport = viewport;
            this.canvas = viewport.canvas;
            this.camera = new Camera();
            this.camera.init();
            this.mouse = new Mouse();
            viewport.camera = this.camera.root.getComponent(ƒ.ComponentCamera)
            
            let graphId = "Graph|2023-04-03T21:33:17.373Z|97920";
            this.graph = ƒ.Project.resources[graphId] as ƒ.Graph;
            if(!this.graph){
                console.error("Graph with resources not found " + graphId);
            }

            this.startWorld();
        }
        public static startWorld(): void {
            let world: World = new World();

            //Generate World size is selectable
            world.generateWorld(WorldSize.Medium);
            this.world = world;
            this.viewport.getBranch().addChild(world.getNode());

            console.log("World generated");
            console.log(world.getNode());

        }
    }
}