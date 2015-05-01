/**
 * Created by CalcYu on 2015/4/30.
 */
module LXPuzzle
{
    export class RadioBtn extends egret.Sprite
    {
        public get index():number {
            return this._index;
        }
        private _index:number;

        constructor(index:number) {
            super();
            this._index = index;
            var radio:egret.Shape = new egret.Shape();
            radio.graphics.beginFill(0xFF0000,0);
            radio.graphics.drawRect(0, 0, 66, 30);
            radio.graphics.endFill();
            this.addChild(radio);
            this.touchEnabled = true;
        }
    }
}