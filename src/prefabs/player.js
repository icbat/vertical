//Documentation for Phaser's (2.5.0) states:: phaser.io/docs/2.5.0/Phaser.State.html
class Player extends Phaser.Sprite {

    //initialization code in the constructor
    constructor(game, x, y, frame) {
        super(game, x, y, 'pixel', frame);
        this.scale.setTo(64, 64);
        this.anchor.setTo(0.5, 0.5);
        this.targetX = game.world.centerX;
    }

    //Load operations (uses Loader), method called first
    preload() {

    }

    //Setup code, method called after preload
    create() {

    }

    //Code ran on each frame of game
    update() {
        this.x += (this.targetX - this.x) * 0.1;
    }

    //Called when game is paused
    paused() {

    }

    //You're able to do any final post-processing style effects here.
    render() {

    }

    //Called when switching to a new state
    shutdown() {

    }

}

export default Player;
