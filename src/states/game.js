import Player from '../prefabs/player';

class Game extends Phaser.State {

    create() {
        this.music = this.game.add.audio('music');
        // this.music.play();

        // //setup prefabs
        this.player = new Player(this.game, this.game.world.centerX, this.game.world.height - 300);
        this.game.add.existing(this.player);

        this.game.input.onDown.add(this.movePlayer, this);
        // this.game.time.events.loop(Phaser.Timer.SECOND * 1, this.spawnEnemy);
    }

    movePlayer(click) {
        if (click.worldX < this.game.world.centerX) {
            this.player.targetX = 0 + this.player.width / 2;
        } else {
            this.player.targetX = this.world.width - this.player.width / 2;
        }
    }
}

export default Game;
