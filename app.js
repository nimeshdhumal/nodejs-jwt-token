require('dotenv').config();//To load the all env variables into app.js
require('./config/db');//Checking the connection with DB
const express = require('express');
// const sequelize  = require('./config/db');
// const User = require('./models/User');
const authRoutes = require('./routes/authRoutes');
const app = express();

app.use(express.json());//Middleware to parse the incoming the request into application\json
const PORT = process.env.PORT;
app.use('/api/auth', authRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on PORT:${PORT}`);
});