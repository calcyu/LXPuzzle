/**
 * Created by CalcYu on 2015/5/2.
 */
module LXPuzzle {
    export class GridGroup extends egret.Sprite {

        private _cells:LXPuzzle.GridCell[];

        private _row:number;

        private _width:number;

        private _height:number;

        constructor(index:number, type:number) {
            super();
            this._cells = [];
            var texture:egret.Texture = RES.getRes("0" + (index + 1) + "_jpg");
            var row = type + 3;
            this._row = row;
            var w:number = 428 / row;
            var h:number = 314 / row;
            this._width = w;
            this._height = h;
            var randomID:number[] = [];
            for (var j:number = 0; j < row * row - 1; j++) {
                randomID.push(j);
            }
            for (var i:number = 0; i < row * row - 1; i++) {
                var index:number = Math.round(Math.random() * (randomID.length - 1));
                var id:number = randomID[index];
                randomID.splice(index, 1);
                var x:number = (id % row) * w;
                var y:number = Math.floor(id / row) * h;
                var cell:egret.Bitmap = new egret.Bitmap();
                cell.texture = texture;
                cell.scrollRect = new egret.Rectangle(x, y, w, h);
                var border:egret.Shape = new egret.Shape();
                border.graphics.lineStyle(4, 0xFFFFFF);
                border.graphics.beginFill(0, 0);
                border.graphics.drawRect(0, 0, w, h);
                border.graphics.endFill();
                var s:LXPuzzle.GridCell = new LXPuzzle.GridCell(id, i);
                s.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
                s.addChild(cell);
                s.addChild(border);
                s.x = (i % row) * w
                s.y = Math.floor(i / row) * h;
                this.addChild(s);
                this._cells.push(s);
            }
            //增加空白格子
            s = new LXPuzzle.GridCell(-1, i);
            this._cells.push(s);
        }

        private onClickHandler(event:egret.TouchEvent):void {
            var cell:LXPuzzle.GridCell = event.target;
            if (cell.id >= 0) {
                var x:number = (cell.position % this._row);
                var y:number = Math.floor(cell.position / this._row);
                var tc:LXPuzzle.GridCell;
                var tp:number;
                if (y > 0) {
                    //上面
                    tc = this._cells[cell.position - this._row];
                    if (tc.id == -1) {
                        this.exchangeCell(cell, tc);
                        this.moveCell(cell, {y: cell.y - this._height});
                        return;
                    }
                }
                if (x < this._row - 1) {
                    //右边
                    tc = this._cells[cell.position + 1];
                    if (tc.id == -1) {
                        this.exchangeCell(cell, tc);
                        this.moveCell(cell, {x: cell.x + this._width});
                        return;
                    }
                }
                if (y < this._row - 1) {
                    //下面
                    tc = this._cells[cell.position + this._row];
                    if (tc.id == -1) {
                        this.exchangeCell(cell, tc);
                        this.moveCell(cell, {y: cell.y + this._height});
                        return;
                    }
                }
                if (x > 0) {
                    //左边
                    tc = this._cells[cell.position - 1];
                    if (tc.id == -1) {
                        this.exchangeCell(cell, tc);
                        this.moveCell(cell, {x: cell.x - this._width});
                        return;
                    }
                }

            }

        }

        /**
         * 移动格子
         * @param cell
         * @param value
         */
        private moveCell(cell:LXPuzzle.GridCell, value:any):void {
            var tw = egret.Tween.get(cell);
            tw.to(value, 100);
            LXPuzzle.GameData.getInstance().stepCount++;
            this.check();
        }

        /**
         * 交换数组位置
         * @param a
         * @param b
         */
        private exchangeCell(a:LXPuzzle.GridCell, b:LXPuzzle.GridCell) {
            var tp:number = a.position;
            this._cells[tp] = b;
            a.position = b.position;
            this._cells[b.position] = a;
            b.position = tp;
        }

        private check():void {
            for (var i:number = 0; i < this._cells.length; i++) {
                var c:LXPuzzle.GridCell = this._cells[i];
                if (c.id == -1)
                    continue;
                if (c.id != i)
                    break;
            }
            if (i == this._cells.length) {
                this.touchChildren = false;
                this.dispatchEvent(new egret.Event("success"));
            }
        }

    }
}