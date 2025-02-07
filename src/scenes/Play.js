class Play extends Phaser.Scene{
    
    constructor(){
        
        super("playScene")
        
    }
    preload(){
        this.load.spritesheet('can', './Assets/sprite_sheet.png', { frameWidth: 315, frameHeight:132 ,
            } );
    }

    create(){

        this.background = this.add.image(0,0,'background').setOrigin(0,0)

        //define keys 
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        keyJUMP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

         //sprite animation
       /* const walk = {
        key: 'walk',
        frames: this.anims.generateFrameNumbers('can', {start:0, end: 2}),
        frameRate: 16,
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
   this.anims.create(jump)*/
   
   //this.player.play('walk', true)


        
        //add player
        console.log("🛠 Creating Player...");
       
       this.player = this.add.sprite(100, 400, 'can', 0);
        console.log("Player created successfully:", this.player);
        
       
    }
    update(){
    if(this.player){
        this.player.update()
    }
    
        
    }

}

