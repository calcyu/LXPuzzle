/**
 * Created by CalcYu on 2015/4/30.
 */
module LXPuzzle {
    export class RadioGroup extends egret.Sprite {
        public get index():number {
            return this._index;
        }

        private _currRadio:egret.Bitmap;

        private _index:number;

        constructor() {
            super();
            this.initView();
        }

        private initView():void {
            //背景
            var raidoBg:egret.Bitmap = createBitmapByName("raido_bg");
            this.addChild(raidoBg);
            this._currRadio = createBitmapByName("raido");
            this._currRadio.x = 101;
            this._currRadio.y = 23;
            this.addChild(this._currRadio);
            //按钮
            for (var i:number = 0; i < 3; i++) {
                var radio:LXPuzzle.RadioBtn = new LXPuzzle.RadioBtn(i);
                radio.x = 90 + i * 82;
                radio.y = 10;
                radio.addEventListener(egret.TouchEvent.TOUCH_TAP, this.radioClickHandler, this);
                this.addChild(radio);
            }
            this._index = 0;
        }

        private radioClickHandler(event:egret.TouchEvent):void {
            var radio:LXPuzzle.RadioBtn = event.target;
            this._currRadio.x = 101 + radio.index * 82;
            this._index = radio.index;
            LXPuzzle.GameData.getInstance().level = this._index;
        }
    }
}