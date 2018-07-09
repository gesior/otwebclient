import { InputMessage } from "./inputmessage";
import { log, error } from "../log";
export class Protocol {
    constructor() {
        this.m_xteaEncryptionEnabled = false;
        this.m_checksumEnabled = null;
        this.m_connection = null;
        this.m_xteaKey = [];
    }
    connect(host, port) {
        const serverUrl = "ws://" + host + ":" + port;
        this.m_connection = new WebSocket(serverUrl);
        this.m_connection.binaryType = 'arraybuffer';
        let protocol = this;
        this.m_connection.onopen = function (evt) {
            console.log('m_connectiononopen', evt);
            protocol.onConnect(evt);
        };
        this.m_connection.onerror = function (evt) {
            console.log('m_connectiononerror', evt);
            protocol.onError(evt);
        };
        this.m_connection.onclose = (evt) => {
            console.log('m_connectiononclose', evt);
            protocol.onClose(evt);
        };
        this.m_connection.onmessage = function (evt) {
            console.log('m_connectiononmessage', evt);
            protocol.internalRecvData(evt);
        };
    }
    onConnect(evt) {
        log("onConnect", evt);
    }
    onRecv(inputMessage) {
        log("onRecv", inputMessage);
    }
    onError(evt) {
        log("onError", evt);
        this.disconnect();
    }
    onClose(evt) {
        log("onClose", evt);
        this.disconnect();
    }
    send(outputMessage) {
        if (this.m_xteaEncryptionEnabled)
            this.xteaEncrypt(outputMessage);
        if (this.m_checksumEnabled)
            outputMessage.writeChecksum();
        outputMessage.writeMessageSize();
        if (this.m_connection)
            this.m_connection.send(outputMessage.getBuffer());
    }
    internalRecvData(evt) {
        if (!this.isConnected()) {
            error("received data while disconnected");
            return;
        }
        let inputMessage = new InputMessage(new DataView(evt.data));
        if (this.m_checksumEnabled && !inputMessage.validateChecksum()) {
            error("got a network message with invalid checksum");
            return;
        }
        if (this.m_checksumEnabled) {
            // size(2) + checksum(4)
            inputMessage.skip(6);
        }
        if (this.m_xteaEncryptionEnabled) {
            if (!this.xteaDecrypt(inputMessage)) {
                error("failed to decrypt message");
                return;
            }
        }
        this.onRecv(inputMessage);
    }
    isConnected() {
        return this.m_connection && this.m_connection.readyState == WebSocket.OPEN;
    }
    isConnecting() {
        return this.m_connection && this.m_connection.readyState == WebSocket.CONNECTING;
    }
    disconnect() {
        if (this.m_connection) {
            this.m_connection.close();
            this.m_connection = null;
        }
    }
    enableXteaEncryption() {
        this.m_xteaEncryptionEnabled = true;
    }
    enableChecksum() {
        this.m_checksumEnabled = true;
    }
    xteaEncrypt(outputMessage) {
        return true;
    }
    xteaDecrypt(inputMessage) {
        return true;
    }
    generateXteaKey() {
        throw new Error('unimplemented');
    }
    getXteaKey() {
        throw new Error('unimplemented');
    }
    setXteaKey() {
        throw new Error('unimplemented');
    }
}
//# sourceMappingURL=protocol.js.map