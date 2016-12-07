import FontStyle from '../fontStyle';

class HighScoreText extends Phaser.Text {
    constructor(game, descriptor, highScore, y) {
        const text = !!highScore ? descriptor + "\n" +  highScore : "";
        super(game, 0, y, text, new FontStyle(game));
        this.setTextBounds(0, 32, this.game.world.width, 96);
        this.highScore = highScore;
        game.add.existing(this);
        this.descriptor = descriptor;
    }

    updateScore(newScore) {
        this.text = this.descriptor + "\n" + newScore;
    }
}

export default HighScoreText;
