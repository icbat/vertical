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
        this.colorStep = 0;
        game.add.existing(this);
    }

    onClick() {
        this.game.state.start('game');
    }

    update() {
        const scale = 0.02 * Math.sin(new Date() / 200);
        this.scale.setTo(1 + scale, 1 + scale);
        this.tint = Phaser.Color.interpolateColor(0x00ff00, 0x0000ff, 500, this.colorStep, 1);
        this.colorStep += 1;
    }

}

export default TextButton;
