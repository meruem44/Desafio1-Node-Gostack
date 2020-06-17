import { Router } from 'express';

const routes = Router();

import RepositoryController from './app/Controllers/RepositoryController';
import LikeController from './app/Controllers/LikeController';

routes.post('/repositories', RepositoryController.store);
routes.get('/repositories', RepositoryController.index);
routes.put('/repositories/:id', RepositoryController.updated);
routes.delete('/repositories/:id', RepositoryController.delete);

routes.post('/repositories/:id/like', LikeController.store);

export default routes;