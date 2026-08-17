import { Router } from 'express';
import { standardRateLimiter } from '../../middleware/rate-limit.js';
import { submitContactForm } from './contact.controller.js';

const router = Router();

router.post('/', standardRateLimiter, submitContactForm);

export default router;
