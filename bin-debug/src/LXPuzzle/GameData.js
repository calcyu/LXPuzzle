/**
 * Created by CalcYu on 2015/5/1.
 */
var LXPuzzle;
(function (LXPuzzle) {
    var GameData = (function (_super) {
        __extends(GameData, _super);
        function GameData() {
            _super.apply(this, arguments);
            this.imgIndex = 0;
            /**
             * 等级
             * @type {number}
             */
            this.level = 0;
            /**
             * 步数统计
             */
            this._stepCount = 0;
            this._timeTxt = "00:00:00";
        }
        var __egretProto__ = GameData.prototype;
        Object.defineProperty(__egretProto__, "timeTxt", {
            get: function () {
                return this._timeTxt;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "stepCount", {
            get: function () {
                return this._stepCount;
            },
            set: function (value) {
                this._stepCount = value;
                this.dispatchEvent(new egret.Event("stepChange"));
            },
            enumerable: true,
            configurable: true
        });
        GameData.getInstance = function () {
            if (this._instance == null) {
                this._instance = new LXPuzzle.GameData();
            }
            return this._instance;
        };
        __egretProto__.levelTxt = function () {
            if (this.level == 2) {
                return "高";
            }
            else if (this.level == 1) {
                return "中";
            }
            else {
                return "低";
            }
        };
        __egretProto__.startPlay = function () {
            this._timeCount = new Date().getTime();
            this._time = new egret.Timer(1000);
            this._time.addEventListener(egret.TimerEvent.TIMER, this.onTimeHandler, this);
            this._time.start();
        };
        __egretProto__.stopTime = function () {
            this._time.stop();
            this._time.removeEventListener(egret.TimerEvent.TIMER, this.onTimeHandler, this);
        };
        __egretProto__.onTimeHandler = function (event) {
            var timeCount = new Date().getTime() - this._timeCount;
            this._timeTxt = this.parseTime(timeCount);
            this.dispatchEvent(new egret.Event("timeChange"));
        };
        __egretProto__.parseTime = function (t) {
            var hour = 0;
            var minute = 0;
            var second = 0;
            hour = Math.floor(t / 3600000);
            minute = Math.floor((t % 3600000) / 60000);
            second = Math.floor((t % 60000) / 1000);
            return (this.getTwoLength(hour) + ":" + this.getTwoLength(minute) + ":" + this.getTwoLength(second));
        };
        __egretProto__.getTwoLength = function (data) {
            if (data < 10) {
                return "0" + data;
            }
            else {
                return "" + data;
            }
        };
        return GameData;
    })(egret.EventDispatcher);
    LXPuzzle.GameData = GameData;
    GameData.prototype.__class__ = "LXPuzzle.GameData";
})(LXPuzzle || (LXPuzzle = {}));
//# sourceMappingURL=GameData.js.map