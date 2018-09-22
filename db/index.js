const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL);

const Product = conn.define('products', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  rating: Sequelize.INTEGER,
});

const syncAndSeed = async () => {
  await Product.sync({ force: true });
  await Product.create({ name: 'Sausages', rating: 1 });
};

module.exports = {
  Product,
  syncAndSeed,
};
