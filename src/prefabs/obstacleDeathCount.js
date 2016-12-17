import FontStyle from '../fontStyle';

class ObstacleDeathCount extends Phaser.Text {

    constructor(game, obstacle) {
        const x = obstacle.x;
        const y = obstacle.y - obstacle.height - 5;
        const text = game.global.deathCounts[obstacle.name] || "";
        super(game, x, y, text, new FontStyle(game));
        game.add.existing(this);
    }

}

export default ObstacleDeathCount;
