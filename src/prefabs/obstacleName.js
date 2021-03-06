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
      this.x = 50;
      const tween = this.game.add.tween(this).to({
         x: 0
     }, 100);
     tween.start();
  }

}

export default ObstacleName;
