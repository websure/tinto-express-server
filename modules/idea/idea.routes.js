import {
    Router
} from 'express';
import * as IdeaController from './idea.controllers';

const routes = new Router();

routes.get('/', IdeaController.getIdeas)
routes.delete('/:id', IdeaController.deleteIdeas)
routes.post('/', IdeaController.addIdeas)
routes.put('/', IdeaController.updateIdeas)

export default routes;