import colorscheme from '../colorscheme';

class ScoreText extends Phaser.Text {

    constructor(game, x, y) {
        const style = {
            "fill": colorscheme.fontColor
        };
        super(game, x, y, "0", style);
        this.score = 0;
    }

    scoreUp(points) {
        this.score += points;
        this.text = this.score;
    }

}

export default ScoreText;
