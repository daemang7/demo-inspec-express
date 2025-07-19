import { users, inspections, type User, type InsertUser, type Inspection, type InsertInspection } from "./schema.js";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getUsers(): Promise<User[]>;
  updateUser(id: number, user: Partial<InsertUser>): Promise<User | undefined>;
  deleteUser(id: number): Promise<boolean>;

  getInspections(): Promise<Inspection[]>;
  getInspection(id: number): Promise<Inspection | undefined>;
  createInspection(inspection: InsertInspection): Promise<Inspection>;
  updateInspection(id: number, inspection: Partial<InsertInspection>): Promise<Inspection | undefined>;
  deleteInspection(id: number): Promise<boolean>;
  searchInspectionsByLocation(location: string): Promise<Inspection[]>;
  getInspectionsByInspector(inspector: string): Promise<Inspection[]>;
  getInspectionStats(): Promise<{
    total: number;
    byCondition: Record<string, number>;
    byInspector: Record<string, number>;
  }>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private inspections: Map<number, Inspection>;
  private currentUserId: number;
  private currentInspectionId: number;

  constructor() {
    this.users = new Map();
    this.inspections = new Map();
    this.currentUserId = 1;
    this.currentInspectionId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find((user) => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = {
      id,
      username: insertUser.username,
      password: insertUser.password,
    };
    this.users.set(id, user);
    return user;
  }

  async getUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  async updateUser(id: number, updateData: Partial<InsertUser>): Promise<User | undefined> {
    const existing = this.users.get(id);
    if (!existing) return undefined;

    const updated: User = { ...existing, ...updateData };
    this.users.set(id, updated);
    return updated;
  }

  async deleteUser(id: number): Promise<boolean> {
    return this.users.delete(id);
  }

  async getInspections(): Promise<Inspection[]> {
    return Array.from(this.inspections.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async getInspection(id: number): Promise<Inspection | undefined> {
    return this.inspections.get(id);
  }

  async createInspection(insertInspection: InsertInspection): Promise<Inspection> {
    const id = this.currentInspectionId++;
    const inspection: Inspection = {
      id,
      inspectedBy: insertInspection.inspectedBy,
      date: insertInspection.date,
      extinguisherId: insertInspection.extinguisherId,
      location: insertInspection.location,
      condition: insertInspection.condition,
      pressure: insertInspection.pressure ?? null,
      description: insertInspection.description ?? null,
      photoUrl: insertInspection.photoUrl ?? null,
      createdAt: new Date(),
    };
    this.inspections.set(id, inspection);
    return inspection;
  }

  async updateInspection(id: number, updateData: Partial<InsertInspection>): Promise<Inspection | undefined> {
    const existing = this.inspections.get(id);
    if (!existing) return undefined;

    const updated: Inspection = { ...existing, ...updateData };
    this.inspections.set(id, updated);
    return updated;
  }

  async deleteInspection(id: number): Promise<boolean> {
    return this.inspections.delete(id);
  }

  async searchInspectionsByLocation(location: string): Promise<Inspection[]> {
    return Array.from(this.inspections.values()).filter((inspection) =>
      inspection.location.toLowerCase().includes(location.toLowerCase())
    );
  }

  async getInspectionsByInspector(inspector: string): Promise<Inspection[]> {
    return Array.from(this.inspections.values()).filter((inspection) =>
      inspection.inspectedBy.toLowerCase().includes(inspector.toLowerCase())
    );
  }

  async getInspectionStats(): Promise<{
    total: number;
    byCondition: Record<string, number>;
    byInspector: Record<string, number>;
  }> {
    const allInspections = Array.from(this.inspections.values());
    const byCondition: Record<string, number> = {};
    const byInspector: Record<string, number> = {};

    allInspections.forEach((inspection) => {
      byCondition[inspection.condition] = (byCondition[inspection.condition] || 0) + 1;
      byInspector[inspection.inspectedBy] = (byInspector[inspection.inspectedBy] || 0) + 1;
    });

    return {
      total: allInspections.length,
      byCondition,
      byInspector,
    };
  }
}

export const storage = new MemStorage();
