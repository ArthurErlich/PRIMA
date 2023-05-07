namespace HomeFudge {
    export class LoadingScreen {

        private static body: HTMLElement;
        private static loadText: HTMLElement;
        public static init(canvas: HTMLCanvasElement) {
            canvas.style.backgroundColor = "#191919";
            LoadingScreen.body = document.body;
            LoadingScreen.loadText = document.createElement("div");
            LoadingScreen.loadText.style.fontSize = "44px";
            LoadingScreen.loadText.style.textAlign  = "center";
            LoadingScreen.loadText.style.width  = "420px";
            LoadingScreen.loadText.innerHTML = "HomeFudge is Loading";
            LoadingScreen.loadText.style.position = "fixed"
            LoadingScreen.loadText.style.left = "0";
            LoadingScreen.loadText.style.top = "0";

            LoadingScreen.loadText.style.backgroundColor = "#e8e8e8 "

            LoadingScreen.body.append(LoadingScreen.loadText);
        }
        public static remove() {
            LoadingScreen.loadText.remove();
        }

    }

}