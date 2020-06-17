import { uuid } from 'uuidv4';
import * as yup from 'yup';

import Repository from '../Schemas/Repository';

class Repositoriesontroller {
    async index(req, res) {
        const repositorys = await Repository.find();

        return res.json(repositorys);
    }

    async store(req, res) {
        const schema = yup.object().shape({
            title: yup.string().required(),
            url: yup.string().required(),
            techs: yup.array().min(1).required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ err: 'missing info to register' });
        }

        /*
            Preparando para cadastrar o repositório
         */

        const { title, url, techs } = req.body;

        const dataRepository = {
            id: uuid(),
            title,
            url,
            techs,
            like: 0
        }

        const repository = await Repository.create(dataRepository);

        return res.json(repository);
    }

    async updated(req, res) {
        const schema = yup.object().shape({
            title: yup.string(),
            url: yup.string(),
            techs: yup.array().min(1),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ err: 'missing info to register' });
        }

        const { title, url, techs } = req.body;

        /**
         *Procurando todos os repositórios
         */

        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ err: 'missing id from repository' });
        }

        const repository = await Repository.findOne({ id });

        /* Verificando se o repositorio existe */
        if (!repository) {
            return res.status(400).json({ err: 'repository not found' });
        }

        /* Atualizando o dado do Repositorio*/

        const repositoryUpdated = await repository.update(req.body);

        return res.json(req.body);

    }
};

export default new Repositoriesontroller();