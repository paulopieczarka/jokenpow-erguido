const WebSocket = require('ws')

const server = new WebSocket.Server({
  port: 3000
})

server.on('connection', client => {
  console.log('New client!')

  client.on('message', message => {
    console.log('I did receive', message)
  })
})

console.log('Waiting for clients..')

// 191.179.235.143
