import FontStyle from '../fontStyle';

class ObstacleName extends Phaser.Text {

  constructor(game, y) {
    super(game, 0, 0, "", new FontStyle(game));
    this.setTextBounds(0, 0, this.game.world.width, 32);
    this.y = y;
    game.add.existing(this);
  }

  setText(newText){
      this.text = newText;
  }

}

export default ObstacleName;
