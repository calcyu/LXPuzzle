/**
 * Created by CalcYu on 2015/4/29.
 */
module LXPuzzle {
    export class MenuPanel extends egret.Sprite {

        private _currImg:LXPuzzle.ImageMenu;

        private _rg:LXPuzzle.RadioGroup;

        constructor() {
            super();
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }

        private onAddToStage(event:egret.Event):void {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.initView();
        }

        private initView():void {
            //美女图片
            var stageW:number = this.stage.stageWidth;
            this._currImg = new LXPuzzle.ImageMenu();
            this._currImg.x = 50;
            this._currImg.y = 76;
            this.addChild(this._currImg);

            this._rg = new LXPuzzle.RadioGroup();
            this._rg.x = (stageW - this._rg.width)/2;
            this._rg.y = 588;
            this.addChild(this._rg);

            var startBtn:egret.Bitmap = createBitmapByName("start_btn");
            startBtn.anchorX = startBtn.anchorY = 0.5;
            this.addChild(startBtn);
            startBtn.x = stageW / 2;
            startBtn.y = 720;
            startBtn.touchEnabled = true;
            startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startGame, this);

        }

        private startGame(event:egret.TouchEvent):void{
            this.dispatchEvent(new egret.Event("StartGame"));
        }

    }
}