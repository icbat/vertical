import colorscheme from './colorscheme';

class FontStyle {
    constructor(game) {
        this.boundsAlignH = "center";
        this.boundsAlignV = "middle";
        this.align = "center";
        this.wordWrap = true;
        this.wordWrapWidth = game.world.width;
        this.fill = colorscheme.fontColor;
    }
}

export default FontStyle;
