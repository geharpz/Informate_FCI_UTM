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
exports.Prueba = void 0;
var react_1 = __importDefault(require("react"));
var Prueba = (function (_super) {
    __extends(Prueba, _super);
    function Prueba() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Prueba.prototype.render = function () {
        console.log('reddd');
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("h1", null, "render 11")));
    };
    return Prueba;
}(react_1.default.Component));
exports.Prueba = Prueba;
//# sourceMappingURL=prueba.js.map