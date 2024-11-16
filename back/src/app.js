const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000;
const authRoutes = require("./routes/authRoutes");
const roleRoutes = require("./routes/roleRoutes");
const permissionRoutes = require("./routes/permissionRoutes");
const professionalRoutes = require("./routes/professionalRoutes");
const serviceRoutes = require("./routes/serviceRoutes");

app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Rotas
app.use("/auth", authRoutes);
app.use("/role", roleRoutes);
app.use("/permission", permissionRoutes);
app.use("/professional", professionalRoutes);
app.use("/services", serviceRoutes);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
