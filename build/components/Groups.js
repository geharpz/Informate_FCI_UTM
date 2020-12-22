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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Groups = void 0;
var react_1 = __importDefault(require("react"));
var react_fontawesome_1 = require("@fortawesome/react-fontawesome");
var free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
var groups_actions_1 = require("../actions/groups.actions");
var contextMessage_1 = __importDefault(require("../context/contextMessage"));
var Groups = (function (_super) {
    __extends(Groups, _super);
    function Groups(props) {
        var _this = _super.call(this, props) || this;
        _this.groupsActions = new groups_actions_1.GroupsActions();
        _this.state = {
            groups: [],
        };
        return _this;
    }
    Groups.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.groupsActions.fetchGetGrupsUser(this.props.id_usuario, this.state, this.setState.bind(this))];
                    case 1:
                        _a.sent();
                        this.context.getIO().on("Update state group", function (data) {
                            _this.updateGroups(data.id_grupo, data);
                        });
                        return [2];
                }
            });
        });
    };
    Groups.prototype.updateGroups = function (id_grupo, data) {
        var _this = this;
        this.state.groups.map(function (group, i) {
            if (group.id_grupo === id_grupo) {
                var nuevos = 0;
                if (group.id_grupo != _this.props.id_grupo) {
                    nuevos = group.nuevos + 1;
                }
                var updateGroup = {
                    id_grupo: group.id_grupo,
                    nombre: group.nombre,
                    descipcion: group.descripcion,
                    foto: group.foto,
                    created_at: group.created_at,
                    userContenido: data.user + ": " + data.contenido,
                    nuevos: nuevos,
                };
                var arrayCopy = _this.state.groups;
                arrayCopy.splice(i, 1);
                arrayCopy.unshift(updateGroup);
                _this.setState({ groups: arrayCopy });
            }
        });
    };
    Groups.prototype.selectGroup = function (state) {
        this.props.setInfo({ id_grupo: state.id_grupo });
        this.props.setInfo({ group: state.nombre });
        this.props.setInfo({ foto: state.foto });
        var nuevo = document.getElementById(String("nuevos" + state.id_grupo));
        if (nuevo) {
            nuevo.style.display = "none";
        }
        this.context.getIO().emit("unsubscribe");
    };
    Groups.prototype.groupsPaint = function () {
        var _this = this;
        try {
            return this.state.groups.map(function (group, i) {
                var lastContentM = "Se te añadió al grupo";
                var nuevos = "";
                if (group.user != "") {
                    lastContentM = group.userContenido;
                }
                if (group.nuevos != 0) {
                    nuevos = (react_1.default.createElement("p", { key: "nuevos" + group.id_grupo, id: "nuevos" + group.id_grupo, className: "newMessages" }, group.nuevos));
                }
                return (react_1.default.createElement("button", { key: "Componente" + group.id_grupo, className: "compGroup w-full focus:outline-none", onClick: function (e) { return _this.selectGroup(group); } },
                    react_1.default.createElement("div", { key: "0-" + group.id_grupo, className: "flex flex-col justify-items-center w-1/5  h-full " },
                        react_1.default.createElement("div", { key: "icon-" + group.id_grupo, className: "flex flex-col justify-items-center w-full h-full text-center" },
                            react_1.default.createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faUser, className: "m-auto" }))),
                    react_1.default.createElement("div", { key: "1-" + group.id_grupo, className: "groupComponent" },
                        react_1.default.createElement("p", { key: "n-" + group.id_grupo }, group.nombre),
                        react_1.default.createElement("div", { key: "cont-" + group.id_grupo, className: "contentNew" },
                            react_1.default.createElement("p", null, lastContentM),
                            nuevos))));
            });
        }
        catch (error) {
            return error;
        }
    };
    Groups.prototype.render = function () {
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("div", { className: "contGM grid col-span-4 border border-solid rounded border-blackO-100 overflow-y-scroll" }, this.groupsPaint())));
    };
    Groups.context = contextMessage_1.default;
    return Groups;
}(react_1.default.Component));
exports.Groups = Groups;
//# sourceMappingURL=Groups.js.map