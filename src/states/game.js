import Player from '../prefabs/player';
import Obstacle from '../prefabs/obstacle';

class Game extends Phaser.State {

    create() {
        this.music = this.game.add.audio('music');
        // this.music.play();

        // //setup prefabs
        this.player = new Player(this.game, this.game.world.centerX, this.game.world.height - 300);
        this.game.add.existing(this.player);

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

    spawnEnemy() {

        this.game.add.existing(new Obstacle(this.game, this.pickColumn()));
    }

    pickColumn() {
        let columnXvals = [0 + 32, this.game.world.centerX, this.game.world.width - 32];
        return this.game.rnd.pick(columnXvals);

    }
}

export default Game;
