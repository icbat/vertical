class Menu extends Phaser.State {
    create() {
        this.game.stage.backgroundColor = "#aaaaaa";
        var text = this.game.add.text(this.game.world.centerX, this.game.world.centerY, "Start it!");
        text.inputEnabled = true;
        text.events.onInputDown.add(
            (function(context) {
                return function() {
                    console.log("Moving from menu");
                    context.game.state.start('game');
                };
            })(this));
    }
}

export default Menu;
