const WebSocket = require('ws')
const game = require('./game')

//Bind server and iniciate
const server = new WebSocket.Server({
  host: '0.0.0.0',
  port: 3000
})

//Connection Event, sempre que um client quiser acessar, passar por aqui, var client é a socket do cliente
server.on('connection', (client, request) => {
  game.join(client, request)
})


console.log('Waiting for clients..')
