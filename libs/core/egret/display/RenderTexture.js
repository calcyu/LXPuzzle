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
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var egret;
(function (egret) {
    /**
     * @class egret.RenderTexture
     * @classdesc
     * RenderTexture 是动态纹理类，他实现了将显示对象及其子对象绘制成为一个纹理的功能
     * @extends egret.Texture
     */
    var RenderTexture = (function (_super) {
        __extends(RenderTexture, _super);
        /**
         * 创建一个 egret.RenderTexture 对象
         */
        function RenderTexture() {
            _super.call(this);
        }
        RenderTexture.prototype.init = function () {
            this._bitmapData = document.createElement("canvas");
            this.renderContext = egret.RendererContext.createRendererContext(this._bitmapData);
        };
        /**
         * 将指定显示对象绘制为一个纹理
         * @method egret.RenderTexture#drawToTexture
         * @param displayObject {egret.DisplayObject} 需要绘制的显示对象
         * @param clipBounds {egret.Rectangle} 绘制矩形区域
         * @param scale {number} 缩放比例
         */
        RenderTexture.prototype.drawToTexture = function (displayObject, clipBounds, scale) {
            var bounds = clipBounds || displayObject.getBounds(egret.Rectangle.identity);
            if (bounds.width == 0 || bounds.height == 0) {
                return false;
            }
            if (!this._bitmapData) {
                this.init();
            }
            var x = bounds.x;
            var y = bounds.y;
            var width = bounds.width;
            var height = bounds.height;
            var texture_scale_factor = egret.MainContext.instance.rendererContext._texture_scale_factor;
            width /= texture_scale_factor;
            height /= texture_scale_factor;
            width = Math.round(width);
            height = Math.round(height);
            this.setSize(width, height);
            this.begin();
            displayObject._worldTransform.identity();
            displayObject._worldTransform.a = 1 / texture_scale_factor;
            displayObject._worldTransform.d = 1 / texture_scale_factor;
            if (scale) {
                displayObject._worldTransform.a *= scale;
                displayObject._worldTransform.d *= scale;
            }
            var anchorOffsetX = displayObject._anchorOffsetX;
            var anchorOffsetY = displayObject._anchorOffsetY;
            if (displayObject._anchorX != 0 || displayObject._anchorY != 0) {
                anchorOffsetX = displayObject._anchorX * width;
                anchorOffsetY = displayObject._anchorY * height;
            }
            this._offsetX = x + anchorOffsetX;
            this._offsetY = y + anchorOffsetY;
            displayObject._worldTransform.append(1, 0, 0, 1, -this._offsetX, -this._offsetY);
            displayObject.worldAlpha = 1;
            if (displayObject instanceof egret.DisplayObjectContainer) {
                var list = displayObject._children;
                for (var i = 0, length = list.length; i < length; i++) {
                    var child = list[i];
                    child._updateTransform();
                }
            }
            this.renderContext.setTransform(displayObject._worldTransform);
            var renderFilter = egret.RenderFilter.getInstance();
            var drawAreaList = renderFilter._drawAreaList.concat();
            renderFilter._drawAreaList.length = 0;
            this.renderContext.clearScreen();
            this.renderContext.onRenderStart();
            egret.RendererContext.deleteTexture(this);
            if (displayObject._filter) {
                this.renderContext.setGlobalFilter(displayObject._filter);
            }
            if (displayObject._colorTransform) {
                this.renderContext.setGlobalColorTransform(displayObject._colorTransform.matrix);
            }
            var mask = displayObject.mask || displayObject._scrollRect;
            if (mask) {
                this.renderContext.pushMask(mask);
            }
            var __use_new_draw = egret.MainContext.__use_new_draw;
            egret.MainContext.__use_new_draw = false;
            displayObject._render(this.renderContext);
            egret.MainContext.__use_new_draw = __use_new_draw;
            if (mask) {
                this.renderContext.popMask();
            }
            if (displayObject._colorTransform) {
                this.renderContext.setGlobalColorTransform(null);
            }
            if (displayObject._filter) {
                this.renderContext.setGlobalFilter(null);
            }
            RenderTexture.identityRectangle.width = width;
            RenderTexture.identityRectangle.height = height;
            renderFilter.addDrawArea(RenderTexture.identityRectangle);
            this.renderContext.onRenderFinish();
            renderFilter._drawAreaList = drawAreaList;
            this._sourceWidth = width;
            this._sourceHeight = height;
            this._textureWidth = this._sourceWidth * texture_scale_factor;
            this._textureHeight = this._sourceHeight * texture_scale_factor;
            this.end();
            //测试代码
            //            var cacheCanvas:HTMLCanvasElement = this._bitmapData;
            //            this.renderContext.canvasContext.setTransform(1, 0, 0, 1, 0, 0);
            //            this.renderContext.strokeRect(0, 0,cacheCanvas.width,cacheCanvas.height,"#ff0000");
            //            document.documentElement.appendChild(cacheCanvas);
            return true;
        };
        RenderTexture.prototype.setSize = function (width, height) {
            var cacheCanvas = this._bitmapData;
            cacheCanvas.width = width;
            cacheCanvas.height = height;
            cacheCanvas.style.width = width + "px";
            cacheCanvas.style.height = height + "px";
            if (this.renderContext._cacheCanvas) {
                this.renderContext._cacheCanvas.width = width;
                this.renderContext._cacheCanvas.height = height;
            }
        };
        RenderTexture.prototype.begin = function () {
        };
        RenderTexture.prototype.end = function () {
        };
        RenderTexture.prototype.dispose = function () {
            if (this._bitmapData) {
                this._bitmapData = null;
                this.renderContext = null;
            }
        };
        RenderTexture.identityRectangle = new egret.Rectangle();
        return RenderTexture;
    })(egret.Texture);
    egret.RenderTexture = RenderTexture;
    RenderTexture.prototype.__class__ = "egret.RenderTexture";
})(egret || (egret = {}));
