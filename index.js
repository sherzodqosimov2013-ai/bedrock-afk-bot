const bedrock = require('bedrock-protocol')
const http = require('http')

// Render o'chib qolmasligi uchun HTTP server
http.createServer((req, res) => {
  res.write("Bedrock Bot 24/7 ishlamoqda!")
  res.end()
}).listen(process.env.PORT || 3000)

function startBot() {
  console.log('Bedrock serverga ulanish boshlanmoqda...')

  const client = bedrock.createClient({
    host: 'Sherzod.aternos.me',
    port: 62297,
    username: 'Bedrock_247_Bot',
    version: '1.14.60',            // Android 4.4.4 va serveringiz versiyasi
    offline: true                  // Cracked rejimi uchun
  })

  client.on('join', () => {
    console.log('Bot Bedrock serverga muvaffaqiyatli kirdi!')

    // AFK bo'lib qolmaslik uchun har 3 soniyada sakrab turadi
    setInterval(() => {
      if (client.queue) {
        client.write('player_auth_input', {
          pitch: 0,
          yaw: 0,
          position: { x: 0, y: 0, z: 0 },
          move_vector: { x: 0, z: 0 },
          input_data: {
            start_jumping: true,
            jumping: true
          },
          input_mode: 'touch',
          play_mode: 'normal',
          interaction_model: 'touch',
          tick: 0n
        })
      }
    }, 3000)
  })

  client.on('close', () => {
    console.log('Bot uzildi. 10 soniyadan keyin qayta ulanadi...')
    setTimeout(startBot, 10000)
  })

  client.on('error', (err) => {
    console.log('Xatolik:', err.message)
  })
}

startBot()
