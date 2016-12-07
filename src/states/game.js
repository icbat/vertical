import Player from '../prefabs/player';
import ScoreText from '../prefabs/scoreText';
import Background from '../prefabs/background';
import Spawner from '../spawner';

class Game extends Phaser.State {

    create() {
        this.game.global = {
            score: 0
        };
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        const leftBG = new Background(this.game, -1);
        const rightBG = new Background(this.game, 1);

        this.music = this.game.add.audio('music');
        this.music.play();

        const playerSize = 64;
        const playerY = this.game.world.height * 0.85;
        this.columnXVals = [0 + playerSize / 2, this.game.world.centerX / 2 + playerSize / 4, this.game.world.centerX, this.game.world.centerX * 3 / 2 - playerSize / 4, this.game.world.width - playerSize / 2];

        for (let colX of this.columnXVals) {
            let colSprite = this.game.add.sprite(colX, playerY + playerSize, 'col-shadow');
            colSprite.anchor.setTo(0.5, 0.5);
            colSprite.scale.setTo(playerSize, 1);
        }

        this.player = new Player(this.game, this.game.world.centerX, playerY, this.columnXVals, this.endGame, this);

        this.game.input.onDown.add((click) => {
            let direction;
            let bg;

            if (click.worldX < this.game.world.centerX) {
                direction = -1;
                bg = leftBG;
            } else {
                direction = 1;
                bg = rightBG;
            }

            this.player.move(direction);
            bg.touched();
        });

        this.scoreSignal = new Phaser.Signal();
        this.spawner = new Spawner(this.game, this.columnXVals, this.player, this.scoreSignal);
        this.setupSpawnTimer(0, this.player);

        const scoreText = new ScoreText(this.game, this.game.world.centerX, this.game.world.height * 0.15);
        this.scoreSignal.add((points) => {
            scoreText.scoreUp(points);
        });

        this.game.analytics.reportGameStart();
    }

    update() {}

    render() {}

    shutdown() {
        this.music.stop();
    }

    setupSpawnTimer(level, player) {
        let timeToSpawn = Phaser.Timer.SECOND * 2 * Math.pow(1 / 2, Math.floor(level / 10));

        this.spawnTimer = this.game.time.create();
        let event = this.spawnTimer.repeat(timeToSpawn, 10, this.spawn, this, level, player);
        this.spawnTimer.onComplete.addOnce(() => {
            this.setupSpawnTimer(++level, player);
        });
        this.spawnTimer.start();
    }

    spawn(level, player) {
        this.game.camera.shake(0.005, 100);
        let numberToSpawn = this.game.rnd.integerInRange(1, this.columnXVals.length - 1);
        this.spawner.spawn(level, numberToSpawn, player);
    }

    endGame() {
        this.scoreSignal.removeAll();
        this.game.analytics.reportScore(this.game.global.score);
        const highScore = localStorage.getItem('vertical-highScore') || 0;
        localStorage.setItem('vertical-highScore', Math.max(this.game.global.score, highScore));

        const pause = this.partialPause();
        pause.onComplete.add(() => {
            const crumble = this.crumbleAnimation();
            crumble.onComplete.add(() => {
                const timer = this.game.time.create();
                const event = timer.add(Phaser.Timer.SECOND / 2, () => {
                    this.game.state.start("menu");
                }, this);
                timer.start();
            });
        });
    }

    partialPause() {
        this.spawnTimer.stop();
        this.game.input.onDown.removeAll();
        this.player.turnOff();
        this.spawner.turnOff();

        this.game.sound.play('hit-sound', 0.4);

        const musicFadeTween = this.game.add.tween(this.music._sound.playbackRate);
        musicFadeTween.to({
            value: 0.7
        }, Phaser.Timer.SECOND / 2);
        musicFadeTween.start();
        return musicFadeTween;
    }

    crumbleAnimation() {
        this.game.sound.play('crumble-sound', 0.1);

        let playerFadeTween = this.game.add.tween(this.player);
        playerFadeTween.to({
            alpha: 0,
        }, Phaser.Timer.SECOND);
        playerFadeTween.start();
        let playerShrinkTween = this.game.add.tween(this.player.scale);
        playerShrinkTween.to({
            x: 0,
            y: 0,
        }, Phaser.Timer.SECOND);
        playerShrinkTween.start();
        return playerFadeTween;
    }
}

export default Game;
