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
     * @classdesc
     * @class egret.BitmapText
     * 位图字体采用了Bitmap+SpriteSheet的方式来渲染文字。
     * @extends egret.DisplayObject
     */
    var BitmapText = (function (_super) {
        __extends(BitmapText, _super);
        /**
         * 创建一个 egret.BitmapText 对象
         */
        function BitmapText() {
            _super.call(this);
            /**
             * 设置文本
             */
            this._text = "";
            this._textChanged = false;
            this._font = null;
            this._fontChanged = false;
            this._textWidth = 0;
            this._textHeight = 0;
            this._textOffsetX = 0;
            this._textOffsetY = 0;
            this.textLinesChange = true;
            this._lineHeights = [];
            this.cacheAsBitmap = true;
            this.needDraw = true;
        }
        Object.defineProperty(BitmapText.prototype, "text", {
            /**
             * 显示的文本内容
             * @member {string} egret.BitmapText#text
             */
            get: function () {
                return this._text;
            },
            set: function (value) {
                if (this._text == value) {
                    return;
                }
                this._textChanged = true;
                this._text = value;
                this._setSizeDirty();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BitmapText.prototype, "font", {
            /**
             * BitmapFont对象，缓存了所有文本的位图纹理
             * @member {egret.BitmapFont} egret.BitmapText#font
             */
            get: function () {
                return this._font;
            },
            set: function (value) {
                if (this._font == value)
                    return;
                this._font = value;
                this._fontChanged = true;
                this._setSizeDirty();
            },
            enumerable: true,
            configurable: true
        });
        BitmapText.prototype._setSizeDirty = function () {
            _super.prototype._setSizeDirty.call(this);
            this.textLinesChange = true;
        };
        BitmapText.prototype._render = function (renderContext) {
            var textLines = this._getTextLines();
            var length = textLines.length;
            if (length == 0) {
                return;
            }
            var bitmapFont = this._font;
            var emptyHeight = bitmapFont._getFirstCharHeight();
            var emptyWidth = Math.ceil(emptyHeight * BitmapText.EMPTY_FACTOR);
            var yPos = 0;
            var maxHeight = this._hasHeightSet ? this._explicitHeight : Number.POSITIVE_INFINITY;
            var lineHeights = this._lineHeights;
            for (var i = 0; i < length; i++) {
                var lineHeight = lineHeights[i];
                if (i > 0 && yPos + lineHeight > maxHeight) {
                    break;
                }
                var line = textLines[i];
                var len = line.length;
                var xPos = 0;
                for (var j = 0; j < len; j++) {
                    var character = line.charAt(j);
                    var texture = bitmapFont.getTexture(character);
                    if (!texture) {
                        if (character == " ") {
                            xPos += emptyWidth;
                        }
                        else {
                            egret.Logger.warningWithErrorId(1011, character);
                        }
                        continue;
                    }
                    var bitmapWidth = texture._bitmapWidth || texture._textureWidth;
                    var bitmapHeight = texture._bitmapHeight || texture._textureHeight;
                    this._texture_to_render = texture;
                    egret.RenderFilter.getInstance().drawImage(renderContext, this, texture._bitmapX, texture._bitmapY, bitmapWidth, bitmapHeight, xPos + texture._offsetX, yPos + texture._offsetY, bitmapWidth, bitmapHeight);
                    xPos += texture._textureWidth;
                }
                yPos += lineHeight;
            }
            this._texture_to_render = null;
        };
        BitmapText.prototype._measureBounds = function () {
            var lines = this._getTextLines();
            if (lines.length == 0) {
                return egret.Rectangle.identity.initialize(0, 0, 0, 0);
            }
            return egret.Rectangle.identity.initialize(this._textOffsetX, this._textOffsetY, this._textWidth - this._textOffsetX, this._textHeight - this._textOffsetY);
        };
        BitmapText.prototype._getTextLines = function () {
            if (!this.textLinesChange) {
                return this._textLines;
            }
            var textLines = [];
            this._textLines = textLines;
            this.textLinesChange = false;
            var lineHeights = [];
            this._lineHeights = lineHeights;
            if (!this._text || !this._font) {
                return textLines;
            }
            var textWidth = 0;
            var textHeight = 0;
            var textStartX = 0;
            var textStartY = 0;
            var hasWidthSet = this._hasWidthSet;
            var maxWidth = this._hasWidthSet ? this._explicitWidth : Number.POSITIVE_INFINITY;
            var bitmapFont = this._font;
            var emptyHeight = bitmapFont._getFirstCharHeight();
            var emptyWidth = Math.ceil(emptyHeight * BitmapText.EMPTY_FACTOR);
            var text = this._text;
            var textArr = text.split(/(?:\r\n|\r|\n)/);
            var length = textArr.length;
            var isFirstLine = true;
            for (var i = 0; i < length; i++) {
                var line = textArr[i];
                var len = line.length;
                var lineHeight = 0;
                var xPos = 0;
                var isFistChar = true;
                for (var j = 0; j < len; j++) {
                    var character = line.charAt(j);
                    var texureWidth;
                    var textureHeight;
                    var offsetX = 0;
                    var offsetY = 0;
                    var texture = bitmapFont.getTexture(character);
                    if (!texture) {
                        if (character == " ") {
                            texureWidth = emptyWidth;
                            textureHeight = emptyHeight;
                        }
                        else {
                            egret.Logger.warningWithErrorId(1011, character);
                            if (isFistChar) {
                                isFistChar = false;
                            }
                            continue;
                        }
                    }
                    else {
                        texureWidth = texture._textureWidth;
                        textureHeight = texture._textureHeight;
                        offsetX = texture._offsetX;
                        offsetY = texture._offsetY;
                    }
                    if (isFistChar) {
                        isFistChar = false;
                        textStartX = Math.min(offsetX, textStartX);
                    }
                    if (isFirstLine) {
                        textStartY = Math.min(offsetY, textStartY);
                    }
                    if (hasWidthSet && j > 0 && xPos + texureWidth > maxWidth) {
                        textLines.push(line.substring(0, j));
                        lineHeights.push(lineHeight);
                        textHeight += lineHeight;
                        textWidth = Math.max(xPos, textWidth);
                        line = line.substring(j);
                        len = line.length;
                        j = 0;
                        xPos = texureWidth;
                        lineHeight = textureHeight;
                        continue;
                    }
                    xPos += texureWidth;
                    lineHeight = Math.max(textureHeight, lineHeight);
                }
                if (isFirstLine) {
                    isFirstLine = false;
                }
                textLines.push(line);
                lineHeights.push(lineHeight);
                textHeight += lineHeight;
                textWidth = Math.max(xPos, textWidth);
            }
            this._textWidth = textWidth;
            this._textHeight = textHeight;
            this._textOffsetX = textStartX;
            this._textOffsetY = textStartY;
            return textLines;
        };
        BitmapText.EMPTY_FACTOR = 0.33;
        return BitmapText;
    })(egret.DisplayObject);
    egret.BitmapText = BitmapText;
    BitmapText.prototype.__class__ = "egret.BitmapText";
})(egret || (egret = {}));
