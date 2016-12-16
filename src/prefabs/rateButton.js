import colorscheme from '../colorscheme';

class RateButton extends Phaser.Sprite {

    constructor(game, x, y) {
        super(game, x, y, 'star');
        this.inputEnabled = true;
        this.events.onInputUp.add(() => {
            const url = "market://details?id=io.github.icbat.vertical";
            console.log("opening url: " + url);
            window.open(url);
            this.game.analytics.reportAppStoreLink();
        });
        this.scale.setTo(0.1, 0.1);
        this.tint = colorscheme.rateButton;
        this.angle = -10;
        this.anchor.setTo(0.5, 0.5);

        let rotateTween = game.add.tween(this);
        rotateTween.to({
            angle: 10
        }, 2000);
        rotateTween.yoyo(true, 100);
        rotateTween.repeatAll(-1, 100);
        rotateTween.start();

        game.add.existing(this);
    }

}

export default RateButton;
