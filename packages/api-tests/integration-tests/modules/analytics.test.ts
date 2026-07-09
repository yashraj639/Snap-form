/// <reference types="bun-types" />
import { describe, it, expect, beforeEach } from "bun:test";
import { createAuthenticatedClient, createAnonymousClient } from "../setup/auth";
import { cleanDb } from "../setup/db";
import { prisma } from "@repo/db";
import crypto from "crypto";

describe("Form Details and Export API", () => {
    beforeEach(async () => {
        await cleanDb();
    });

    describe("GET /api/v1/forms/:id/analytics", () => {
        it("should successfully increment responseCount in analytics upon response submission", async () => {
            const { client, user } = await createAuthenticatedClient();
            const anonymousClient = createAnonymousClient();
            const formSlug = `analytics-test-form-${crypto.randomUUID()}`;

            // Seed a form with fields definition
            const form = await prisma.form.create({
                data: {
                    title: "Analytics Test Form",
                    slug: formSlug,
                    published: true,
                    userId: user.id,
                    fields: {
                        version: "1.0",
                        elements: [
                            {
                                id: "e2a0ad3a-7c93-4e4b-97e3-5ee14e08c02c",
                                type: "textInput",
                                label: "Full Name",
                                required: true,
                            },
                        ],
                    },
                },
            });

            // 1. Fetch initial analytics
            const analyticsBefore = await client.get(`/api/v1/forms/${form.id}/analytics`);
            expect(analyticsBefore.status).toBe(200);
            expect(analyticsBefore.data.success).toBe(true);
            expect(analyticsBefore.data.data.viewCount).toBe(0);
            expect(analyticsBefore.data.data.responseCount).toBe(0);
            expect(analyticsBefore.data.data.recentResponses.length).toBe(0);

            // 2. Submit a mock response
            const submitResponse = await anonymousClient.post(`/api/v1/public/forms/${form.slug}/responses`, {
                email: "john@example.com",
                data: {
                    "e2a0ad3a-7c93-4e4b-97e3-5ee14e08c02c": "John Doe",
                },
            });
            expect(submitResponse.status).toBe(201);
            expect(submitResponse.data.success).toBe(true);

            // 3. Fetch analytics again and verify incremented count
            const analyticsAfter = await client.get(`/api/v1/forms/${form.id}/analytics`);
            expect(analyticsAfter.status).toBe(200);
            expect(analyticsAfter.data.success).toBe(true);
            expect(analyticsAfter.data.data.viewCount).toBe(0);
            expect(analyticsAfter.data.data.responseCount).toBe(1);
            expect(analyticsAfter.data.data.recentResponses.length).toBe(1);
            expect(analyticsAfter.data.data.recentResponses[0].email).toBe("john@example.com");
        });
    });

    describe("GET /api/v1/forms/:id/responses/export/csv", () => {
        it("should return a valid CSV file representing responses", async () => {
            const { client, user } = await createAuthenticatedClient();
            const anonymousClient = createAnonymousClient();
            const formSlug = `csv-export-test-form-${crypto.randomUUID()}`;

            const form = await prisma.form.create({
                data: {
                    title: "CSV Export Test Form",
                    slug: formSlug,
                    published: true,
                    userId: user.id,
                    fields: {
                        version: "1.0",
                        elements: [
                            {
                                id: "e2a0ad3a-7c93-4e4b-97e3-5ee14e08c02c",
                                type: "textInput",
                                label: "Full Name",
                                required: true,
                            },
                            {
                                id: "1c390547-195b-4395-8854-3e9a11707ef5",
                                type: "textInput",
                                label: "Company",
                                required: false,
                            },
                        ],
                    },
                },
            });

            // Submit Response 1
            const submitResponse1 = await anonymousClient.post(`/api/v1/public/forms/${form.slug}/responses`, {
                email: "alice@example.com",
                data: {
                    "e2a0ad3a-7c93-4e4b-97e3-5ee14e08c02c": "Alice Smith",
                    "1c390547-195b-4395-8854-3e9a11707ef5": "Google",
                },
            });
            expect(submitResponse1.status).toBe(201);
            expect(submitResponse1.data.success).toBe(true);

            // Submit Response 2
            const submitResponse2 = await anonymousClient.post(`/api/v1/public/forms/${form.slug}/responses`, {
                email: "bob@example.com",
                data: {
                    "e2a0ad3a-7c93-4e4b-97e3-5ee14e08c02c": "Bob Johnson",
                    "1c390547-195b-4395-8854-3e9a11707ef5": "DeepMind",
                },
            });
            expect(submitResponse2.status).toBe(201);
            expect(submitResponse2.data.success).toBe(true);


            // Export CSV
            const exportResponse = await client.get(`/api/v1/forms/${form.id}/responses/export/csv`);
            expect(exportResponse.status).toBe(200);
            expect(exportResponse.headers["content-type"]).toContain("text/csv");
            expect(exportResponse.headers["content-disposition"]).toContain(`attachment; filename="form-${form.slug}-responses.csv"`);

            const csvData = exportResponse.data as string;
            const lines = csvData.trim().split("\n");

            // We expect 3 lines: 1 header + 2 responses
            expect(lines.length).toBe(3);

            // Verify each row has exactly 5 columns
            const elements = (form.fields as { elements: unknown[] }).elements;
            const expectedColumnCount = 3 + elements.length;
            lines.forEach((line) => {
                const columns = line.match(/(".*?"|[^,]+)(?=\s*,|\s*$)/g) || [];
                expect(columns.length).toBe(expectedColumnCount);
            });

            // Header verification: "id","email","submittedAt","Full Name","Company"
            const headerLine = lines[0];
            expect(headerLine).toContain('"id"');
            expect(headerLine).toContain('"email"');
            expect(headerLine).toContain('"submittedAt"');
            expect(headerLine).toContain('"Full Name"');
            expect(headerLine).toContain('"Company"');

            // Row verification
            const aliceRow = lines.find(line => line.includes("alice@example.com"));
            expect(aliceRow).not.toBeUndefined();
            expect(aliceRow).toContain('"Alice Smith"');
            expect(aliceRow).toContain('"Google"');

            const bobRow = lines.find(line => line.includes("bob@example.com"));
            expect(bobRow).not.toBeUndefined();
            expect(bobRow).toContain('"Bob Johnson"');
            expect(bobRow).toContain('"DeepMind"');
        });
    });
});