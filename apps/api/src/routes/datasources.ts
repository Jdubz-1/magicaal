import { Router, type Router as RouterType } from 'express';
import { requireAuth, requireMinRole } from '../middleware/auth';
import {
  listDataSources,
  getDataSource,
  createDataSource,
  updateDataSource,
  deleteDataSource,
  testDataSource,
} from '../controllers/datasources.controller';

export const datasourcesRouter: RouterType = Router();

datasourcesRouter.use(requireAuth);
datasourcesRouter.use(requireMinRole('developer'));

datasourcesRouter.get('/', listDataSources);
datasourcesRouter.get('/:id', getDataSource);
datasourcesRouter.post('/', createDataSource);
datasourcesRouter.patch('/:id', updateDataSource);
datasourcesRouter.delete('/:id', deleteDataSource);
datasourcesRouter.post('/:id/test', testDataSource);
