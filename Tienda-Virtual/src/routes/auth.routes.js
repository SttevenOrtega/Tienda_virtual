import { Router } from 'express';
import { login, register, logout, profile, updateProfile, deleteUser, updateUserRole } from "../controllers/auth.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";
import { authRequired } from '../middlewares/validateToken.js';
import { checkRole } from '../middlewares/role.middleware.js';

const router = Router();

router.post("/register", validateSchema(registerSchema), register);
router.post("/login", validateSchema(loginSchema), login);
router.post("/logout", logout);

router.get('/profile', authRequired, profile);
router.put('/profile', authRequired, updateProfile);
router.delete('/delete', authRequired, deleteUser);
router.put('/role', authRequired, checkRole(['admin']), updateUserRole);

export default router;
