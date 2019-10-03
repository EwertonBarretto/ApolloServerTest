const express = require('express');
const { ApolloServer, gql} = require('apollo-server-express');

const schema = require('./schema');
const {users, messages} = require('./model');
const resolvers = require('./resolvers');

const app = express();

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: {
    me: users[1],
  },
});

server.applyMiddleware({ app, path: '/graphql' });

app.listen({ port: 8000 }, () => {
  console.log('Apollo Server on http://localhost:8000/graphql');
});