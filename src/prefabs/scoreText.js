//Documentation for Phaser's (2.6.2) text:: phaser.io/docs/2.6.2/Phaser.Text.html
class ScoreText extends Phaser.Text {

  //initialization code in the constructor
  constructor(game, x, y) {
    super(game, x, y, "text");
  }

  //Code ran on each frame of game
  update() {
      this.text = this.game.global.score;
  }

}

export default ScoreText;
