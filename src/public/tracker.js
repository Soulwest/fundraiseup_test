var AnalyticsTracker = /** @class */ (function () {
    function AnalyticsTracker() {
    }
    AnalyticsTracker.prototype.track = function (event) {
        var tags = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            tags[_i - 1] = arguments[_i];
        }
        console.log("Tracking event: ".concat(event, " with tags: ").concat(tags));
    };
    return AnalyticsTracker;
}());
var tracker = new AnalyticsTracker();
