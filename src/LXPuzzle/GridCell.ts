/**
 * Created by CalcYu on 2015/5/2.
 */
module LXPuzzle
{
    export class  GridCell extends egret.Sprite
    {
        public get id():number {
            return this._id;
        }

        public set id(value:number) {
            this._id = value;
        }
        public get position():number {
            return this._position;
        }

        public set position(value:number) {
            this._position = value;
        }

        private _id:number;
        private _position:number;
        constructor(id:number, position:number) {
            super();
            this._id = id;
            this._position = position;
            this.touchEnabled = true;
        }
    }
}