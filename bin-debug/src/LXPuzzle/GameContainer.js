/**
 * Created by CalcYu on 2015/4/29.
 */
var LXPuzzle;
(function (LXPuzzle) {
    var GameContainer = (function (_super) {
        __extends(GameContainer, _super);
        function GameContainer() {
            _super.call(this);
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }
        var __egretProto__ = GameContainer.prototype;
        __egretProto__.onAddToStage = function (event) {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.initView();
        };
        __egretProto__.initView = function () {
            var sky = createBitmapByName("bg_jpg");
            this.addChild(sky);
            var stageW = this.stage.stageWidth;
            var stageH = this.stage.stageHeight;
            sky.width = stageW;
            sky.height = stageH;
            this.menuPanel = new LXPuzzle.MenuPanel();
            this.menuPanel.addEventListener("StartGame", this.startGameHandler, this);
            this.addChild(this.menuPanel);
            this.playPanel = new LXPuzzle.PlayPanel();
            this.playPanel.addEventListener("backMenu", this.backMenuHandler, this);
        };
        __egretProto__.startGameHandler = function (event) {
            LXPuzzle.GameData.getInstance().stepCount = 0;
            LXPuzzle.GameData.getInstance().startPlay();
            this.removeChild(this.menuPanel);
            this.addChild(this.playPanel);
            this.playPanel.initView();
        };
        __egretProto__.backMenuHandler = function (event) {
            this.removeChild(this.playPanel);
            this.addChild(this.menuPanel);
        };
        return GameContainer;
    })(egret.DisplayObjectContainer);
    LXPuzzle.GameContainer = GameContainer;
    GameContainer.prototype.__class__ = "LXPuzzle.GameContainer";
    function createBitmapByName(name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
    LXPuzzle.createBitmapByName = createBitmapByName;
})(LXPuzzle || (LXPuzzle = {}));
//# sourceMappingURL=GameContainer.js.map