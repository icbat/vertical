import Analytics from '../analytics';
import colorscheme from '../colorscheme';
import FontStyle from '../fontStyle';

class Boot extends Phaser.State {

    init() {
        this.game.analytics = new Analytics();
        this.game.analytics.reportLaunch();
    }

    create() {
        const placeholder = this.game.add.text(0, 0, "", new FontStyle(this.game));
        this.game.stage.backgroundColor = colorscheme.initialBackground;
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

        this.game.state.start('preloader');
    }

}

export default Boot;
