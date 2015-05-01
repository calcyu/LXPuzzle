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
     * @class egret.NativeRendererContext
     * @classdesc
     * NativeRendererContext 是引擎在Native上的渲染上下文。
     * @extends egret.HashObject
     * @private
     */
    var NativeRendererContext = (function (_super) {
        __extends(NativeRendererContext, _super);
        /**
         * @method egret.NativeRendererContext#constructor
         */
        function NativeRendererContext() {
            _super.call(this);
            this.currentAlpha = NaN;
            this.currentBlendMode = null;
        }
        NativeRendererContext.prototype._setTextureScaleFactor = function (value) {
            _super.prototype._setTextureScaleFactor.call(this, value);
            if (egret_native.Graphics.setTextureScaleFactor != null) {
                egret_native.Graphics.setTextureScaleFactor(value);
            }
        };
        /**
         * @method egret.NativeRendererContext#clearScreen
         * @private
         */
        NativeRendererContext.prototype.clearScreen = function () {
            egret_native.Graphics.clearScreen(0, 0, 0);
        };
        /**
         * 清除Context的渲染区域
         * @method egret.NativeRendererContext#clearRect
         * @param x {number}
         * @param y {number}
         * @param w {number}
         * @param h {numbe}
         */
        NativeRendererContext.prototype.clearRect = function (x, y, w, h) {
        };
        /**
         * 绘制图片
         * @method egret.NativeRendererContext#drawImage
         * @param texture {Texture}
         * @param sourceX {any}
         * @param sourceY {any}
         * @param sourceWidth {any}
         * @param sourceHeight {any}
         * @param destX {any}
         * @param destY {any}
         * @param destWidth {any}
         * @param destHeigh {any}
         * @param repeat {string}
         */
        NativeRendererContext.prototype.drawImage = function (texture, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight, repeat) {
            if (repeat === void 0) { repeat = undefined; }
            if (repeat !== undefined) {
                this.drawRepeatImage(texture, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight, repeat);
                return;
            }
            else {
                egret_native.Graphics.drawImage(texture._bitmapData, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight);
            }
            _super.prototype.drawImage.call(this, texture, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight, repeat);
        };
        /**
         * 绘制9宫图片
         * @method egret.RendererContext#drawImageScale9
         * @param texture {Texture}
         * @param sourceX {any}
         * @param sourceY {any}
         * @param sourceWidth {any}
         * @param sourceHeight {any}
         * @param destX {any}
         * @param destY {any}
         * @param destWidth {any}
         * @param destHeigh {any}
         */
        NativeRendererContext.prototype.drawImageScale9 = function (texture, sourceX, sourceY, sourceWidth, sourceHeight, offX, offY, destWidth, destHeight, rect) {
            if (egret_native.Graphics.drawImageScale9 != null) {
                egret_native.Graphics.drawImageScale9(texture._bitmapData, sourceX, sourceY, sourceWidth, sourceHeight, offX, offY, destWidth, destHeight, rect.x, rect.y, rect.width, rect.height);
                this._addOneDraw();
                return true;
            }
            return false;
        };
        NativeRendererContext.prototype.drawRepeatImage = function (texture, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight, repeat) {
            var texture_scale_factor = egret.MainContext.instance.rendererContext._texture_scale_factor;
            sourceWidth = sourceWidth * texture_scale_factor;
            sourceHeight = sourceHeight * texture_scale_factor;
            for (var x = destX; x < destWidth; x += sourceWidth) {
                for (var y = destY; y < destHeight; y += sourceHeight) {
                    var destW = Math.min(sourceWidth, destWidth - x);
                    var destH = Math.min(sourceHeight, destHeight - y);
                    this.drawImage(texture, sourceX, sourceY, destW / texture_scale_factor, destH / texture_scale_factor, x, y, destW, destH);
                }
            }
        };
        /**
         * 变换Context的当前渲染矩阵
         * @method egret.NativeRendererContext#setTransform
         * @param matrix {egret.Matrix}
         * @stable A
         */
        NativeRendererContext.prototype.setTransform = function (matrix) {
            egret_native.Graphics.setTransform(matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty);
        };
        /**
         * 设置渲染alpha
         * @method egret.NativeRendererContext#setAlpha
         * @param value {number}
         * @stable A
         * @param blendMode {egret.BlendMode}
         */
        NativeRendererContext.prototype.setAlpha = function (value, blendMode) {
            //if (this.currentAlpha != value) {
            egret_native.Graphics.setGlobalAlpha(value);
            //this.currentAlpha = value;
            //}
            this.setBlendMode(blendMode);
        };
        NativeRendererContext.prototype.setBlendMode = function (blendMode) {
            if (!blendMode) {
                blendMode = egret.BlendMode.NORMAL;
            }
            //if (this.currentBlendMode != blendMode) {
            var blendModeArg = egret.RendererContext.blendModesForGL[blendMode];
            if (blendModeArg) {
                egret_native.Graphics.setBlendArg(blendModeArg[0], blendModeArg[1]);
                this.currentBlendMode = blendMode;
            }
            //}
        };
        /**
         * 设置渲染文本参数
         * @method egret.NativeRendererContext#setupFont
         * @param textField {TextField}
         */
        NativeRendererContext.prototype.setupFont = function (textField, style) {
            if (style === void 0) { style = null; }
            style = style || {};
            var size = style["size"] == null ? textField._size : style["size"];
            egret_native.Label.createLabel(egret.TextField.default_fontFamily, size, "");
        };
        /**
         * 测量文本
         * @method egret.NativeRendererContext#measureText
         * @param text {string}
         * @returns {number}
         */
        NativeRendererContext.prototype.measureText = function (text) {
            return egret_native.Label.getTextSize(text)[0];
        };
        /**
         * 绘制文本
         * @method egret.NativeRendererContext#drawText
         * @param textField {egret.TextField}
         * @param text {string}
         * @param x {number}
         * @param y {number}
         * @param maxWidth {numbe}
         */
        NativeRendererContext.prototype.drawText = function (textField, text, x, y, maxWidth, style) {
            if (style === void 0) { style = null; }
            this.setupFont(textField, style);
            style = style || {};
            var textColor;
            if (style.textColor != null) {
                textColor = style.textColor;
            }
            else {
                textColor = textField._textColor;
            }
            var strokeColor;
            if (style.strokeColor != null) {
                strokeColor = egret.toColorString(style.strokeColor);
            }
            else {
                strokeColor = textField._strokeColorString;
            }
            var outline;
            if (style.stroke != null) {
                outline = style.stroke;
            }
            else {
                outline = textField._stroke;
            }
            egret_native.Label.setTextColor(textColor);
            egret_native.Label.drawText(text, x, y - 2);
            _super.prototype.drawText.call(this, textField, text, x, y, maxWidth, style);
        };
        NativeRendererContext.prototype.pushMask = function (mask) {
            egret_native.Graphics.pushClip(mask.x, mask.y, mask.width, mask.height);
        };
        NativeRendererContext.prototype.popMask = function () {
            egret_native.Graphics.popClip();
        };
        NativeRendererContext.prototype.setGlobalColorTransform = function (colorTransformMatrix) {
            if (colorTransformMatrix) {
                egret_native.Graphics.setGlobalColorTransformEnabled(true);
                egret_native.Graphics.setGlobalColorTransform(colorTransformMatrix);
            }
            else {
                egret_native.Graphics.setGlobalColorTransformEnabled(false);
            }
        };
        NativeRendererContext.prototype.setGlobalFilter = function (filterData) {
            egret_native.Graphics.setGlobalShader(filterData);
        };
        return NativeRendererContext;
    })(egret.RendererContext);
    egret.NativeRendererContext = NativeRendererContext;
    NativeRendererContext.prototype.__class__ = "egret.NativeRendererContext";
})(egret || (egret = {}));
//egret.Graphics.prototype._draw = function () {
//    return;
//}
var egret_native_graphics;
(function (egret_native_graphics) {
    function beginFill(color, alpha) {
        this.commandQueue.push(new Command(function (color, alpha) {
            if (!alpha && alpha != 0) {
                alpha = 1;
            }
            egret_native.Graphics.beginFill(color, alpha);
        }, this, arguments));
    }
    egret_native_graphics.beginFill = beginFill;
    function drawRect(x, y, width, height) {
        this.commandQueue.push(new Command(function (x, y) {
            egret_native.Graphics.moveTo(x, y);
            egret_native.Graphics.lineTo(x + width, y);
            egret_native.Graphics.lineTo(x + width, y + height);
            egret_native.Graphics.lineTo(x, y + height);
            egret_native.Graphics.lineTo(x, y);
        }, this, arguments));
        this.checkRect(x, y, width, height);
    }
    egret_native_graphics.drawRect = drawRect;
    function drawCircle(x, y, r) {
    }
    egret_native_graphics.drawCircle = drawCircle;
    function lineStyle(thickness, color, alpha, pixelHinting, scaleMode, caps, joints, miterLimit) {
        this.commandQueue.push(new Command(function (thickness, color) {
            egret_native.Graphics.lineStyle(thickness, color);
        }, this, arguments));
    }
    egret_native_graphics.lineStyle = lineStyle;
    function lineTo(x, y) {
        this.commandQueue.push(new Command(function (x, y) {
            egret_native.Graphics.lineTo(x, y);
        }, this, arguments));
        this.checkPoint(this.lineX, this.lineY);
        this.lineX = x;
        this.lineY = y;
        this.checkPoint(x, y);
    }
    egret_native_graphics.lineTo = lineTo;
    function curveTo(controlX, controlY, anchorX, anchorY) {
    }
    egret_native_graphics.curveTo = curveTo;
    function moveTo(x, y) {
        this.commandQueue.push(new Command(function (x, y) {
            egret_native.Graphics.moveTo(x, y);
        }, this, arguments));
    }
    egret_native_graphics.moveTo = moveTo;
    function clear() {
        this.commandQueue.splice(0, this.commandQueue.length);
        this.lineX = 0;
        this.lineY = 0;
        egret_native.Graphics.lineStyle(0, 0);
        this._minX = 0;
        this._minY = 0;
        this._maxX = 0;
        this._maxY = 0;
        this._firstCheck = true;
    }
    egret_native_graphics.clear = clear;
    function endFill() {
        this.commandQueue.push(new Command(function () {
            egret_native.Graphics.endFill();
        }, this, arguments));
    }
    egret_native_graphics.endFill = endFill;
    function _draw(renderContext) {
        var length = this.commandQueue.length;
        for (var i = 0; i < length; i++) {
            var command = this.commandQueue[i];
            command.method.apply(command.thisObject, command.args);
        }
        egret_native.Graphics.lineStyle(0, 0);
    }
    egret_native_graphics._draw = _draw;
    var Command = (function () {
        function Command(method, thisObject, args) {
            this.method = method;
            this.thisObject = thisObject;
            this.args = args;
        }
        return Command;
    })();
    function init() {
        for (var key in egret_native_graphics) {
            egret.Graphics.prototype[key] = egret_native_graphics[key];
        }
    }
    egret_native_graphics.init = init;
})(egret_native_graphics || (egret_native_graphics = {}));
egret_native_graphics.init();
