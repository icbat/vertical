class MuteButton {

    constructor(game, x, y) {
        this.game = game;
        this.offSprite = this.makeSprite(x, y, 'speaker-off', false);
        this.onSprite = this.makeSprite(x, y, 'speaker-on', true);
        const savedMuteState = JSON.parse(localStorage.getItem('vertical-muted'));
        this.setMutedState(savedMuteState);

    }

    makeSprite(x, y, key, state) {
        const sprite = this.game.add.sprite(x, y, key);
        sprite.events.onInputUp.add(() => {
            this.setMutedState(state);
            localStorage.setItem('vertical-muted', state);
        });
        sprite.scale.setTo(0.1, 0.1);
        return sprite;
    }

    setMutedState(newState) {
        this.muted = newState;
        this.game.sound.mute = newState;

        let visible, hidden;
        if (!!newState) {
            visible = this.offSprite;
            hidden = this.onSprite;
        } else {
            visible = this.onSprite;
            hidden = this.offSprite;
        }

        hidden.visible = false;
        visible.visible = true;
        hidden.inputEnabled = false;
        const debounce = this.game.time.create();
        debounce.add(200, () => {
            visible.inputEnabled = true;
        }, this);
        debounce.start();
    }

}

export default MuteButton;
