import {InputMessage} from "./inputmessage";
import {OutputMessage} from "./outputmessage";
import {log, error} from "../log";

export class Protocol {
    protected m_checksumEnabled: boolean;
    protected m_xteaEncryptionEnabled: boolean;
    protected m_connection: WebSocket;
    protected m_xteaKey: number[];

    protected constructor() {
        this.m_xteaEncryptionEnabled = false;
        this.m_checksumEnabled = null;
        this.m_connection = null;
        this.m_xteaKey = [];
    }

    connect(host: string, port: number) {
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

        this.m_connection.onclose = (evt: CloseEvent) => {
            console.log('m_connectiononclose', evt);
            protocol.onClose(evt);
        };

        this.m_connection.onmessage = function (evt) {
            console.log('m_connectiononmessage', evt);
            protocol.internalRecvData(evt);
        };
    }

    onConnect(evt: Event) {
        log("onConnect", evt);
    }

    onRecv(inputMessage: InputMessage) {
        log("onRecv", inputMessage);
    }

    onError(evt: Event) {
        log("onError", evt);
        this.disconnect();
    }

    onClose(evt: CloseEvent) {
        log("onClose", evt);
        this.disconnect();
    }

    send(outputMessage: OutputMessage) {
        if (this.m_xteaEncryptionEnabled)
            this.xteaEncrypt(outputMessage);

        if (this.m_checksumEnabled)
            outputMessage.writeChecksum();

        outputMessage.writeMessageSize();

        if (this.m_connection)
            this.m_connection.send(outputMessage.getBuffer());
    }

    internalRecvData(evt: MessageEvent) {
        if (!this.isConnected()) {
            error("received data while disconnected");
            return;
        }

        let inputMessage = new InputMessage(new DataView(evt.data));

        if (this.m_checksumEnabled && !inputMessage.validateChecksum()) {
            error("got a network message with invalid checksum");
            return;
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

    xteaEncrypt(outputMessage: OutputMessage): boolean {
        return true;
    }

    xteaDecrypt(inputMessage: InputMessage): boolean {
        return true;
    }

    generateXteaKey() {
        throw new Error('unimplemented');
    }

    getXteaKey(): number[] {
        throw new Error('unimplemented');
    }

    setXteaKey() {
        throw new Error('unimplemented');
    }
}