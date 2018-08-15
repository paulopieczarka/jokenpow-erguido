const WebSocket = require('ws')
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

//Client Config
const config = {
  address: 'localhost',
  port: 3000
}

//Connection, ws is the protocol of js
const client = new WebSocket(`ws://${config.address}:${config.port}`)

//Variable
let player = undefined


client.on('open', () => {
  client.on('message', message => {
    if (!player) {  
      player = message
      console.log('you are', player)
    } else if (message === 'ready!') {
      rl.question('Choose Rock, Paper or Scissor\n', (answer) => {
        client.send(answer)
        rl.close()
      })
    } else if (message === 'first!') {
      console.log('Waiting another player!')
    } else {
      console.log(message)
    }
  })
})
