// Evelyn Marino
// RAVIOLI RUNNER 
// 30 hours (approx)
/*Creative Tilt 

I implemented my particle emitter with my ravioli sprite that 
provides game continuity and allowed me to customize my emitter 
and taught me how to work with sprites in a different way than I'm used to

I based my game off the chef boyardee commercial from 2004, where the soup
can rolls to find its way to a home. I based all my visuals loosely off of that
as inspiration and im proud of the visuals I was able to compose, and I think 
it's a creative theme
*/

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