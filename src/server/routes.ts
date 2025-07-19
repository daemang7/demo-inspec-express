import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage.js";
import { insertInspectionSchema, insertUserSchema } from "./schema.js";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all inspections
  app.get("/api/inspections", async (req, res) => {
    try {
      const inspections = await storage.getInspections();
      res.json(inspections);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch inspections" });
    }
  });

  // Get single inspection
  app.get("/api/inspections/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const inspection = await storage.getInspection(id);

      if (!inspection) {
        return res.status(404).json({ message: "Inspection not found" });
      }

      res.json(inspection);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch inspection" });
    }
  });

  // Create inspection
  app.post("/api/inspections", async (req, res) => {
    try {
      const validatedData = insertInspectionSchema.parse(req.body);
      const inspection = await storage.createInspection(validatedData);
      res.status(201).json(inspection);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: "Invalid inspection data",
          errors: error.errors,
        });
      }
      res.status(500).json({ message: "Failed to create inspection" });
    }
  });

  // Update inspection
  app.patch("/api/inspections/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertInspectionSchema.partial().parse(req.body);
      const inspection = await storage.updateInspection(id, validatedData);

      if (!inspection) {
        return res.status(404).json({ message: "Inspection not found" });
      }

      res.json(inspection);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: "Invalid inspection data",
          errors: error.errors,
        });
      }
      res.status(500).json({ message: "Failed to update inspection" });
    }
  });

  // Delete inspection
  app.delete("/api/inspections/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteInspection(id);

      if (!success) {
        return res.status(404).json({ message: "Inspection not found" });
      }

      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete inspection" });
    }
  });

  // ===== USER MANAGEMENT ENDPOINTS =====

  // Get all users
  app.get("/api/users", async (req, res) => {
    try {
      const users = await storage.getUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch users" });
    }
  });

  // Get single user
  app.get("/api/users/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const user = await storage.getUser(id);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Create user
  app.post("/api/users", async (req, res) => {
    try {
      const validatedData = insertUserSchema.parse(req.body);
      const user = await storage.createUser(validatedData);
      res.status(201).json(user);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: "Invalid user data",
          errors: error.errors,
        });
      }
      res.status(500).json({ message: "Failed to create user" });
    }
  });

  // Update user
  app.patch("/api/users/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertUserSchema.partial().parse(req.body);
      const user = await storage.updateUser(id, validatedData);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json(user);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: "Invalid user data",
          errors: error.errors,
        });
      }
      res.status(500).json({ message: "Failed to update user" });
    }
  });

  // Delete user
  app.delete("/api/users/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteUser(id);

      if (!success) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete user" });
    }
  });

  // ===== UTILITY ENDPOINTS =====

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({
      status: "ok",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    });
  });

  // API info
  app.get("/api", (req, res) => {
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
  app.get("/api/inspections/search/location/:location", async (req, res) => {
    try {
      const location = req.params.location;
      const inspections = await storage.searchInspectionsByLocation(location);
      res.json(inspections);
    } catch (error) {
      res.status(500).json({ message: "Failed to search inspections" });
    }
  });

  // Get inspections by inspector
  app.get("/api/inspections/inspector/:inspector", async (req, res) => {
    try {
      const inspector = req.params.inspector;
      const inspections = await storage.getInspectionsByInspector(inspector);
      res.json(inspections);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch inspections by inspector" });
    }
  });

  // Get inspection statistics
  app.get("/api/inspections/stats", async (req, res) => {
    try {
      const stats = await storage.getInspectionStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch inspection statistics" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
