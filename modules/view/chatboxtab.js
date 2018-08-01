"use strict";
exports.__esModule = true;
var ChatboxTab = /** @class */ (function () {
    function ChatboxTab(name) {
        this.name = name;
        this.channelId = -1;
        var div = document.getElementById('chatbox');
        var content = document.createElement('div');
        content.setAttribute('id', 'chatboxtab-' + this.name);
        div.appendChild(content);
        this.addText('------------------------------------' + this.name, 0, '');
    }
    ChatboxTab.prototype.addText = function (text, speaktype, creatureName) {
        var div = document.getElementById('chatboxtab-' + this.name);
        var content = document.createElement('div');
        content.innerText = creatureName + ', ' + text;
        div.appendChild(content);
        console.log('tab', this.name, text, speaktype, creatureName);
    };
    return ChatboxTab;
}());
exports.ChatboxTab = ChatboxTab;
