class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene,x,y, 'can', 0);

        scene.add.existing(this)
        scene.physics.add.existing(this)
        this.setVelocityX(1400);        
        this.setImmovable(); 
        this.setCollideWorldBounds(true)
        
        
    }
   
    update(){
 
    }
    
}
