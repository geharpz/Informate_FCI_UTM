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
exports.AppContextProvider = void 0;
var react_1 = __importDefault(require("react"));
var socket_io_client_1 = require("socket.io-client");
var javascript_time_ago_1 = __importDefault(require("javascript-time-ago"));
var es_1 = __importDefault(require("javascript-time-ago/locale/es"));
var date_and_time_1 = __importDefault(require("date-and-time"));
javascript_time_ago_1.default.addLocale(es_1.default);
var timeAgo = new javascript_time_ago_1.default("es");
var AppContext = react_1.default.createContext({});
exports.default = AppContext;
var AppContextProvider = (function (_super) {
    __extends(AppContextProvider, _super);
    function AppContextProvider(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            io: null,
            getIO: function () { },
            timeAgo: null,
            getDateTimeNow: function () { },
            getTime: function () { },
            validateCantDay: function () { },
            getStringDate: function () { },
        };
        _this.getIO = function () {
            return _this.state.io;
        };
        _this.manager = new socket_io_client_1.Manager('https://informate-fci.herokuapp.com/');
        _this.socketIO = _this.manager.socket("/");
        _this.state = {
            io: _this.socketIO,
            getIO: _this.getIO,
            timeAgo: timeAgo,
            getDateTimeNow: _this.getDateTimeNow,
            getTime: _this.getTime,
            validateCantDay: _this.validateCantDay,
            getStringDate: _this.getStringDate,
        };
        return _this;
    }
    AppContextProvider.prototype.getDateTimeNow = function (format) {
        return date_and_time_1.default.format(new Date(), format);
    };
    AppContextProvider.prototype.getTime = function (dateM, format) {
        return date_and_time_1.default.format(new Date(dateM), format);
    };
    AppContextProvider.prototype.shouldComponentUpdate = function (prop1, state1) {
        return this.state.getIO !== state1.getIO;
    };
    AppContextProvider.prototype.validateCantDay = function (date) {
        if ((new Date().getTime() - new Date(date).getTime()) / (1000 * 60 * 60 * 24) > 2) {
            return true;
        }
        else {
            return false;
        }
    };
    AppContextProvider.prototype.getStringDate = function (message, yearArray) {
        var year = this.getTime(message, "YYYY/MM/DD").substr(0, 4);
        var month = this.getTime(message, "YYYY/MM/DD").substr(5, 7);
        var day = this.getTime(message, "YYYY/MM/DD").substr(8, 10);
        if (day.substr(0, 1) === '0') {
            day = day.substr(1, 1);
        }
        return day + " DE " + yearArray[parseInt(month) - 1] + " DE " + year;
    };
    AppContextProvider.prototype.render = function () {
        return (react_1.default.createElement(AppContext.Provider, { value: this.state }, this.props.children));
    };
    return AppContextProvider;
}(react_1.default.Component));
exports.AppContextProvider = AppContextProvider;
//# sourceMappingURL=contextMessage.js.map