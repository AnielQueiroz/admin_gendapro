const express = require("express");
const { listServices } = require("../controllers/servicesController");

const router = express.Router();

// Rota para listar todos os serviços
router.post("/list", listServices);

module.exports = router;
