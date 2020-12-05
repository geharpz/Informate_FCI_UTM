"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShowMessages = void 0;
var react_1 = __importDefault(require("react"));
var ShowMessages = (function (_super) {
    __extends(ShowMessages, _super);
    function ShowMessages() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.year = [
            "ENERO",
            "FEBRERO",
            "MARZO",
            "ABRIL",
            "MAYO",
            "JUNIO",
            "JULIO",
            "AGOSTO",
            "SEPTIEMBRE",
            "OCTUBRE",
            "NOVIEMBRE",
            "DICIEMBRE",
        ];
        return _this;
    }
    ShowMessages.prototype.compareIdUser = function (message, props, index, context) {
        if (message.id_usuario === props.id_usuario) {
            return (react_1.default.createElement("div", { key: "a" + index, className: "mensajeRigth" },
                react_1.default.createElement("p", { key: "c" + index, className: 'mR' }, message.contenido),
                react_1.default.createElement("p", { key: "d" + index, className: 'hourM' }, context.getTime(message.created_at, "HH:mm"))));
        }
        else {
            return (react_1.default.createElement("div", { key: "a" + index, className: "mensajeLeft" },
                react_1.default.createElement("p", { key: "c" + index, className: 'mI' },
                    react_1.default.createElement("b", null,
                        " ",
                        message.user),
                    ": ",
                    message.contenido),
                react_1.default.createElement("p", { key: "d" + index, className: 'hourM' },
                    " ",
                    context.getTime(message.created_at, "HH:mm"))));
        }
    };
    ShowMessages.prototype.checkDay = function (message, index, context) {
        if (context.getTime(message.created_at, "YYYY/MM/DD") !=
            context.getTime(ShowMessages.check, "YYYY/MM/DD")) {
            ShowMessages.check = message.created_at;
            if (context.getTime(message.created_at, "YYYY/MM/DD") !=
                context.getDateTimeNow("YYYY/MM/DD")) {
                if (context.validateCantDay(message.created_at)) {
                    return (react_1.default.createElement("div", { key: "b" + index, className: "contAgo" }, context.getStringDate(message.created_at, this.year)));
                }
                else {
                    return (react_1.default.createElement("div", { key: "b" + index, className: "contAgo" }, context.timeAgo.format(Date.parse(message.created_at))));
                }
            }
            else {
                return (react_1.default.createElement("div", { key: "b" + index, className: "contAgo" }, "Hoy"));
            }
        }
        else {
            ShowMessages.check = message.created_at;
        }
    };
    ShowMessages.prototype.newMessagePaint = function (state, context, props) {
        var _this = this;
        try {
            return state.messages.map(function (message) {
                if (Array.isArray(message)) {
                    return message.map(function (newMessage, j) {
                        return (react_1.default.createElement("div", { key: newMessage.id_mensaje, className: "w-full" },
                            _this.checkDay(newMessage, j, context),
                            _this.compareIdUser(newMessage, props, j, context)));
                    });
                }
            });
        }
        catch (error) {
            return error;
        }
    };
    ShowMessages.prototype.messagePaint = function (state, context, props) {
        var _this = this;
        try {
            return state.messages.map(function (message, i) {
                if (!Array.isArray(message)) {
                    return (react_1.default.createElement("div", { key: i, className: "w-full via-white" },
                        _this.checkDay(message, i, context),
                        _this.compareIdUser(message, props, i, context)));
                }
            });
        }
        catch (error) {
            return error;
        }
    };
    return ShowMessages;
}(react_1.default.Component));
exports.ShowMessages = ShowMessages;
//# sourceMappingURL=ShowMessages.js.map