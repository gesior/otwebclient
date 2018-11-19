"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var inputmessage_1 = require("./inputmessage");
var log_1 = require("../log");
var Protocol = (function () {
    function Protocol() {
        this.m_xteaEncryptionEnabled = false;
        this.m_checksumEnabled = null;
        this.m_connection = null;
        this.m_xteaKey = [];
    }
    Protocol.prototype.connect = function (host, port) {
        var serverUrl = "ws://" + host + ":" + port;
        this.m_connection = new WebSocket(serverUrl);
        this.m_connection.binaryType = 'arraybuffer';
        var protocol = this;
        this.m_connection.onopen = function (evt) {
            console.log('m_connectiononopen', evt);
            protocol.onConnect(evt);
        };
        this.m_connection.onerror = function (evt) {
            console.log('m_connectiononerror', evt);
            protocol.onError(evt);
        };
        this.m_connection.onclose = function (evt) {
            console.log('m_connectiononclose', evt);
            protocol.onClose(evt);
        };
        this.m_connection.onmessage = function (evt) {
            console.log('m_connectiononmessage', evt);
            protocol.internalRecvData(evt);
        };
    };
    Protocol.prototype.onConnect = function (evt) {
        log_1.log("onConnect", evt);
    };
    Protocol.prototype.onRecv = function (inputMessage) {
        log_1.log("onRecv", inputMessage);
    };
    Protocol.prototype.onError = function (evt) {
        log_1.log("onError", evt);
        this.disconnect();
    };
    Protocol.prototype.onClose = function (evt) {
        log_1.log("onClose", evt);
        this.disconnect();
    };
    Protocol.prototype.send = function (outputMessage) {
        if (this.m_xteaEncryptionEnabled)
            this.xteaEncrypt(outputMessage);
        if (this.m_checksumEnabled)
            outputMessage.writeChecksum();
        outputMessage.writeMessageSize();
        if (this.m_connection)
            this.m_connection.send(outputMessage.getBuffer());
    };
    Protocol.prototype.internalRecvData = function (evt) {
        if (!this.isConnected()) {
            log_1.error("received data while disconnected");
            return;
        }
        var inputMessage = new inputmessage_1.InputMessage(new DataView(evt.data));
        if (this.m_checksumEnabled && !inputMessage.validateChecksum()) {
            log_1.error("got a network message with invalid checksum");
            return;
        }
        if (this.m_xteaEncryptionEnabled) {
            if (!this.xteaDecrypt(inputMessage)) {
                log_1.error("failed to decrypt message");
                return;
            }
        }
        this.onRecv(inputMessage);
    };
    Protocol.prototype.isConnected = function () {
        return this.m_connection && this.m_connection.readyState == WebSocket.OPEN;
    };
    Protocol.prototype.isConnecting = function () {
        return this.m_connection && this.m_connection.readyState == WebSocket.CONNECTING;
    };
    Protocol.prototype.disconnect = function () {
        if (this.m_connection) {
            this.m_connection.close();
            this.m_connection = null;
        }
    };
    Protocol.prototype.enableXteaEncryption = function () {
        this.m_xteaEncryptionEnabled = true;
    };
    Protocol.prototype.enableChecksum = function () {
        this.m_checksumEnabled = true;
    };
    Protocol.prototype.xteaEncrypt = function (outputMessage) {
        return true;
    };
    Protocol.prototype.xteaDecrypt = function (inputMessage) {
        return true;
    };
    Protocol.prototype.generateXteaKey = function () {
        throw new Error('unimplemented');
    };
    Protocol.prototype.getXteaKey = function () {
        throw new Error('unimplemented');
    };
    Protocol.prototype.setXteaKey = function () {
        throw new Error('unimplemented');
    };
    return Protocol;
}());
exports.Protocol = Protocol;
//# sourceMappingURL=protocol.js.map