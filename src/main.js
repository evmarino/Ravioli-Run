// Evelyn Marino

let config = {
    type: Phaser.AUTO, 
    width: 640,
    height: 480,
    scene:[Menu, Play]

};

let game = new Phaser.Game(config)

//reserve keyboard bindings
let keyRESET, keyJUMP