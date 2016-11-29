import colorscheme from '../colorscheme';

class HighScoreText extends Phaser.Text {

    constructor(game, highScore) {
        const style = {
            "boundsAlignH": "center",
            "boundsAlignV": "middle",
            "align": "center",
            "wordWrap": true,
            "wordWrapWidth": game.world.width,
            "fill": colorscheme.fontColor
        };
        super(game, 0, 0, constructText("???", highScore), style);
        this.setTextBounds(0, 32, this.game.world.width, 96);
        this.highScore = highScore;
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
