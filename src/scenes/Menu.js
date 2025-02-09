class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }
    preload(){
        //load images / tile sprites
        
       
        this.load.image('car', './Assets/car.png')
        this.load.image('obstacle', './Assets/obstacle.png')
        this.load.spritesheet('background', './Assets/background.png',{frameWidth: 620, frameHeight: 480})
        this.load.image('menuscreen','./Assets/titlescreen.png')
    
    }

  create(){
    // starting screen load in 
    this.menuscreen= this.add.image(0,0,'menuscreen').setOrigin(0,0)
    this.input.once('pointerdown', () =>  {
        this.scene.start("playScene")

    });
    
    
    //define keys 
    keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
    keyJUMP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)


    }
}
window.Menu = Menu;