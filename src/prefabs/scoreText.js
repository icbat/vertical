import colorscheme from '../colorscheme';
import FontStyle from '../fontStyle';

class ScoreText extends Phaser.Text {

    constructor(game, x, y) {
        super(game, game.world.centerX, game.world.height * 0.1, "0", new FontStyle(game));

        this.anchor.setTo(0.5, 0.5);

        this.score = 0;
    }

    update() {
        const scalingspeed = 0.01;
        if (this.scale.x !== 1) {
            this.scale.x = Math.max(1, this.scale.x - scalingspeed *this.game.time.elapsed / 15);
            this.scale.y = Math.max(1, this.scale.y - scalingspeed *this.game.time.elapsed / 15);
        }
    }

    scoreUp(points) {
        this.score += points;
        this.text = this.score;
        this.scale.x += 0.2;
        this.scale.y += 0.2;
    }

}

export default ScoreText;
