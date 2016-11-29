import colorscheme from '../colorscheme';

class ScoreText extends Phaser.Text {

    constructor(game, x, y) {
        const style = {
            "fill": colorscheme.fontColor
        };
        super(game, x, y, "0", style);
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
