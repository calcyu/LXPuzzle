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
     * @class egret.Sound
     * @classdesc Sound 类允许您在应用程序中使用声音。
     * @link http://docs.egret-labs.org/post/manual/sound/playsound.html 播放音频
     */
    var Sound = (function () {
        /**
         * 创建 egret.Sound 对象
         */
        function Sound() {
            this.path = "";
            /**
             * audio音频对象
             * @member {any} egret.Sound#audio
             */
            this.audio = null;
            /**
             * 类型，默认为 egret.Sound.EFFECT。
             * 在 native 和 runtime 环境下，背景音乐同时只能播放一个，音效长度尽量不要太长。
             * @member {any} egret.Sound#audio
             */
            this.type = Sound.EFFECT;
        }
        var __egretProto__ = Sound.prototype;
        /**
         * 播放声音
         * @method egret.Sound#play
         * @param loop {boolean} 是否循环播放，默认为false
         */
        __egretProto__.play = function (loop) {
            if (loop === void 0) { loop = false; }
            var sound = this.audio;
            if (!sound) {
                return;
            }
            if (!isNaN(sound.duration)) {
                sound.currentTime = 0;
            }
            sound.loop = loop;
            sound.play();
        };
        /**
         * 暂停声音
         * @method egret.Sound#pause
         */
        __egretProto__.pause = function () {
            var sound = this.audio;
            if (!sound) {
                return;
            }
            sound.pause();
        };
        /**
         * 重新加载声音
         * @method egret.Sound#load
         */
        __egretProto__.load = function () {
            var sound = this.audio;
            if (!sound) {
                return;
            }
            sound.load();
        };
        /**
         * 添加事件监听
         * @param type 事件类型
         * @param listener 监听函数
         */
        __egretProto__.addEventListener = function (type, listener) {
            var sound = this.audio;
            if (!sound) {
                return;
            }
            this.audio.addEventListener(type, listener, false);
        };
        /**
         * 移除事件监听
         * @param type 事件类型
         * @param listener 监听函数
         */
        __egretProto__.removeEventListener = function (type, listener) {
            var sound = this.audio;
            if (!sound) {
                return;
            }
            this.audio.removeEventListener(type, listener, false);
        };
        /**
         * 设置音量
         * @param value 值需大于0 小于等于 1
         */
        __egretProto__.setVolume = function (value) {
            var sound = this.audio;
            if (!sound) {
                return;
            }
            sound.volume = value;
        };
        /**
         * 获取当前音量值
         * @returns number
         */
        __egretProto__.getVolume = function () {
            return this.audio ? this.audio.volume : 0;
        };
        __egretProto__.preload = function (type) {
            this.type = type;
        };
        __egretProto__._setAudio = function (value) {
            this.audio = value;
        };
        /**
         * 背景音乐
         * @constant egret.Sound.MUSIC
         */
        Sound.MUSIC = "music";
        /**
         * 音效
         * @constant egret.Sound.EFFECT
         */
        Sound.EFFECT = "effect";
        return Sound;
    })();
    egret.Sound = Sound;
    Sound.prototype.__class__ = "egret.Sound";
})(egret || (egret = {}));
