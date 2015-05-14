/**
 * Created by CalcYu on 2015/4/29.
 */
var LXPuzzle;
(function (LXPuzzle) {
    var ImageBtn = (function (_super) {
        __extends(ImageBtn, _super);
        function ImageBtn(name) {
            _super.call(this);
            var img = LXPuzzle.createBitmapByName(name);
            img.x = img.y = 2;
            img.width = 173;
            img.height = 132;
            this.addChild(img);
            this.normal = LXPuzzle.createBitmapByName("frame1");
            this.addChild(this.normal);
            this.highly = LXPuzzle.createBitmapByName("frame2");
        }
        var __egretProto__ = ImageBtn.prototype;
        Object.defineProperty(__egretProto__, "index", {
            get: function () {
                return this._index;
            },
            set: function (value) {
                this._index = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "selected", {
            get: function () {
                return this._selected;
            },
            set: function (value) {
                if (this._selected != value) {
                    this._selected = value;
                    if (value) {
                        this.removeChild(this.normal);
                        this.addChild(this.highly);
                    }
                    else {
                        this.removeChild(this.highly);
                        this.addChild(this.normal);
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        return ImageBtn;
    })(egret.Sprite);
    LXPuzzle.ImageBtn = ImageBtn;
    ImageBtn.prototype.__class__ = "LXPuzzle.ImageBtn";
})(LXPuzzle || (LXPuzzle = {}));
//# sourceMappingURL=ImageBtn.js.map