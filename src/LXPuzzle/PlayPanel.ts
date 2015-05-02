/**
 * Created by CalcYu on 2015/4/29.
 */
module LXPuzzle {
    export class PlayPanel extends egret.Sprite {
        private container:egret.Sprite;

        private _stepTxt:egret.TextField;

        private _timeTxt:egret.TextField;

        constructor() {
            super();
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }

        private onAddToStage(event:egret.Event) {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            //返回按钮
            var back:egret.Bitmap = createBitmapByName("back_btn");
            back.x = 13;
            back.y = 10;
            back.touchEnabled = true;
            back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBackHandler, this);
            this.addChild(back);
            //左右按钮
            var left:egret.Bitmap = createBitmapByName("left");
            left.x = 69;
            left.y = 253;
            this.addChild(left);
            var right:egret.Bitmap = createBitmapByName("right");
            right.x = 392;
            right.y = 253;
            this.addChild(right);
            this.container = new egret.Sprite();
            this.addChild(this.container);
        }

        public initView():void {
            this.container.removeChildren();
            //难度
            var levelTxt:egret.TextField = new egret.TextField();
            levelTxt.text = "难度："+LXPuzzle.GameData.getInstance().levelTxt();
            levelTxt.size = 16;
            levelTxt.x = 51;
            levelTxt.y = 69;
            this.container.addChild(levelTxt);
            this._stepTxt = new egret.TextField();
            this._stepTxt.text = "步数："+LXPuzzle.GameData.getInstance().stepCount;
            this._stepTxt.size = 16;
            this._stepTxt.x = 51;
            this._stepTxt.y = 89;
            this.container.addChild(this._stepTxt);
            this._timeTxt = new egret.TextField();
            this._timeTxt.text = "时间："+LXPuzzle.GameData.getInstance().timeCount;
            this._timeTxt.size = 16;
            this._timeTxt.x = 51;
            this._timeTxt.y = 109;
            this.container.addChild(this._timeTxt);
            //参考图
            var smallImg:egret.Bitmap = createBitmapByName("0" + (LXPuzzle.GameData.getInstance().imgIndex + 1) + "_jpg");
            smallImg.width = 229;
            smallImg.height = 168;
            smallImg.x = 127;
            smallImg.y = 197;
            this.container.addChild(smallImg);
            //格子图
            var gridImg:LXPuzzle.GridGroup = new LXPuzzle.GridGroup(LXPuzzle.GameData.getInstance().imgIndex, LXPuzzle.GameData.getInstance().level);
            gridImg.x = 27;
            gridImg.y = 400;
            this.container.addChild(gridImg);
        }

        private onBackHandler(event:egret.TouchEvent):void {
            this.dispatchEvent(new egret.Event("backMenu"));
        }
    }
}