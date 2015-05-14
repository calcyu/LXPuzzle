/**
 * Created by CalcYu on 2015/5/2.
 */
var LXPuzzle;
(function (LXPuzzle) {
    var GridGroup = (function (_super) {
        __extends(GridGroup, _super);
        function GridGroup(index, type) {
            _super.call(this);
            this._cells = [];
            var texture = RES.getRes("0" + (index + 1) + "_jpg");
            var row = type + 3;
            this._row = row;
            var w = 428 / row;
            var h = 314 / row;
            this._width = w;
            this._height = h;
            var randomID = [];
            for (var j = 0; j < row * row - 1; j++) {
                randomID.push(j);
            }
            for (var i = 0; i < row * row - 1; i++) {
                var index = Math.round(Math.random() * (randomID.length - 1));
                var id = randomID[index];
                randomID.splice(index, 1);
                var x = (id % row) * w;
                var y = Math.floor(id / row) * h;
                var cell = new egret.Bitmap();
                cell.texture = texture;
                cell.scrollRect = new egret.Rectangle(x, y, w, h);
                var border = new egret.Shape();
                border.graphics.lineStyle(4, 0xFFFFFF);
                border.graphics.beginFill(0, 0);
                border.graphics.drawRect(0, 0, w, h);
                border.graphics.endFill();
                var s = new LXPuzzle.GridCell(id, i);
                s.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
                s.addChild(cell);
                s.addChild(border);
                s.x = (i % row) * w;
                s.y = Math.floor(i / row) * h;
                this.addChild(s);
                this._cells.push(s);
            }
            //增加空白格子
            s = new LXPuzzle.GridCell(-1, i);
            this._cells.push(s);
        }
        var __egretProto__ = GridGroup.prototype;
        __egretProto__.onClickHandler = function (event) {
            var cell = event.target;
            if (cell.id >= 0) {
                var x = (cell.position % this._row);
                var y = Math.floor(cell.position / this._row);
                var tc;
                var tp;
                if (y > 0) {
                    //上面
                    tc = this._cells[cell.position - this._row];
                    if (tc.id == -1) {
                        this.exchangeCell(cell, tc);
                        this.moveCell(cell, { y: cell.y - this._height });
                        return;
                    }
                }
                if (x < this._row - 1) {
                    //右边
                    tc = this._cells[cell.position + 1];
                    if (tc.id == -1) {
                        this.exchangeCell(cell, tc);
                        this.moveCell(cell, { x: cell.x + this._width });
                        return;
                    }
                }
                if (y < this._row - 1) {
                    //下面
                    tc = this._cells[cell.position + this._row];
                    if (tc.id == -1) {
                        this.exchangeCell(cell, tc);
                        this.moveCell(cell, { y: cell.y + this._height });
                        return;
                    }
                }
                if (x > 0) {
                    //左边
                    tc = this._cells[cell.position - 1];
                    if (tc.id == -1) {
                        this.exchangeCell(cell, tc);
                        this.moveCell(cell, { x: cell.x - this._width });
                        return;
                    }
                }
            }
        };
        /**
         * 移动格子
         * @param cell
         * @param value
         */
        __egretProto__.moveCell = function (cell, value) {
            var tw = egret.Tween.get(cell);
            tw.to(value, 100);
            LXPuzzle.GameData.getInstance().stepCount++;
            this.check();
        };
        /**
         * 交换数组位置
         * @param a
         * @param b
         */
        __egretProto__.exchangeCell = function (a, b) {
            var tp = a.position;
            this._cells[tp] = b;
            a.position = b.position;
            this._cells[b.position] = a;
            b.position = tp;
        };
        __egretProto__.check = function () {
            for (var i = 0; i < this._cells.length; i++) {
                var c = this._cells[i];
                if (c.id == -1)
                    continue;
                if (c.id != i)
                    break;
            }
            if (i == this._cells.length) {
                this.touchChildren = false;
                this.dispatchEvent(new egret.Event("success"));
            }
        };
        return GridGroup;
    })(egret.Sprite);
    LXPuzzle.GridGroup = GridGroup;
    GridGroup.prototype.__class__ = "LXPuzzle.GridGroup";
})(LXPuzzle || (LXPuzzle = {}));
//# sourceMappingURL=GridGroup.js.map