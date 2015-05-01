/**
 * Created by CalcYu on 2015/4/29.
 */
module LXPuzzle {
    export class ImageBtn extends egret.Sprite {
        public get index():number {
            return this._index;
        }

        public set index(value:number) {
            this._index = value;
        }
        public get selected():boolean {
            return this._selected;
        }

        public set selected(value:boolean) {
            if(this._selected!=value) {
                this._selected = value;
                if (value) {
                    this.removeChild(this.normal);
                    this.addChild(this.highly);
                }else{
                    this.removeChild(this.highly);
                    this.addChild(this.normal);
                }

            }
        }

        private _selected:boolean;

        private normal:egret.Bitmap;

        private highly:egret.Bitmap;

        private _index:number;

        constructor(name:string) {
            super();
            var img:egret.Bitmap = createBitmapByName(name);
            img.x = img.y = 2;
            img.width = 173;
            img.height = 132;
            this.addChild(img);
            this.normal = createBitmapByName("frame1");
            this.addChild(this.normal);
            this.highly = createBitmapByName("frame2");
        }


    }
}