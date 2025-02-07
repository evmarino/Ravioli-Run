class Play extends Phaser.Scene{
    constructor(){
        super("playScene")
    }
    create(){
        //placing background sprite
        this.background = this.add.image(0,0,640,480,'background').setOrigin(0,0)

        //define keys 
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        keyJUMP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    }

}
