import Queue from '../lib/Queue';

import Repository from '../Schemas/Repository';

class LikeController {
    async store(req, res) {
        const { id } = req.params;

        const repository = await Repository.findOne({ id });

        if (!repository) {
            return res.status(400).json({ err: 'repository not found' });
        };

        /* Atualizando o dado do Repositorio*/

        const { like } = repository;

        const repositoryUpdated = await repository.update({ like: like + 1 });

        const dataEmail = {
            subject: 'Alguém curtiu o seu Repositório!!',
            text: `Alguém curtiu o ${repository.title} !!`
        };

        Queue.add(dataEmail);

        return res.json({
            title:repository.title,
            like: like + 1
        });

    };
};

export default new LikeController();