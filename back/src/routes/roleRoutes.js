const express = require('express');
const { createRole, assignPermissions, getAllRoles, getRoleById } = require('../controllers/roleController');
const { checkPermission } = require('../middlewares/authMiddleware');

const router = express.Router();

// Rota para criar um novo role (somente administradores)
// router.post('/create', checkPermission('create_role'), createRole);
router.post('/create', createRole);

// Rota para buscar todos os roles
router.get('/list-all', getAllRoles);

// Rota para associar permissões a um role (somente administradores)
// router.patch('/assign-permissions/:roleId', checkPermission('assign_permissions'), assignPermissions);
router.patch('/assign-permissions/:roleId', assignPermissions);

// Rota para buscar um role pelo ID
router.get('/:roleId', getRoleById);

module.exports = router;