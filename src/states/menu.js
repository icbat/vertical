import colorscheme from '../colorscheme';
import TextButton from '../prefabs/textButton';
import HighScoreText from '../prefabs/highScoreText';

class Menu extends Phaser.State {
    create() {
        const startButton = new TextButton(this.game, 'Start it!', this.game.world.centerX, -100);

        const highScore = localStorage.getItem('vertical-highScore');
        const scoreText = new HighScoreText(this.game, highScore, -500);
        this.game.analytics.getDailyHighScore(scoreText.updateDailyHighScore, scoreText);

        let buttonTween = this.addTween(startButton, this.game.world.centerY);
        let scoreTween = this.addTween(scoreText, this.game.world.centerY + startButton.height);

        let lagTimer = this.game.time.create();
        lagTimer.add(Phaser.Timer.SECOND / 4, () => {
            buttonTween.start();
            scoreTween.start();
        });
        lagTimer.start();
    }

    addTween(object, targetY) {
        const randomOffset = Math.random() * 800;
        return this.game.add.tween(object).to({
            y: targetY
        }, Phaser.Timer.SECOND / 4 + randomOffset, Phaser.Easing.Elastic.Out);
    }
}

export default Menu;
