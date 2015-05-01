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
    var NativeResourceLoader = (function (_super) {
        __extends(NativeResourceLoader, _super);
        function NativeResourceLoader() {
            _super.apply(this, arguments);
            this._downCount = 0;
            this._path = null;
            this._bytesTotal = 0;
        }
        NativeResourceLoader.prototype.load = function (path, bytesTotal) {
            this._downCount = 0;
            this._path = path;
            this._bytesTotal = bytesTotal;
            this.reload();
        };
        NativeResourceLoader.prototype.reload = function () {
            if (this._downCount >= 3) {
                this.downloadFileError();
                return;
            }
            if (egret_native.isRecordExists(this._path)) {
                this.loadOver();
                return;
            }
            else if (egret_native.isFileExists(this._path)) {
                this.loadOver();
                return;
            }
            else {
                this._downCount++;
                var promise = egret.PromiseObject.create();
                var self = this;
                promise.onSuccessFunc = function () {
                    self.loadOver();
                };
                promise.onErrorFunc = function () {
                    self.reload();
                };
                promise.downloadingSizeFunc = function (bytesLoaded) {
                    self.downloadingProgress(bytesLoaded);
                };
                egret_native.download(this._path, this._path, promise);
            }
        };
        NativeResourceLoader.prototype.downloadingProgress = function (bytesLoaded) {
            egret.ProgressEvent.dispatchProgressEvent(this, egret.ProgressEvent.PROGRESS, bytesLoaded, this._bytesTotal);
        };
        NativeResourceLoader.prototype.downloadFileError = function () {
            this.dispatchEvent(new egret.Event(egret.IOErrorEvent.IO_ERROR));
        };
        NativeResourceLoader.prototype.loadOver = function () {
            this.dispatchEvent(new egret.Event(egret.Event.COMPLETE));
        };
        return NativeResourceLoader;
    })(egret.EventDispatcher);
    egret.NativeResourceLoader = NativeResourceLoader;
    NativeResourceLoader.prototype.__class__ = "egret.NativeResourceLoader";
})(egret || (egret = {}));
