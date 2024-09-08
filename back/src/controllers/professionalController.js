const { db } = require('../lib/prisma');

// Controller para criar um novo profissional
const createProfessional = async (req, res) => {
    const { name, email, password, confirmPassword, phone, establishmentId, roleId } = req.body;

    if (!name || !email || !password || !establishmentId || !phone || !roleId) {
        return res.status(400).json({ message: 'Todos os campos sao obrigatórios!' });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'As senhas precisam ser iguais!' });
    }

    // TODO: Criptar a senha

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
                password,
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

module.exports = { assignRole, createProfessional };