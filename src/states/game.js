import Player from '../entities/player';
import ScoreText from '../prefabs/scoreText';
import Background from '../prefabs/background';
import Spawner from '../spawner';
import config from '../config';

class Game extends Phaser.State {

    create() {
        this.runStarted = new Date();

        const playerSize = 64;
        const playerY = this.game.world.height * 0.85;
        this.game.global.columns = [0 + playerSize / 2, this.game.world.centerX / 2 + playerSize / 4, this.game.world.centerX, this.game.world.centerX * 3 / 2 - playerSize / 4, this.game.world.width - playerSize / 2];
        this.game.global.score = 0;

        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        const leftBG = new Background(this.game, -1);
        const rightBG = new Background(this.game, 1);

        const trackKey = this.game.rnd.pick(this.game.global.tracks);
        this.music = this.game.add.audio(trackKey, 1, true);

        for (let colX of this.game.global.columns) {
            let colSprite = this.game.add.sprite(colX, playerY + playerSize, 'col-shadow');
            colSprite.alpha = 0.5;
            colSprite.anchor.setTo(0.5, 0.5);
        }

        this.player = new Player(this.game, this.game.world.centerX, playerY, this.endGame, this);

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
        this.spawner = new Spawner(this.game, this.player, this.scoreSignal);
        this.setupSpawnTimer(0, this.player);

        const scoreText = new ScoreText(this.game, this.game.world.centerX, this.game.world.height * 0.15);
        this.scoreSignal.add((points) => {
            scoreText.scoreUp(points);
        });

        this.game.analytics.reportGameStart();
        this.music.play();
    }

    update() {}

    render() {}

    shutdown() {
        this.music.stop();
    }

    setupSpawnTimer(level, player) {
        const baseTime = Phaser.Timer.SECOND * config.spawner.baseSpawnTimeSeconds;
        const speedUpCoefficient = Math.floor(level / config.spawner.levelsPerSpeedUp);
        const timeToSpawn = baseTime * Math.pow(config.spawner.speedUpExponent, speedUpCoefficient);

        this.spawnTimer = this.game.time.create();
        this.spawnTimer.repeat(timeToSpawn, config.spawner.wavesPerLevel, this.spawn, this, level, player);
        this.spawnTimer.onComplete.addOnce(() => {
            this.setupSpawnTimer(++level, player);
        });
        this.spawnTimer.start();
    }

    spawn(level, player) {
        this.game.camera.shake(0.005, 100);
        let numberToSpawn = this.game.rnd.integerInRange(1, this.game.global.columns.length - 1);
        this.spawner.spawn(level % config.spawner.levelsPerSpeedUp, numberToSpawn, player);
    }

    endGame(player, diedTo) {
        this.scoreSignal.removeAll();
        let deathCount = this.game.global.deathCounts[diedTo.name] || 0;
        this.game.global.deathCounts[diedTo.name] = ++deathCount;
        localStorage.setItem('vertical-deathCount', JSON.stringify(this.game.global.deathCounts));

        const runFinished = new Date();
        this.game.analytics.reportScore(this.game.global.score, runFinished - this.runStarted, diedTo);

        const highScore = localStorage.getItem('vertical-highScore') || 0;
        localStorage.setItem('vertical-highScore', Math.max(this.game.global.score, highScore));

        const pause = this.partialPause();
        pause.onComplete.add(() => {
            const crumble = this.crumbleAnimation();
            crumble.onComplete.add(() => {
                const timer = this.game.time.create();
                const event = timer.add(Phaser.Timer.SECOND / 2, () => {
                    this.game.state.start("menu", true, false, this.game.global.score);
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
