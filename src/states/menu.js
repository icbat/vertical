class Menu extends Phaser.State {
    create() {
        this.game.stage.backgroundColor = "#aaaaaa";
        let text = this.game.add.text(this.game.world.centerX, this.game.world.centerY, "Start it!");
        text.inputEnabled = true;
        text.anchor.setTo(0.5, 0.5);
        text.events.onInputDown.add(() => {
            console.log("Moving from menu");
            this.game.state.start('game');
        });
    }
}

export default Menu;
