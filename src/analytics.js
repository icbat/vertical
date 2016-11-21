//
// var api = {
//     url: "https://square-squared-stats.herokuapp.com/",
//     uuid: getUUID()
// };
//
// api.postToApi = function(endpoint, payload) {
//     console.log("Sending packet to " + endpoint);
//     $.post(api.url + endpoint, payload, null, "json");
// };
//
// api.report = {
//     launch: function() {
//         api.postToApi("launch", JSON.stringify({
//             "uuid": api.uuid
//         }));
//     },
//     gameStart: function() {
//         api.postToApi("gameStart", JSON.stringify({
//             "uuid": api.uuid
//         }));
//     },
//     score: function(score) {
//         api.postToApi("score", JSON.stringify({
//             "uuid": api.uuid,
//             "score": score
//         }));
//     }
// };
//
// $( document ).ajaxError(function(event, request, settings) {
//   console.error("Ajax thingy FAILED", event, request, settings);
// });

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
        console.log("reporting a launch, probably", this.uuid);
        $.post(this.url + "launch", JSON.stringify({
            "uuid": this.uuid
        }), null, "json");
    }

};


export default Analytics;
