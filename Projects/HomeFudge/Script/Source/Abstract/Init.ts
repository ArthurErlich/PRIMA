//TODO:Replace autoView.js inside here
namespace HomeFudge {
   document.addEventListener("startInteractiveViewport", (event) => startInteractiveViewport(<CustomEvent>event));

   async function startInteractiveViewport(_event:CustomEvent) {
    console.warn(_event.detail);
   }
}