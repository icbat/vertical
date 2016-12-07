import colorscheme from '../colorscheme';
import TextButton from '../prefabs/textButton';
import HighScoreText from '../prefabs/highScoreText';

class Menu extends Phaser.State {
    create() {
        const startButton = new TextButton(this.game, 'Start it!', this.game.world.centerX, -100);

        const highScore = localStorage.getItem('vertical-highScore');
        const globalHighText = new HighScoreText(this.game, "Today's Global High:", "???", -100);
        const highScoreText = new HighScoreText(this.game, "Your Best:", highScore, -100);
        this.game.analytics.getDailyHighScore(globalHighText.updateScore, globalHighText);

        let buttonTween = this.addTween(startButton, this.game.world.centerY);
        let globalScoreTween = this.addTween(globalHighText, this.game.world.centerY + startButton.height / 2);
        let highScoreTween = this.addTween(highScoreText, this.game.world.centerY + startButton.height / 2 + globalHighText.height);

        let lagTimer = this.game.time.create();
        lagTimer.add(Phaser.Timer.SECOND / 4, () => {
            buttonTween.start();
            highScoreTween.start();
            globalScoreTween.start();
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
