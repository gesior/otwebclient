"use strict";
exports.__esModule = true;
var _a;
var chatboxtab_1 = require("./chatboxtab");
var const_1 = require("../constants/const");
var log_1 = require("../log");
var game_1 = require("../game");
var statictext_1 = require("../statictext");
var map_1 = require("../map");
var SpeakTypesSettings = {
    none: {},
    say: { speakType: const_1.MessageMode.MessageSay, color: '#FFFF00' },
    whisper: { speakType: const_1.MessageMode.MessageWhisper, color: '#FFFF00' },
    yell: { speakType: const_1.MessageMode.MessageYell, color: '#FFFF00' },
    broadcast: { speakType: const_1.MessageMode.MessageGamemasterBroadcast, color: '#F55E5E' },
    private: { speakType: const_1.MessageMode.MessagePrivateTo, color: '#5FF7F7', private: true },
    privateRed: { speakType: const_1.MessageMode.MessageGamemasterPrivateTo, color: '#F55E5E', private: true },
    privatePlayerToPlayer: { speakType: const_1.MessageMode.MessagePrivateTo, color: '#9F9DFD', private: true },
    privatePlayerToNpc: { speakType: const_1.MessageMode.MessageNpcTo, color: '#9F9DFD', private: true, npcChat: true },
    privateNpcToPlayer: { speakType: const_1.MessageMode.MessageNpcFrom, color: '#5FF7F7', private: true, npcChat: true },
    channelYellow: { speakType: const_1.MessageMode.MessageChannel, color: '#FFFF00' },
    channelWhite: { speakType: const_1.MessageMode.MessageChannelManagement, color: '#FFFFFF' },
    channelRed: { speakType: const_1.MessageMode.MessageGamemasterChannel, color: '#F55E5E' },
    channelOrange: { speakType: const_1.MessageMode.MessageChannelHighlight, color: '#FE6500' },
    monsterSay: { speakType: const_1.MessageMode.MessageMonsterSay, color: '#FE6500', hideInConsole: true },
    monsterYell: { speakType: const_1.MessageMode.MessageMonsterYell, color: '#FE6500', hideInConsole: true },
    rvrAnswerFrom: { speakType: const_1.MessageMode.MessageRVRAnswer, color: '#FE6500' },
    rvrAnswerTo: { speakType: const_1.MessageMode.MessageRVRAnswer, color: '#FE6500' },
    rvrContinue: { speakType: const_1.MessageMode.MessageRVRContinue, color: '#FFFF00' }
};
var SpeakTypes = (_a = {},
    _a[const_1.MessageMode.MessageSay] = SpeakTypesSettings.say,
    _a[const_1.MessageMode.MessageWhisper] = SpeakTypesSettings.whisper,
    _a[const_1.MessageMode.MessageYell] = SpeakTypesSettings.yell,
    _a[const_1.MessageMode.MessageGamemasterBroadcast] = SpeakTypesSettings.broadcast,
    _a[const_1.MessageMode.MessagePrivateFrom] = SpeakTypesSettings.private,
    _a[const_1.MessageMode.MessageGamemasterPrivateFrom] = SpeakTypesSettings.privateRed,
    _a[const_1.MessageMode.MessageNpcTo] = SpeakTypesSettings.privatePlayerToNpc,
    _a[const_1.MessageMode.MessageNpcFrom] = SpeakTypesSettings.privateNpcToPlayer,
    _a[const_1.MessageMode.MessageChannel] = SpeakTypesSettings.channelYellow,
    _a[const_1.MessageMode.MessageChannelManagement] = SpeakTypesSettings.channelWhite,
    _a[const_1.MessageMode.MessageGamemasterChannel] = SpeakTypesSettings.channelRed,
    _a[const_1.MessageMode.MessageChannelHighlight] = SpeakTypesSettings.channelOrange,
    _a[const_1.MessageMode.MessageMonsterSay] = SpeakTypesSettings.monsterSay,
    _a[const_1.MessageMode.MessageMonsterYell] = SpeakTypesSettings.monsterYell,
    _a[const_1.MessageMode.MessageRVRChannel] = SpeakTypesSettings.channelWhite,
    _a[const_1.MessageMode.MessageRVRContinue] = SpeakTypesSettings.rvrContinue,
    _a[const_1.MessageMode.MessageRVRAnswer] = SpeakTypesSettings.rvrAnswerFrom,
    _a[const_1.MessageMode.MessageNpcFromStartBlock] = SpeakTypesSettings.privateNpcToPlayer,
    _a[const_1.MessageMode.MessageSpell] = SpeakTypesSettings.none,
    _a[const_1.MessageMode.MessageBarkLow] = SpeakTypesSettings.none,
    _a[const_1.MessageMode.MessageBarkLoud] = SpeakTypesSettings.none,
    _a);
