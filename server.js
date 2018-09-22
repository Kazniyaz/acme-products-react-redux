const app = require('./app');
const { syncAndSeed } = require('./db/index');

// SEED THE DATABASE
syncAndSeed();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
