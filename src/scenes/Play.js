class Play extends Phaser.Scene{
    
    constructor(){
        
        super("playScene")
        
    }
    preload(){
        this.load.spritesheet('can', './Assets/sprite_sheet.png', { frameWidth: 315, frameHeight:132 ,
            } );
    }

    create(){
       // tile sprite
        this.background = this.add.tileSprite(0,0, 640, 480, 'background').setOrigin(0,0)

        //define keys 
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        keyJUMP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

        //sprite animation
        const walk = {
        key: 'walk',
        frames: this.anims.generateFrameNumbers('can', {start:0, end: 2}),
        frameRate: 10,
        repeat: -1
    }
        const idle = {
        key: 'idle',
        frames: [{key: 'can', frame: 3}],
        frameRate: 1, 
        repeat: -1
    }
        const jump ={
        key: 'jump',
        frames: [{ key: 'can', frame: 4}],
        frameRate: 1,
        repeat: 0
    
    }

   this.anims.create(walk)
   this.anims.create(idle)
   this.anims.create(jump)
   

        
    //add player
    this.player = this.physics.add.sprite(100, 350, 'can').setScale(1.5)
    this.player.body.setGravityY(600)

    this.player.play('walk', true)


    //floor 
   
    this.floor = this.add.rectangle(this.player.x, this.player.y + 99, game.config.width +100, borderUISize *2, 0x9D9C9D).setOrigin(0.13,0)
    this.physics.add.existing(this.floor, true)
    this.physics.add.collider(this.player, this.floor)
    

    }
    update(){

        //moving background
        this.background.tilePositionX += 4

        //player jumping and walking animation with space bar
        if(Phaser.Input.Keyboard.JustDown(keyJUMP) && this.player.body.touching.down){
            this.player.play('jump', true) 
            this.playerJumps()
        } 
        
        else if (this.player.body.touching.down && this.player.anims.currentAnim.key !== 'walk'){
            this.player.play('walk',true)
        }
    }
    
    playerJumps(){
        this.player.setVelocityY(-400)
    }
    }
