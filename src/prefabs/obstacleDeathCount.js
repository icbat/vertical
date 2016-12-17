import FontStyle from '../fontStyle';

class ObstacleDeathCount extends Phaser.Text {

    constructor(game, obstacle) {
        const x = obstacle.x;
        const y = obstacle.y;
        const text = game.global.deathCounts[obstacle.name] || "";
        super(game, 0, 0, text, new FontStyle(game));
        this.setTextBounds(x - obstacle.width / 2, y - obstacle.height , obstacle.width, obstacle.height / 2);
        game.add.existing(this);
    }

}

export default ObstacleDeathCount;
