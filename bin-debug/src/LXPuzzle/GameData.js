var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
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
        }
        Object.defineProperty(GameData.prototype, "timeCount", {
            get: function () {
                return this._timeCount;
            },
            set: function (value) {
                this._timeCount = value;
                this.dispatchEvent(new egret.Event("timeChange"));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameData.prototype, "stepCount", {
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
        GameData.prototype.levelTxt = function () {
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
        GameData.prototype.startPlay = function () {
        };
        return GameData;
    })(egret.EventDispatcher);
    LXPuzzle.GameData = GameData;
    GameData.prototype.__class__ = "LXPuzzle.GameData";
})(LXPuzzle || (LXPuzzle = {}));
//# sourceMappingURL=GameData.js.map