import colorscheme from '../colorscheme';

class ScoreText extends Phaser.Text {

  constructor(game, x, y) {
      const style = {"fill": colorscheme.fontColor};
    super(game, x, y, "text", style);
  }

  update() {
      this.text = this.game.global.score;
  }

}

export default ScoreText;
