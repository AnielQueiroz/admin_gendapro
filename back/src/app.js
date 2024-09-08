const express = require('express');
const app = express();
const port = 3000;
const authRoutes = require('./routes/authRoutes');
const roleRoutes = require('./routes/roleRoutes');
const permissionRoutes = require('./routes/permissionRoutes');
const professionalRoutes = require('./routes/professionalRoutes');

app.use(express.json());

// Rotas
app.use('/auth', authRoutes);
app.use('/role', roleRoutes);
app.use('/permission', permissionRoutes);
app.use('/professional', professionalRoutes);

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})