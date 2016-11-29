import colorscheme from '../colorscheme';
import HighScoreText from '../prefabs/highScoreText';

class Menu extends Phaser.State {
    create() {
        this.game.stage.backgroundColor = colorscheme.background;
        const style = {
            "boundsAlignH": "center",
            "boundsAlignV": "middle",
            "wordWrap": true,
            "wordWrapWidth": this.game.world.width,
            "fill": colorscheme.fontColor
        };
        let text = this.game.add.text(0, 0, "Start it!", style);
        text.setTextBounds(0, 0, this.game.world.width, this.game.world.height);
        text.inputEnabled = true;
        text.events.onInputDown.add(() => {
            this.game.state.start('game');
        });

        let highScore = localStorage.getItem('vertical-highScore');
        let scoreText = new HighScoreText(this.game, highScore);
        this.game.analytics.getDailyHighScore(scoreText.updateDailyHighScore, scoreText);
        this.game.add.existing(scoreText);
    }
}

export default Menu;
