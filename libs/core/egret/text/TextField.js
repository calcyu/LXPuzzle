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
     * @class egret.TextField
     * @classdesc
     * TextField是egret的文本渲染类，采用浏览器/设备的API进行渲染，在不同的浏览器/设备中由于字体渲染方式不一，可能会有渲染差异
     * 如果开发者希望所有平台完全无差异，请使用BitmapText
     * @extends egret.DisplayObject
     * @link http://docs.egret-labs.org/post/manual/text/createtext.html 创建文本
     */
    var TextField = (function (_super) {
        __extends(TextField, _super);
        function TextField() {
            _super.call(this);
            this._inputEnabled = false;
            this._type = "";
            this._inputUtils = null;
            this._text = "";
            this._displayAsPassword = false;
            this._fontFamily = TextField.default_fontFamily;
            this._size = 30;
            this._italic = false;
            this._bold = false;
            this._textColorString = "#FFFFFF";
            this._textColor = 0xFFFFFF;
            this._strokeColorString = "#000000";
            this._strokeColor = 0x000000;
            this._stroke = 0;
            this._textAlign = "left";
            this._verticalAlign = "top";
            this._maxChars = 0;
            this._scrollV = -1;
            this._maxScrollV = 0;
            this._lineSpacing = 0;
            this._numLines = 0;
            this._multiline = false;
            this._isFlow = false;
            this._textArr = [];
            this._isArrayChanged = false;
            this._textMaxWidth = 0; //文本全部显示时宽
            this._textMaxHeight = 0; //文本全部显示时高（无行间距）
            this._linesArr = [];
            this.needDraw = true;
        }
        TextField.prototype.isInput = function () {
            return this._type == egret.TextFieldType.INPUT;
        };
        TextField.prototype._setTouchEnabled = function (value) {
            _super.prototype._setTouchEnabled.call(this, value);
            if (this.isInput()) {
                this._inputEnabled = true;
            }
        };
        Object.defineProperty(TextField.prototype, "type", {
            get: function () {
                return this._type;
            },
            /**
             * 文本字段的类型。
             * 以下 TextFieldType 常量中的任一个：TextFieldType.DYNAMIC（指定用户无法编辑的动态文本字段），或 TextFieldType.INPUT（指定用户可以编辑的输入文本字段）。
             * 默认值为 dynamic。
             * @member {string} egret.TextField#type
             */
            set: function (value) {
                this._setType(value);
            },
            enumerable: true,
            configurable: true
        });
        TextField.prototype._setType = function (value) {
            if (this._type != value) {
                this._type = value;
                if (this._type == egret.TextFieldType.INPUT) {
                    if (!this._hasWidthSet) {
                        this._setWidth(100);
                    }
                    if (!this._hasHeightSet) {
                        this._setHeight(30);
                    }
                    //创建stageText
                    if (this._inputUtils == null) {
                        this._inputUtils = new egret.InputController();
                    }
                    this._inputUtils.init(this);
                    this._setDirty();
                    if (this._stage) {
                        this._inputUtils._addStageText();
                    }
                }
                else {
                    if (this._inputUtils) {
                        this._inputUtils._removeStageText();
                        this._inputUtils = null;
                    }
                }
            }
        };
        Object.defineProperty(TextField.prototype, "text", {
            get: function () {
                return this._getText();
            },
            /**
             * 作为文本字段中当前文本的字符串
             * @member {string} egret.TextField#text
             */
            set: function (value) {
                this._setText(value);
            },
            enumerable: true,
            configurable: true
        });
        TextField.prototype._getText = function () {
            if (this._type == egret.TextFieldType.INPUT) {
                return this._inputUtils._getText();
            }
            return this._text;
        };
        TextField.prototype._setSizeDirty = function () {
            _super.prototype._setSizeDirty.call(this);
            this._isArrayChanged = true;
        };
        TextField.prototype._setTextDirty = function () {
            this._setSizeDirty();
        };
        TextField.prototype._setBaseText = function (value) {
            if (value == null) {
                value = "";
            }
            this._isFlow = false;
            if (this._text != value) {
                this._setTextDirty();
                this._text = value;
                var text = "";
                if (this._displayAsPassword) {
                    text = this.changeToPassText(this._text);
                }
                else {
                    text = this._text;
                }
                this.setMiddleStyle([{ text: text }]);
            }
        };
        TextField.prototype._setText = function (value) {
            if (value == null) {
                value = "";
            }
            this._setBaseText(value);
            if (this._inputUtils) {
                this._inputUtils._setText(this._text);
            }
        };
        Object.defineProperty(TextField.prototype, "displayAsPassword", {
            get: function () {
                return this._displayAsPassword;
            },
            /**
             * 指定文本字段是否是密码文本字段。
             * 如果此属性的值为 true，则文本字段被视为密码文本字段，并使用星号而不是实际字符来隐藏输入的字符。如果为 false，则不会将文本字段视为密码文本字段。
             * 默认值为 false。
             * @member {boolean} egret.TextInput#displayAsPassword
             */
            set: function (value) {
                this._setDisplayAsPassword(value);
            },
            enumerable: true,
            configurable: true
        });
        TextField.prototype._setDisplayAsPassword = function (value) {
            if (this._displayAsPassword != value) {
                this._displayAsPassword = value;
                this._setTextDirty();
                var text = "";
                if (this._displayAsPassword) {
                    text = this.changeToPassText(this._text);
                }
                else {
                    text = this._text;
                }
                this.setMiddleStyle([{ text: text }]);
            }
        };
        Object.defineProperty(TextField.prototype, "fontFamily", {
            get: function () {
                return this._fontFamily;
            },
            /**
             * 使用此文本格式的文本的字体名称，以字符串形式表示。
             * 默认值 Arial。
             * @member {any} egret.TextField#fontFamily
             */
            set: function (value) {
                this._setFontFamily(value);
            },
            enumerable: true,
            configurable: true
        });
        TextField.prototype._setFontFamily = function (value) {
            if (this._fontFamily != value) {
                this._setTextDirty();
                this._fontFamily = value;
            }
        };
        Object.defineProperty(TextField.prototype, "size", {
            get: function () {
                return this._size;
            },
            /**
             * 使用此文本格式的文本的大小（以像素为单位）。
             * 默认值为 30。
             * @member {number} egret.TextField#size
             */
            set: function (value) {
                this._setSize(value);
            },
            enumerable: true,
            configurable: true
        });
        TextField.prototype._setSize = function (value) {
            if (this._size != value) {
                this._setTextDirty();
                this._size = value;
            }
        };
        Object.defineProperty(TextField.prototype, "italic", {
            get: function () {
                return this._italic;
            },
            /**
             * 表示使用此文本格式的文本是否为斜体。
             * 如果值为 true，则文本为斜体；false，则为不使用斜体。
             * 默认值为 false。
             * @member {boolean} egret.TextField#italic
             */
            set: function (value) {
                this._setItalic(value);
            },
            enumerable: true,
            configurable: true
        });
        TextField.prototype._setItalic = function (value) {
            if (this._italic != value) {
                this._setTextDirty();
                this._italic = value;
            }
        };
        Object.defineProperty(TextField.prototype, "bold", {
            get: function () {
                return this._bold;
            },
            /**
             * 指定文本是否为粗体字。
             * 如果值为 true，则文本为粗体字；false，则为非粗体字。
             * 默认值为 false。
             * @member {boolean} egret.TextField#bold
             */
            set: function (value) {
                this._setBold(value);
            },
            enumerable: true,
            configurable: true
        });
        TextField.prototype._setBold = function (value) {
            if (this._bold != value) {
                this._setTextDirty();
                this._bold = value;
            }
        };
        Object.defineProperty(TextField.prototype, "textColor", {
            get: function () {
                return this._textColor;
            },
            /**
             * 表示文本的颜色。
             * 包含三个 8 位 RGB 颜色成分的数字；例如，0xFF0000 为红色，0x00FF00 为绿色。
             * 默认值为 0xFFFFFF。
             * @member {number} egret.TextField#textColor
             */
            set: function (value) {
                this._setTextColor(value);
            },
            enumerable: true,
            configurable: true
        });
        TextField.prototype._setTextColor = function (value) {
            if (this._textColor != value) {
                this._setTextDirty();
                this._textColor = value;
                this._textColorString = egret.toColorString(value);
            }
        };
        Object.defineProperty(TextField.prototype, "strokeColor", {
            get: function () {
                return this._strokeColor;
            },
            /**
             * 表示文本的描边颜色。
             * 包含三个 8 位 RGB 颜色成分的数字；例如，0xFF0000 为红色，0x00FF00 为绿色。
             * 默认值为 0x000000。
             * @member {number} egret.TextField#strokeColor
             */
            set: function (value) {
                this._setStrokeColor(value);
            },
            enumerable: true,
            configurable: true
        });
        TextField.prototype._setStrokeColor = function (value) {
            if (this._strokeColor != value) {
                this._setTextDirty();
                this._strokeColor = value;
                this._strokeColorString = egret.toColorString(value);
            }
        };
        Object.defineProperty(TextField.prototype, "stroke", {
            get: function () {
                return this._stroke;
            },
            /**
             * 表示描边宽度。
             * 0为没有描边。
             * 默认值为 0。
             * @member {number} egret.TextField#stroke
             */
            set: function (value) {
                this._setStroke(value);
            },
            enumerable: true,
            configurable: true
        });
        TextField.prototype._setStroke = function (value) {
            if (this._stroke != value) {
                this._setTextDirty();
                this._stroke = value;
            }
        };
        Object.defineProperty(TextField.prototype, "textAlign", {
            get: function () {
                return this._textAlign;
            },
            /**
             * 文本水平对齐方式
             * 使用HorizontalAlign定义的常量。
             * 默认值为 HorizontalAlign.LEFT。
             * @member {string} egret.TextField#textAlign
             */
            set: function (value) {
                this._setTextAlign(value);
            },
            enumerable: true,
            configurable: true
        });
        TextField.prototype._setTextAlign = function (value) {
            if (this._textAlign != value) {
                this._setTextDirty();
                this._textAlign = value;
            }
        };
        Object.defineProperty(TextField.prototype, "verticalAlign", {
            get: function () {
                return this._verticalAlign;
            },
            /**
             * 文本垂直对齐方式。
             * 使用VerticalAlign定义的常量。
             * 默认值为 VerticalAlign.TOP。
             * @member {string} egret.TextField#verticalAlign
             */
            set: function (value) {
                this._setVerticalAlign(value);
            },
            enumerable: true,
            configurable: true
        });
        TextField.prototype._setVerticalAlign = function (value) {
            if (this._verticalAlign != value) {
                this._setTextDirty();
                this._verticalAlign = value;
            }
        };
        Object.defineProperty(TextField.prototype, "maxChars", {
            get: function () {
                return this._maxChars;
            },
            /**
             * 文本字段中最多可包含的字符数（即用户输入的字符数）。
             * 脚本可以插入比 maxChars 允许的字符数更多的文本；maxChars 属性仅表示用户可以输入多少文本。如果此属性的值为 0，则用户可以输入无限数量的文本。
             * 默认值为 0。
             */
            set: function (value) {
                this._setMaxChars(value);
            },
            enumerable: true,
            configurable: true
        });
        TextField.prototype._setMaxChars = function (value) {
            if (this._maxChars != value) {
                this._maxChars = value;
            }
        };
        Object.defineProperty(TextField.prototype, "scrollV", {
            /**
             * 文本在文本字段中的垂直位置。scrollV 属性可帮助用户定位到长篇文章的特定段落，还可用于创建滚动文本字段。
             * 垂直滚动的单位是行，而水平滚动的单位是像素。
             * 如果显示的第一行是文本字段中的第一行，则 scrollV 设置为 1（而非 0）。
             * @param value
             */
            set: function (value) {
                this._scrollV = value;
                this._setDirty();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextField.prototype, "maxScrollV", {
            get: function () {
                return this._maxScrollV;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextField.prototype, "selectionBeginIndex", {
            get: function () {
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextField.prototype, "selectionEndIndex", {
            get: function () {
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextField.prototype, "caretIndex", {
            get: function () {
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        TextField.prototype._setSelection = function (beginIndex, endIndex) {
        };
        Object.defineProperty(TextField.prototype, "lineSpacing", {
            get: function () {
                return this._lineSpacing;
            },
            /**
             * 行间距
             * 一个整数，表示行与行之间的垂直间距量。
             * 默认值为 0。
             * @member {number} egret.TextField#lineSpacing
             */
            set: function (value) {
                this._setLineSpacing(value);
            },
            enumerable: true,
            configurable: true
        });
        TextField.prototype._setLineSpacing = function (value) {
            if (this._lineSpacing != value) {
                this._setTextDirty();
                this._lineSpacing = value;
            }
        };
        TextField.prototype._getLineHeight = function () {
            return this._lineSpacing + this._size;
        };
        Object.defineProperty(TextField.prototype, "numLines", {
            /**
             * 文本行数。
             * @member {number} egret.TextField#numLines
             */
            get: function () {
                return this._numLines;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextField.prototype, "multiline", {
            get: function () {
                return this._multiline;
            },
            /**
             * 表示字段是否为多行文本字段。注意，此属性仅在type为TextFieldType.INPUT时才有效。
             * 如果值为 true，则文本字段为多行文本字段；如果值为 false，则文本字段为单行文本字段。在类型为 TextFieldType.INPUT 的字段中，multiline 值将确定 Enter 键是否创建新行（如果值为 false，则将忽略 Enter 键）。
             * 默认值为 false。
             * @member {boolean} egret.TextField#multiline
             */
            set: function (value) {
                this._setMultiline(value);
            },
            enumerable: true,
            configurable: true
        });
        TextField.prototype._setMultiline = function (value) {
            this._multiline = value;
            this._setDirty();
        };
        TextField.prototype.setFocus = function () {
            //todo:
            egret.Logger.warningWithErrorId(1013);
        };
        TextField.prototype._onRemoveFromStage = function () {
            _super.prototype._onRemoveFromStage.call(this);
            this._removeEvent();
            if (this._type == egret.TextFieldType.INPUT) {
                this._inputUtils._removeStageText();
            }
        };
        TextField.prototype._onAddToStage = function () {
            _super.prototype._onAddToStage.call(this);
            this._addEvent();
            if (this._type == egret.TextFieldType.INPUT) {
                this._inputUtils._addStageText();
            }
        };
        TextField.prototype._updateBaseTransform = function () {
            this._getLinesArr();
            if (this._textMaxWidth == 0) {
                return;
            }
            _super.prototype._updateTransform.call(this);
        };
        TextField.prototype._updateTransform = function () {
            if (this._type == egret.TextFieldType.INPUT) {
                if (this._normalDirty) {
                    //this._clearDirty();
                    this._inputUtils._updateProperties();
                }
                else {
                    this._inputUtils._updateTransform();
                }
            }
            else {
                this._updateBaseTransform();
            }
        };
        TextField.prototype._draw = function (renderContext) {
            if (this._textMaxWidth == 0) {
                return;
            }
            _super.prototype._draw.call(this, renderContext);
        };
        /**
         * @see egret.DisplayObject._render
         * @param renderContext
         */
        TextField.prototype._render = function (renderContext) {
            this.drawText(renderContext);
            this._clearDirty();
        };
        /**
         * 测量显示对象坐标与大小
         */
        TextField.prototype._measureBounds = function () {
            this._getLinesArr();
            if (this._textMaxWidth == 0) {
                return egret.Rectangle.identity.initialize(0, 0, 0, 0);
            }
            return egret.Rectangle.identity.initialize(0, 0, this._textMaxWidth, this._textMaxHeight + (this._numLines - 1) * this._lineSpacing);
        };
        Object.defineProperty(TextField.prototype, "textFlow", {
            get: function () {
                return this._textArr;
            },
            /**
             * 设置富文本
             * @param textArr 富文本数据
             */
            set: function (textArr) {
                this._isFlow = true;
                var text = "";
                if (textArr == null)
                    textArr = [];
                for (var i = 0; i < textArr.length; i++) {
                    var element = textArr[i];
                    text += element.text;
                }
                if (this._displayAsPassword) {
                    this._setBaseText(text);
                }
                else {
                    this._text = text;
                    this.setMiddleStyle(textArr);
                }
            },
            enumerable: true,
            configurable: true
        });
        TextField.prototype.changeToPassText = function (text) {
            if (this._displayAsPassword) {
                var passText = "";
                for (var i = 0, num = text.length; i < num; i++) {
                    switch (text.charAt(i)) {
                        case '\n':
                            passText += "\n";
                            break;
                        case '\r':
                            break;
                        default:
                            passText += '*';
                    }
                }
                return passText;
            }
            return text;
        };
        TextField.prototype.setMiddleStyle = function (textArr) {
            this._isArrayChanged = true;
            this._textArr = textArr;
            this._setSizeDirty();
        };
        Object.defineProperty(TextField.prototype, "textWidth", {
            get: function () {
                return this._textMaxWidth;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextField.prototype, "textHeight", {
            get: function () {
                return this._textMaxHeight;
            },
            enumerable: true,
            configurable: true
        });
        TextField.prototype.appendText = function (text) {
            this.appendElement({ text: text });
        };
        TextField.prototype.appendElement = function (element) {
            this._textArr.push(element);
            this.setMiddleStyle(this._textArr);
        };
        TextField.prototype._getLinesArr = function () {
            var self = this;
            if (!self._isArrayChanged) {
                return self._linesArr;
            }
            self._isArrayChanged = false;
            var text2Arr = self._textArr;
            var renderContext = egret.MainContext.instance.rendererContext;
            self._linesArr = [];
            self._textMaxHeight = 0;
            self._textMaxWidth = 0;
            //宽度被设置为0
            if (self._hasWidthSet && self._explicitWidth == 0) {
                self._numLines = 0;
                return [{ width: 0, height: 0, elements: [] }];
            }
            var linesArr = self._linesArr;
            var lineW = 0;
            var lineH = 0;
            var lineCount = 0;
            var lineElement;
            if (!self._isFlow) {
                renderContext.setupFont(self);
            }
            for (var i = 0, text2ArrLength = text2Arr.length; i < text2ArrLength; i++) {
                var element = text2Arr[i];
                element.style = element.style || {};
                var text = element.text.toString();
                var textArr = text.split(/(?:\r\n|\r|\n)/);
                for (var j = 0, textArrLength = textArr.length; j < textArrLength; j++) {
                    if (linesArr[lineCount] == null) {
                        lineElement = { width: 0, height: 0, elements: [] };
                        linesArr[lineCount] = lineElement;
                        lineW = 0;
                        lineH = 0;
                    }
                    if (self._type == egret.TextFieldType.INPUT) {
                        lineH = self._size;
                    }
                    else {
                        lineH = Math.max(lineH, element.style.size || self._size);
                    }
                    if (textArr[j] == "") {
                    }
                    else {
                        if (self._isFlow) {
                            renderContext.setupFont(self, element.style);
                        }
                        var w = renderContext.measureText(textArr[j]);
                        if (!self._hasWidthSet) {
                            lineW += w;
                            lineElement.elements.push({ width: w, text: textArr[j], style: element.style });
                        }
                        else {
                            if (lineW + w <= self._explicitWidth) {
                                lineElement.elements.push({ width: w, text: textArr[j], style: element.style });
                                lineW += w;
                            }
                            else {
                                var k = 0;
                                var ww = 0;
                                var word = textArr[j];
                                var wl = word.length;
                                for (; k < wl; k++) {
                                    w = renderContext.measureText(word.charAt(k));
                                    if (lineW + w > self._explicitWidth && lineW + k != 0) {
                                        break;
                                    }
                                    ww += w;
                                    lineW += w;
                                }
                                if (k > 0) {
                                    lineElement.elements.push({ width: ww, text: word.substring(0, k), style: element.style });
                                    textArr[j] = word.substring(k);
                                }
                                j--;
                            }
                        }
                    }
                    if (j < textArr.length - 1) {
                        lineElement.width = lineW;
                        lineElement.height = lineH;
                        self._textMaxWidth = Math.max(self._textMaxWidth, lineW);
                        self._textMaxHeight += lineH;
                        if (self._type == egret.TextFieldType.INPUT && !self._multiline) {
                            self._numLines = linesArr.length;
                            return linesArr;
                        }
                        lineCount++;
                    }
                }
                if (i == text2Arr.length - 1 && lineElement) {
                    lineElement.width = lineW;
                    lineElement.height = lineH;
                    self._textMaxWidth = Math.max(self._textMaxWidth, lineW);
                    self._textMaxHeight += lineH;
                }
            }
            self._numLines = linesArr.length;
            return linesArr;
        };
        /**
         * @private
         * @param renderContext
         * @returns {Rectangle}
         */
        TextField.prototype.drawText = function (renderContext) {
            var self = this;
            var lines = self._getLinesArr();
            if (self._textMaxWidth == 0) {
                return;
            }
            var maxWidth = self._hasWidthSet ? self._explicitWidth : self._textMaxWidth;
            var textHeight = self._textMaxHeight + (self._numLines - 1) * self._lineSpacing;
            var drawY = 0;
            var startLine = 0;
            if (self._hasHeightSet) {
                if (textHeight < self._explicitHeight) {
                    var valign = 0;
                    if (self._verticalAlign == egret.VerticalAlign.MIDDLE)
                        valign = 0.5;
                    else if (self._verticalAlign == egret.VerticalAlign.BOTTOM)
                        valign = 1;
                    drawY += valign * (self._explicitHeight - textHeight);
                }
                else if (textHeight > self._explicitHeight) {
                    startLine = Math.max(self._scrollV - 1, 0);
                    startLine = Math.min(self._numLines - 1, startLine);
                }
            }
            drawY = Math.round(drawY);
            var halign = 0;
            if (self._textAlign == egret.HorizontalAlign.CENTER) {
                halign = 0.5;
            }
            else if (self._textAlign == egret.HorizontalAlign.RIGHT) {
                halign = 1;
            }
            var drawX = 0;
            for (var i = startLine, numLinesLength = self._numLines; i < numLinesLength; i++) {
                var line = lines[i];
                var h = line.height;
                drawY += h / 2;
                if (i != 0 && self._hasHeightSet && drawY > self._explicitHeight) {
                    break;
                }
                drawX = Math.round((maxWidth - line.width) * halign);
                for (var j = 0, elementsLength = line.elements.length; j < elementsLength; j++) {
                    var element = line.elements[j];
                    var size = element.style.size || self._size;
                    if (self._type == egret.TextFieldType.INPUT) {
                        renderContext.drawText(self, element.text, drawX, drawY + (h - size) / 2, element.width);
                    }
                    else {
                        renderContext.drawText(self, element.text, drawX, drawY + (h - size) / 2, element.width, element.style);
                    }
                    drawX += element.width;
                }
                drawY += h / 2 + self._lineSpacing;
            }
        };
        //增加点击事件
        TextField.prototype._addEvent = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTapHandler, this);
        };
        //释放点击事件
        TextField.prototype._removeEvent = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTapHandler, this);
        };
        //处理富文本中有href的
        TextField.prototype.onTapHandler = function (e) {
            if (this._type == egret.TextFieldType.INPUT) {
                return;
            }
            var ele = this._getTextElement(e.localX, e.localY);
            if (ele == null) {
                return;
            }
            var style = ele.style;
            if (style && style.href) {
                if (style.href.match(/^event:/)) {
                    var type = style.href.match(/^event:/)[0];
                    egret.TextEvent.dispatchTextEvent(this, egret.TextEvent.LINK, style.href.substring(type.length));
                }
                else {
                }
            }
        };
        TextField.prototype._getTextElement = function (x, y) {
            var hitTextEle = this._getHit(x, y);
            var lineArr = this._getLinesArr();
            if (hitTextEle && lineArr[hitTextEle.lineIndex] && lineArr[hitTextEle.lineIndex].elements[hitTextEle.textElementIndex]) {
                return lineArr[hitTextEle.lineIndex].elements[hitTextEle.textElementIndex];
            }
            return null;
        };
        TextField.prototype._getHit = function (x, y) {
            var lineArr = this._getLinesArr();
            if (this._textMaxWidth == 0) {
                return null;
            }
            var line = 0;
            var lineH = 0;
            for (var i = 0; i < lineArr.length; i++) {
                var lineEle = lineArr[i];
                if (lineH + lineEle.height >= y) {
                    line = i + 1;
                    break;
                }
                else {
                    lineH += lineEle.height;
                }
                if (lineH + this._lineSpacing > y) {
                    return null;
                }
                lineH += this._lineSpacing;
            }
            if (line === 0) {
                return null;
            }
            var lineElement = lineArr[line - 1];
            var lineW = 0;
            for (i = 0; i < lineElement.elements.length; i++) {
                var iwTE = lineElement.elements[i];
                if (lineW + iwTE.width < x) {
                    lineW += iwTE.width;
                }
                else {
                    return { "lineIndex": line - 1, "textElementIndex": i };
                }
            }
            return null;
        };
        TextField.default_fontFamily = "Arial";
        return TextField;
    })(egret.DisplayObject);
    egret.TextField = TextField;
    TextField.prototype.__class__ = "egret.TextField";
})(egret || (egret = {}));
