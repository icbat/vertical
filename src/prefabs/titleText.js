import colorscheme from '../colorscheme';
import FontStyle from '../fontStyle';

class TitleText extends Phaser.Text {

    constructor(game, text, y) {
        const style = new FontStyle(game);
        style.fontSize = 48;
        super(game, 0, y, text, style);
        this.setTextBounds(0, 32, this.game.world.width, 96);
        game.add.existing(this);
    }

}

export default TitleText;
