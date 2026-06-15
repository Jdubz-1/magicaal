import { Router, type Router as RouterType } from 'express';
import { requireAuth } from '../middleware/auth';
import { evaluateExpression } from '../controllers/evaluate.controller';

export const utilsRouter: RouterType = Router();

utilsRouter.use(requireAuth);

// JSONata expression evaluator used by the Studio Expression Editor
utilsRouter.post('/evaluate', evaluateExpression);
