class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }
    preload(){
        //load images / tile sprites
        
        this.load.image('obstacle', './Assets/obstacle.png')
        this.load.spritesheet('background', './Assets/background.png',{frameWidth: 620, frameHeight: 480})
        this.load.image('menuscreen','./Assets/titlescreen.png')
        this.load.image('ravi', './Assets/raviolisprite.png')
    

        this.load.audio('click', './Assets/click.mp3')
        this.load.audio('pop', './Assets/pop.mp3')
        this.load.audio('death', './Assets/death.mp3')
        this.load.audio('loopingmusic', './Assets/backgroundmusic.mp3')
        this.load.audio('transition', './Assets/transition.mp3')
    }

  create(){


    // starting screen load in
        this.menuscreen= this.add.image(0,0,'menuscreen').setOrigin(0,0)
        this.input.once('pointerdown', () =>  {
            this.sound.play('click')
            this.scene.start("playScene")
    })


    
    
    //define keys 
    keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.m)
    keyJUMP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)


    }
}
window.Menu = Menu;