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
var FormMessage_1 = require("./FormMessage");
var groups_actions_1 = require("../actions/groups.actions");
var contextMessage_1 = __importDefault(require("../context/contextMessage"));
FormMessage_1.FormMessages.contextType = contextMessage_1.default;
var UIMessages = (function (_super) {
    __extends(UIMessages, _super);
    function UIMessages() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.groupsActions = new groups_actions_1.GroupsActions();
        return _this;
    }
    UIMessages.prototype.componentDidMount = function () {
    };
    UIMessages.prototype.render = function () {
        return (react_1.default.createElement("div", { className: "contFM grid grid-cols-12 gap-2 m-auto mt-16 w-8/12" },
            react_1.default.createElement("div", { className: "contGM grid col-span-4 border border-solid rounded border-blackO-100 overflow-y-scroll" }),
            react_1.default.createElement("div", { className: "grid col-span-8 border border-solid border-blackO-100 " },
                react_1.default.createElement(FormMessage_1.FormMessages, { id_usuario: 1, id_grupo: 2, user: "geharpz" }))));
    };
    return UIMessages;
}(react_1.default.Component));
exports.UIMessages = UIMessages;
//# sourceMappingURL=UIMessages.js.map