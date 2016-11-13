import Player from '../prefabs/player';
import Obstacle from '../prefabs/obstacle';

class Game extends Phaser.State {

    create() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.music = this.game.add.audio('music');
        // this.music.play();

        this.player = new Player(this.game, this.game.world.centerX, this.game.world.height - 300);
        this.game.add.existing(this.player);

        this.obstacles = [];

        this.game.input.onDown.add(this.movePlayer, this);
        this.game.time.events.loop(Phaser.Timer.SECOND * 2, this.spawnEnemy, this);
    }

    movePlayer(click) {
        if (click.worldX < this.game.world.centerX) {
            this.player.targetX = 0 + this.player.width / 2;
        } else {
            this.player.targetX = this.world.width - this.player.width / 2;
        }
    }

    update() {
        if (this.obstacles.length > 0) {
            if (this.game.physics.arcade.overlap(this.player, this.obstacles[0])) {
                this.endGame();
            }
        }
    }

    spawnEnemy() {
        let obstacle = new Obstacle(this.game, this.pickColumn());

        this.obstacles.push(obstacle);
        obstacle.destroyed.addOnce(() => {
            this.obstacles.shift();
        });

        this.game.add.existing(obstacle);
    }

    pickColumn() {
        let columnXvals = [0 + 32, this.game.world.centerX, this.game.world.width - 32];
        return this.game.rnd.pick(columnXvals);
    }

    endGame() {
        this.game.state.start("menu");
    }
}

export default Game;
