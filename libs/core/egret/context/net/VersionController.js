var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
 * Copyright (c) 2014,Egret-Labs.org
 * All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Egret-Labs.org nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY EGRET-LABS.ORG AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL EGRET-LABS.ORG AND CONTRIBUTORS BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
var egret;
(function (egret) {
    /**
     * @private
     */
    var VersionController = (function (_super) {
        __extends(VersionController, _super);
        function VersionController() {
            _super.call(this);
            /**
             * 本地版本信息文件存储路径
             */
            this.localVersionDataPath = "localVersion.manifest";
            /**
             * 本地版本信息文件，记录了本地文件版本信息
             */
            this.localVersionData = null;
            /**
             * 本地版本信息文件存储路径
             */
            this.changeVersionDataPath = "version.manifest";
            /**
             * 当前版本信息文件，记录了当前版本中相对于基础版本变化的文件
             */
            this.changeVersionData = null;
            /**
             * 本地版本信息文件存储路径
             */
            this.baseVersionDataPath = "base.manifest";
            /**
             * 基础版本信息文件
             */
            this.baseVersionData = null;
            this.localVersionCodePath = "localCode.manifest";
            this.serverVersionCodePath = "code.manifest";
            this._load = null;
            this._call = null;
        }
        //获取当前版本号
        VersionController.prototype.fetchVersion = function () {
            this._load = new egret.NativeResourceLoader();
            this._load.addEventListener(egret.IOErrorEvent.IO_ERROR, this.loadError, this);
            this._load.addEventListener(egret.Event.COMPLETE, this.fileLoadComplete, this);
            this.initLocalVersionData();
        };
        //初始化本地数据配置
        VersionController.prototype.initLocalVersionData = function () {
            //初始化localVersonData
            this.localVersionData = this.getLocalData(this.localVersionDataPath);
            if (this.localVersionData == null) {
                this.localVersionData = this.getLocalData(this.baseVersionDataPath);
                if (this.localVersionData == null) {
                    this.localVersionData = {};
                }
                egret_native.saveRecord(this.localVersionDataPath, JSON.stringify(this.localVersionData));
            }
            this.loadCodeVersion();
        };
        //初始化本地版本控制号数据
        VersionController.prototype.loadCodeVersion = function () {
            var localCode = 1;
            this.newCode = 1;
            var localVersionCode = this.getLocalData(this.localVersionCodePath);
            if (localVersionCode != null) {
                localCode = localVersionCode["code"];
            }
            var serverVersionCode = this.getLocalData(this.serverVersionCodePath);
            if (serverVersionCode != null) {
                this.newCode = serverVersionCode["code"];
            }
            this.loadBaseVersion(localCode != this.newCode);
        };
        VersionController.prototype.loadBaseVersion = function (neesUpdate) {
            this.baseVersionData = this.getLocalData(this.baseVersionDataPath);
            this.changeVersionData = this.getLocalData(this.changeVersionDataPath);
            //加载baseVersionData
            var self = this;
            if (this.baseVersionData == null || neesUpdate) {
                this.loadFile(this.baseVersionDataPath, function () {
                    self.baseVersionData = self.getLocalData(self.baseVersionDataPath);
                    self.loadBaseOver();
                });
            }
            else {
                this.loadBaseOver();
            }
        };
        VersionController.prototype.loadBaseOver = function () {
            //保存localCode文件
            egret_native.saveRecord(this.localVersionCodePath, JSON.stringify({ "code": this.newCode }));
            this.loadOver();
        };
        VersionController.prototype.loadFile = function (file, call) {
            if (call === void 0) { call = null; }
            this._call = call;
            this._load.load(file, 1000);
        };
        VersionController.prototype.fileLoadComplete = function (e) {
            if (this._call) {
                this._call();
            }
        };
        VersionController.prototype.loadError = function (e) {
            this._load.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.loadError, this);
            this._load.removeEventListener(egret.Event.COMPLETE, this.fileLoadComplete, this);
            this.dispatchEvent(e);
        };
        VersionController.prototype.loadOver = function () {
            this._load.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.loadError, this);
            this._load.removeEventListener(egret.Event.COMPLETE, this.fileLoadComplete, this);
            this.dispatchEvent(new egret.Event(egret.Event.COMPLETE));
        };
        VersionController.prototype.getLocalData = function (filePath) {
            var data = null;
            if (egret_native.isRecordExists(filePath)) {
                var str = egret_native.loadRecord(filePath);
                data = JSON.parse(str);
            }
            else if (egret_native.isFileExists(filePath)) {
                var str = egret_native.readFileSync(filePath);
                data = JSON.parse(str);
            }
            return data;
        };
        /**
         * 获取所有有变化的文件
         * @returns {Array<any>}
         */
        VersionController.prototype.getChangeList = function () {
            if (!this.baseVersionData) {
                return [];
            }
            var changeDatas = {};
            for (var key in this.changeVersionData) {
                if (this.changeVersionData[key]["d"] == 1) {
                    delete this.baseVersionData[key];
                }
                else {
                    this.baseVersionData[key] = this.changeVersionData[key];
                }
            }
            for (var key in this.baseVersionData) {
                if (this.localVersionData[key] == null || !this.compareVersion(this.localVersionData, this.baseVersionData, key)) {
                    changeDatas[key] = { "url": key, "size": this.baseVersionData[key]["s"] };
                }
            }
            for (var key in this.localVersionData) {
                if (changeDatas[key] == null) {
                    if (!egret_native.isRecordExists(key) && !egret_native.isFileExists(key)) {
                        changeDatas[key] = { "url": key, "size": this.localVersionData[key]["s"] };
                    }
                }
            }
            var list = [];
            for (var key in changeDatas) {
                list.push(changeDatas[key]);
            }
            return list;
        };
        VersionController.prototype.compareVersion = function (oldVersion, newVersion, url) {
            if (oldVersion[url] == null || newVersion[url] == null) {
                return false;
            }
            return oldVersion[url]["v"] == newVersion[url]["v"];
        };
        /**
         * 检查文件是否是最新版本
         */
        VersionController.prototype.checkIsNewVersion = function (url) {
            if (!this.baseVersionData) {
                return true;
            }
            if (this.changeVersionData[url] != null) {
                return this.compareVersion(this.changeVersionData, this.localVersionData, url);
            }
            else if (this.baseVersionData[url] != null) {
                return this.compareVersion(this.baseVersionData, this.localVersionData, url);
            }
            return true;
        };
        /**
         * 保存本地版本信息文件
         */
        VersionController.prototype.saveVersion = function (url) {
            if (!this.baseVersionData) {
                return;
            }
            var change = false;
            if (this.changeVersionData[url] != null) {
                if (!this.compareVersion(this.changeVersionData, this.localVersionData, url)) {
                    change = true;
                    this.localVersionData[url] = this.changeVersionData[url];
                }
            }
            else if (this.baseVersionData[url] != null) {
                if (!this.compareVersion(this.baseVersionData, this.localVersionData, url)) {
                    change = true;
                    this.localVersionData[url] = this.baseVersionData[url];
                }
            }
            if (change) {
                egret_native.saveRecord(this.localVersionDataPath, JSON.stringify(this.localVersionData));
            }
        };
        return VersionController;
    })(egret.EventDispatcher);
    egret.VersionController = VersionController;
    VersionController.prototype.__class__ = "egret.VersionController";
})(egret || (egret = {}));
