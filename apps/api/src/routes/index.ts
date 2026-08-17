import { Router } from 'express';
import healthRoutes from '../modules/health/health.routes.js';
import contactRoutes from '../modules/contact/contact.routes.js';

/**
 * Central route registry for /api/v1.
 * New modules are wired in here — see apps/api/AGENTS.md.
 */
const router = Router();

router.use('/health', healthRoutes);
router.use('/contact', contactRoutes);

export default router;
