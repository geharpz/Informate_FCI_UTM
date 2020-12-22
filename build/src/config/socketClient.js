"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketClient = void 0;
var socket_io_client_1 = __importDefault(require("socket.io-client"));
var SocketClient = (function () {
    function SocketClient() {
    }
    SocketClient.prototype.socketListen = function (ENDPOINT) {
        this.io = socket_io_client_1.default.connect(ENDPOINT);
    };
    SocketClient.prototype.getSocket = function () {
        return this.io;
    };
    SocketClient.prototype.emitMessage = function (data) {
        this.io.emit("message", data);
    };
    return SocketClient;
}());
exports.SocketClient = SocketClient;
//# sourceMappingURL=socketClient.js.map