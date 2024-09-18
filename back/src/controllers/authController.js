const { db } = require('../lib/prisma');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Função para verificar a senha fornecida
async function checkPassword(providedPassword, storedHash) {
    try {
        const match = await bcrypt.compare(providedPassword, storedHash);
        if (match) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Erro ao comparar a senha:', error);
        return false;
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email e senha obrigatórias!' });
    }

    try {
        const professional = await db.professional.findUnique({
            where: {
                email
            },
            select: {
                id: true,
                name: true,
                email: true,
                password: true,
                barbershopId: true
            }
        });

        if (!professional) {
            return res.status(401).json({ message: 'Usuário não encontrado!' });
        }

        // Aqui você pode verificar a senha se necessário
        const isPasswordValid = await checkPassword(password, professional.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Senha incorreta!' });
        }

        // Excluir a senha da resposta
        const { password: _, ...responseProfessional } = professional;

        return res.json({ message: 'Login bem-sucedido!', responseProfessional });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Erro interno do servidor', error: error.message });
    }
}

module.exports = { login };