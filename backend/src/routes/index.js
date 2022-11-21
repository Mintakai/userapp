import express from 'express';
import { landingPage } from '../controllers/landing.js';
import { newUser, login } from '../controllers/users.js';

const router = express.Router()

router.get('/', landingPage);
router.post('/newuser', newUser);
router.post('/login', login);

export default router;