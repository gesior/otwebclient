import {ChatboxTab} from "./chatboxtab";
import {MessageMode} from "../constants/const";
import {Position} from "../position";
import {Log} from "../log";
import {g_game} from "../game";
import {StaticText} from "../statictext";
import {g_map} from "../map";

let SpeakTypesSettings = {
    none: {},
    say: {speakType: MessageMode.MessageSay, color: '#FFFF00'},
    whisper: {speakType: MessageMode.MessageWhisper, color: '#FFFF00'},
    yell: {speakType: MessageMode.MessageYell, color: '#FFFF00'},
    broadcast: {speakType: MessageMode.MessageGamemasterBroadcast, color: '#F55E5E'},
    private: {speakType: MessageMode.MessagePrivateTo, color: '#5FF7F7', private: true},
    privateRed: {speakType: MessageMode.MessageGamemasterPrivateTo, color: '#F55E5E', private: true},
    privatePlayerToPlayer: {speakType: MessageMode.MessagePrivateTo, color: '#9F9DFD', private: true},
    privatePlayerToNpc: {speakType: MessageMode.MessageNpcTo, color: '#9F9DFD', private: true, npcChat: true},
    privateNpcToPlayer: {speakType: MessageMode.MessageNpcFrom, color: '#5FF7F7', private: true, npcChat: true},
    channelYellow: {speakType: MessageMode.MessageChannel, color: '#FFFF00'},
    channelWhite: {speakType: MessageMode.MessageChannelManagement, color: '#FFFFFF'},
    channelRed: {speakType: MessageMode.MessageGamemasterChannel, color: '#F55E5E'},
    channelOrange: {speakType: MessageMode.MessageChannelHighlight, color: '#FE6500'},
    monsterSay: {speakType: MessageMode.MessageMonsterSay, color: '#FE6500', hideInConsole: true},
    monsterYell: {speakType: MessageMode.MessageMonsterYell, color: '#FE6500', hideInConsole: true},
    rvrAnswerFrom: {speakType: MessageMode.MessageRVRAnswer, color: '#FE6500'},
    rvrAnswerTo: {speakType: MessageMode.MessageRVRAnswer, color: '#FE6500'},
    rvrContinue: {speakType: MessageMode.MessageRVRContinue, color: '#FFFF00'},
};

let SpeakTypes = {
    [MessageMode.MessageSay]: SpeakTypesSettings.say,
    [MessageMode.MessageWhisper]: SpeakTypesSettings.whisper,
    [MessageMode.MessageYell]: SpeakTypesSettings.yell,
    [MessageMode.MessageGamemasterBroadcast]: SpeakTypesSettings.broadcast,
    [MessageMode.MessagePrivateFrom]: SpeakTypesSettings.private,
    [MessageMode.MessageGamemasterPrivateFrom]: SpeakTypesSettings.privateRed,
    [MessageMode.MessageNpcTo]: SpeakTypesSettings.privatePlayerToNpc,
    [MessageMode.MessageNpcFrom]: SpeakTypesSettings.privateNpcToPlayer,
    [MessageMode.MessageChannel]: SpeakTypesSettings.channelYellow,
    [MessageMode.MessageChannelManagement]: SpeakTypesSettings.channelWhite,
    [MessageMode.MessageGamemasterChannel]: SpeakTypesSettings.channelRed,
    [MessageMode.MessageChannelHighlight]: SpeakTypesSettings.channelOrange,
    [MessageMode.MessageMonsterSay]: SpeakTypesSettings.monsterSay,
    [MessageMode.MessageMonsterYell]: SpeakTypesSettings.monsterYell,
    [MessageMode.MessageRVRChannel]: SpeakTypesSettings.channelWhite,
    [MessageMode.MessageRVRContinue]: SpeakTypesSettings.rvrContinue,
    [MessageMode.MessageRVRAnswer]: SpeakTypesSettings.rvrAnswerFrom,
    [MessageMode.MessageNpcFromStartBlock]: SpeakTypesSettings.privateNpcToPlayer,

    [MessageMode.MessageSpell]: SpeakTypesSettings.none,
    [MessageMode.MessageBarkLow]: SpeakTypesSettings.none,
    [MessageMode.MessageBarkLoud]: SpeakTypesSettings.none,
};

export class Chatbox {

    consolePanel = null;
    consoleContentPanel = null;
    consoleTabBar = null;
    consoleTextEdit = null;
    channels = [];
    channelsWindow = null;
    communicationWindow = null;
    ownPrivateName = null;
    messageHistory = {};
    currentMessageIndex = 0;
    ignoreNpcMessages = false;
    defaultTab: string = null;
    serverTab: string = null;
    violationsChannelId = null;
    violationWindow = null;
    violationReportTab = null;
    ignoredChannels = {};
    filters = {};

    tabs: ChatboxTab[] = [];

    constructor() {
    }

    addTab(name: string, focus: boolean = false): ChatboxTab {
          let tab = this.getTab(name);
          if (tab){
              focus = true
          }
          else {
              tab = new ChatboxTab(name);
          }
          if (focus) {
              this.selectTab(tab);
          }
          this.tabs[name] = tab;
          return tab
    }

