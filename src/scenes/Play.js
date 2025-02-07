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
            frames: this.anims.generateFrameNumbers('can', {start:0 , end: 2}),
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
        this.player = this.physics.add.sprite(100, 350, 'can').setScale(0.5).setSize(60,125)
        this.player.body.setGravityY(600)

        //walk animation on
        this.player.play('walk', true)

        //game over
        this.gameOver = false

        //load car into game
        this.loadCar()

    //invisible floor for player collision
   
    this.floor = this.add.rectangle(this.player.x, this.player.y + 99, game.config.width +100, borderUISize *2, 0x9D9C9D).setOrigin(0.13,0)
    this.physics.add.existing(this.floor, true)
    this.physics.add.collider(this.player, this.floor);

    this.barrier = this.add.rectangle(this.player.x, this.player.y + 99, game.config.width +100, borderUISize *2, 0x9D9C9D).setOrigin(0.13,5)
    this.barrier.setAlpha(0)
    this.physics.add.existing(this.barrier, true)
    this.physics.add.collider(this.player, this.barrier)
    //this.physics.add.collider(this.player, this.car, this.carCollision, null, this)
    

    

    }
    update(){

        //moving background
        this.background.tilePositionX += 4
        //this.car.tilePositionX +=2
        this.player.update()

        //restarting
         // check key input for restart
          if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyRESET)) {
            this.scene.restart()
}
        

        //player jumping and walking animation with space bar  

        if(Phaser.Input.Keyboard.JustDown(keyJUMP) /*&& this.player.body.touching.down*/){
            this.player.play('jump', true) 
            this.playerJumps()
        } 
        else if (this.player.body.touching.down && this.player.anims.currentAnim.key !== 'walk'){
            this.player.play('walk',true)
        }

       // checking car leaving screen
        if (this.car && this.car.x < -50) {
            this.carDestroy();
        }
         
    }

    playerJumps()
    //gravity for jump
    {
        this.player.setVelocityY(-250)

    }

    loadCar(car){
    
    //car spawns off screen from the right
    let carY = game.config.height - borderUISize - 50;

    // puts car above floor sprite
    let carX = Phaser.Math.Between(game.config.width + 50, game.config.width + 200); //spawns car in front of player
      
    // car settings 
    this.car = this.physics.add.sprite(carX, carY, 'car').setScale(1.5).setSize(90,45) // scale is car size, size is the hitbox for car
    this.car.body.setVelocityX(-200); // moves  car left
    this.car.body.setImmovable(true);
    this.car.body.allowGravity = false;

    this.physics.add.collider(this.player, this.car, this.carCollision, null, this);
}
    
    

    carCollision(player,car){
        this.gameOver = true
        this.scene.restart()

                }


    carDestroy(car) {
        if(this.car){
        this.car.destroy() //removing car
        this.car = null

            // Respawn a new car after a random delay
            this.time.delayedCall(Phaser.Math.Between(1000, 2000), () => {
                this.loadCar();
            }, [], this);
            
            }  
        }
        
        playerReset(){
            if(this.player.y > game.config.height){
            this.player.setPosition(100,350)
            
            } 
        }

           /* if(!this.gameOver){
            this.player.update()
            this.car.update()} */

        }
       
    



   