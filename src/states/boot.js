class Boot extends Phaser.State {

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
            this.game.scale.setScreenSize(true);
        }

        this.initGlobalVariables();

        console.log("Moving from boot");
        this.game.state.start('preloader');
    }

    initGlobalVariables() {
        this.game.global = {
            score: 0
        };
    }

}

export default Boot;
