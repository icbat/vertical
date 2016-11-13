import Crosshairs from '../prefabs/crosshairs';
import Target from '../prefabs/target';

class Game extends Phaser.State {

    create() {
        this.music = this.game.add.audio('music');

        //setup UI
        this.scoreText = this.add.text(this.game.world.centerX, 0, '', {
            font: '40px Arial',
            fill: '#ffffff',
            align: 'center'
        });
        this.scoreText.anchor.set(0.5, 0);

        // //setup prefabs
        // this.crosshairs = new Crosshairs(this.game);
        // this.target = new Target(this.game, this.game.world.centerX, this.game.world.centerY);
        // this.game.add.existing(this.crosshairs);
        // this.game.add.existing(this.target);
    }
}

export default Game;
