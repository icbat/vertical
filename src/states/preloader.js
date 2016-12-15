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
        this.game.load.image('rounded-button', 'assets/rounded-button.png');
        this.game.load.image('speaker-on', 'assets/speaker-on.png');
        this.game.load.image('speaker-off', 'assets/speaker-off.png');
        this.game.load.image('star', 'assets/star.png');

        this.game.load.audio('music-1', 'assets/Continue.ogg');
        this.game.load.audio('music-2', 'assets/mixdown.ogg');
        this.game.load.audio('music-3', 'assets/Rainbow-oddroom-oga.ogg');
        this.game.load.audio('music-4', 'assets/S31-Let-the-Games-Begin.ogg');
        this.game.global.tracks = ['music-1', 'music-2', 'music-3', 'music-4'];

        this.game.load.audio('hit-sound', 'assets/hit.ogg');
        this.game.load.audio('crumble-sound', 'assets/crumble.ogg');
    }

    update() {
        if (this.game.stage.backgroundColor === colorscheme.background) {
            this.backgroundFadedIn = true;
        } else {
            this.game.stage.backgroundColor = Phaser.Color.interpolateColor(colorscheme.initialBackground, colorscheme.background, 150, this.fadeStep, 1);
            this.fadeStep += 10;
        }
        if (this.assetsLoaded && this.backgroundFadedIn) {
            this.game.state.start('menu');
        }
    }
}

export default Preloader;
