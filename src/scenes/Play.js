class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }

    preload(){
        this.load.spritesheet('can', './Assets/sprite_sheet.png', { frameWidth: 315, frameHeight:132 ,
        });
    }

    create() {
        // tile sprite
        this.background = this.add.tileSprite(0, 0, 640, 480, 'background').setOrigin(0, 0)

        // define keys 
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        keyJUMP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

        // load player into game
        this.player = this.physics.add.sprite(100, 350, 'can').setScale(0.5).setSize(60, 125)
        this.player.body.setGravityY(600)

        // sprite animations (unchanged from your code)
        const walk = {
            key: 'walk',
            frames: this.anims.generateFrameNumbers('can', {
               frames: [0,0,0,1,1,2,2,] }),
            frameRate: 24,
            repeat: -1
        }
        const idle = {
            key: 'idle',
            frames: [{ key: 'can', frame: 3 }],
            frameRate: 1,
            repeat: -1
        }
        const jump = {
            key: 'jump',
            frames: [{ key: 'can', frame: 4 }],
            frameRate: 1,
            repeat: 0
        }

        if (!this.anims.exists('walk')) this.anims.create(walk)
        if (!this.anims.exists('idle')) this.anims.create(idle)
        if (!this.anims.exists('jump')) this.anims.create(jump)

        // walk animation on
        this.player.play('walk', true)

        // game over flag
        this.gameOver = false

        // tracking active obstacles to prevent overlap
        this.obstacles = []

        // invisible floor for player collision
        this.floor = this.add.rectangle(this.player.x, this.player.y + 99, game.config.width + 100, borderUISize * 2, 0x9D9C9D).setOrigin(0.13, 0)
        this.physics.add.existing(this.floor, true)
        this.physics.add.collider(this.player, this.floor);

        // jumping barrier collision
        this.barrier = this.add.rectangle(this.player.x, this.player.y + 99, game.config.width + 100, borderUISize * 2, 0x9D9C9D).setOrigin(0.13, 7)
        this.barrier.setAlpha(0)
        this.physics.add.existing(this.barrier, true)
        this.physics.add.collider(this.player, this.barrier)

        // spawn first set of obstacles
        this.spawnObstacle()
        this.spawnCar()


    }

    update() {
        // moving background
        this.background.tilePositionX += 4

        // player jumping
        if (Phaser.Input.Keyboard.JustDown(keyJUMP)) {
            this.player.play('jump', true)
            this.playerJumps()
        } else if (this.player.body.touching.down && this.player.anims.currentAnim.key !== 'walk') {
            this.player.play('walk', true)
        }
        // cleanup old obstacles
        this.obstacles = this.obstacles.filter(obstacle => obstacle.x > -50)

        
        }

    spawnCar() {
        let minSpace = 150 // space between obstacles
        let carY = game.config.height - borderUISize - 60
        let carX = game.config.width + Phaser.Math.Between(50, 200)

        // ensure no overlap with existing obstacles
        if (this.obstacles.some(obstacle => Math.abs(obstacle.x - carX) < minSpace)) {
            return
        }

        let car = this.physics.add.sprite(carX, carY, 'car').setScale(2.3).setSize(118, 30)
        car.body.setVelocityX(-200)
        car.body.setImmovable(true)
        car.body.allowGravity = false

        this.physics.add.collider(this.player, car, this.carCollision, null, this)
        this.obstacles.push(car) // track obstacle

        // spawn next car after delay
        this.time.delayedCall(Phaser.Math.Between(2000, 3000), this.spawnCar, [], this)
    }

    spawnObstacle() {
        let minSpace = 150 // space between obstacles
        let obstacleY = game.config.height - borderUISize - 50
        let obstacleX = game.config.width + Phaser.Math.Between(60, 150)

        // ensure no overlap with existing obstacles
        if (this.obstacles.some(obstacle => Math.abs(obstacle.x - obstacleX) < minSpace)) {
            return
        }

        let obstacle = this.physics.add.sprite(obstacleX, obstacleY, 'obstacle').setScale(0.7).setSize(85, 95)
        obstacle.body.setVelocityX(-200)
        obstacle.body.setImmovable(true)
        obstacle.body.allowGravity = false

        this.physics.add.collider(this.player, obstacle, this.obstacleCollision, null, this)
        this.obstacles.push(obstacle) // track obstacle

        // spawn next obstacle after delay
        this.time.delayedCall(Phaser.Math.Between(2500, 4000), this.spawnObstacle, [], this)
    }

    carCollision() {
        this.gameOver = true;
        this.player.setVelocity(0, 0); // Stop player movement
    
        this.time.delayedCall(1000, () => {
            this.scene.start("gameoverScene");
        }, [], this);
    }
    
    obstacleCollision() {
        this.gameOver = true;
        this.player.setVelocity(0, 0); // Stop player movement
    
        this.time.delayedCall(1000, () => {
            this.scene.start("gameoverScene");
        }, [], this);
    }

    playerJumps() {
        this.player.setVelocityY(-600)
    }
}
