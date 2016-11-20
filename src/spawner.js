import Obstacle from './prefabs/obstacle';

class Spawner {

    // this will be states.game, because that's the context passed to the callback
    spawn(level) {
        this.game.camera.shake(0.005, 100);
        let obstacle = new Obstacle(this.game, this.game.rnd.pick(this.columnXVals), level);

        this.obstacles.push(obstacle);
        obstacle.destroyed.addOnce(() => {
            this.obstacles.shift();
            this.game.global.score += 1;
        });

        this.game.add.existing(obstacle);
    }

}

export default Spawner;
