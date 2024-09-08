const { db } = require('../lib/prisma');

// Rota para criar uma nova permissao
const createPermission = async(req, res) => {
    const { name, description } = req.body;

    try {
        const permission = await db.permission.create({
            data: {
                name,
                description
            },
        });

        return res.status(201).json({ message: 'Permissão criada com sucesso!', permission });
    } catch (error) {
        return res.status(400).json({ message: 'Erro ao criar a permissão', error: error.message });
    }
}

// Rota para buscar todas as permissoes
const getAllPermissions = async(req, res) => {
    try {
        const permissions = await db.permission.findMany();
        res.status(200).json({ permissions });
    } catch (error) {
        return res.status(400).json({ message: 'Erro ao buscar as permissoes', error: error.message });
    }
}

module.exports = { createPermission, getAllPermissions };