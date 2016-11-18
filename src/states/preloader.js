class Preloader extends Phaser.State {

    constructor() {
        super();
        this.ready = false;
    }

    preload() {
        //Setup loading and its events
        this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
        this.loadResources();
    }

    loadResources() {
        this.game.load.image('pixel', 'assets/pixel.png');

        this.game.load.audio('music', 'assets/EtherDisco.mp3');
        // this.game.load.audio('music2', 'assets/NowhereLand.mp3');
    }

    onLoadComplete() {
        this.game.state.start('menu');
    }
}

export default Preloader;
