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
            var info = LXPuzzle.createBitmapByName("text1");
            this.addChild(info);
        };
        return PlayPanel;
    })(egret.Sprite);
    LXPuzzle.PlayPanel = PlayPanel;
    PlayPanel.prototype.__class__ = "LXPuzzle.PlayPanel";
})(LXPuzzle || (LXPuzzle = {}));
//# sourceMappingURL=PlayPanel.js.map