import colorscheme from '../colorscheme';
import TextButton from '../prefabs/textButton';
import HighScoreText from '../prefabs/highScoreText';

class Menu extends Phaser.State {
    create() {
        this.game.add.existing(new TextButton(this.game, 'Start it!', this.game.world.centerX, this.game.world.centerY));

        let highScore = localStorage.getItem('vertical-highScore');
        let scoreText = new HighScoreText(this.game, highScore);
        this.game.analytics.getDailyHighScore(scoreText.updateDailyHighScore, scoreText);
        this.game.add.existing(scoreText);
    }
}

export default Menu;
