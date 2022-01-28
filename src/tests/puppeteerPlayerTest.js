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
exports.__esModule = true;
var puppeteer = require("puppeteer");
var baseUrl = "http://localhost:3000/";
var movesArray = [
    [2, 5],
    [3, 6],
    [5, 6],
    [4, 5],
    [3, 6],
    [4, 7],
    [6, 5],
    [5, 6],
    [4, 7],
    [6, 5],
    [7, 4],
    [5, 6],
    [2, 3],
    [3, 2],
    [5, 2],
    [4, 3],
    [1, 6],
    [2, 5],
    [4, 3],
    [3, 4],
    [2, 5],
    [4, 3],
    [4, 3],
    [6, 5],
    [7, 6],
    [5, 4],
    [1, 4],
    [2, 5],
    [4, 5],
    [3, 6],
    [2, 7],
    [4, 5],
    [5, 4],
    [3, 6],
    [3, 6],
    [1, 4],
    [0, 3],
    [2, 5],
    [5, 6],
    [4, 7],
    [2, 5],
    [3, 6],
    [4, 7],
    [2, 5],
    [0, 7],
    [1, 6],
    [2, 5],
    [0, 7],
    [0, 5],
    [1, 6],
    [0, 7],
    [2, 5],
    [3, 2],
    [4, 3],
    [6, 1],
    [5, 2],
    [4, 3],
    [6, 1],
    [7, 0],
    [5, 2],
    [2, 1],
    [3, 2],
    [7, 2],
    [6, 1],
    [1, 2],
    [2, 3],
    [5, 2],
    [4, 3],
    [3, 2],
    [5, 4],
    [5, 4],
    [7, 2],
    [2, 5],
    [1, 4],
    [1, 0],
    [2, 1],
    [1, 4],
    [3, 2],
    [3, 2],
    [1, 0],
    [0, 1],
    [1, 2],
    [6, 1],
    [5, 2],
    [7, 2],
    [6, 1],
    [5, 2],
    [4, 3],
    [1, 2],
    [2, 3],
    [5, 0],
    [4, 1],
    [6, 1],
    [5, 2],
    [6, 7],
    [5, 6],
    [5, 2],
    [3, 4],
    [4, 1],
    [3, 0],
    [2, 3],
    [3, 2],
    [3, 0],
    [2, 1],
    [3, 2],
    [4, 3],
    [2, 1],
    [1, 2],
    [4, 3],
    [5, 4],
    [1, 2],
    [0, 3],
    [5, 4],
    [6, 5],
    [5, 6],
    [4, 5],
    [3, 4],
    [5, 6],
    [0, 3],
    [1, 4],
];
var testPlaying = function (movesArray) { return __awaiter(void 0, void 0, void 0, function () {
    var browser, page, _i, movesArray_1, location_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, puppeteer.launch({ headless: false, slowMo: 5 })];
            case 1:
                browser = _a.sent();
                return [4 /*yield*/, browser.newPage()];
            case 2:
                page = _a.sent();
                return [4 /*yield*/, page.goto(baseUrl)];
            case 3:
                _a.sent();
                _i = 0, movesArray_1 = movesArray;
                _a.label = 4;
            case 4:
                if (!(_i < movesArray_1.length)) return [3 /*break*/, 7];
                location_1 = movesArray_1[_i];
                return [4 /*yield*/, page.click("[id=\"".concat(location_1[0], "-").concat(location_1[1], "\"]"))];
            case 5:
                _a.sent();
                _a.label = 6;
            case 6:
                _i++;
                return [3 /*break*/, 4];
            case 7: return [2 /*return*/];
        }
    });
}); };
testPlaying(movesArray);
