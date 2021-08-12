const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');
const config = require('./utils/config');
const loadData = require('./utils/dataLoader');

const connectToMongoDBAndInitializeData = async () => {
  mongoose
    .connect(config.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((error) => {
      console.log('Error connecting to MongoDB:', error.message);
    });

  await loadData();
};

const createServer = () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  return server;
};

module.exports.createServer = createServer;
module.exports.connectToMongoDBAndInitializeData = connectToMongoDBAndInitializeData;
