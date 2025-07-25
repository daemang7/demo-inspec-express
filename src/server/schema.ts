import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const inspections = pgTable("inspections", {
  id: serial("id").primaryKey(),
  inspectedBy: text("inspected_by").notNull(),
  date: text("date").notNull(),
  extinguisherId: text("extinguisher_id").notNull(),
  location: text("location").notNull(),
  pressure: text("pressure"),
  condition: text("condition").notNull(),
  description: text("description"),
  photoUrl: text("photo_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const insertInspectionSchema = z.object({
  inspectedBy: z.string(),
  date: z.string(),
  extinguisherId: z.string(),
  location: z.string(),
  pressure: z.string().optional(),
  condition: z.string(),
  description: z.string().optional(),
  photoUrl: z.string().optional(),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertInspection = z.infer<typeof insertInspectionSchema>;
export type Inspection = typeof inspections.$inferSelect;
