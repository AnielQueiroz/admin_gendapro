const { db } = require('../lib/prisma');
const bcrypt = require('bcrypt');
require('dotenv').config();

const saltRounds = parseInt(process.env.SALT_ROUNDS)

// Controller para criar um novo profissional
const createProfessional = async (req, res) => {
    const { name, email, password, confirmPassword, phone, establishmentId, roleId } = req.body;

    if (!name || !email || !password || !establishmentId || !phone || !roleId) {
        return res.status(400).json({ message: 'Todos os campos sao obrigatórios!' });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'As senhas precisam ser iguais!' });
    }

    const estabelecimento = await db.barbershop.findUnique({
        where: {
            id: establishmentId
        }
    })

    if (!estabelecimento) {
        return res.status(400).json({ message: 'Estabelecimento não encontrado!' });
    }

    // TODO: Criptar a senha
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Checar se existe um profissional com o mesmo email
    const professionalExists = await db.professional.findUnique({
        where: {
            email: email
        }
    })

    if (professionalExists) {
        return res.status(400).json({ message: 'Profissional com esse email já existe!' });
    }

    try {
        const professional = await db.professional.create({
            data: {
                name,
                email,
                password: hashedPassword,
                phone,
                barbershopId: establishmentId,
                roleId
            }
        });

        return res.status(201).json({ message: 'Profissional criado com sucesso!', professional });
    } catch (error) {
        return res.status(400).json({ message: 'Erro ao criar o profissional', error: error.message });
    }
}

// Controller para listar todos os professionais de um estabelecimento
const listProfessionals = async (req, res) => {
    const { establishmentId } = req.body;

    if (!establishmentId) {
        return res.status(400).json({ message: 'ID do estabelecimento não fornecido!' });
    }

    try {
        const professionals = await db.professional.findMany({
            where: {
                barbershopId: establishmentId
            },
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                barbershopId: true,
                roleId: true,
                role: true
            }
        })

        return res.status(200).json({ professionals });
    } catch (error) {
        return res.status(400).json({ message: 'Erro ao listar os profissionais', error: error.message });
    }
}

const listProfessionalById = async (req, res) => {
    const { professional } = req.params;
    const { establishmentId } = req.body;

    if (!establishmentId) {
        return res.status(400).json({ message: 'ID do estabelecimento não fornecido!' });
    }

    if (!professional) {
        return res.status(400).json({ message: 'ID do profissional não fornecido!' });
    }

    try {
        const professional = await db.professional.findUnique({
            where: {
                id: professional,
                barbershopId: establishmentId
            },
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                barbershopId: true,
                roleId: true,
                role: true
            }
        })

        return res.status(200).json({ professional });
    } catch (error) {
        return res.status(400).json({ message: 'Erro ao listar os profissionais', error: error.message });
    }
}

// Controller para associar um role a um profissional
const assignRole = async (req, res) => {
    const { professionalId, roleId } = req.body;

    try {
        const professional = await db.professional.update({
            where: {
                id: professionalId
            },
            data: {
                roleId
            },
        });

        return res.status(200).json({ message: 'Role atribuída com sucesso!', professional });
    } catch (error) {
        return res.status(400).json({ message: 'Erro ao atribuir a role', error: error.message });
    }
}

module.exports = { assignRole, createProfessional, listProfessionals, listProfessionalById };