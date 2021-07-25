const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    orderCount(onDate: String!, manufacturer: String): Int!
  }
`;

module.exports = typeDefs;
