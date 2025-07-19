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
exports.registerRoutes = registerRoutes;
var http_1 = require("http");
var storage_js_1 = require("./storage.js");
var schema_js_1 = require("./schema.js");
var zod_1 = require("zod");
function registerRoutes(app) {
    return __awaiter(this, void 0, void 0, function () {
        var httpServer;
        var _this = this;
        return __generator(this, function (_a) {
            // Get all inspections
            app.get("/api/inspections", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var inspections, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, storage_js_1.storage.getInspections()];
                        case 1:
                            inspections = _a.sent();
                            res.json(inspections);
                            return [3 /*break*/, 3];
                        case 2:
                            error_1 = _a.sent();
                            res.status(500).json({ message: "Failed to fetch inspections" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            // Get single inspection
            app.get("/api/inspections/:id", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var id, inspection, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            id = parseInt(req.params.id);
                            return [4 /*yield*/, storage_js_1.storage.getInspection(id)];
                        case 1:
                            inspection = _a.sent();
                            if (!inspection) {
                                return [2 /*return*/, res.status(404).json({ message: "Inspection not found" })];
                            }
                            res.json(inspection);
                            return [3 /*break*/, 3];
                        case 2:
                            error_2 = _a.sent();
                            res.status(500).json({ message: "Failed to fetch inspection" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            // Create inspection
            app.post("/api/inspections", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var validatedData, inspection, error_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            validatedData = schema_js_1.insertInspectionSchema.parse(req.body);
                            return [4 /*yield*/, storage_js_1.storage.createInspection(validatedData)];
                        case 1:
                            inspection = _a.sent();
                            res.status(201).json(inspection);
                            return [3 /*break*/, 3];
                        case 2:
                            error_3 = _a.sent();
                            if (error_3 instanceof zod_1.z.ZodError) {
                                return [2 /*return*/, res.status(400).json({
                                        message: "Invalid inspection data",
                                        errors: error_3.errors,
                                    })];
                            }
                            res.status(500).json({ message: "Failed to create inspection" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            // Update inspection
            app.patch("/api/inspections/:id", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var id, validatedData, inspection, error_4;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            id = parseInt(req.params.id);
                            validatedData = schema_js_1.insertInspectionSchema.partial().parse(req.body);
                            return [4 /*yield*/, storage_js_1.storage.updateInspection(id, validatedData)];
                        case 1:
                            inspection = _a.sent();
                            if (!inspection) {
                                return [2 /*return*/, res.status(404).json({ message: "Inspection not found" })];
                            }
                            res.json(inspection);
                            return [3 /*break*/, 3];
                        case 2:
                            error_4 = _a.sent();
                            if (error_4 instanceof zod_1.z.ZodError) {
                                return [2 /*return*/, res.status(400).json({
                                        message: "Invalid inspection data",
                                        errors: error_4.errors,
                                    })];
                            }
                            res.status(500).json({ message: "Failed to update inspection" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            // Delete inspection
            app.delete("/api/inspections/:id", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var id, success, error_5;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            id = parseInt(req.params.id);
                            return [4 /*yield*/, storage_js_1.storage.deleteInspection(id)];
                        case 1:
                            success = _a.sent();
                            if (!success) {
                                return [2 /*return*/, res.status(404).json({ message: "Inspection not found" })];
                            }
                            res.status(204).send();
                            return [3 /*break*/, 3];
                        case 2:
                            error_5 = _a.sent();
                            res.status(500).json({ message: "Failed to delete inspection" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            // ===== USER MANAGEMENT ENDPOINTS =====
            // Get all users
            app.get("/api/users", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var users, error_6;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, storage_js_1.storage.getUsers()];
                        case 1:
                            users = _a.sent();
                            res.json(users);
                            return [3 /*break*/, 3];
                        case 2:
                            error_6 = _a.sent();
                            res.status(500).json({ message: "Failed to fetch users" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            // Get single user
            app.get("/api/users/:id", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var id, user, error_7;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            id = parseInt(req.params.id);
                            return [4 /*yield*/, storage_js_1.storage.getUser(id)];
                        case 1:
                            user = _a.sent();
                            if (!user) {
                                return [2 /*return*/, res.status(404).json({ message: "User not found" })];
                            }
                            res.json(user);
                            return [3 /*break*/, 3];
                        case 2:
                            error_7 = _a.sent();
                            res.status(500).json({ message: "Failed to fetch user" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            // Create user
            app.post("/api/users", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var validatedData, user, error_8;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            validatedData = schema_js_1.insertUserSchema.parse(req.body);
                            return [4 /*yield*/, storage_js_1.storage.createUser(validatedData)];
                        case 1:
                            user = _a.sent();
                            res.status(201).json(user);
                            return [3 /*break*/, 3];
                        case 2:
                            error_8 = _a.sent();
                            if (error_8 instanceof zod_1.z.ZodError) {
                                return [2 /*return*/, res.status(400).json({
                                        message: "Invalid user data",
                                        errors: error_8.errors,
                                    })];
                            }
                            res.status(500).json({ message: "Failed to create user" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            // Update user
            app.patch("/api/users/:id", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var id, validatedData, user, error_9;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            id = parseInt(req.params.id);
                            validatedData = schema_js_1.insertUserSchema.partial().parse(req.body);
                            return [4 /*yield*/, storage_js_1.storage.updateUser(id, validatedData)];
                        case 1:
                            user = _a.sent();
                            if (!user) {
                                return [2 /*return*/, res.status(404).json({ message: "User not found" })];
                            }
                            res.json(user);
                            return [3 /*break*/, 3];
                        case 2:
                            error_9 = _a.sent();
                            if (error_9 instanceof zod_1.z.ZodError) {
                                return [2 /*return*/, res.status(400).json({
                                        message: "Invalid user data",
                                        errors: error_9.errors,
                                    })];
                            }
                            res.status(500).json({ message: "Failed to update user" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            // Delete user
            app.delete("/api/users/:id", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var id, success, error_10;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            id = parseInt(req.params.id);
                            return [4 /*yield*/, storage_js_1.storage.deleteUser(id)];
                        case 1:
                            success = _a.sent();
                            if (!success) {
                                return [2 /*return*/, res.status(404).json({ message: "User not found" })];
                            }
                            res.status(204).send();
                            return [3 /*break*/, 3];
                        case 2:
                            error_10 = _a.sent();
                            res.status(500).json({ message: "Failed to delete user" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            // ===== UTILITY ENDPOINTS =====
            // Health check
            app.get("/api/health", function (req, res) {
                res.json({
                    status: "ok",
                    timestamp: new Date().toISOString(),
                    uptime: process.uptime(),
                });
            });
            // API info
            app.get("/api", function (req, res) {
                res.json({
                    name: "Demo Inspec Express API",
                    version: "1.0.0",
                    endpoints: {
                        inspections: {
                            "GET /api/inspections": "Get all inspections",
                            "GET /api/inspections/:id": "Get single inspection",
                            "POST /api/inspections": "Create inspection",
                            "PATCH /api/inspections/:id": "Update inspection",
                            "DELETE /api/inspections/:id": "Delete inspection",
                        },
                        users: {
                            "GET /api/users": "Get all users",
                            "GET /api/users/:id": "Get single user",
                            "POST /api/users": "Create user",
                            "PATCH /api/users/:id": "Update user",
                            "DELETE /api/users/:id": "Delete user",
                        },
                        utility: {
                            "GET /api/health": "Health check",
                            "GET /api": "API information",
                        },
                    },
                });
            });
            // Search inspections by location
            app.get("/api/inspections/search/location/:location", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var location_1, inspections, error_11;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            location_1 = req.params.location;
                            return [4 /*yield*/, storage_js_1.storage.searchInspectionsByLocation(location_1)];
                        case 1:
                            inspections = _a.sent();
                            res.json(inspections);
                            return [3 /*break*/, 3];
                        case 2:
                            error_11 = _a.sent();
                            res.status(500).json({ message: "Failed to search inspections" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            // Get inspections by inspector
            app.get("/api/inspections/inspector/:inspector", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var inspector, inspections, error_12;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            inspector = req.params.inspector;
                            return [4 /*yield*/, storage_js_1.storage.getInspectionsByInspector(inspector)];
                        case 1:
                            inspections = _a.sent();
                            res.json(inspections);
                            return [3 /*break*/, 3];
                        case 2:
                            error_12 = _a.sent();
                            res.status(500).json({ message: "Failed to fetch inspections by inspector" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            // Get inspection statistics
            app.get("/api/inspections/stats", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var stats, error_13;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, storage_js_1.storage.getInspectionStats()];
                        case 1:
                            stats = _a.sent();
                            res.json(stats);
                            return [3 /*break*/, 3];
                        case 2:
                            error_13 = _a.sent();
                            res.status(500).json({ message: "Failed to fetch inspection statistics" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            httpServer = (0, http_1.createServer)(app);
            return [2 /*return*/, httpServer];
        });
    });
}
