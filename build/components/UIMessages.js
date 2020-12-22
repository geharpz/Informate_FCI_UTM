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
exports.UIMessages = void 0;
var react_1 = __importDefault(require("react"));
var Groups_1 = require("./Groups");
var FormMessage_1 = require("./FormMessage");
var contextMessage_1 = __importDefault(require("../context/contextMessage"));
FormMessage_1.FormMessages.contextType = contextMessage_1.default;
Groups_1.Groups.contextType = contextMessage_1.default;
var UIMessages = (function (_super) {
    __extends(UIMessages, _super);
    function UIMessages(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            id_usuario: 3,
            id_grupo: 0,
            group: "",
            foto: "",
            user: "geharpz",
            tipo_usuario: "ESTUDIANTE",
        };
        return _this;
    }
    UIMessages.prototype.componentDidMount = function () { };
    UIMessages.prototype.render = function () {
        if (this.state.id_grupo != 0) {
            return (react_1.default.createElement("div", { className: "contFM grid grid-cols-12 gap-2 m-auto mt-16 w-8/12 h-screen2" },
                react_1.default.createElement(Groups_1.Groups, { id_usuario: this.state.id_usuario, id_grupo: this.state.id_grupo, group: this.state.group, foto: this.state.foto, user: this.state.user, setInfo: this.setState.bind(this) }),
                react_1.default.createElement("div", { className: "mainCont grid col-span-8 border border-solid border-blackO-100 " },
                    react_1.default.createElement(FormMessage_1.FormMessages, { key: this.state.id_grupo, id_usuario: this.state.id_usuario, id_grupo: this.state.id_grupo, group: this.state.group, foto: this.state.foto, user: this.state.user, tipo_usuario: this.state.tipo_usuario }))));
        }
        else {
            return (react_1.default.createElement("div", { className: "contFM grid grid-cols-12 gap-2 m-auto mt-16 w-8/12 h-screen2" },
                react_1.default.createElement(Groups_1.Groups, { id_usuario: this.state.id_usuario, id_grupo: this.state.id_grupo, group: this.state.group, foto: this.state.foto, user: this.state.user, setInfo: this.setState.bind(this) }),
                react_1.default.createElement("div", { className: "grid col-span-8 border border-solid border-blackO-100 " },
                    react_1.default.createElement("div", { className: "contMVoid w-full row-span-11" },
                        react_1.default.createElement("div", null,
                            react_1.default.createElement("img", { src: "../../public/Img/fci.png", alt: "Escudo de FCI" }))))));
        }
    };
    return UIMessages;
}(react_1.default.Component));
exports.UIMessages = UIMessages;
//# sourceMappingURL=UIMessages.js.map