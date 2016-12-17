import colorscheme from '../colorscheme';
import FontStyle from '../fontStyle';

class TitleText extends Phaser.Text {

    constructor(game, text) {
        const style = new FontStyle(game);
        style.fontSize = 48;
        super(game, 0, 0, text, style);
        this.setTextBounds(0, 0, this.game.world.width, 64);
        game.add.existing(this);
    }

}

export default TitleText;
