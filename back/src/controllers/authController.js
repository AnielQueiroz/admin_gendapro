const { db } = require('../lib/prisma');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email e senha obrigatórias!' });
    }

    try {
        const user = await db.professional.findUnique({ where: { email } });

        if (!user) {
            return res.status(401).json({ message: 'Usuário não encontrado!' });
        }

        // Aqui você pode verificar a senha se necessário
        // const isPasswordValid = await bcrypt.compare(password, user.password);
        // if (!isPasswordValid) {
        //     return res.status(401).json({ message: 'Senha incorreta!' });
        // }

        return res.json({ message: 'Login bem-sucedido!', user });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
}

module.exports = { login };