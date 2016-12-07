import colorscheme from './colorscheme';

class FontStyle {
    constructor(game, doNotCenter) {
        if (!doNotCenter) {
            this.boundsAlignH = "center";
            this.boundsAlignV = "middle";
            this.align = "center";
            this.wordWrap = true;
            this.wordWrapWidth = game.world.width;
        }
        this.fill = colorscheme.fontColor;
        this.stroke = colorscheme.backgroundColor;
        this.strokeThickness = 5;
    }
}

export default FontStyle;
