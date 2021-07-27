const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    orderCount(onDate: String!, manufacturer: String): Int!
    vaccineCount(onDate: String!, manufacturer: String): Int!
    vaccinesUsed(onDate: String!): Int!
    bottlesExpired(onDate: String!): Int!
    vaccinesExpiredBeforeUsage(onDate: String!): Int!
  }
`;

module.exports = typeDefs;
