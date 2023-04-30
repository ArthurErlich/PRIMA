namespace HomeFudge {
    import ƒ = FudgeCore;
    export class Config {
        public static gatlingBullet: GatlingBulletConfig = null;
        public static gatlingTurret: GatlingTurretConfig = null;
        public static destroyer: DestroyerConfig = null;
        public static camera: CameraConfig = null;

        public static async initConfigs(): Promise<void> {
            let gatTurretResponse: Response = await fetch("Configs/gatTurretConfig.json");
            let gatBulletResponse: Response = await fetch("Configs/gatBulletConfig.json");
            let destroyerResponse: Response = await fetch("Configs/destroyerConfig.json");
            let cameraResponse: Response = await fetch("Configs/cameraConfig.json");


            Config.gatlingBullet = await gatBulletResponse.json();
            Config.gatlingTurret = await gatTurretResponse.json();
            Config.destroyer = await destroyerResponse.json();
            Config.camera = await cameraResponse.json();
        }

    }
    interface CameraConfig {
        offset: number[];
        [key: string]: number[];
    }
    interface GatlingBulletConfig {
        graphID: string;
        maxLifeTime: number;
        maxSpeed: number;
        spreadRadius: number;
        [key: string]: string | number;
    }
    interface DestroyerConfig {
        graphID: string;
        maxAcceleration: number;
        maxSpeed: number;
        maxTurnSpeed: number;
        maxHealthPoints: number;
        [key: string]: string | number;
    }
    ///interface for Blender positions and configs for GatlingTurret\\\
    interface GatlingTurretConfig {
        ///graph of all resource for the turret\\\
        graphID: string;
        ///position for the nodes\\\
        headPosition: number[];
        basePosition: number[];
        shootNodePosition: number[];
        ///rotation stuff\\\
        maxRotSpeed: number;
        maxPitch: number;
        minPitch: number;
        ///shooting stuff\\\
        roundsPerSeconds: number;
        reloadTime: number;
        magazineCapacity: number;
        [key: string]: number[] | number | string;
    }
}