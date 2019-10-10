const {users, messages} = require('../models');

const resolvers = {
    Query: {
      users: () => {
        return Object.values(users);
      },
      user: (parent, { id }) => {
        return users[id];
      },
      me: (parent, args, { me }) => {
        return me;
      },
    },  
    User: {
      messages: user => {
        return Object.values(messages).filter(
          message => message.userId === user.id,
        );
      },
    },
  };

  module.exports = resolvers;