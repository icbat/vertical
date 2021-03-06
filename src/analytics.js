class Analytics {
    constructor() {
        this.uuid = this.getUUID();
        this.url = "https://vertical-game-stats.herokuapp.com/";
    }

    getUUID() {
        var uuid = localStorage.getItem('vertical-uuid');
        if (!uuid) {
            uuid = new Phaser.RandomDataGenerator([Date.now()]).uuid();
            localStorage.setItem('vertical-uuid', uuid);
        }
        return uuid;
    }

    reportLaunch() {
        this.report("launch");
    }

    reportGameStart() {
        this.report("gameStart");
    }

    reportScore(score, runDuration, diedTo) {
        const formatedObstacle = {};
        formatedObstacle.x = diedTo.x;
        formatedObstacle.name = diedTo.name;
        formatedObstacle.speed = diedTo.speed;
        formatedObstacle.level = diedTo.level;

        this.report("score", {
            "score": score,
            "runDuration": runDuration,
            "diedTo": formatedObstacle
        });
    }

    getDailyHighScore(callback, context) {
        $.getJSON(this.url + "score/today", (data) => {
            let dailyHighScore = 0;
            for (let scoreObject of data.data) {
                dailyHighScore = Math.max(dailyHighScore, scoreObject.score);
            }
            callback.apply(context, [dailyHighScore]);
        });
    }

    report(endpoint, object) {
        let payload = object || {};
        payload.uuid = this.uuid;
        console.log("reporting to " + endpoint + " with payload: ",  payload);
        $.post(this.url + endpoint, JSON.stringify(payload), null, "json");
    }

}

export default Analytics;
