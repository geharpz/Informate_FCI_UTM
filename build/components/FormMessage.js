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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormMessages = void 0;
var react_1 = __importDefault(require("react"));
var react_fontawesome_1 = require("@fortawesome/react-fontawesome");
var free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
var message_actions_1 = require("../actions/message.actions");
var contextMessage_1 = __importDefault(require("../context/contextMessage"));
var ShowMessages_1 = require("../actions/componentActions/ShowMessages");
var FormMessages = (function (_super) {
    __extends(FormMessages, _super);
    function FormMessages(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            skip: null,
            loading: false,
            maxFile: null,
            sendMessage: {
                contenido: "",
                respuesta_de: undefined,
                id_usuario: 0,
                id_grupo: 0,
                created_at: "",
            },
            messages: [],
            cantMessages: [],
        };
        _this.loadMessages = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.setState({ loading: true });
                        return [4, this.messageActions.fetchGetMessages(this.state, this.setState.bind(this), this.props.id_grupo, this.state.skip)];
                    case 1:
                        _a.sent();
                        this.setState({ loading: false });
                        return [2];
                }
            });
        }); };
        _this.messageActions = new message_actions_1.MessageActions();
        _this.showMessages = new ShowMessages_1.ShowMessages(props);
        _this.contenidoRef = react_1.default.createRef();
        _this.contScrollRef = react_1.default.createRef();
        return _this;
    }
    FormMessages.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.messageActions.fetchGetLastMessages(this.state, this.setState.bind(this), this.props)];
                    case 1:
                        _a.sent();
                        return [4, this.onMessage()];
                    case 2:
                        _a.sent();
                        this.contenidoRef.current.focus();
                        this.contScrollRef.current.scrollTop = this.contScrollRef.current.scrollHeight;
                        return [2];
                }
            });
        });
    };
    FormMessages.prototype.onMessage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.context.getIO().on("send message", function (data) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4, this.setState({
                                            messages: __spreadArrays([data.message], this.state.messages),
                                        })];
                                    case 1:
                                        _a.sent();
                                        this.contScrollRef.current.scrollTop = this.contScrollRef.current.scrollHeight;
                                        return [4, this.setState({
                                                maxFile: data.message.maxFile,
                                            })];
                                    case 2:
                                        _a.sent();
                                        this.context.getIO().emit("update lastMessage", data);
                                        return [2];
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
    FormMessages.prototype.newMessage = function (sendMessage) {
        this.setState({
            sendMessage: sendMessage,
        });
    };
    FormMessages.prototype.handleScroll = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, scrollTop, clientHeight, scrollHeight;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = event.currentTarget, scrollTop = _a.scrollTop, clientHeight = _a.clientHeight, scrollHeight = _a.scrollHeight;
                        if (!(scrollTop === 0 && this.state.skip != 0)) return [3, 8];
                        if (!(this.state.skip - 50 < 0)) return [3, 2];
                        return [4, this.setState({ skip: 0 })];
                    case 1:
                        _b.sent();
                        return [3, 4];
                    case 2: return [4, this.setState({ skip: this.state.skip - 50 })];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4:
                        if (!(this.state.maxFile - this.state.skip <= 50)) return [3, 6];
                        return [4, this.setState({ skip: this.state.skip - 50 })];
                    case 5:
                        _b.sent();
                        _b.label = 6;
                    case 6: return [4, this.loadMessages()];
                    case 7:
                        _b.sent();
                        this.contScrollRef.current.scrollTop =
                            (scrollHeight - clientHeight) * 0.9;
                        _b.label = 8;
                    case 8:
                        if (!(scrollHeight - scrollTop === clientHeight &&
                            this.state.skip < this.state.maxFile)) return [3, 14];
                        if (!(this.state.skip + 50 >= this.state.maxFile)) return [3, 10];
                        return [4, this.setState({ skip: this.state.maxFile })];
                    case 9:
                        _b.sent();
                        return [2];
                    case 10: return [4, this.setState({ skip: this.state.skip + 50 })];
                    case 11:
                        _b.sent();
                        if (this.state.maxFile - this.state.skip < 50) {
                            this.setState({ skip: this.state.maxFile - 50 });
                        }
                        _b.label = 12;
                    case 12:
                        this.contScrollRef.current.scrollTop =
                            (scrollHeight - clientHeight) * 0.05;
                        return [4, this.loadMessages()];
                    case 13:
                        _b.sent();
                        _b.label = 14;
                    case 14: return [2];
                }
            });
        });
    };
    FormMessages.prototype.render = function () {
        var _this = this;
        ShowMessages_1.ShowMessages.check = "1900-11-28";
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("div", { className: "contM w-full row-span-11", ref: this.contScrollRef, onScroll: this.handleScroll.bind(this) },
                react_1.default.createElement("div", { className: "contMessageMain w-full" }, this.showMessages.newMessagePaint(this.state, this.context, this.props)),
                react_1.default.createElement("div", { className: "contMessageSecond" }, this.showMessages.messagePaint(this.state, this.context, this.props))),
            react_1.default.createElement("form", { className: "grid grid-cols-14 justify-items-center content-center row-span-1 h-12 bg-gray-300", method: "post", onSubmit: function (e) {
                    return _this.messageActions.handleNewMessage(e, _this.state, _this.props, _this.contenidoRef, _this.context, _this.newMessage.bind(_this));
                } },
                react_1.default.createElement("div", { className: "container grid justify-items-center content-center col-span-1 text-gray-600" },
                    react_1.default.createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faPaperclip })),
                react_1.default.createElement("div", { className: "container grid grid-cols-12 justify-items-center content-center col-span-13 " },
                    react_1.default.createElement("input", { type: "text", name: "contenido", ref: this.contenidoRef, placeholder: "Escribe un mensaje", className: "col-span-11 w-full text-gray-700 rounded-md p-1 bg-white" }),
                    react_1.default.createElement("button", { className: "text-mar col-span-1 focus:outline-none" },
                        react_1.default.createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faPaperPlane }))))));
    };
    FormMessages.context = contextMessage_1.default;
    return FormMessages;
}(react_1.default.Component));
exports.FormMessages = FormMessages;
//# sourceMappingURL=FormMessage.js.map