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
    /**
     * SpriteSheet解析器
     */
    var SheetAnalyzer = (function (_super) {
        __extends(SheetAnalyzer, _super);
        function SheetAnalyzer() {
            _super.call(this);
            this.sheetMap = {};
            this.textureMap = {};
            this._dataFormat = egret.URLLoaderDataFormat.TEXT;
        }
        var __egretProto__ = SheetAnalyzer.prototype;
        /**
         * @inheritDoc
         */
        __egretProto__.getRes = function (name) {
            var res = this.fileDic[name];
            if (!res) {
                res = this.textureMap[name];
            }
            if (!res) {
                var prefix = RES.AnalyzerBase.getStringPrefix(name);
                res = this.fileDic[prefix];
                if (res) {
                    var tail = RES.AnalyzerBase.getStringTail(name);
                    res = res.getTexture(tail);
                }
            }
            return res;
        };
        /**
         * 一项加载结束
         */
        __egretProto__.onLoadFinish = function (event) {
            var loader = (event.target);
            var data = this.resItemDic[loader.hashCode];
            delete this.resItemDic[loader.hashCode];
            var resItem = data.item;
            var compFunc = data.func;
            resItem.loaded = (event.type == egret.Event.COMPLETE);
            if (resItem.loaded) {
                if (typeof (loader.data) == "string") {
                    resItem.loaded = false;
                    var imageUrl = this.analyzeConfig(resItem, loader.data);
                    if (imageUrl) {
                        var tempUrl = resItem.url;
                        resItem.url = imageUrl;
                        this._dataFormat = egret.URLLoaderDataFormat.TEXTURE;
                        this.loadFile(resItem, compFunc, data.thisObject);
                        this._dataFormat = egret.URLLoaderDataFormat.TEXT;
                        resItem.url = tempUrl;
                        return;
                    }
                }
                else {
                    this.analyzeBitmap(resItem, loader.data);
                }
            }
            this.recycler.push(loader);
            compFunc.call(data.thisObject, resItem);
        };
        /**
         * 解析并缓存加载成功的配置文件
         */
        __egretProto__.analyzeConfig = function (resItem, data) {
            var name = resItem.name;
            var config;
            var imageUrl = "";
            try {
                var str = data;
                config = JSON.parse(str);
            }
            catch (e) {
                egret.Logger.warningWithErrorId(1017, resItem.url, data);
            }
            if (config) {
                this.sheetMap[name] = config;
                imageUrl = this.getRelativePath(resItem.url, config["file"]);
            }
            return imageUrl;
        };
        /**
         * 解析并缓存加载成功的位图数据
         */
        __egretProto__.analyzeBitmap = function (resItem, data) {
            var name = resItem.name;
            if (this.fileDic[name] || !data) {
                return;
            }
            var config = this.sheetMap[name];
            delete this.sheetMap[name];
            var targetName = resItem.data && resItem.data.subkeys ? "" : name;
            var spriteSheet = this.parseSpriteSheet(data, config, targetName);
            this.fileDic[name] = spriteSheet;
        };
        /**
         * 获取相对位置
         */
        __egretProto__.getRelativePath = function (url, file) {
            url = url.split("\\").join("/");
            var index = url.lastIndexOf("/");
            if (index != -1) {
                url = url.substring(0, index + 1) + file;
            }
            else {
                url = file;
            }
            return url;
        };
        __egretProto__.parseSpriteSheet = function (texture, data, name) {
            var frames = data.frames;
            if (!frames) {
                return null;
            }
            var spriteSheet = new egret.SpriteSheet(texture);
            var textureMap = this.textureMap;
            for (var subkey in frames) {
                var config = frames[subkey];
                var texture = spriteSheet.createTexture(subkey, config.x, config.y, config.w, config.h, config.offX, config.offY, config.sourceW, config.sourceH);
                if (config["scale9grid"]) {
                    var str = config["scale9grid"];
                    var list = str.split(",");
                    texture["scale9Grid"] = new egret.Rectangle(parseInt(list[0]), parseInt(list[1]), parseInt(list[2]), parseInt(list[3]));
                }
                if (textureMap[subkey] == null) {
                    textureMap[subkey] = texture;
                    if (name) {
                        this.addSubkey(subkey, name);
                    }
                }
            }
            return spriteSheet;
        };
        /**
         * @inheritDoc
         */
        __egretProto__.destroyRes = function (name) {
            var sheet = this.fileDic[name];
            if (sheet) {
                delete this.fileDic[name];
                for (var subkey in sheet._textureMap) {
                    if (this.textureMap[subkey]) {
                        delete this.textureMap[subkey];
                    }
                }
                return true;
            }
            return false;
        };
        return SheetAnalyzer;
    })(RES.BinAnalyzer);
    RES.SheetAnalyzer = SheetAnalyzer;
    SheetAnalyzer.prototype.__class__ = "RES.SheetAnalyzer";
})(RES || (RES = {}));
