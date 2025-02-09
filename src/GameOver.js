class GameOver extends Phaser.Scene {
    constructor() {
        super("gameoverScene");
    }

    preload() {
        this.load.image('gameOver', './Assets/gameover.png');
    }

    create() {
        this.add.tileSprite(0, 0, 640, 480, 'gameOver').setOrigin(0, 0);
        
        // Restart game on click
        this.input.once('pointerdown', () => {
            this.scene.start("playScene");
        });
    }
    update() {

       
       
        }
}

