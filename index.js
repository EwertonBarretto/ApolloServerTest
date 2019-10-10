const express = require('express');
const { ApolloServer, gql} = require('apollo-server-express');

const schema = require('./schema');
//const {users, messages} = require('./model');
const resolvers = require('./resolvers');
const {models, sequelize } = require('./models');

const app = express();

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: {
    me: models.User[1],
  },
});

server.applyMiddleware({ app, path: '/graphql' });

sequelize.sync().then(async () => {
  app.listen({ port: 8000 }, () => {
    console.log('Apollo Server on http://localhost:8000/graphql');
  });
});

// app.listen({ port: 8000 }, () => {
//   console.log('Apollo Server on http://localhost:8000/graphql');
// });