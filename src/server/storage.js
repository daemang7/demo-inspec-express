"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage = exports.MemStorage = void 0;
var MemStorage = /** @class */ (function () {
    function MemStorage() {
        this.users = new Map();
        this.inspections = new Map();
        this.currentUserId = 1;
        this.currentInspectionId = 1;
    }
    MemStorage.prototype.getUser = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.users.get(id)];
            });
        });
    };
    MemStorage.prototype.getUserByUsername = function (username) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, Array.from(this.users.values()).find(function (user) { return user.username === username; })];
            });
        });
    };
    MemStorage.prototype.createUser = function (insertUser) {
        return __awaiter(this, void 0, void 0, function () {
            var id, user;
            return __generator(this, function (_a) {
                id = this.currentUserId++;
                user = {
                    id: id,
                    username: insertUser.username,
                    password: insertUser.password,
                };
                this.users.set(id, user);
                return [2 /*return*/, user];
            });
        });
    };
    MemStorage.prototype.getUsers = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, Array.from(this.users.values())];
            });
        });
    };
    MemStorage.prototype.updateUser = function (id, updateData) {
        return __awaiter(this, void 0, void 0, function () {
            var existing, updated;
            return __generator(this, function (_a) {
                existing = this.users.get(id);
                if (!existing)
                    return [2 /*return*/, undefined];
                updated = __assign(__assign({}, existing), updateData);
                this.users.set(id, updated);
                return [2 /*return*/, updated];
            });
        });
    };
    MemStorage.prototype.deleteUser = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.users.delete(id)];
            });
        });
    };
    MemStorage.prototype.getInspections = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, Array.from(this.inspections.values()).sort(function (a, b) { return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(); })];
            });
        });
    };
    MemStorage.prototype.getInspection = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.inspections.get(id)];
            });
        });
    };
    MemStorage.prototype.createInspection = function (insertInspection) {
        return __awaiter(this, void 0, void 0, function () {
            var id, inspection;
            var _a, _b, _c;
            return __generator(this, function (_d) {
                id = this.currentInspectionId++;
                inspection = {
                    id: id,
                    inspectedBy: insertInspection.inspectedBy,
                    date: insertInspection.date,
                    extinguisherId: insertInspection.extinguisherId,
                    location: insertInspection.location,
                    condition: insertInspection.condition,
                    pressure: (_a = insertInspection.pressure) !== null && _a !== void 0 ? _a : null,
                    description: (_b = insertInspection.description) !== null && _b !== void 0 ? _b : null,
                    photoUrl: (_c = insertInspection.photoUrl) !== null && _c !== void 0 ? _c : null,
                    createdAt: new Date(),
                };
                this.inspections.set(id, inspection);
                return [2 /*return*/, inspection];
            });
        });
    };
    MemStorage.prototype.updateInspection = function (id, updateData) {
        return __awaiter(this, void 0, void 0, function () {
            var existing, updated;
            return __generator(this, function (_a) {
                existing = this.inspections.get(id);
                if (!existing)
                    return [2 /*return*/, undefined];
                updated = __assign(__assign({}, existing), updateData);
                this.inspections.set(id, updated);
                return [2 /*return*/, updated];
            });
        });
    };
    MemStorage.prototype.deleteInspection = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.inspections.delete(id)];
            });
        });
    };
    MemStorage.prototype.searchInspectionsByLocation = function (location) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, Array.from(this.inspections.values()).filter(function (inspection) {
                        return inspection.location.toLowerCase().includes(location.toLowerCase());
                    })];
            });
        });
    };
    MemStorage.prototype.getInspectionsByInspector = function (inspector) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, Array.from(this.inspections.values()).filter(function (inspection) {
                        return inspection.inspectedBy.toLowerCase().includes(inspector.toLowerCase());
                    })];
            });
        });
    };
    MemStorage.prototype.getInspectionStats = function () {
        return __awaiter(this, void 0, void 0, function () {
            var allInspections, byCondition, byInspector;
            return __generator(this, function (_a) {
                allInspections = Array.from(this.inspections.values());
                byCondition = {};
                byInspector = {};
                allInspections.forEach(function (inspection) {
                    byCondition[inspection.condition] = (byCondition[inspection.condition] || 0) + 1;
                    byInspector[inspection.inspectedBy] = (byInspector[inspection.inspectedBy] || 0) + 1;
                });
                return [2 /*return*/, {
                        total: allInspections.length,
                        byCondition: byCondition,
                        byInspector: byInspector,
                    }];
            });
        });
    };
    return MemStorage;
}());
exports.MemStorage = MemStorage;
exports.storage = new MemStorage();
