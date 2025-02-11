class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }

    preload(){
        this.load.spritesheet('can', './Assets/sprite_sheet.png', { frameWidth: 315, frameHeight:132 ,
        })
    }

    create() {
        // tile sprite
        this.background = this.add.tileSprite(0, 0, 640, 480, 'background').setOrigin(0, 0)
        this.backgroundSpeed = 4

       
        this.backgroundMusic = this.sound.add('loopingmusic', {loop: true})
        this.deathNoise = this.sound.add('death')
        this.backgroundMusic.setVolume(0.2)
        this.backgroundMusic.play()
        
        this.tweens.add({
            targets: this.backgroundMusic,
            volume: 0.3,
            duration: 3000,
            ease: 'Linear'
        })


        // time elapsed 
        this.score = 0
        this.elapsedTime = 0
        this.scoreText = this.add.text(20, 20,'Time ran (in secs): 0', { fontSize: '24px', fill: '#FFF', fontFamily: 'Comic Sans MS'})
        this.scoreText.setVisible(false)
        this.insructText = this.add.text(10,300,'Press space to avoid obstacles! ', { fontSize: '20px', fill: '#FFF', fontFamily: 'Comic Sans MS' })

        this.time.delayedCall(5000, () => {
            this.insructText.destroy()
        }, [], this)


        this.time.addEvent({
            delay: 1000, 
            callback: () => {
                this.elapsedTime += 1 
                this.scoreText.setText(`Time ran (in secs): ${this.score}`)
            },
            callbackScope: this,
            loop: true
        })
        

        // define keys 
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.m)
        keyJUMP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

       
      
       this.player = new Player(this, 100, 350).setScale(0.5).setSize(60, 125)
       this.add.existing(this.player);
       this.physics.add.existing(this.player)

        // walk animation on
        this.player.play('walk', true)
        this.player.body.setGravityY(600)

        // game over flag
        this.gameOver = false
        this.obstacles = []
        this.obstacleSpeed = -200
        this.spawnInterval = 3500

        // invisible floor for player collision
        this.floor = this.add.rectangle(this.player.x, this.player.y + 99, game.config.width + 100, borderUISize * 2, 0x9D9C9D).setOrigin(0.13, 0)
        this.physics.add.existing(this.floor, true)
        this.physics.add.collider(this.player, this.floor)

        
        this.barrier = this.add.rectangle(this.player.x, this.player.y + 99, game.config.width + 100, borderUISize * 2, 0x9D9C9D).setOrigin(0.13, 7)
        this.barrier.setAlpha(0)
        this.physics.add.existing(this.barrier, true)
        this.physics.add.collider(this.player, this.barrier)

        this.time.addEvent({
            delay: 10000,
            callback: this.increaseDifficulty,
            callbackScope: this,
            loop: true
        })
        this.spawnObstacle()

    }
       
    update() {
    
        // moving background
        this.background.tilePositionX += this.backgroundSpeed
        this.player.update()
        
        }

    spawnObstacle() {
        let minSpace = 150 // space between obstacles
        let obstacleY = game.config.height - borderUISize - 50
        let obstacleX = game.config.width + Phaser.Math.Between(60, 150)

        //  no overlap with  obstacles
        if (this.obstacles.some(obstacle => Math.abs(obstacle.x - obstacleX) < minSpace)) {
            return
        }

        let obstacle = this.physics.add.sprite(obstacleX, obstacleY, 'obstacle').setScale(0.7).setSize(65, 85)
        obstacle.body.setVelocityX(this.obstacleSpeed)
        obstacle.body.setImmovable(true)
        obstacle.body.allowGravity = false

        this.physics.add.collider(this.player, obstacle, this.obstacleCollision, null, this)
        this.obstacles.push(obstacle) // track obstacle

        let nextSpawn = Phaser.Math.Clamp(this.spawnInterval, 800, 4000)


        // spawn next obs
        this.time.delayedCall(this.spawnInterval, this.spawnObstacle, [], this)

        // cleanup obstacles
        this.obstacles.forEach((obstacle, index) => {
            if (obstacle.x <= -50) {
                obstacle.destroy()  
                this.obstacles.splice(index, 1)
            }
        })
    }

    increaseDifficulty(){
        this.backgroundSpeed += 0.5
        this.obstacleSpeed -=20
        this.spawnInterval = Math.max(this.spawnInterval - 300, 800)

        this.obstacles.forEach(obstacle =>{
            if(obstacle.active)
            obstacle.body.setVelocityX(this.obstacleSpeed)
        })
    }

    obstacleCollision() {
        if(!this.gameOver && this.backgroundMusic ) {
        this.gameOver = true
        this.player.setVelocity(0, 0);
        
       
     {
        this.tweens.add({
        targets: this.backgroundMusic,
        volume: 0,
        ease: 'Linear',
        onComplete: () => {
        this.backgroundMusic.stop();
                
        }
        })
    }
            
     this.time.delayedCall(1000, () => {
        this.backgroundMusic.stop()
        this.sound.play('death')
        this.scene.start("gameoverScene", {timeElapsed: this.elapsedTime})
        }, [], this);
    }

}

}