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
    var ImageMenu = (function (_super) {
        __extends(ImageMenu, _super);
        function ImageMenu() {
            _super.call(this);
            this.initView();
        }
        Object.defineProperty(ImageMenu.prototype, "index", {
            get: function () {
                if (this._currImg != null)
                    return this._currImg.index;
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        ImageMenu.prototype.initView = function () {
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
        ImageMenu.prototype.imgClickHandler = function (event) {
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