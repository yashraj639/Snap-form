import { Router } from "express";
import { requireAuth } from "../../middleware/require-auth";
import { validate } from "../../middleware/validate";
import { CreateTemplateSchema, CreateReviewSchema } from "../../lib/template-schemas";
import {
  createTemplate,
  getCommunityTemplates,
  getOwnedTemplates,
  getTemplateById,
  purchaseTemplate,
  createReview,
} from "../../controllers/template.controller";

const router: Router = Router();

// GET /api/v1/templates/owned — list user's owned templates
// GET /api/v1/templates/community
router.get("/community", getCommunityTemplates);

// GET /api/v1/templates/owned
router.get("/owned", requireAuth, getOwnedTemplates);

// GET /api/v1/templates/:id — fetch template details (requires auth)
router.get("/:id", requireAuth, getTemplateById);

// POST /api/v1/templates — publish a form as a community template
router.post("/", requireAuth, validate(CreateTemplateSchema), createTemplate);

// POST /api/v1/templates/:id/purchase — purchase/clone a template
router.post("/:id/purchase", requireAuth, purchaseTemplate);

// POST /api/v1/templates/:id/reviews — leave a review (requires purchase)
router.post("/:id/reviews", requireAuth, validate(CreateReviewSchema), createReview);

export default router;
