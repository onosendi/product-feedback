import express from 'express';
import { loginPost } from './controllers';

const router = express.Router();

router.route('/token').post(loginPost);

export default router;
