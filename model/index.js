let users = {
    1: {
      id: '1',
      username: 'Robin Wieruch',
      messageIds: [1],
    },
    2: {
      id: '2',
      username: 'Dave Davids',
      messageIds: [2],
    },
  };
  
  //const me = users[1];
  
  let messages = {
    1: {
      id: '1',
      text: 'Hello World',
      userId: '1',
    },
    2: {
      id: '2',
      text: 'By World',
      userId: '2',
    },
  };

  module.exports = {users, messages};