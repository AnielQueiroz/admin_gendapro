const { db } = require("../src/lib/prisma");

async function main() {
  // Criar permissões
  const permissions = await db.permission.createMany({
    data: [
      { name: "create_user", description: "Criar novos usuários" },
      { name: "view_financials", description: "Visualizar relatórios financeiros" },
      { name: "manage_barbers", description: "Gerenciar barbeiros" },
      { name: "schedule_appointments", description: "Agendar horários" },
    ],
    skipDuplicates: true, // Impede duplicação ao rodar novamente
  });

  console.log("Permissões criadas:", permissions);

  // Criar roles (Admin e Barbeiro) e associar permissões
  const adminRole = await db.role.upsert({
    where: { name: "Admin" },
    update: {}, // Caso já exista, não atualiza nada
    create: {
      name: "Admin",
      permissions: {
        connect: [
          { name: "create_user" },
          { name: "view_financials" },
          { name: "manage_barbers" },
          { name: "schedule_appointments" },
        ],
      },
    },
  });

  const barberRole = await db.role.upsert({
    where: { name: "Barbeiro" },
    update: {},
    create: {
      name: "Barbeiro",
      permissions: {
        connect: [{ name: "schedule_appointments" }], // Apenas agendar horários
      },
    },
  });

  console.log("Roles criados:", { adminRole, barberRole });

  // Criar um profissional (usuário) com o role Admin
  const adminUser = await db.professional.upsert({
    where: { email: "admin@barbearia.com" },
    update: {}, // Caso já exista, não atualiza nada
    create: {
      name: "Carlos Admin",
      email: "admin@barbearia.com",
      password: "senhaSegura123", // Idealmente use hashing para senhas
      phone: "123456789",
      barbershopId: "2196d4b3-4674-4a1e-ac57-2fddc54a76e3", // Coloque o ID correto da barbearia
      role: {
        connect: { name: "Admin" }, // Conectar ao role Admin
      },
    },
  });

  console.log("Usuário Admin criado:", adminUser);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect(); // Fechar conexão com o Prisma
  });
