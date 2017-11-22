let Server = require('vue-remote/server'),
  users = {}

function messageHandler (data, connection) {
  switch (data.identifier) {
    case 'set-user':
      users[data.username] = connection

      let userMessage = {
        identifier: 'set-users',
        users: Object.keys(users)
      }

      let newUserMessage = {
        identifier: 'message-send',
        message: `${data.username} has joined`
      }

      for (let user in users) {
        if (users.hasOwnProperty(user)) {
          users[user].send(
            JSON.stringify(userMessage)
          )
          users[user].send(
            JSON.stringify(newUserMessage)
          )
        }
      }

      return {
        identifier: 'user-set',
        username: data.username
      }

    case 'send-message':
      let message = {
        identifier: 'message-send',
        message: `${data.username}: ${data.message}`
      }

      for (let user in users) {
        if (users.hasOwnProperty(user)) {
          users[user].send(
            JSON.stringify(message)
          )
        }
      }

      return {identifier: 'sent'}
  }

  return {
    identifier: 'trigger',
    data: `${data.user}: ${data.message}`
  }
}

function connectHandler (connection) {
  console.log('Connected')
}
function disconnectHandler (connection) {
  console.log('Disconnected')
}

Server({
  messageHandler: messageHandler,
  connectHandler: connectHandler,
  disconnectHandler: disconnectHandler,
  port: 8081
})
