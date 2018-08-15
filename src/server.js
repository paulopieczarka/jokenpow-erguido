const WebSocket = require('ws')
const game = require('./game')

const server = new WebSocket.Server({
  host: '0.0.0.0',
  port: 3000
})

server.on('connection', (client, request) => {
  game.join(client, request)
})

console.log('Waiting for clients..')

// 191.179.235.143
