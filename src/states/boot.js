import Analytics from '../analytics';
import colorscheme from '../colorscheme';

class Boot extends Phaser.State {

    init() {
        this.game.analytics = new Analytics();
        this.game.analytics.reportLaunch();
    }

    create() {
        this.game.input.maxPointers = 1;
        this.game.scale.pageAlignHorizontally = true;

        //setup device scaling
        if (!this.game.device.desktop) {
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.scale.minWidth = 480;
            this.game.scale.minHeight = 260;
            this.game.scale.maxWidth = 640;
            this.game.scale.maxHeight = 480;
            this.game.scale.forceOrientation(true);
        }

        this.game.stage.backgroundColor = colorscheme.background;
        this.game.state.start('preloader');
    }

}

export default Boot;
