import colorscheme from '../colorscheme';
import FontStyle from '../fontStyle';

class TextButton extends Phaser.Button {

    constructor(game, text, x, y) {
        super(game, x, y, 'rounded-button');
        this.onInputUp.add(this.onClick, this);
        this.anchor.setTo(0.5, 0.5);
        let textBox = this.game.add.text(0, 0, text, new FontStyle(this.game, true));
        textBox.anchor.setTo(0.5, 0.5);
        this.addChild(textBox);
    }

    onClick() {
        this.game.state.start('game');
    }

}

export default TextButton;
