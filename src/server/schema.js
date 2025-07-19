"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertInspectionSchema = exports.insertUserSchema = exports.inspections = exports.users = void 0;
var pg_core_1 = require("drizzle-orm/pg-core");
var zod_1 = require("zod");
exports.users = (0, pg_core_1.pgTable)("users", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    username: (0, pg_core_1.text)("username").notNull().unique(),
    password: (0, pg_core_1.text)("password").notNull(),
});
exports.inspections = (0, pg_core_1.pgTable)("inspections", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    inspectedBy: (0, pg_core_1.text)("inspected_by").notNull(),
    date: (0, pg_core_1.text)("date").notNull(),
    extinguisherId: (0, pg_core_1.text)("extinguisher_id").notNull(),
    location: (0, pg_core_1.text)("location").notNull(),
    pressure: (0, pg_core_1.text)("pressure"),
    condition: (0, pg_core_1.text)("condition").notNull(),
    description: (0, pg_core_1.text)("description"),
    photoUrl: (0, pg_core_1.text)("photo_url"),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow().notNull(),
});
exports.insertUserSchema = zod_1.z.object({
    username: zod_1.z.string(),
    password: zod_1.z.string(),
});
exports.insertInspectionSchema = zod_1.z.object({
    inspectedBy: zod_1.z.string(),
    date: zod_1.z.string(),
    extinguisherId: zod_1.z.string(),
    location: zod_1.z.string(),
    pressure: zod_1.z.string().optional(),
    condition: zod_1.z.string(),
    description: zod_1.z.string().optional(),
    photoUrl: zod_1.z.string().optional(),
});
