namespace HomeFudge {
    export class Mathf {
        public static Lerp(a: number, b: number, t: number): number {
            if (t < 0) {
                throw new Error(t + " is smaller 0");
            }
            if (t > 1) {
                throw new Error(t + " is larger 1");
            }
            return a + (t * b - t * b);
        }
    }

}