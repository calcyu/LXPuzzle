/**
 * Created by CalcYu on 2015/4/29.
 */
module LXPuzzle {
    export class GameContainer extends egret.DisplayObjectContainer {

        private menuPanel:LXPuzzle.MenuPanel;
        private playPanel:LXPuzzle.PlayPanel;

        constructor() {
            super();
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }

        private onAddToStage(event:egret.Event) {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.initView();
        }

        private initView():void {
            var sky:egret.Bitmap = createBitmapByName("bg_jpg");
            this.addChild(sky);
            var stageW:number = this.stage.stageWidth;
            var stageH:number = this.stage.stageHeight;
            sky.width = stageW;
            sky.height = stageH;
            this.menuPanel = new LXPuzzle.MenuPanel();
            this.menuPanel.addEventListener("StartGame", this.startGameHandler, this);
            this.addChild(this.menuPanel);
            this.playPanel = new LXPuzzle.PlayPanel();
            this.playPanel.addEventListener("backMenu", this.backMenuHandler, this);
        }

        private startGameHandler(event:egret.Event):void{
            LXPuzzle.GameData.getInstance().stepCount=0;
            LXPuzzle.GameData.getInstance().startPlay();
            this.removeChild(this.menuPanel);
            this.addChild(this.playPanel);
            this.playPanel.initView();
        }


        private backMenuHandler(event:egret.Event):void{
            this.removeChild(this.playPanel);
            this.addChild(this.menuPanel);
        }
    }

    export function createBitmapByName(name:string):egret.Bitmap {
        var result:egret.Bitmap = new egret.Bitmap();
        var texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
}