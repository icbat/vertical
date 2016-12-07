import colorscheme from '../colorscheme';
import TextButton from '../prefabs/textButton';
import HighScoreText from '../prefabs/highScoreText';

class Menu extends Phaser.State {
    create() {
        new TextButton(this.game, 'Start it!', this.game.world.centerX, this.game.world.centerY);

        const highScore = localStorage.getItem('vertical-highScore');
        const scoreText = new HighScoreText(this.game, highScore);
        this.game.analytics.getDailyHighScore(scoreText.updateDailyHighScore, scoreText);
    }
}

export default Menu;
