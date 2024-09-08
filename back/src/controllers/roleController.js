const { connect } = require('http2');
const { db } = require('../lib/prisma');

// Controller para criar um novo role
const createRole = async (req, res) => {
    const { name, permissions } = req.body;

    if (!name) {
        return res.status(400).json({ message: "Nome do cargo é obrigatorio!" });
    }

    try {
        const role = await db.role.create({
            data: {
                name
            },
        });
        res.status(201).json({ message: 'Cargo criado com sucesso!', role });
    } catch (error) {
        return res.status(400).json({ message: "Erro ao criar o role", error: error.message });
    }
}

const assignPermissions = async (req, res) => {
    const { roleId } = req.params;
    const { permissions } = req.body; // IDs das permissoes recebidas na requisição

    try {
        const permissionsData = await db.permission.findMany({
            where: {
                id: {
                    in: permissions // Filtra as permissoes que serão passadas na requisição
                },
            },
        });

        // Atualiza o role, conectando as novas permissoes
        const updatedRole = await db.role.update({
            where: {
                id: roleId
            },
            data: {
                permissions: {
                    set: [], // Limpa as permissoes anteriores
                    connect: permissionsData.map((p) => ({ id: p.id })), // Conecta as novas permissoes
                },
            },
            include: {
                permissions: true // Inclui as permissoes atualizadas
            }
        });

        return res.status(200).json({ message: 'Permissões atribuídas com sucesso!', role: updatedRole });
    } catch (error) {
        return res.status(400).json({ message: 'Erro ao atribuir as permissoes', error: error.message });
    }

}

// Controller para buscar todos os roles
const getAllRoles = async (req, res) => {
    try {
        const roles = await db.role.findMany();
        res.status(200).json({ roles });
    } catch (error) {
        return res.status(400).json({ message: "Erro ao buscar os roles", error: error.message });
    }
}

// Controller para buscar um role pelo ID
const getRoleById = async (req, res) => {
    const { roleId } = req.params;

    try {
        const role = await db.role.findUnique({ 
            where: { 
                id: roleId 
            },
            include: {
                permissions: true
            } 
        });
        res.status(200).json({ role });
    } catch (error) {
        return res.status(400).json({ message: "Erro ao buscar o role", error: error.message });
    }
}

module.exports = { createRole, assignPermissions, getAllRoles, getRoleById };