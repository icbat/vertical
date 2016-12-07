import colorscheme from '../colorscheme';
import TextButton from '../prefabs/textButton';
import HighScoreText from '../prefabs/highScoreText';

class Menu extends Phaser.State {
    create() {
        const startButton = new TextButton(this.game, 'Start it!', this.game.world.centerX, -100);

        const highScore = localStorage.getItem('vertical-highScore');
        const scoreText = new HighScoreText(this.game, highScore);
        this.game.analytics.getDailyHighScore(scoreText.updateDailyHighScore, scoreText);

        let buttonTween = this.game.add.tween(startButton).to({
            y: this.game.world.centerY
        }, Phaser.Timer.SECOND / 4, Phaser.Easing.Elastic.Out);

        let lagTimer = this.game.time.create();
        lagTimer.add(Phaser.Timer.SECOND / 4, () => {
            buttonTween.start();
        });
        lagTimer.start();
    }
}

export default Menu;
