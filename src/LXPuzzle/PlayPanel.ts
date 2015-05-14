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
            back.x = 15;
            back.y = 15;
            back.touchEnabled = true;
            back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBackHandler, this);
            this.addChild(back);
            //左右按钮
            //var left:egret.Bitmap = createBitmapByName("left");
            //left.x = 69;
            //left.y = 253;
            //this.addChild(left);
            //var right:egret.Bitmap = createBitmapByName("right");
            //right.x = 392;
            //right.y = 253;
            //this.addChild(right);
            this.container = new egret.Sprite();
            this.addChild(this.container);
            //步数更新
            LXPuzzle.GameData.getInstance().addEventListener("stepChange", this.onStepReflash, this);
            LXPuzzle.GameData.getInstance().addEventListener("timeChange", this.onTimeReflash, this);
        }

        public initView():void {
            this.container.removeChildren();
            //难度
            var levelTxt:egret.TextField = new egret.TextField();
            levelTxt.text = "难度：" + LXPuzzle.GameData.getInstance().levelTxt();
            levelTxt.size = 18;
            levelTxt.x = 60;
            levelTxt.y = 70;
            this.container.addChild(levelTxt);
            this._stepTxt = new egret.TextField();
            this._stepTxt.text = "步数：" + LXPuzzle.GameData.getInstance().stepCount;
            this._stepTxt.size = 18;
            this._stepTxt.x = 60;
            this._stepTxt.y = 95;
            this.container.addChild(this._stepTxt);
            this._timeTxt = new egret.TextField();
            this._timeTxt.text = "时间：" + LXPuzzle.GameData.getInstance().timeTxt;
            this._timeTxt.size = 18;
            this._timeTxt.x = 60;
            this._timeTxt.y = 120;
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
            gridImg.addEventListener("success", this.onSuccessHandler, this);
            this.container.addChild(gridImg);
        }

        private onBackHandler(event:egret.TouchEvent):void {
            this.dispatchEvent(new egret.Event("backMenu"));
        }

        private onStepReflash(event:egret.Event):void {
            this._stepTxt.text = "步数：" + LXPuzzle.GameData.getInstance().stepCount;
        }

        private onTimeReflash(event:egret.Event):void {
            this._timeTxt.text = "时间：" + LXPuzzle.GameData.getInstance().timeTxt;
        }

        private onShareWeixin(event:egret.Event):void {

        }


        private onSuccessHandler(event:egret.Event):void {
            LXPuzzle.GameData.getInstance().stopTime();
            var bg:egret.Shape = new egret.Shape();
            bg.graphics.beginFill(0, 0.5);
            bg.graphics.drawRect(0, 0, this.stage.stageWidth, this.stage.stageHeight);
            bg.graphics.endFill();
            this.container.addChild(bg);
            var dialog:egret.Bitmap = createBitmapByName("dialog");
            dialog.x = 30;
            dialog.y = 193
            this.container.addChild(dialog);
            var again:egret.Bitmap = createBitmapByName("playAgain_btn");
            again.x = 88;
            again.y = 546;
            again.touchEnabled = true;
            again.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBackHandler, this);
            this.container.addChild(again);
            var share:egret.Bitmap = createBitmapByName("share_btn");
            share.x = 263;
            share.y = 546;
            share.touchEnabled = true;
            share.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShareWeixin, this);
            this.container.addChild(share);

            var text:egret.TextField = new egret.TextField();
            text.text = "童鞋，恭喜你！您使用" + LXPuzzle.GameData.getInstance().stepCount + "步就完成了拼图，真是太棒了！";
            text.width = 222;
            text.size = 26;
            text.x = 216;
            text.y = 318;
            this.container.addChild(text);
        }
    }
}