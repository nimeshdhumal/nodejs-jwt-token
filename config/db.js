require('dotenv').config();
const { Sequelize } = require('sequelize');

//Create a constructor of Sequelize to give the DB information;;;
const sequelize = new Sequelize(process.env.DB, process.env.USER, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: process.env.DIALECT,
    logging: false // Set to true to see SQL queries
});

//To get the confirmation of connection with DB;;;
async function connection() {
    try {
        await sequelize.authenticate();//built-in function for confirmation of DB connection;;;
        console.log('Connection with database established successfully!');
        
        //built-in function for confirmation of table creation;;;
        // await sequelize.sync();
        // console.log('Table created!');
    } catch (error) {
        console.log('Connection Failed! and tables not created!');
    }
}

connection();//Calling the functions of sequelize;;;

module.exports = { sequelize }