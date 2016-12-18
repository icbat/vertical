import colorscheme from '../colorscheme';
import TitleText from '../prefabs/titleText';
import TextButton from '../prefabs/textButton';
import ObstacleName from '../prefabs/obstacleName';
import ObstacleDeathCount from '../prefabs/obstacleDeathCount';
import HighScoreText from '../prefabs/highScoreText';
import Background from '../prefabs/background';
import MuteButton from '../prefabs/muteButton';
import ObstacleBoring from '../prefabs/obstacleBoring';
import ObstacleStopAndGo from '../prefabs/obstacleStopAndGo';
import ObstacleSpeeder from '../prefabs/obstacleSpeeder';
import ObstacleSwapper from '../prefabs/obstacleSwapper';

class Menu extends Phaser.State {
    init(lastScore) {
        this.lastScore = lastScore;
    }

    create() {
        new Background(this.game, -1);
        new Background(this.game, 1);
        new MuteButton(this.game, 0, 0);

        const bottomOfTitleText = 64;
        const titleText = new TitleText(this.game, "Vertiblocks", bottomOfTitleText);

        const obstacles = [];
        obstacles.push(new ObstacleBoring(this.game, 0));
        obstacles.push(new ObstacleSpeeder(this.game, 0));
        obstacles.push(new ObstacleStopAndGo(this.game, 0));
        const swapper = new ObstacleSwapper(this.game, 0);
        swapper.tint = colorscheme.obstacleSwapper;
        obstacles.push(swapper);

        const obstacleText = new ObstacleName(this.game, bottomOfTitleText * 1.25);
        const obstacleStartingHeight = bottomOfTitleText * 2.75;
        for (let i = 0; i < 4; ++i) {
            const obstacle = obstacles[i];
            obstacle.x = this.game.world.width / 5 * (i + 1);
            obstacle.originalX = obstacle.x;
            obstacle.y = obstacleStartingHeight;
            this.game.add.existing(obstacle);
            obstacle.inputEnabled = true;
            const shiftTween = Phaser.Timer.SECOND * 3/ 5 ;
            const shiftEase = Phaser.Easing.Exponential.Out;
            obstacle.shiftRightTween = this.game.add.tween(obstacle).to({
                x: obstacle.originalX + 10
            }, shiftTween, shiftEase);
            obstacle.shiftRightTween.to({x: obstacle.originalX - 10},shiftTween, shiftEase, false, 50, -1, true);
            obstacle.shiftRightTween.repeatAll(-1);
            obstacle.resetTween = this.game.add.tween(obstacle).to({x: obstacle.originalX},shiftTween, shiftEase);
            obstacle.events.onInputUp.add(() => {
                obstacleText.setText(obstacle.name);
                for (const obstacle of obstacles) {
                    obstacle.shiftRightTween.stop();
                    obstacle.resetTween.start();
                }
                obstacle.shiftRightTween.start();

            });
            new ObstacleDeathCount(this.game, obstacle);
        }

        const offscreenY = this.game.world.height + 200;
        const startButton = new TextButton(this.game, 'Start it!', this.game.world.centerX, offscreenY);

        const highScore = localStorage.getItem('vertical-highScore');
        const globalHighText = new HighScoreText(this.game, "Today's Global High:", "???", offscreenY);
        const highScoreText = new HighScoreText(this.game, "Your Best:", highScore, offscreenY);
        const lastScoreText = new HighScoreText(this.game, "Last Score:", this.lastScore, offscreenY);
        this.game.analytics.getDailyHighScore(globalHighText.updateScore, globalHighText);

        let nextY = this.game.world.height - startButton.height;
        const initialButtonSpace = 74;
        const textSpacing = 86;
        let buttonTween = this.addTween(startButton, nextY);
        nextY -= initialButtonSpace + textSpacing;
        let globalScoreTween = this.addTween(globalHighText, nextY);
        nextY -= textSpacing;
        let highScoreTween = this.addTween(highScoreText, nextY);
        nextY -= textSpacing;
        let lastScoreTween = this.addTween(lastScoreText, nextY);

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
