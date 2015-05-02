var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
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
        Object.defineProperty(GridCell.prototype, "id", {
            get: function () {
                return this._id;
            },
            set: function (value) {
                this._id = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GridCell.prototype, "position", {
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