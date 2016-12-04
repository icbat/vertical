import Player from '../prefabs/player';
import ScoreText from '../prefabs/scoreText';
import Spawner from '../spawner';

class Game extends Phaser.State {

    create() {
        this.game.global = {
            score: 0
        };
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        const bg = this.game.add.tileSprite(0, 0, this.game.world.height, this.game.world.height, 'tile-bg');
        bg.alpha = 0.2;


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

        const player = new Player(this.game, this.game.world.centerX, playerY, this.columnXVals, this.endGame, this);
        this.game.add.existing(player);

        this.game.input.onDown.add(player.move, player);

        const scoreSignal = new Phaser.Signal();
        this.spawner = new Spawner(this.game, this.columnXVals, player, scoreSignal);
        this.setupSpawnTimer(0, player);

        const scoreText = new ScoreText(this.game, this.game.world.centerX, this.game.world.height * 0.15);
        this.game.add.existing(scoreText);
        scoreSignal.add((points) => {
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
        this.spawnTimer.stop();
        this.game.input.onDown.removeAll();

        this.game.time.slowMotion = 5;
        let timer = this.game.time.create();
        let event = timer.add(Phaser.Timer.SECOND * 2, () => {
            this.game.time.slowMotion = 1;
            this.game.state.start("menu");
            this.game.analytics.reportScore(this.game.global.score);
            let highScore = localStorage.getItem('vertical-highScore') || 0;
            localStorage.setItem('vertical-highScore', Math.max(this.game.global.score, highScore));
        }, this);
        timer.start();
    }
}

export default Game;
