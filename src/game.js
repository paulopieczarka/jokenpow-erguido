module.exports = {
  players: [],

  join (client, request) {
    if (this.players.length < 2) {
      const player = {
        socket: client,
        index: this.players.length,
        answer: undefined
      }

      player.socket.on('message', message => {
        console.log('player', player.index, ' --> ', message)
        this.play(player, message)
      })

      this.players.push(player)
      client.send(`player${player.index}`)
      console.log(`player${player.index} joined!`)

      if (this.players.length === 2) {
        this.start()
      }
    } else {
      console.log('Game is full!')
    }
  },

  broadcast (message) {
    this.players.forEach(p => p.socket.send(message))
  },

  start () {
    this.broadcast('ready!')
  },

  restart () {
    this.players.forEach(p => { p.answer = undefined })
    this.start()
  },

  play (player, answer) {
    player.socket.send(`You played ${answer}.`)
    player.answer = answer
    const result = this.check()
    if (result === undefined) {
      player.socket.send('first!')
    } else if (result === false) {
      this.broadcast('tie!')
      this.restart()
    } else {
      this.broadcast(`player${result.index} won!`)
      this.restart()
    }
  },

  check () {
    const p0 = this.players[0]
    const p1 = this.players[1]

    if (!p0.answer || !p1.answer) {
      return undefined
    }

    return checkRule(p0, p1, ['rock', 'scissor']) ||
      checkRule(p0, p1, ['scissor', 'paper']) ||
      checkRule(p0, p1, ['paper', 'rock']) ||
      false
  }
}

function checkRule (p0, p1, items) {
  return (
    (p0.answer === items[0] && p1.answer === items[1])
      ? p0
      : (p0.answer === items[1] && p1.answer === items[0])
        ? p1
        : undefined
  )
}
