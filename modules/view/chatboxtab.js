export class ChatboxTab {
    constructor(name) {
        this.name = name;
        this.channelId = -1;
        var div = document.getElementById('chatbox');
        var content = document.createElement('div');
        content.setAttribute('id', 'chatboxtab-' + this.name);
        div.appendChild(content);
        this.addText('------------------------------------' + this.name, 0, '');
    }
    addText(text, speaktype, creatureName) {
        var div = document.getElementById('chatboxtab-' + this.name);
        var content = document.createElement('div');
        content.innerText = creatureName + ', ' + text;
        div.appendChild(content);
        console.log('tab', this.name, text, speaktype, creatureName);
    }
}
//# sourceMappingURL=chatboxtab.js.map