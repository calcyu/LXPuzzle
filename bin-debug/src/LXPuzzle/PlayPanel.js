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
    var PlayPanel = (function (_super) {
        __extends(PlayPanel, _super);
        function PlayPanel() {
            _super.call(this);
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }
        PlayPanel.prototype.onAddToStage = function (event) {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.initView();
        };
        PlayPanel.prototype.initView = function () {
            //返回按钮
            var back = LXPuzzle.createBitmapByName("back_btn");
            back.x = 13;
            back.y = 10;
            back.touchEnabled = true;
            back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBackHandler, this);
            this.addChild(back);
            //状态信息
            var info = LXPuzzle.createBitmapByName("text1");
            info.x = 51;
            info.y = 69;
            this.addChild(info);
            //参考图
            var smallImg = LXPuzzle.createBitmapByName("0" + (LXPuzzle.GameData.getInstance().imgIndex + 1) + "_jpg");
            smallImg.width = 229;
            smallImg.height = 168;
            smallImg.x = 127;
            smallImg.y = 197;
            this.addChild(smallImg);
            //左右按钮
            var left = LXPuzzle.createBitmapByName("left");
            left.x = 69;
            left.y = 253;
            this.addChild(left);
            var right = LXPuzzle.createBitmapByName("right");
            right.x = 392;
            right.y = 253;
            this.addChild(right);
            //格子图
            var gridImg = LXPuzzle.createBitmapByName("0" + (LXPuzzle.GameData.getInstance().imgIndex + 1) + "_jpg");
            gridImg.x = 27;
            gridImg.y = 400;
            this.addChild(gridImg);
        };
        PlayPanel.prototype.onBackHandler = function (event) {
            this.dispatchEvent(new egret.Event("backMenu"));
        };
        return PlayPanel;
    })(egret.Sprite);
    LXPuzzle.PlayPanel = PlayPanel;
    PlayPanel.prototype.__class__ = "LXPuzzle.PlayPanel";
})(LXPuzzle || (LXPuzzle = {}));
//# sourceMappingURL=PlayPanel.js.map