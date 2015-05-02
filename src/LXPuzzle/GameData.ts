/**
 * Created by CalcYu on 2015/5/1.
 */
module LXPuzzle {
    export class GameData extends egret.EventDispatcher{
        public get timeCount():number {
            return this._timeCount;
        }

        public set timeCount(value:number) {
            this._timeCount = value;
            this.dispatchEvent(new egret.Event("timeChange"));
        }
        public get stepCount():number {
            return this._stepCount;
        }

        public set stepCount(value:number) {
            this._stepCount = value;
            this.dispatchEvent(new egret.Event("stepChange"));
        }
        private static _instance:GameData;

        public static getInstance():LXPuzzle.GameData {
            if (this._instance == null) {
                this._instance = new LXPuzzle.GameData();
            }
            return this._instance;
        }

        public imgIndex:number = 0;

        /**
         * 等级
         * @type {number}
         */
        public level:number = 0;

        /**
         * 步数统计
         */
        private _stepCount:number=0;

        /**
         * 时间统计
         */
        private _timeCount:number;


        public levelTxt():string
        {
            if(this.level==2){
                return "高";
            }else if(this.level==1){
                return "中";
            }else{
                return "低";
            }
        }

        public startPlay():void{

        }
    }
}