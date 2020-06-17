import { uuid } from 'uuidv4';
import * as yup from 'yup';
import Queue from '../lib/Queue';

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

        const dataEmail = {
            subject: 'Repositório adicionado com Sucesso !!',
            text: `O repositório ${title}, foi adicionado com Sucesso !!`
        };

        Queue.add(dataEmail);

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

        const dataEmail = {
            subject: 'Repositório Atualizado com Sucesso !!',
            text: `O repositório ${repository.title}, foi Atualizado com Sucesso !!`
        };

        Queue.add(dataEmail);

        /* Atualizando o dado do Repositorio*/

        const repositoryUpdated = await repository.update(req.body);

        return res.json(req.body);

    }

    async delete(req, res) {
        const { id } = req.params;

        const repository = await Repository.findOne({ id });

        if (!repository) {
            return res.status(400).json({ err: 'repository not found' });
        };

        await Repository.deleteOne({ id });

        const dataEmail = {
            subject: 'Repositório Deletado com Sucesso !!',
            text: `O repositório ${repository.title}, foi Deletado com Sucesso !!`
        };

        Queue.add(dataEmail);

        return res.status(202).send();
    };
};

export default new Repositoriesontroller();