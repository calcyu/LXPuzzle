var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
 * Created by CalcYu on 2015/4/30.
 */
var LXPuzzle;
(function (LXPuzzle) {
    var RadioGroup = (function (_super) {
        __extends(RadioGroup, _super);
        function RadioGroup() {
            _super.call(this);
            this.initView();
        }
        Object.defineProperty(RadioGroup.prototype, "index", {
            get: function () {
                return this._index;
            },
            enumerable: true,
            configurable: true
        });
        RadioGroup.prototype.initView = function () {
            //背景
            var raidoBg = LXPuzzle.createBitmapByName("raido_bg");
            this.addChild(raidoBg);
            this._currRadio = LXPuzzle.createBitmapByName("raido");
            this._currRadio.x = 101;
            this._currRadio.y = 23;
            this.addChild(this._currRadio);
            for (var i = 0; i < 3; i++) {
                var radio = new LXPuzzle.RadioBtn(i);
                radio.x = 90 + i * 82;
                radio.y = 10;
                radio.addEventListener(egret.TouchEvent.TOUCH_TAP, this.radioClickHandler, this);
                this.addChild(radio);
            }
            this._index = 0;
        };
        RadioGroup.prototype.radioClickHandler = function (event) {
            var radio = event.target;
            this._currRadio.x = 101 + radio.index * 82;
            this._index = radio.index;
            LXPuzzle.GameData.getInstance().level = this._index;
        };
        return RadioGroup;
    })(egret.Sprite);
    LXPuzzle.RadioGroup = RadioGroup;
    RadioGroup.prototype.__class__ = "LXPuzzle.RadioGroup";
})(LXPuzzle || (LXPuzzle = {}));
//# sourceMappingURL=RadioGroup.js.map