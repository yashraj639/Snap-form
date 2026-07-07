/// <reference types="bun-types" />
import { describe, it, expect, beforeEach } from "bun:test";
import { createAuthenticatedClient } from "../setup/auth";
import { cleanDb } from "../setup/db";
import { prisma } from "@repo/db";

describe("Onboarding API", () => {
  beforeEach(async () => {
    await cleanDb();
  });

    it("should save username and socialLinks on successful onboarding", async () => {
    const { client, user } = await createAuthenticatedClient();

    const response = await client.post("/api/v1/user/onboarding", {
      username: "testuser_123",
      socialLinks: {
        x: "https://x.com/testuser",
        linkedin: "https://linkedin.com/in/testuser",
        instagram: "https://instagram.com/testuser",
      },
    });

    // Assert API response
    expect(response.status).toBe(200);
    expect(response.data.success).toBe(true);
    expect(response.data.user.username).toBe("testuser_123");
    expect(response.data.user.onboardingCompleted).toBe(true);

    // Verify it actually persisted in the DB
    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
    });
    expect(dbUser).not.toBeNull();
    expect(dbUser?.username).toBe("testuser_123");
    expect(dbUser?.onboardingCompleted).toBe(true);
  });

    it("should return 409 Conflict when username is already taken", async () => {
    // First user claims the username
    const { client: client1 } = await createAuthenticatedClient();
    await client1.post("/api/v1/user/onboarding", {
      username: "taken_name",
      socialLinks: {},
    });

    // Second user tries the same username
    const { client: client2 } = await createAuthenticatedClient();
    const response = await client2.post("/api/v1/user/onboarding", {
      username: "taken_name",
      socialLinks: {},
    });

    expect(response.status).toBe(409);
    expect(response.data.success).toBe(false);
    expect(response.data.message).toBe("Username is already taken");
  });

});
