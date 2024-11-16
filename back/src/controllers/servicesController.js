const { db } = require("../lib/prisma");

const listServices = async (req, res) => {
  const { establishmentId } = req.body;

  if (!establishmentId) {
    return res
      .status(400)
      .json({ message: "ID do estabelecimento não fornecido!" });
  }

  try {
    const services = await db.barbershopService.findMany({
      where: {
        barbershopId: establishmentId,
      },
    });

    return res.status(200).json({ services });
  } catch (error) {
    console.error("Erro ao buscar serviços:", error);
    return res
      .status(400)
      .json({ message: "Erro ao buscar serviços", error: error.message });
  }
};

module.exports = { listServices };
