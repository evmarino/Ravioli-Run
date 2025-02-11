class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene,x,y, 'can', 0);

        scene.add.existing(this)
        scene.physics.add.existing(this)
        this.setVelocityX(0);         
        this.setCollideWorldBounds(true)
        this.jumpCount = 0
        
        this.scene = scene
        this.jumpSound = scene.sound.add('pop')
        
        this.particleEmitter = this.scene.add.particles(-15,0,'ravi',{
            speedX: {min: -80, max: -100},
            speedY:{min: -10, max: 10},
            scale:{start: 0.17, end: 0},
            alpha: {start: 0.5, end: 0.3},
            lifespan: 500,
            frequency: 40 ,
            
        })

        this.particleEmitter.startFollow(this, -15, 5)
        

        // sprite animations
        if (!scene.anims.exists('walk')) {
            scene.anims.create({
                key: 'walk',
                frames: scene.anims.generateFrameNumbers('can', { frames: [0, 0, 0, 1, 1, 2, 2] }),
                frameRate: 24,
                repeat: -1
            });
        }
        
        if (!scene.anims.exists('idle')) {
            scene.anims.create({
                key: 'idle',
                frames: [{ key: 'can', frame: 3 }],
                frameRate: 1,
                repeat: -1
            });
        }
        
        if (!scene.anims.exists('jump')) {
            scene.anims.create({
                key: 'jump',
                frames: [{ key: 'can', frame: 4 }],
                frameRate: 1,
                repeat: 0
            });
        }
        
    }


update()
{
// player jumping
if (Phaser.Input.Keyboard.JustDown(keyJUMP) && this.jumpCount < 2) {
   this.play('jump', true)
   this.playerJumps()
   this.jumpCount++
   } else if (this.body.touching.down && this.anims.currentAnim?.key !== 'walk') {
        this.play('walk', true)
        this.jumpCount = 0
}


}
playerJumps() 
{
this.setVelocityY(-650)
this.jumpSound.play()
}

}