var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
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
            this.addChild(img);
            this.normal = LXPuzzle.createBitmapByName("frame1");
            this.addChild(this.normal);
            this.highly = LXPuzzle.createBitmapByName("frame2");
        }
        Object.defineProperty(ImageBtn.prototype, "index", {
            get: function () {
                return this._index;
            },
            set: function (value) {
                this._index = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ImageBtn.prototype, "selected", {
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