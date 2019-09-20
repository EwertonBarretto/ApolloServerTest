const express = require('express');
const { ApolloServer, gql} = require('apollo-server-express');

const app = express();

const schema = gql`
  type Query {
    me: User
    user(id: ID!): User
    users: [User!]
  }
  type User {
    username: String!
    id: ID!
  }
`;

let users = {
  1: {
    id: '1',
    username: 'Robin Wieruch',
  },
  2: {
    id: '2',
    username: 'Dave Davids',
  },
};
const me = users[1];
const resolvers = {
  Query: {
    user: (parent, { id }) => {
      return users[id];
    },
    users: () => {
      return Object.values(users);
    },
    me: () => {
      return me;
    }
  },
};

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
});
server.applyMiddleware({ app, path: '/graphql' });
app.listen({ port: 8000 }, () => {
  console.log('Apollo Server on http://localhost:8000/graphql');
});