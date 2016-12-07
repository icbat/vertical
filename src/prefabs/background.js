class Background extends Phaser.TileSprite {

  constructor(game, direction) {
    super(game, game.world.centerX, 0, game.world.centerX * direction, game.world.height, 'tile-bg');
    this.originalAlpha = 0.2;
    this.alpha = this.originalAlpha;
  }

  update() {

  }

  touched() {
      this.alpha = 0.8;

      let bgFadeTween = this.game.add.tween(this);
      bgFadeTween.to({
          alpha: this.originalAlpha
      }, 150);
      bgFadeTween.start();
  }

}

export default Background;
