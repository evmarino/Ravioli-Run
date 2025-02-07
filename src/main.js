// Evelyn Marino

let config = {
    type: Phaser.AUTO, 
    width: 640,
    height:480,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },

    physics: { 
        default: "arcade",
        arcade: {
            gravity: { y: 0 }, // Adjust gravity if needed
            debug: true // Enable debug mode to see physics
        } 
    } ,
    scene:[Menu, Play]
};

let game = new Phaser.Game(config)

//reserve keyboard bindings
let keyRESET, keyJUMP