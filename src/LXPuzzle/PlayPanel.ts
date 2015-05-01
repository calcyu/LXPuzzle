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
            //返回按钮
            var back:egret.Bitmap = createBitmapByName("back_btn");
            back.x = 13;
            back.y = 10;
            back.touchEnabled = true;
            back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBackHandler, this);
            this.addChild(back);
            //状态信息
            var info:egret.Bitmap = createBitmapByName("text1");
            info.x = 51;
            info.y = 69;
            this.addChild(info);
            //参考图
            var smallImg:egret.Bitmap = createBitmapByName("0"+(GameData.getInstance().imgIndex+1)+"_jpg");
            smallImg.width = 229;
            smallImg.height = 168;
            smallImg.x = 127;
            smallImg.y = 197;
            this.addChild(smallImg);
            //左右按钮
            var left:egret.Bitmap = createBitmapByName("left");
            left.x = 69;
            left.y = 253;
            this.addChild(left);
            var right:egret.Bitmap = createBitmapByName("right");
            right.x = 392;
            right.y = 253;
            this.addChild(right);
            //格子图
            var gridImg:egret.Bitmap =createBitmapByName("0"+(GameData.getInstance().imgIndex+1)+"_jpg");
            gridImg.x = 27;
            gridImg.y = 400;
            this.addChild(gridImg);

        }

        private onBackHandler(event:egret.TouchEvent):void
        {
            this.dispatchEvent(new egret.Event("backMenu"));
        }
    }
}