/**
 * Created by CalcYu on 2015/4/30.
 */
var LXPuzzle;
(function (LXPuzzle) {
    var RadioBtn = (function (_super) {
        __extends(RadioBtn, _super);
        function RadioBtn(index) {
            _super.call(this);
            this._index = index;
            var radio = new egret.Shape();
            radio.graphics.beginFill(0xFF0000, 0);
            radio.graphics.drawRect(0, 0, 66, 30);
            radio.graphics.endFill();
            this.addChild(radio);
            this.touchEnabled = true;
        }
        var __egretProto__ = RadioBtn.prototype;
        Object.defineProperty(__egretProto__, "index", {
            get: function () {
                return this._index;
            },
            enumerable: true,
            configurable: true
        });
        return RadioBtn;
    })(egret.Sprite);
    LXPuzzle.RadioBtn = RadioBtn;
    RadioBtn.prototype.__class__ = "LXPuzzle.RadioBtn";
})(LXPuzzle || (LXPuzzle = {}));
//# sourceMappingURL=RadioBtn.js.map