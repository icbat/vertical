//Documentation for Phaser's (2.6.2) sprites:: phaser.io/docs/2.6.2/Phaser.Sprite.html
class Ghost extends Phaser.Sprite {

    //initialization code in the constructor
    constructor(spriteToCopy, index) {
        super(spriteToCopy.game, spriteToCopy.x, spriteToCopy.y, spriteToCopy.key);
        // this.scale.setTo(64, 64);
        this.anchor.setTo(0.5, 0.5);

        this.alpha = 1 - (((6 - index) * 0.2) - 0.1);
        this.index = index;
        this.tint = spriteToCopy.tint;
        this.hauntedPositions = spriteToCopy.oldPositions;
    }

    //Code ran on each frame of game
    update() {
        this.x = this.hauntedPositions[this.index * 2];
    }

}

export default Ghost;
