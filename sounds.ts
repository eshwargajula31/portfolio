class SoundManager {
    private static instance: SoundManager;
    private sounds: { [key: string]: HTMLAudioElement } = {};
    private enabled: boolean = true;

    private constructor() {
        // Initialize sounds
        this.sounds = {
            hover: new Audio('/sounds/hover.mp3'),
            click: new Audio('/sounds/click.mp3'),
            scan: new Audio('/sounds/scan.mp3'),
            boot: new Audio('/sounds/boot.mp3'),
            success: new Audio('/sounds/success.mp3')
        };

        // Set default properties
        Object.values(this.sounds).forEach(sound => {
            sound.volume = 0.5;
        });
    }

    public static getInstance(): SoundManager {
        if (!SoundManager.instance) {
            SoundManager.instance = new SoundManager();
        }
        return SoundManager.instance;
    }

    public play(soundName: string): void {
        if (!this.enabled) return;
        
        const sound = this.sounds[soundName];
        if (sound) {
            sound.currentTime = 0;
            sound.play().catch(e => console.log('Audio playback failed:', e));
        }
    }

    public toggle(): void {
        this.enabled = !this.enabled;
    }

    public isEnabled(): boolean {
        return this.enabled;
    }
}

export const soundManager = SoundManager.getInstance();

