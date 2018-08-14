const WebSocket = require('ws')

const config = {
  address: 'localhost',
  port: 3000
}

const client = new WebSocket(`ws://${config.address}:${config.port}`)

client.on('open', () => {
  client.send('ping')
})

