/**
 * Created by CalcYu on 2015/4/29.
 */
module LXPuzzle
{
    export class PlayPanel extends egret.Sprite
    {

        constructor() {
            super();
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }

        private onAddToStage(event:egret.Event) {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.initView();
        }
        private initView():void {
            //状态信息
            var info:egret.Bitmap = createBitmapByName("text1");
            info.x = 51;
            info.y = 69;
            this.addChild(info);
            //参考图
            var smallImg:egret.Bitmap = createBitmapByName("text1");
            smallImg.width = 229;
            smallImg.height = 168;
            this.addChild(smallImg);
            //格子图

        }
    }
}