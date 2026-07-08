/// <reference types="bun-types" />
import { describe, it, expect, beforeEach } from "bun:test";
import { createAuthenticatedClient } from "../setup/auth";
import { cleanDb } from "../setup/db";
import { prisma } from "@repo/db";

describe("Dashboard API Routes", () => {
  beforeEach(async () => {
    await cleanDb();
  });

  describe("Test 1: Form pagination (GET /api/v1/forms?page=1&limit=3)", () => {
    it("should return paginated forms with correct metadata", async () => {
      const { client, user } = await createAuthenticatedClient();

      // Setup: Seed 5 forms directly using Prisma
      for (let i = 1; i <= 5; i++) {
        await prisma.form.create({
          data: {
            title: `Form ${i}`,
            slug: `form-pagination-${user.id}-${i}`,
            userId: user.id,
          },
        });
      }

      // Act
      const response = await client.get("/api/v1/forms?page=1&limit=3");

      // Assert
      expect(response.status).toBe(200);
      expect(response.data.data.length).toBe(3);
      expect(response.data.meta.total).toBe(5);
      expect(response.data.meta.page).toBe(1);
      expect(response.data.meta.limit).toBe(3);
      expect(response.data.meta.totalPages).toBe(2);
    });
  });

  describe("Test 2: Template ownership filtering (GET /api/v1/templates/owned)", () => {
    it("should return only templates owned by the authenticated user", async () => {
      // Setup: Create two users
      const userA = await createAuthenticatedClient({ email: `userA-${crypto.randomUUID()}@test.com` });
      const userB = await createAuthenticatedClient({ email: `userB-${crypto.randomUUID()}@test.com` });

      const userATitles = ["User A Template 1", "User A Template 2"];

      // Seed 2 templates for User A
      for (let i = 1; i <= 2; i++) {
        await prisma.template.create({
          data: {
            title: `User A Template ${i}`,
            userId: userA.user.id,
            isPublic: false,
          },
        });
      }

      // Seed 2 templates for User B
      for (let i = 1; i <= 2; i++) {
        await prisma.template.create({
          data: {
            title: `User B Template ${i}`,
            userId: userB.user.id,
            isPublic: false,
          },
        });
      }

      // Act: User A fetches owned templates
      const response = await userA.client.get("/api/v1/templates/owned");

      // Assert
      // Verify that only user A's 2 templates are returned
      expect(response.data.data.length).toBe(2);
      response.data.data.forEach((t: any) => {
        expect(userATitles).toContain(t.title);
      });

      // Verify all 4 exist in DB total
      const totalTemplates = await prisma.template.count();
      expect(totalTemplates).toBe(4);
    });
  });
});
