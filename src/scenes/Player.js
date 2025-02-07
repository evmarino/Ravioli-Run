class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene,x,y, 'can', 0);

        scene.add.existing(this)
        scene.physics.add.existing(this)
        this.setCollideWorldBounds(true)

        this.moveSpeed = 2

    }
    update(){
         
    }
}
