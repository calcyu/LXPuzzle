/**
 * Created by CalcYu on 2015/5/1.
 */
module LXPuzzle {
    export class GameData {
        private static _instance:GameData;

        public static getInstance():LXPuzzle.GameData {
            if (this._instance == null) {
                this._instance = new LXPuzzle.GameData();
            }
            return this._instance;
        }

        public imgIndex:number = 0;

        public level:number = 0;
    }
}