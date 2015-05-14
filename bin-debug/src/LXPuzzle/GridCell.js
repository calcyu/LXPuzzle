/**
 * Created by CalcYu on 2015/5/2.
 */
var LXPuzzle;
(function (LXPuzzle) {
    var GridCell = (function (_super) {
        __extends(GridCell, _super);
        function GridCell(id, position) {
            _super.call(this);
            this._id = id;
            this._position = position;
            this.touchEnabled = true;
        }
        var __egretProto__ = GridCell.prototype;
        Object.defineProperty(__egretProto__, "id", {
            get: function () {
                return this._id;
            },
            set: function (value) {
                this._id = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "position", {
            get: function () {
                return this._position;
            },
            set: function (value) {
                this._position = value;
            },
            enumerable: true,
            configurable: true
        });
        return GridCell;
    })(egret.Sprite);
    LXPuzzle.GridCell = GridCell;
    GridCell.prototype.__class__ = "LXPuzzle.GridCell";
})(LXPuzzle || (LXPuzzle = {}));
//# sourceMappingURL=GridCell.js.map