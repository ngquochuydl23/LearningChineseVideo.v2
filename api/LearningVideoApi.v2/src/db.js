const { sequelize } = require('./models');

syncDb = () => {
   //sequelize.sync({ force: true });
}

module.exports = { syncDb }