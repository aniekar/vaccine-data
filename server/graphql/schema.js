const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    totalVaccinationCount: Int!
    totalOrderCount: Int!
    orderCount(onDate: String!, manufacturer: String): Int!
    vaccineCount(onDate: String!, manufacturer: String): Int!
    vaccinesUsed(onDate: String!, manufacturer: String): Int!
    bottlesExpired(onDate: String!): Int!
    vaccinesExpiredBeforeUsage(onDate: String!, manufacturer: String): Int!
    vaccinesExpiringWithinTenDays(onDate: String!, manufacturer: String): Int!
    vaccinesLeft(onDate: String!, manufacturer: String): Int!
  }
`;

module.exports = typeDefs;
