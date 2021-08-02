const { createServer, connectToMongoDBAndInitializeData } = require('./server');
const config = require('./utils/config');

connectToMongoDBAndInitializeData();
const server = createServer();
server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
