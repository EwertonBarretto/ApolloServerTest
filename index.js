require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');

const schema = require('./schema');
const resolvers = require('./resolvers');
const {models, sequelize } = require('./models');

const app = express();

const Sequelize = require('sequelize');

//app.use(cors());

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: async () => ({
    models,
    me: await models.User.findByLogin('rwieruch'),
  }),
});

server.applyMiddleware({ app, path: '/graphql' });

const eraseDatabaseOnSync = true;
//console.log(sequelize.sync({ force: eraseDatabaseOnSync }));

/*
Inicio

var connection = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    dialect: 'postgres',
  },
);
var conexao = connection.authenticate()
.then(function(){
   console.log('Conexão com o MySQL foi estabelecida com sucesso');
})
.catch(function (err) {
  console.log('Não foi possível se conectar com o banco de dados MySql: - ' + err);
})
.done();


fim
*/

sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
  console.log('chegou aqui');
  if (eraseDatabaseOnSync) {
    createUsersWithMessages();
  }

  app.listen({ port: 8000 }, () => {
    console.log('Apollo Server on http://localhost:8000/graphql');
  });
});

const createUsersWithMessages = async () => {
  await models.User.create(
    {
      username: 'rwieruch',
      messages: [
        {
          text: 'Published the Road to learn React',
        },
      ],
    },
    {
      include: [models.Message],
    },
  );

  await models.User.create(
    {
      username: 'ddavids',
      messages: [
        {
          text: 'Happy to release ...',
        },
        {
          text: 'Published a complete ...',
        },
      ],
    },
    {
      include: [models.Message],
    },
  );
};

// app.listen({ port: 8000 }, () => {
//   console.log('Apollo Server on http://localhost:8000/graphql');
// });
