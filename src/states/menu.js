import colorscheme from '../colorscheme';
import TitleText from '../prefabs/titleText';
import TextButton from '../prefabs/textButton';
import HighScoreText from '../prefabs/highScoreText';
import Background from '../prefabs/background';
import MuteButton from '../prefabs/muteButton';

class Menu extends Phaser.State {
    init(lastScore) {
        this.lastScore = lastScore;
    }

    create() {
        new Background(this.game, -1);
        new Background(this.game, 1);
        new MuteButton(this.game, 0, 0);

        const titleText = new TitleText(this.game, "Vertiblocks", 16);
        const offscreenY = -200;
        const startButton = new TextButton(this.game, 'Start it!', this.game.world.centerX, offscreenY);

        const highScore = localStorage.getItem('vertical-highScore');
        const globalHighText = new HighScoreText(this.game, "Today's Global High:", "???", offscreenY);
        const highScoreText = new HighScoreText(this.game, "Your Best:", highScore, offscreenY);
        const lastScoreText = new HighScoreText(this.game, "Last Score:", this.lastScore, offscreenY);
        this.game.analytics.getDailyHighScore(globalHighText.updateScore, globalHighText);

        let buttonTween = this.addTween(startButton, this.game.world.centerY);
        let globalScoreTween = this.addTween(globalHighText, this.game.world.centerY + startButton.height / 2);
        let highScoreTween = this.addTween(highScoreText, this.game.world.centerY + startButton.height / 2 + globalHighText.height);
        let lastScoreTween = this.addTween(lastScoreText, this.game.world.centerY + startButton.height / 2 + globalHighText.height + highScoreText.height);

        let lagTimer = this.game.time.create();
        lagTimer.add(Phaser.Timer.SECOND / 4, () => {
            buttonTween.start();
            highScoreTween.start();
            globalScoreTween.start();
            lastScoreTween.start();
        });
        lagTimer.start();
    }

    addTween(object, targetY) {
        const randomOffset = Math.random() * 800;
        return this.game.add.tween(object).to({
            y: targetY
        }, Phaser.Timer.SECOND / 2 + randomOffset, Phaser.Easing.Elastic.Out);
    }
}

export default Menu;
