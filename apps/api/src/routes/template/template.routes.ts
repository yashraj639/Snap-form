import { Router } from "express";
import { requireAuth } from "../../middleware/require-auth";
import { getOwnedTemplates } from "../../controllers/template.controller";

const router: Router = Router();

// GET /api/v1/templates/owned
router.get("/owned", requireAuth, getOwnedTemplates);

export default router;