    selectTab(tab: ChatboxTab) {
        /* todo */
    }
    removeTab(tab: any): void {
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
    }

    addChannel(name, id) {
        console.log('add chanel', name, id);
        this.channels[id] = name;
        let tab = this.addTab(name, true);
        tab.channelId = id;
        return tab

    }

    addPrivateChannel(receiver: string) {
        this.channels[receiver] = receiver;
        return this.addTab(receiver, false)
    }

    getTab(name: string) {
        return this.tabs[name];
    }

    addPrivateText(text, speaktype, name, isPrivateCommand, creatureName) {
        let focus = false;
        if (speaktype.npcChat) {
            name = 'NPCs';
            focus = true
        }

        let privateTab = this.getTab(name);
        if (!privateTab) {
            privateTab = this.addTab(name, focus);
            this.channels[name] = name;
            privateTab.npcChat = speaktype.npcChat
        }
        else if (focus) {
            this.selectTab(privateTab);
        }
        this.addTabText(text, speaktype, privateTab, creatureName)
    }

    addText(text, speaktype, tabName, creatureName) {
        let tab = this.getTab(tabName);
        if (tab) {
            this.addTabText(text, speaktype, tab, creatureName)
        } else {
            console.error('no tab', tabName, this.tabs);
        }
    }
    addTabText(text, speaktype, tab: ChatboxTab, creatureName) {
        tab.addText(text, speaktype, creatureName);
    }
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
    displayBroadcastMessage(text: string) {
        this.getTab(this.defaultTab).addText(text, SpeakTypes[MessageMode.MessageGamemasterPrivateFrom], '');
    }

    handleMessage(name: string, level: number, mode: MessageMode, message: string, channelId: number, creaturePos: Position) {

        if (mode == MessageMode.MessageGamemasterBroadcast) {
            this.displayBroadcastMessage(name + ': ' + message);
            return
        }

        let isNpcMode = (mode == MessageMode.MessageNpcFromStartBlock || mode == MessageMode.MessageNpcFrom);

        if (this.ignoreNpcMessages && isNpcMode) {
            return;
        }

        let speaktype = SpeakTypes[mode];

        if (!speaktype) {
            Log.error('unhandled onTalk message mode ' + mode + ': ' + message);

            return
        }

        let localPlayer = g_game.getLocalPlayer();

        if (mode == MessageMode.MessageRVRChannel) {
            channelId = this.violationsChannelId
        }

        if (mode == MessageMode.MessageSay || mode == MessageMode.MessageWhisper || mode == MessageMode.MessageYell ||
            mode == MessageMode.MessageSpell || mode == MessageMode.MessageMonsterSay || mode == MessageMode.MessageMonsterYell ||
            mode == MessageMode.MessageNpcFrom || mode == MessageMode.MessageBarkLow || mode == MessageMode.MessageBarkLoud ||
            mode == MessageMode.MessageNpcFromStartBlock && creaturePos) {
            let staticText = new StaticText();
            let staticMessage = message;
            if (isNpcMode) {
                let highlightData = staticMessage; //getHighlightedText(staticMessage)
                if (highlightData.length > 0) {
                    for (let i = 1; highlightData.length / 3; i++) {
                        let dataBlock = {
                            _start: highlightData[(i - 1) * 3 + 1],
                            _end: highlightData[(i - 1) * 3 + 2],
                            words: highlightData[(i - 1) * 3 + 3]
                        };
                        //staticMessage = staticMessage:gsub("{"..dataBlock.words.."}", dataBlock.words)
                    }
                }
                staticText.setColor(speaktype.color)
            }
            staticText.addMessage(name, mode, staticMessage);
            g_map.addThing(staticText, creaturePos, -1)
        }

        let defaultMessage = mode <= 3 && true || false;

        if (speaktype == SpeakTypesSettings.none) {
            return
        }

        if (speaktype.hideInConsole) {
            return
        }

        let composedMessage = message; //applyMessagePrefixies(name, level, message)

        if (mode == MessageMode.MessageRVRAnswer) {
            this.addTabText(composedMessage, speaktype, this.violationReportTab, name)
        }
        else if (mode == MessageMode.MessageRVRContinue) {
            this.addText(composedMessage, speaktype, name + '\'...', name);
        }
        else if (speaktype.private) {
            this.addPrivateText(composedMessage, speaktype, name, false, name);
            if (speaktype != SpeakTypesSettings.privateNpcToPlayer) {
                //modules.game_textmessage.displayPrivateMessage(name+':\n'+message);
            }
        }
        else {
            let channel = this.defaultTab;
            if (!defaultMessage) {
                channel = this.channels[channelId]
            }

            if (channel) {
                this.addText(composedMessage, speaktype, channel, name);
            }
            else {
                Log.debug('message in channel id ' + channelId + ' which is unknown, this is a server bug, relogin if you want to see messages in this channel');
            }
        }
    }
}

let g_chat = new Chatbox();
g_chat.addTab('Default', true);
g_chat.addTab('Server Log');
g_chat.defaultTab = 'Default';
g_chat.serverTab = 'Server Log';

export {g_chat}