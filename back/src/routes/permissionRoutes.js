const express = require('express');
const { createPermission,getAllPermissions } = require('../controllers/permissionController');
const { checkPermission } = require('../middlewares/authMiddleware');

const router = express.Router();

// Rota para criar uma nova permissão (somente administradores)
router.post('/create', checkPermission('create_permission'), createPermission);

// Rota para buscar todas as permissoes
router.get('/list-all', getAllPermissions);

module.exports = router;