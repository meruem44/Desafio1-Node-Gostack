import { Router } from 'express';

const routes = Router();

import RepositoryController from './app/Controllers/RepositoryController';

routes.post('/repositories', RepositoryController.store);
routes.get('/repositories', RepositoryController.index);
routes.put('/repositories/:id', RepositoryController.updated);

export default routes;