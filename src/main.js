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
            gravity: { y: 1400}, 
            debug: false
        } 
    } ,
    scene:[Menu, Play, GameOver]
};

let game = new Phaser.Game(config)

//reserve keyboard bindings
let keyRESET, keyJUMP
let borderUISize = game.config.height / 20
let borderPadding = borderUISize