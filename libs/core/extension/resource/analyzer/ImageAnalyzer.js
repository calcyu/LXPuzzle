/**
 * Copyright (c) Egret-Labs.org. Permission is hereby granted, free of charge,
 * to any person obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish, distribute,
 * sublicense, and/or sell copies of the Software, and to permit persons to whom
 * the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
 * PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
 * FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
var RES;
(function (RES) {
    var ImageAnalyzer = (function (_super) {
        __extends(ImageAnalyzer, _super);
        function ImageAnalyzer() {
            _super.call(this);
            this._dataFormat = egret.URLLoaderDataFormat.TEXTURE;
        }
        var __egretProto__ = ImageAnalyzer.prototype;
        /**
         * 解析并缓存加载成功的数据
         */
        __egretProto__.analyzeData = function (resItem, data) {
            var name = resItem.name;
            if (this.fileDic[name] || !data) {
                return;
            }
            this.fileDic[name] = data;
            var config = resItem.data;
            if (config && config["scale9grid"]) {
                var str = config["scale9grid"];
                var list = str.split(",");
                data["scale9Grid"] = new egret.Rectangle(parseInt(list[0]), parseInt(list[1]), parseInt(list[2]), parseInt(list[3]));
            }
        };
        __egretProto__.onResourceDestroy = function (resource) {
            //console.log (resource);
        };
        return ImageAnalyzer;
    })(RES.BinAnalyzer);
    RES.ImageAnalyzer = ImageAnalyzer;
    ImageAnalyzer.prototype.__class__ = "RES.ImageAnalyzer";
})(RES || (RES = {}));