var Chatbox = /** @class */ (function () {
    function Chatbox() {
        this.consolePanel = null;
        this.consoleContentPanel = null;
        this.consoleTabBar = null;
        this.consoleTextEdit = null;
        this.channels = [];
        this.channelsWindow = null;
        this.communicationWindow = null;
        this.ownPrivateName = null;
        this.messageHistory = {};
        this.currentMessageIndex = 0;
        this.ignoreNpcMessages = false;
        this.defaultTab = null;
        this.serverTab = null;
        this.violationsChannelId = null;
        this.violationWindow = null;
        this.violationReportTab = null;
        this.ignoredChannels = {};
        this.filters = {};
        this.tabs = [];
    }
    Chatbox.prototype.addTab = function (name, focus) {
        if (focus === void 0) { focus = false; }
        var tab = this.getTab(name);
        if (tab) {
            focus = true;
        }
        else {
            tab = new chatboxtab_1.ChatboxTab(name);
        }
        if (focus) {
            this.selectTab(tab);
        }
        this.tabs[name] = tab;
        return tab;
    };
    Chatbox.prototype.selectTab = function (tab) {
        /* todo */
    };
    Chatbox.prototype.removeTab = function (tab) {
        console.error('close tab', tab);
        /*
        if type(tab) == 'string' then
        tab = consoleTabBar:getTab(tab)
        end

        if tab == defaultTab or tab == serverTab then
        return
        end

        if tab == violationReportTab then
        g_game.cancelRuleViolation()
        violationReportTab = nil
        elseif tab.violationChatName then
        g_game.closeRuleViolation(tab.violationChatName)
        elseif tab.channelId then
        -- notificate the server that we are leaving the channel
        for k, v in pairs(channels) do
            if (k == tab.channelId) then channels[k] = nil end
        end
        g_game.leaveChannel(tab.channelId)
        elseif tab:getText() == "NPCs" then
        g_game.closeNpcChannel()
        end

        consoleTabBar:removeTab(tab)
        */
    };
    Chatbox.prototype.addChannel = function (name, id) {
        console.log('add chanel', name, id);
        this.channels[id] = name;
        var tab = this.addTab(name, true);
        tab.channelId = id;
        return tab;
    };
    Chatbox.prototype.addPrivateChannel = function (receiver) {
        this.channels[receiver] = receiver;
        return this.addTab(receiver, false);
    };
    Chatbox.prototype.getTab = function (name) {
        return this.tabs[name];
    };
    Chatbox.prototype.addPrivateText = function (text, speaktype, name, isPrivateCommand, creatureName) {
        var focus = false;
        if (speaktype.npcChat) {
            name = 'NPCs';
            focus = true;
        }
        var privateTab = this.getTab(name);
        if (!privateTab) {
            privateTab = this.addTab(name, focus);
            this.channels[name] = name;
            privateTab.npcChat = speaktype.npcChat;
        }
        else if (focus) {
            this.selectTab(privateTab);
        }
        this.addTabText(text, speaktype, privateTab, creatureName);
    };
    Chatbox.prototype.addText = function (text, speaktype, tabName, creatureName) {
        var tab = this.getTab(tabName);
        if (tab) {
            this.addTabText(text, speaktype, tab, creatureName);
        }
        else {
            console.error('no tab', tabName, this.tabs);
        }
    };
    Chatbox.prototype.addTabText = function (text, speaktype, tab, creatureName) {
        tab.addText(text, speaktype, creatureName);
    };
    /*
    function addTabText(text, speaktype, tab, creatureName)
      if not tab or tab.locked or not text or #text == 0 then return end
    
      if modules.client_options.getOption('showTimestampsInConsole') then
        text = os.date('%H:%M') .. ' ' .. text
      end
    
      local panel = consoleTabBar:getTabPanel(tab)
      local consoleBuffer = panel:getChildById('consoleBuffer')
      local label = g_ui.createWidget('ConsoleLabel', consoleBuffer)
      label:setId('consoleLabel' .. consoleBuffer:getChildCount())
      label:setText(text)
      label:setColor(speaktype.color)
      consoleTabBar:blinkTab(tab)
    
      -- Overlay for consoleBuffer which shows highlighted words only
    
      if speaktype.npcChat and (g_game.getCharacterName() ~= creatureName or g_game.getCharacterName() == 'Account Manager') then
        local highlightData = getHighlightedText(text)
        if #highlightData > 0 then
          local labelHighlight = g_ui.createWidget('ConsolePhantomLabel', label)
          labelHighlight:fill('parent')
    
          labelHighlight:setId('consoleLabelHighlight' .. consoleBuffer:getChildCount())
          labelHighlight:setColor("#1f9ffe")
    
          -- Remove the curly braces
          for i = 1, #highlightData / 3 do
            local dataBlock = { _start = highlightData[(i-1)*3+1], _end = highlightData[(i-1)*3+2], words = highlightData[(i-1)*3+3] }
            text = text:gsub("%{(.-)%}", dataBlock.words, 1)
    
            -- Recalculate positions as braces are removed
            highlightData[(i-1)*3+1] = dataBlock._start - ((i-1) * 2)
            highlightData[(i-1)*3+2] = dataBlock._end - (1 + (i-1) * 2)
          end
          label:setText(text)
    
          -- Calculate the positions of the highlighted text and fill with string.char(127) [Width: 1]
          local drawText = label:getDrawText()
          local tmpText = ""
          for i = 1, #highlightData / 3 do
            local dataBlock = { _start = highlightData[(i-1)*3+1], _end = highlightData[(i-1)*3+2], words = highlightData[(i-1)*3+3] }
            local lastBlockEnd = (highlightData[(i-2)*3+2] or 1)
    
            for letter = lastBlockEnd, dataBlock._start-1 do
              local tmpChar = string.byte(drawText:sub(letter, letter))
              local fillChar = (tmpChar == 10 or tmpChar == 32) and string.char(tmpChar) or string.char(127)
    
              tmpText = tmpText .. string.rep(fillChar, letterWidth[tmpChar])
            end
            tmpText = tmpText .. dataBlock.words
          end
    
          -- Fill the highlight label to the same size as default label
          local finalBlockEnd = (highlightData[(#highlightData/3-1)*3+2] or 1)
          for letter = finalBlockEnd, drawText:len() do
              local tmpChar = string.byte(drawText:sub(letter, letter))
              local fillChar = (tmpChar == 10 or tmpChar == 32) and string.char(tmpChar) or string.char(127)
    
              tmpText = tmpText .. string.rep(fillChar, letterWidth[tmpChar])
          end
    
          labelHighlight:setText(tmpText)
        end
      end
    
      label.name = creatureName
      consoleBuffer.onMouseRelease = function(self, mousePos, mouseButton)
        processMessageMenu(mousePos, mouseButton, nil, nil, nil, tab)
      end
      label.onMouseRelease = function(self, mousePos, mouseButton)
        processMessageMenu(mousePos, mouseButton, creatureName, text, self, tab)
      end
      label.onMousePress = function(self, mousePos, button)
        if button == MouseLeftButton then clearSelection(consoleBuffer) end
      end
      label.onDragEnter = function(self, mousePos)
        clearSelection(consoleBuffer)
        return true
      end
      label.onDragLeave = function(self, droppedWidget, mousePos)
        local text = {}
        for selectionChild = consoleBuffer.selection.first, consoleBuffer.selection.last do
          local label = self:getParent():getChildByIndex(selectionChild)
          table.insert(text, label:getSelection())
        end
        consoleBuffer.selectionText = table.concat(text, '\n')
        return true
      end
      label.onDragMove = function(self, mousePos, mouseMoved)
        local parent = self:getParent()
        local parentRect = parent:getPaddingRect()
        local selfIndex = parent:getChildIndex(self)
        local child = parent:getChildByPos(mousePos)
    
        -- find bonding children
        if not child then
          if mousePos.y < self:getY() then
            for index = selfIndex - 1, 1, -1 do
              local label = parent:getChildByIndex(index)
              if label:getY() + label:getHeight() > parentRect.y then
                if (mousePos.y >= label:getY() and mousePos.y <= label:getY() + label:getHeight()) or index == 1 then
                  child = label
                  break
                end
              else
                child = parent:getChildByIndex(index + 1)
                break
              end
            end
          elseif mousePos.y > self:getY() + self:getHeight() then
            for index = selfIndex + 1, parent:getChildCount(), 1 do
              local label = parent:getChildByIndex(index)
              if label:getY() < parentRect.y + parentRect.height then
                if (mousePos.y >= label:getY() and mousePos.y <= label:getY() + label:getHeight()) or index == parent:getChildCount() then
                  child = label
                  break
                end
              else
                child = parent:getChildByIndex(index - 1)
                break
              end
            end
          else
            child = self
          end
        end
    
        if not child then return false end
    
        local childIndex = parent:getChildIndex(child)
    
        -- remove old selection
        clearSelection(consoleBuffer)
    
        -- update self selection
        local textBegin = self:getTextPos(self:getLastClickPosition())
        local textPos = self:getTextPos(mousePos)
        self:setSelection(textBegin, textPos)
    
        consoleBuffer.selection = { first = math.min(selfIndex, childIndex), last = math.max(selfIndex, childIndex) }
    
        -- update siblings selection
        if child ~= self then
          for selectionChild = consoleBuffer.selection.first + 1, consoleBuffer.selection.last - 1 do
            parent:getChildByIndex(selectionChild):selectAll()
          end
    
          local textPos = child:getTextPos(mousePos)
          if childIndex > selfIndex then
            child:setSelection(0, textPos)
          else
            child:setSelection(string.len(child:getText()), textPos)
          end
        end
    
        return true
      end
    
      if consoleBuffer:getChildCount() > MAX_LINES then
        local child = consoleBuffer:getFirstChild()
        clearSelection(consoleBuffer)
        child:destroy()
      end
    end
     */
    Chatbox.prototype.displayBroadcastMessage = function (text) {
        this.getTab(this.defaultTab).addText(text, SpeakTypes[const_1.MessageMode.MessageGamemasterPrivateFrom], '');
    };
    Chatbox.prototype.handleMessage = function (name, level, mode, message, channelId, creaturePos) {
        if (mode == const_1.MessageMode.MessageGamemasterBroadcast) {
            this.displayBroadcastMessage(name + ': ' + message);
            return;
        }
        var isNpcMode = (mode == const_1.MessageMode.MessageNpcFromStartBlock || mode == const_1.MessageMode.MessageNpcFrom);
        if (this.ignoreNpcMessages && isNpcMode) {
            return;
        }
        var speaktype = SpeakTypes[mode];
        if (!speaktype) {
            log_1.Log.error('unhandled onTalk message mode ' + mode + ': ' + message);
            return;
        }
        var localPlayer = game_1.g_game.getLocalPlayer();
        if (mode == const_1.MessageMode.MessageRVRChannel) {
            channelId = this.violationsChannelId;
        }
        if (mode == const_1.MessageMode.MessageSay || mode == const_1.MessageMode.MessageWhisper || mode == const_1.MessageMode.MessageYell ||
            mode == const_1.MessageMode.MessageSpell || mode == const_1.MessageMode.MessageMonsterSay || mode == const_1.MessageMode.MessageMonsterYell ||
            mode == const_1.MessageMode.MessageNpcFrom || mode == const_1.MessageMode.MessageBarkLow || mode == const_1.MessageMode.MessageBarkLoud ||
            mode == const_1.MessageMode.MessageNpcFromStartBlock && creaturePos) {
            var staticText = new statictext_1.StaticText();
            var staticMessage = message;
            if (isNpcMode) {
                var highlightData = staticMessage; //getHighlightedText(staticMessage)
                if (highlightData.length > 0) {
                    for (var i = 1; highlightData.length / 3; i++) {
                        var dataBlock = {
                            _start: highlightData[(i - 1) * 3 + 1],
                            _end: highlightData[(i - 1) * 3 + 2],
                            words: highlightData[(i - 1) * 3 + 3]
                        };
                        //staticMessage = staticMessage:gsub("{"..dataBlock.words.."}", dataBlock.words)
                    }
                }
                staticText.setColor(speaktype.color);
            }
            staticText.addMessage(name, mode, staticMessage);
            map_1.g_map.addThing(staticText, creaturePos, -1);
        }
        var defaultMessage = mode <= 3 && true || false;
        if (speaktype == SpeakTypesSettings.none) {
            return;
        }
        if (speaktype.hideInConsole) {
            return;
        }
        var composedMessage = message; //applyMessagePrefixies(name, level, message)
        if (mode == const_1.MessageMode.MessageRVRAnswer) {
            this.addTabText(composedMessage, speaktype, this.violationReportTab, name);
        }
        else if (mode == const_1.MessageMode.MessageRVRContinue) {
            this.addText(composedMessage, speaktype, name + '\'...', name);
        }
        else if (speaktype.private) {
            this.addPrivateText(composedMessage, speaktype, name, false, name);
            if (speaktype != SpeakTypesSettings.privateNpcToPlayer) {
                //modules.game_textmessage.displayPrivateMessage(name+':\n'+message);
            }
        }
        else {
            var channel = this.defaultTab;
            if (!defaultMessage) {
                channel = this.channels[channelId];
            }
            if (channel) {
                this.addText(composedMessage, speaktype, channel, name);
            }
            else {
                log_1.Log.debug('message in channel id ' + channelId + ' which is unknown, this is a server bug, relogin if you want to see messages in this channel');
            }
        }
    };
    return Chatbox;
}());
exports.Chatbox = Chatbox;
var g_chat = new Chatbox();
exports.g_chat = g_chat;
g_chat.addTab('Default', true);
g_chat.addTab('Server Log');
g_chat.defaultTab = 'Default';
g_chat.serverTab = 'Server Log';
