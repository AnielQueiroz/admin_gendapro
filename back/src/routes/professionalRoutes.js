const express = require('express');
const { assignRole, createProfessional } = require('../controllers/professionalController');
const { checkPermission } = require('../middlewares/authMiddleware');

const router = express.Router();

// Rota para criar um novo profissional (somente administradores)
// router.post("/create", checkPermission('create_professional'), createProfessional);
router.post("/create", createProfessional);

// Rota para atribuir um role a um profissional (somente administradores)
router.post("/assign-role", checkPermission('assign_role'), assignRole);

module.exports = router;