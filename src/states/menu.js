import colorscheme from '../colorscheme';
import FontStyle from '../fontStyle';
import HighScoreText from '../prefabs/highScoreText';

class Menu extends Phaser.State {
    create() {
        let text = this.game.add.text(0, 0, "Start it!", new FontStyle(this.game));
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
