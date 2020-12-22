"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageActions = void 0;
var MessageActions = (function () {
    function MessageActions() {
    }
    MessageActions.prototype.updateMessages = function (state, callback, id_mensaje, idMessageTemp) {
        state.messages.map(function (message, i) {
            if (message.idMessageTemp === idMessageTemp) {
                message.id_mensaje = id_mensaje;
                var arrayCopy = state.messages;
                arrayCopy.splice(i, 1);
                arrayCopy.push(message);
                callback({ messages: arrayCopy });
            }
        });
    };
    MessageActions.prototype.removeContErrorMessage = function (idMessageTemp, state, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, state.contErrorMessage.map(function (message, i) { return __awaiter(_this, void 0, void 0, function () {
                            var arraycopy;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!(message === idMessageTemp)) return [3, 2];
                                        arraycopy = state.contErrorMessage;
                                        arraycopy.splice(i, 1);
                                        return [4, callback({ contErrorMessage: arraycopy })];
                                    case 1:
                                        _a.sent();
                                        _a.label = 2;
                                    case 2: return [2];
                                }
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    MessageActions.prototype.updateContErrorMessage = function (idMessageTemp, state, callback) {
        if (state.contErrorMessage.length) {
            if (!state.contErrorMessage.includes(idMessageTemp)) {
                callback({
                    contErrorMessage: __spreadArrays(state.contErrorMessage, [idMessageTemp]),
                });
            }
        }
        else {
            callback({ contErrorMessage: [idMessageTemp] });
        }
    };
    MessageActions.prototype.fetchGetMessages = function (direcction, messages, callback, id_group, skip, limit) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, fetch(process.env.REACT_APP_URL +
                            "api/mensaje/" +
                            id_group +
                            "/" +
                            skip +
                            "/" +
                            limit)
                            .then(function (res) {
                            return res.json();
                        })
                            .then(function (data) {
                            if (direcction) {
                                var messagesCopy = messages;
                                callback({ messages: messagesCopy.concat(data) });
                            }
                            else {
                                callback({
                                    messages: data.concat(messages),
                                });
                            }
                        })
                            .catch(function (error) {
                            console.log(error);
                        })];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    MessageActions.prototype.fetchGetLastMessages = function (state, callback, props, limit) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, fetch(process.env.REACT_APP_URL +
                            "api/mensaje/ultimoMensaje/" +
                            props.id_usuario +
                            "/" +
                            props.id_grupo +
                            "/" +
                            limit)
                            .then(function (res) {
                            return res.json();
                        })
                            .then(function (data) {
                            callback({
                                messages: data.newMessages,
                            });
                            callback({
                                cantMessages: [
                                    {
                                        nuevos: data.cantMessages[0].nuevos,
                                        lastM: data.cantMessages[0].lastM,
                                    },
                                ],
                            });
                            callback({ skipOld: data.cantMessages[0].skip });
                            callback({ skipLast: data.cantMessages[0].skip });
                            callback({ maxFile: data.cantMessages[0].allMessages });
                        })
                            .catch(function (error) {
                            console.log(error);
                        })];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    MessageActions.prototype.fetchSetMessage = function (mensaje, state, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, fetch(process.env.REACT_APP_URL + "api/mensaje/", {
                            headers: {
                                "Content-Type": "application/json",
                            },
                            method: "POST",
                            body: JSON.stringify(mensaje),
                        })
                            .then(function (res) {
                            return res.json();
                        })
                            .then(function (data) { })
                            .catch(function (error) {
                            _this.updateContErrorMessage(mensaje.idMessageTemp, state, callback);
                            console.log(error);
                        })];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    MessageActions.prototype.fetchPutLastMessage = function (lastMessge) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, fetch(process.env.REACT_APP_URL + "api/mensaje/actualizarID/", {
                            headers: {
                                "Content-Type": "application/json",
                            },
                            method: "PUT",
                            body: JSON.stringify(lastMessge),
                        })
                            .then(function (data) { })
                            .catch(function (error) { return console.log(error.json()); })];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    MessageActions.prototype.handleNewMessage = function (e, state, props, contenido, contScrollRef, context, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var newMessage, contReply, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        if (e.type === "keypress") {
                            if (e.key != "Enter") {
                                return [2];
                            }
                        }
                        if (!(contenido.current.value != "")) return [3, 2];
                        newMessage = {
                            idMessageTemp: state.idMessageTemp + 1,
                            contenido: contenido.current.value,
                            respuesta_de: state.respuesta_de,
                            id_usuario: props.id_usuario,
                            id_grupo: props.id_grupo,
                            user: props.user,
                            created_at: context.getDateTimeNow("YYYY/MM/DD HH:mm:ss"),
                            tipo_usuario: props.tipo_usuario,
                            userCont: state.replyCont.user +
                                "=" +
                                state.replyCont.contenido +
                                "=" +
                                state.replyCont.id_usuario,
                        };
                        contenido.current.value = "";
                        contenido.current.focus();
                        callback({ idMessageTemp: state.idMessageTemp + 1 });
                        callback({
                            messages: __spreadArrays(state.messages, [newMessage]),
                        }, function () {
                            contScrollRef.current.scrollTop =
                                contScrollRef.current.scrollHeight;
                        });
                        return [4, this.fetchSetMessage(newMessage, state, callback)];
                    case 1:
                        _a.sent();
                        if (state.respuesta_de) {
                            callback({ respuesta_de: undefined });
                            callback({ replyCont: [] });
                        }
                        _a.label = 2;
                    case 2:
                        contReply = document.getElementById("contReply");
                        if (contReply) {
                            contReply.style.display = "none";
                        }
                        return [3, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.error(error_1);
                        return [3, 4];
                    case 4: return [2];
                }
            });
        });
    };
    return MessageActions;
}());
exports.MessageActions = MessageActions;
//# sourceMappingURL=message.actions.js.map