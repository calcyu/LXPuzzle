/**
 * Copyright (c) 2014,Egret-Labs.org
 * All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *     * Redistributions of source code must retain the above copyright
 *       notice, textfield list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, textfield list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Egret-Labs.org nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from textfield software without specific prior written permission.
 *
 * textfield SOFTWARE IS PROVIDED BY EGRET-LABS.ORG AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL EGRET-LABS.ORG AND CONTRIBUTORS BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF textfield
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
var egret;
(function (egret) {
    /**
     * @private
     */
    var TextFieldUtils = (function () {
        function TextFieldUtils() {
        }
        var __egretProto__ = TextFieldUtils.prototype;
        /**
         * 获取第一个绘制的行数
         * @param textfield 文本
         * @returns {number} 行数，从0开始
         * @private
         */
        TextFieldUtils._getStartLine = function (textfield) {
            var textHeight = TextFieldUtils._getTextHeight(textfield);
            var startLine = 0;
            if (textfield._hasHeightSet) {
                if (textHeight < textfield._explicitHeight) {
                }
                else if (textHeight > textfield._explicitHeight) {
                    startLine = Math.max(textfield._properties._scrollV - 1, 0);
                    startLine = Math.min(textfield._properties._numLines - 1, startLine);
                }
                if (!textfield._properties._multiline) {
                    startLine = Math.max(textfield._properties._scrollV - 1, 0);
                    startLine = Math.min(textfield._properties._numLines - 1, startLine);
                }
            }
            return startLine;
        };
        /**
         * 获取水平比例
         * @param textfield 文本
         * @returns {number} 水平比例
         * @private
         */
        TextFieldUtils._getHalign = function (textfield) {
            var lineArr = textfield._getLinesArr();
            var halign = 0;
            if (textfield._properties._textAlign == egret.HorizontalAlign.CENTER) {
                halign = 0.5;
            }
            else if (textfield._properties._textAlign == egret.HorizontalAlign.RIGHT) {
                halign = 1;
            }
            if (textfield._properties._type == egret.TextFieldType.INPUT && !textfield._properties._multiline && lineArr.length > 1) {
                halign = 0;
            }
            return halign;
        };
        TextFieldUtils._getTextHeight = function (textfield) {
            var textHeight = (egret.TextFieldType.INPUT == textfield._properties._type && !textfield._properties._multiline) ? textfield._properties._size : (textfield._properties._textMaxHeight + (textfield._properties._numLines - 1) * textfield._properties._lineSpacing);
            return textHeight;
        };
        /**
         * 获取垂直比例
         * @param textfield 文本
         * @returns {number} 垂直比例
         * @private
         */
        TextFieldUtils._getValign = function (textfield) {
            var textHeight = TextFieldUtils._getTextHeight(textfield);
            if (textfield._properties._type == egret.TextFieldType.INPUT) {
                if (textfield._properties._multiline) {
                    return 0;
                }
                return 0.5;
            }
            if (textfield._hasHeightSet) {
                if (textHeight < textfield._explicitHeight) {
                    var valign = 0;
                    if (textfield._properties._verticalAlign == egret.VerticalAlign.MIDDLE)
                        valign = 0.5;
                    else if (textfield._properties._verticalAlign == egret.VerticalAlign.BOTTOM)
                        valign = 1;
                    return valign;
                }
            }
            return 0;
        };
        /**
         * 根据x、y获取文本项
         * @param textfield 文本
         * @param x x坐标值
         * @param y y坐标值
         * @returns 文本单项
         * @private
         */
        TextFieldUtils._getTextElement = function (textfield, x, y) {
            var hitTextEle = TextFieldUtils._getHit(textfield, x, y);
            var lineArr = textfield._getLinesArr();
            if (hitTextEle && lineArr[hitTextEle.lineIndex] && lineArr[hitTextEle.lineIndex].elements[hitTextEle.textElementIndex]) {
                return lineArr[hitTextEle.lineIndex].elements[hitTextEle.textElementIndex];
            }
            return null;
        };
        /**
         * 获取文本点击块
         * @param textfield 文本
         * @param x x坐标值
         * @param y y坐标值
         * @returns 文本点击块
         * @private
         */
        TextFieldUtils._getHit = function (textfield, x, y) {
            var lineArr = textfield._getLinesArr();
            if (textfield._properties._textMaxWidth == 0) {
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
                if (lineH + textfield._properties._lineSpacing > y) {
                    return null;
                }
                lineH += textfield._properties._lineSpacing;
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
        /**
         * 获取当前显示多少行
         * @param textfield 文本
         * @returns {number} 显示的行数
         * @private
         */
        TextFieldUtils._getScrollNum = function (textfield) {
            var scrollNum = 1;
            if (textfield._properties._multiline) {
                var height = textfield.height;
                var size = textfield.size;
                var lineSpacing = textfield.lineSpacing;
                scrollNum = Math.floor(height / (size + lineSpacing));
                var leftH = height - (size + lineSpacing) * scrollNum;
                if (leftH > size / 2) {
                    scrollNum++;
                }
            }
            return scrollNum;
        };
        return TextFieldUtils;
    })();
    egret.TextFieldUtils = TextFieldUtils;
    TextFieldUtils.prototype.__class__ = "egret.TextFieldUtils";
})(egret || (egret = {}));
