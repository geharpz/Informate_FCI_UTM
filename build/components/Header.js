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
exports.Header = void 0;
var react_1 = __importDefault(require("react"));
var react_fontawesome_1 = require("@fortawesome/react-fontawesome");
var free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
var Header = (function (_super) {
    __extends(Header, _super);
    function Header(props) {
        return _super.call(this, props) || this;
    }
    Header.prototype.render = function () {
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("header", { className: "grid grid-cols-1 mt-0 sm:grid-cols-2 bg-blackO-200" },
                react_1.default.createElement("div", { className: "grid justify-start content-center p-5" },
                    react_1.default.createElement("a", { href: "#responsive-header", className: "font-sans font-bold hover:text-mar", rel: "noopener noreferrer" },
                        react_1.default.createElement("span", { className: "mr-2" },
                            " ",
                            react_1.default.createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faInfoCircle })),
                        react_1.default.createElement("span", null, this.props.title))),
                react_1.default.createElement("div", { className: "grid justify-items-center sm:justify-items-end  p-5" },
                    react_1.default.createElement("ul", { className: "grid grid-cols-1 justify-items-center content-center sm:grid-cols-2 gap-2" },
                        react_1.default.createElement("li", { className: "text-base hover:text-mar " }, "Mi Perfil"),
                        react_1.default.createElement("li", { className: "text-base hover:text-mar" }, "Cerrar sesion"))))));
    };
    return Header;
}(react_1.default.Component));
exports.Header = Header;
//# sourceMappingURL=Header.js.map