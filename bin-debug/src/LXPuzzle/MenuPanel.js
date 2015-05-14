/**
 * Created by CalcYu on 2015/4/29.
 */
var LXPuzzle;
(function (LXPuzzle) {
    var MenuPanel = (function (_super) {
        __extends(MenuPanel, _super);
        function MenuPanel() {
            _super.call(this);
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }
        var __egretProto__ = MenuPanel.prototype;
        __egretProto__.onAddToStage = function (event) {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.initView();
        };
        __egretProto__.initView = function () {
            //美女图片
            var stageW = this.stage.stageWidth;
            this._currImg = new LXPuzzle.ImageMenu();
            this._currImg.x = 50;
            this._currImg.y = 76;
            this.addChild(this._currImg);
            this._rg = new LXPuzzle.RadioGroup();
            this._rg.x = (stageW - this._rg.width) / 2;
            this._rg.y = 588;
            this.addChild(this._rg);
            var startBtn = LXPuzzle.createBitmapByName("start_btn");
            startBtn.anchorX = startBtn.anchorY = 0.5;
            this.addChild(startBtn);
            startBtn.x = stageW / 2;
            startBtn.y = 720;
            startBtn.touchEnabled = true;
            startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startGame, this);
        };
        __egretProto__.startGame = function (event) {
            this.dispatchEvent(new egret.Event("StartGame"));
        };
        return MenuPanel;
    })(egret.Sprite);
    LXPuzzle.MenuPanel = MenuPanel;
    MenuPanel.prototype.__class__ = "LXPuzzle.MenuPanel";
})(LXPuzzle || (LXPuzzle = {}));
//# sourceMappingURL=MenuPanel.js.map