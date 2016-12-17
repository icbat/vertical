import colorscheme from '../colorscheme';
import AppRate from 'plugins/cordova-plugin-apprate/www/AppRate';


class RateButton extends Phaser.Sprite {

    constructor(game, x, y) {
        super(game, x, y, 'star');
        this.inputEnabled = true;
        this.events.onInputUp.add(() => {
            const url = "market://details?id=io.github.icbat.vertical";
            console.log("opening url: " + url);
            // window.open(url);
            AppRate.preferences.storeAppURL = {
                // ios: '<my_app_id>',
                android: 'market://details?id=io.github.icbat.vertical',
                // windows: 'ms-windows-store://pdp/?ProductId=<the apps Store ID>',
                // blackberry: 'appworld://content/[App Id]/',
                // windows8: 'ms-windows-store:Review?name=<the Package Family Name of the application>'
            };

            AppRate.promptForRating();
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
