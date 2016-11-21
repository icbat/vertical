class Analytics {
    constructor() {
        this.uuid = this.getUUID();
        this.url = "https://vertical-game-stats.herokuapp.com/";
    }

    getUUID() {
        var uuid = localStorage.getItem('squareSquared-uuid');
        if (!uuid) {
            uuid = new Phaser.RandomDataGenerator([Date.now()]).uuid();
            localStorage.setItem('squareSquared-uuid', uuid);
        }
        return uuid;
    }

    reportLaunch() {
        this.report("launch");
    }

    reportGameStart() {
        this.report("gameStart");
    }

    reportScore(score) {
      this.report("score", {"score": score});
    }

    report(endpoint, object) {
      let payload = object || {};
      payload.uuid = this.uuid;
      console.log("reporting to ", endpoint, payload);
      $.post(this.url + endpoint, JSON.stringify(payload), null, "json");
    }

}

export default Analytics;
