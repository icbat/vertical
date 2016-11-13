import Player from '../prefabs/player';

class Game extends Phaser.State {

    create(game) {
        this.music = game.add.audio('music');

        //setup UI
        this.scoreText = this.add.text(game.world.centerX, 0, '', {
            font: '40px Arial',
            fill: '#ffffff',
            align: 'center'
        });
        this.scoreText.anchor.set(0.5, 0);

        // //setup prefabs
        this.player = new Player(game, game.world.centerX, game.world.centerY);
        // this.target = new Target(game, game.world.centerX, game.world.centerY);
        game.add.existing(this.player);
    }
}

export default Game;
