const { db } = require('../lib/prisma');

// Middleware para verificar se o usuario tem a permissao necessaria
const checkPermission = (permissionName) => {
    return async (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: 'Acesso negado!' });
        }
        
        const professionalId = req.user.id;

        try {
            const professional = await db.professional.findUnique({
                where: {
                    id: professionalId
                },
                include: {
                    role: {
                        include: {
                            permissions: true
                        }
                    },
                    permissions: true
                },
            });

            const hasPermission = professional?.role?.permissions.some((p) => p.name === permissionName) || professional?.permissions.some((p) => p.name === permissionName);

            if (!hasPermission) {
                next();
            } else {
                return res.status(403).json({ message: 'Acesso negado!' });
            }
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao verificar permissão', error: error.message });
        }
    }
}

module.exports = { checkPermission };