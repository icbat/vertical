import FontStyle from '../fontStyle';

class ObstacleDeathCount extends Phaser.Text {

    constructor(game, x, y, obstacle) {
        const text = game.global.deathCounts[obstacle.name] || "";
        super(game, x, y, text, new FontStyle(game));
        game.add.existing(this);
    }

}

export default ObstacleDeathCount;
