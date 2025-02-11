class GameOver extends Phaser.Scene {
    constructor() {
        super("gameoverScene");
    }

    preload() {
        this.load.image('gameOver', './Assets/gameover.png');
        this.load.audio('transition', './Assets/transition.mp3');
    }

    create(data) {

        let timeRan = (data && data.timeElapsed !== undefined) ? data.timeElapsed : 0; // Default to 0

        this.transitionSound = this.sound.add('transition')
        this.transitionSound.setRate(3.5)
        
        this.add.tileSprite(0,0,640, 480, 'gameOver').setOrigin(0, 0);
        
        this.gameoverText = this.add.text(140,123,'GAME OVER ', { fontSize: '60px', fill: '#FFF', fontFamily: 'Comic Sans MS', style: 'bold', backgroundColor: '#FFBD16' })
        this.gameoverText = this.add.text(90,250,'press M for main menu or click anywhere to restart ', { fontSize: '19px', fill: '#FFF', fontFamily: 'Comic Sans MS', style: 'bold', backgroundColor: '#FFBD16' })

        this.add.text(50, 200, `You escaped the grocery store for ${timeRan} seconds!`, 
            { fontSize: '23px', fill: '#ED7014', fontFamily: 'Comic Sans MS', fontStyle: 'bold', backgroundColor: '#FFF' });
        
            this.add.text(0,460,
                "Sound Effect by Stylianos Danezis from Pixabay - Groove Background Music",
                { fontSize: '10px', fill: '#ED7014', fontFamily: 'Comic Sans MS', fontStyle: 'bold', backgroundColor: '#FFF' });
            
            this.add.text(0,445,
                "Sound Effect by freesound_community from Pixabay - Harp transition",
                { fontSize: '10px', fill: '#ED7014', fontFamily: 'Comic Sans MS', fontStyle: 'bold', backgroundColor: '#FFF' });
                
            this.add.text(0,430,  "Sound Effect by u_8e8ungop1x from Pixabay - pop",
                { fontSize: '10px', fill: '#ED7014', fontFamily: 'Comic Sans MS', fontStyle: 'bold', backgroundColor: '#FFF' });
        
            this.add.text(0,415,  "Sound Effect by Matthew Vakalyuk from Pixabay",
                { fontSize: '10px', fill: '#ED7014', fontFamily: 'Comic Sans MS', fontStyle: 'bold', backgroundColor: '#FFF' });
            
            
            this.add.text(0,400,  "Drop Sound Effect, creator unknown, from Pixabay",
                { fontSize: '10px', fill: '#ED7014', fontFamily: 'Comic Sans MS', fontStyle: 'bold', backgroundColor: '#FFF' });
            
        // Restart game on click
        this.input.once('pointerdown', () => {
            this.sound.play('click')
            this.scene.start("playScene")
        })

       
        this.keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
    }
        
    
    update() {

        if (Phaser.Input.Keyboard.JustDown(this.keyRESET)) {
            this.transitionSound.play()
            this.scene.start("menuScene");     
        
        }
       
        }
}

