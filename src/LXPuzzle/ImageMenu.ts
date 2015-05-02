/**
 * Created by CalcYu on 2015/4/30.
 */
module LXPuzzle {
    export class ImageMenu extends egret.Sprite {
        public get index():number {
            if(this._currImg!=null)
                return this._currImg.index;
            return 0;
        }

        private _currImg:LXPuzzle.ImageBtn;

        constructor() {
            super();
            this.initView();
        }

        private initView():void {
            for (var i:number = 0; i < 6; i++) {
                var img:LXPuzzle.ImageBtn = new LXPuzzle.ImageBtn("0" + (i + 1) + "_jpg");
                if(i==0){
                    this._currImg = img;
                    this._currImg.selected = true;
                }
                img.index = i;
                img.x = (i % 2) * 207;
                img.y = Math.floor(i / 2) * 168;
                this.addChild(img);
                img.touchEnabled = true;
                img.addEventListener(egret.TouchEvent.TOUCH_TAP, this.imgClickHandler, this);
            }

        }


        private imgClickHandler(event:egret.TouchEvent):void {
            if (this._currImg != null) {
                this._currImg.selected = false;
            }
            this._currImg = event.target;
            this._currImg.selected = true;
            LXPuzzle.GameData.getInstance().imgIndex = this._currImg.index;
        }

    }
}