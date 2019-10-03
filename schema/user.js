const { gql } = require('apollo-server-express');

module.exports = gql`
  extend type Query {
    users: [User!]
    me: User
    user(id: ID!): User
  }
  type User {
    id: ID!
    username: String!
    messages: [Message!]
  }
`;

