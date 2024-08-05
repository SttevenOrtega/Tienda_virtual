import { Router } from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/product.controller.js';
import { authRequired } from '../middlewares/validateToken.js';
import { checkRole } from '../middlewares/role.middleware.js';

const router = Router();

router.get('/products', getProducts);
router.get('/products/:id', getProductById);
router.post('/products', authRequired, checkRole(['admin']), createProduct);
router.put('/products/:id', authRequired, checkRole(['admin']), updateProduct);
router.delete('/products/:id', authRequired, checkRole(['admin']), deleteProduct);

export default router;
