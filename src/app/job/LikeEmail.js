import Mail from '../lib/Mail';

export default {
    key: 'LikeEmail',
    async handle({ data }) {
        const { subject, text } = data;

        await Mail.sendMail({
            from: 'Desafio 1<desafio1@desafio1.com.br>',
            to: `Leandro <leandro@rocketseat.com>`,
            subject: `${subject}`,
            html: text,
        });
    }
};