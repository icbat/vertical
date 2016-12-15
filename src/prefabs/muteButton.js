class MuteButton {

    constructor(game, x, y) {
        this.game = game;
        this.offSprite = this.makeSprite(x, y, 'speaker-off', false);
        this.onSprite = this.makeSprite(x, y, 'speaker-on', true);
        this.setMutedState(true);
    }

    makeSprite(x, y, key, state) {
        const sprite = this.game.add.sprite(x, y, key);
        sprite.events.onInputUp.add(() => {
            this.setMutedState(state);
        });
        sprite.scale.setTo(0.1, 0.1);
        return sprite;
    }

    setMutedState(newState) {
        this.muted = newState;
        this.game.sound.mute = newState;

        let visible, hidden;
        if (newState) {
            visible = this.offSprite;
            hidden = this.onSprite;
        } else {
            visible = this.onSprite;
            hidden = this.offSprite;
        }

        hidden.visible = false;
        hidden.inputEnabled = false;
        visible.visible = true;
        visible.inputEnabled = true;
    }

}

export default MuteButton;
