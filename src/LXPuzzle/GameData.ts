/**
 * Created by CalcYu on 2015/5/1.
 */
module LXPuzzle {
    export class GameData extends egret.EventDispatcher {
        public get timeTxt():string {
            return this._timeTxt;
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
        private _stepCount:number = 0;

        /**
         * 时间统计
         */
        private _timeCount:number;

        private _timeTxt:string = "00:00:00";

        private _time:egret.Timer;


        public levelTxt():string {
            if (this.level == 2) {
                return "高";
            } else if (this.level == 1) {
                return "中";
            } else {
                return "低";
            }
        }

        public startPlay():void {
            this._timeCount = new Date().getTime();
            this._time = new egret.Timer(1000);
            this._time.addEventListener(egret.TimerEvent.TIMER, this.onTimeHandler, this);
            this._time.start();
        }

        public stopTime():void{
            this._time.stop();
            this._time.removeEventListener(egret.TimerEvent.TIMER, this.onTimeHandler, this);
        }

        private onTimeHandler(event:egret.TimerEvent):void {
            var timeCount:number = new Date().getTime() - this._timeCount;
            this._timeTxt = this.parseTime(timeCount);
            this.dispatchEvent(new egret.Event("timeChange"));
        }

        private parseTime(t:number):string {
            var hour:number = 0;
            var minute:number = 0;
            var second:number = 0;

            hour = Math.floor(t / 3600000);
            minute = Math.floor((t % 3600000) / 60000);
            second = Math.floor((t % 60000) / 1000);

            return (this.getTwoLength(hour) + ":" + this.getTwoLength(minute) + ":" + this.getTwoLength(second));
        }

        private getTwoLength(data:number):string {
            if (data < 10) {
                return "0" + data;
            } else {
                return "" + data;
            }
        }
    }
}