namespace HomeFudge{
    export class LoadingScreen{
        public static init(canvas:HTMLCanvasElement){
            canvas.style.backgroundColor = "#191919";
            

            let body:HTMLElement = document.body;
            let loadText:HTMLElement = document.createElement("div");
            loadText.style.fontSize = "44px";
            loadText.innerHTML = "HomeFudge is Loading";
            

            body.append(loadText);
        }
        
    }

}