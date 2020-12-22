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
var react_fontawesome_1 = require("@fortawesome/react-fontawesome");
var free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
var free_regular_svg_icons_1 = require("@fortawesome/free-regular-svg-icons");
var message_actions_1 = require("../message.actions");
var ShowMessages = (function (_super) {
    __extends(ShowMessages, _super);
    function ShowMessages(props) {
        var _this = _super.call(this, props) || this;
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
        _this.messageActions = new message_actions_1.MessageActions();
        return _this;
    }
    ShowMessages.prototype.closeReply = function (callback) {
        var contReply = document.getElementById("contReply");
        var insideReply = document.getElementById("insideReply");
        if (contReply && insideReply) {
            callback({ respuesta_de: undefined });
            insideReply.innerHTML = "";
            contReply.style.display = "none";
        }
    };
    ShowMessages.prototype.showUser = function (nameUser, id_user, props) {
        if (id_user === props.id_usuario) {
            return "Tú";
        }
        else {
            return nameUser;
        }
    };
    ShowMessages.prototype.replyMessage = function (state, props, callback) {
        var contReply = document.getElementById("contReply");
        var insideReply = document.getElementById("insideReply");
        if (contReply && insideReply) {
            var user = this.showUser(state.user, state.id_usuario, props);
            callback({ respuesta_de: state.id_mensaje });
            callback({
                replyCont: {
                    user: user,
                    contenido: state.contenido,
                    id_usuario: state.id_usuario,
                },
            });
            insideReply.innerHTML =
                '<div class="reply"><b>' +
                    user +
                    "</b><p>" +
                    state.contenido +
                    "</p></div>";
            contReply.style.display = "flex";
        }
    };
    ShowMessages.prototype.showFliterMessages = function (state) {
        if (state.filter) {
            return state.messages.filter(function (message) { return message.tipo_usuario != "ESTUDIANTE"; });
        }
        else {
            return state.messages;
        }
    };
    ShowMessages.prototype.switchFilter = function (callback, estado) {
        callback({ filter: estado });
    };
    ShowMessages.prototype.closeOptionMessages = function (i) {
        var option = document.getElementsByClassName("contOptionMessage")[i];
        var selectO = document.getElementsByClassName("selectAccion")[i];
        var elementH = document.getElementsByClassName("elementHidden")[i];
        if (option && selectO && elementH) {
            setTimeout(function () {
                if (selectO.style.visibility != "hidden") {
                    elementH.style.visibility = '';
                    selectO.style.display = "";
                    option.style.opacity = "0";
                    option.style.visibility = "hidden";
                    option.style.width = "0";
                }
            }, 500);
        }
    };
    ShowMessages.prototype.showOptionMessages = function (i) {
        var option = document.getElementsByClassName("contOptionMessage")[i];
        var selectO = document.getElementsByClassName("selectAccion")[i];
        var elementH = document.getElementsByClassName("elementHidden")[i];
        if (option && selectO && elementH) {
            if (selectO.style.display != "block") {
                elementH.style.visibility = 'hidden';
                selectO.style.display = "block";
                option.style.opacity = "1";
                option.style.visibility = "visible";
                option.style.width = "7vw";
            }
            else {
                elementH.style.visibility = '';
                selectO.style.display = "";
                option.style.opacity = "0";
                option.style.visibility = "hidden";
                option.style.width = "0";
            }
        }
    };
    ShowMessages.prototype.compareIdUser = function (state, message, props, index, context, callback) {
        var _this = this;
        var rigthP = '0';
        var padding = '0';
        if (message.id_usuario === props.id_usuario) {
            rigthP = '0';
            padding = '0';
        }
        else {
            rigthP = '';
            padding = '4';
        }
        var reply;
        if (message.respuesta_de) {
            var arrayReply = message.userCont.split("=");
            var user = this.showUser(arrayReply[0], parseInt(arrayReply[2]), props);
            reply = (react_1.default.createElement("a", { href: "#" + message.respuesta_de, className: "showReply" },
                react_1.default.createElement("b", null, user),
                react_1.default.createElement("p", null, arrayReply[1])));
        }
        var faSelectIcon = (react_1.default.createElement("ul", { className: "selectAccion hidden pl-" + padding, id: "selectAccion" + message.id_mensaje },
            react_1.default.createElement("li", null,
                react_1.default.createElement("button", { className: 'focus:outline-none', onClick: function () { return _this.showOptionMessages(index); }, onBlur: function () { return _this.closeOptionMessages(index); } },
                    react_1.default.createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faSortDown, className: "text-sm" })),
                react_1.default.createElement("ul", { className: "contOptionMessage right-" + rigthP, id: "contOptionMessage" + message.id_mensaje },
                    react_1.default.createElement("li", { onClick: function () { return _this.replyMessage(message, props, callback); } },
                        react_1.default.createElement("span", null,
                            react_1.default.createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faReply }),
                            react_1.default.createElement("p", { className: "pl-2" }, "Responser"))),
                    react_1.default.createElement("li", null,
                        react_1.default.createElement("span", null,
                            react_1.default.createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faEraser }),
                            react_1.default.createElement("p", { className: "pl-2" }, "Eliminar")))))));
        if (message.id_usuario === props.id_usuario) {
            var iconCurrent = (react_1.default.createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faCheck, className: "iconCurrent" }));
            if (!message.id_mensaje) {
                if (!state.contErrorMessage.length) {
                    iconCurrent = react_1.default.createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_regular_svg_icons_1.faClock });
                }
                else {
                    iconCurrent = (react_1.default.createElement(react_fontawesome_1.FontAwesomeIcon, { title: "Reenviar mensaje", className: "text-xs", icon: free_solid_svg_icons_1.faExclamationTriangle, onClick: function () {
                            return _this.messageActions.fetchSetMessage(message, state, callback);
                        } }));
                }
                faSelectIcon = "";
            }
            return (react_1.default.createElement("div", { key: "a" + index, id: message.id_mensaje, tabIndex: -1, className: "mensajeRigth text-blackO-400 focus:outline-none" },
                reply,
                react_1.default.createElement("span", { className: "Rigth" },
                    react_1.default.createElement("p", { className: "mR" }, message.contenido),
                    react_1.default.createElement("span", { className: "hourM" }, context.getTime(message.created_at, "HH:mm")),
                    react_1.default.createElement("span", { className: "contIcontCurrent mt-2" },
                        faSelectIcon,
                        react_1.default.createElement("span", { className: "elementHidden", id: "elementHidden" + message.id_mensaje }, iconCurrent)))));
        }
        else {
            var userType = "";
            var colorUserType = "bg-blackO-500";
            if (message.tipo_usuario != "ESTUDIANTE") {
                userType = message.tipo_usuario;
                colorUserType = "bg-blackO-200 ";
            }
            return (react_1.default.createElement("div", { key: "a" + index, id: message.id_mensaje, tabIndex: -1, className: "mensajeLeft " + colorUserType + " focus:outline-none" },
                react_1.default.createElement("div", { key: "c" + index, className: "mI" },
                    react_1.default.createElement("span", { className: "nameUser" },
                        react_1.default.createElement("b", { className: "p-1 text-gray-600" },
                            " ",
                            message.user),
                        react_1.default.createElement("b", { className: "p-1 text-clar" }, userType)),
                    reply,
                    react_1.default.createElement("span", { className: "contenidoH" },
                        react_1.default.createElement("span", null, message.contenido),
                        react_1.default.createElement("span", { className: "contH" },
                            react_1.default.createElement("span", { className: "hourM" },
                                faSelectIcon,
                                react_1.default.createElement("p", { className: "elementHidden", id: "elementHidden" + message.id_mensaje }, context.getTime(message.created_at, "HH:mm"))))))));
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
    ShowMessages.prototype.newMessagePaint = function (state, context, props, callback) {
        var _this = this;
        try {
            return this.showFliterMessages(state).map(function (newMessage, j) {
                return (react_1.default.createElement("div", { key: j, className: "w-full" },
                    _this.checkDay(newMessage, j, context),
                    _this.compareIdUser(state, newMessage, props, j, context, callback)));
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