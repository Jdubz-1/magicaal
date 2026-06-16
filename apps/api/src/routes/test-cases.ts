import { Router, type Router as RouterType } from 'express';
import { requireAuth, requireMinRole } from '../middleware/auth';
import {
  listTestCases,
  createTestCase,
  updateTestCase,
  deleteTestCase,
  runTestSuite,
} from '../controllers/test-cases.controller';

export const testCasesRouter: RouterType = Router({ mergeParams: true });

testCasesRouter.get('/', requireAuth, listTestCases);
testCasesRouter.post('/', requireAuth, requireMinRole('developer'), createTestCase);
testCasesRouter.put('/:cid', requireAuth, requireMinRole('developer'), updateTestCase);
testCasesRouter.delete('/:cid', requireAuth, requireMinRole('developer'), deleteTestCase);
testCasesRouter.post('/run', requireAuth, requireMinRole('developer'), runTestSuite);
