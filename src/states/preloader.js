import colorscheme from '../colorscheme';

class Preloader extends Phaser.State {

    preload() {
        this.backgroundFadedIn = false;
        this.fadeStep = 0;

        this.assetsLoaded = false;
        this.load.onLoadComplete.addOnce(() => {
            this.assetsLoaded = true;
        });
        this.loadResources();
    }

    loadResources() {
        this.game.load.image('pixel', 'assets/pixel.png');
        this.game.load.image('col-shadow', 'assets/col-shadow.png');
        this.game.load.image('tile-bg', 'assets/tile-bg.png');

        this.game.load.audio('music', 'assets/EtherDisco.ogg');
        this.game.load.audio('hit-sound', 'assets/hit.ogg');
        this.game.load.audio('crumble-sound', 'assets/crumble.ogg');
    }

    update() {
        if (this.game.stage.backgroundColor === colorscheme.background) {
            this.backgroundFadedIn = true;
        } else {
            this.game.stage.backgroundColor = Phaser.Color.interpolateColor(colorscheme.initialBackground, colorscheme.background, 100, this.fadeStep, 1);
            this.fadeStep += 10;
        }
        if (this.assetsLoaded && this.backgroundFadedIn) {
            this.game.state.start('menu');
        }
    }
}

export default Preloader;
