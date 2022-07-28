import { Sequelize } from 'sequelize'

const sequelize = new Sequelize(process.env.BD_NAME!, process.env.BD_USER!, process.env.BD_PASS, {
    host: process.env.BD_HOST,
    dialect: 'mysql',
    port : parseInt(process.env.BD_PORT!)
  });

export default sequelize