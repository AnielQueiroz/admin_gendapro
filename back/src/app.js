const express = require('express');
const app = express();
const port = 3000;
const authRoutes = require('./routes/authRoutes');

app.use(express.json());

app.use('/auth', authRoutes);

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})