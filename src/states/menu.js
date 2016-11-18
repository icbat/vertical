class Menu extends Phaser.State {
    create() {
        this.game.stage.backgroundColor = "#bdc3c7";
        let text = this.game.add.text(this.game.world.centerX, this.game.world.centerY, "Start it!");
        text.inputEnabled = true;
        text.anchor.setTo(0.5, 0.5);
        text.events.onInputDown.add(() => {
            this.game.state.start('game');
        });
    }
}

export default Menu;
