import FontStyle from '../fontStyle';

class HighScoreText extends Phaser.Text {

    constructor(game, highScore, y) {
        super(game, 0, y, constructText("???", highScore), new FontStyle(game));
        this.setTextBounds(0, 32, this.game.world.width, 96);
        this.highScore = highScore;
        game.add.existing(this);
    }

    updateDailyHighScore(dailyGlobal) {
        this.text = constructText(dailyGlobal, this.highScore);
    }
}

function constructText(dailyGlobal, myHigh) {
    let text = "Today's Global High";
    if (!!dailyGlobal) {
        text += "\n" + dailyGlobal;
    } else {
        text += "\nNone yet!";
    }
    text += "\nYour best:";
    text += "\n" + myHigh;
    return text;
}

export default HighScoreText;
