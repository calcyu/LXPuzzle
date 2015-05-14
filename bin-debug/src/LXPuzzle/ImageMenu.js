/**
 * Created by CalcYu on 2015/4/30.
 */
var LXPuzzle;
(function (LXPuzzle) {
    var ImageMenu = (function (_super) {
        __extends(ImageMenu, _super);
        function ImageMenu() {
            _super.call(this);
            this.initView();
        }
        var __egretProto__ = ImageMenu.prototype;
        Object.defineProperty(__egretProto__, "index", {
            get: function () {
                if (this._currImg != null)
                    return this._currImg.index;
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        __egretProto__.initView = function () {
            for (var i = 0; i < 6; i++) {
                var img = new LXPuzzle.ImageBtn("0" + (i + 1) + "_jpg");
                if (i == 0) {
                    this._currImg = img;
                    this._currImg.selected = true;
                }
                img.index = i;
                img.x = (i % 2) * 207;
                img.y = Math.floor(i / 2) * 168;
                this.addChild(img);
                img.touchEnabled = true;
                img.addEventListener(egret.TouchEvent.TOUCH_TAP, this.imgClickHandler, this);
            }
        };
        __egretProto__.imgClickHandler = function (event) {
            if (this._currImg != null) {
                this._currImg.selected = false;
            }
            this._currImg = event.target;
            this._currImg.selected = true;
            LXPuzzle.GameData.getInstance().imgIndex = this._currImg.index;
        };
        return ImageMenu;
    })(egret.Sprite);
    LXPuzzle.ImageMenu = ImageMenu;
    ImageMenu.prototype.__class__ = "LXPuzzle.ImageMenu";
})(LXPuzzle || (LXPuzzle = {}));
//# sourceMappingURL=ImageMenu.js.map