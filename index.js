const bedrock = require('bedrock-protocol')
const http = require('http')

// Render 24/7 ishlashi uchun HTTP server
http.createServer((req, res) => {
  res.write("Bedrock Bot 24/7 ishlamoqda!")
  res.end()
}).listen(process.env.PORT || 3000)

function startBot() {
  console.log('Bedrock serverga ulanish boshlanmoqda...')

  const client = bedrock.createClient({
    host: 'Sherzod.aternos.me',     // Bedrock IP
    port: 62297,                    // Bedrock Port
    username: 'Bedrock_247_Bot',    // Bot ismi
    offline: true                   // Cracked (Piratka) rejim
  })

  client.on('join', () => {
    console.log('Bot Bedrock serverga muvaffaqiyatli kirdi!')

    // Har 3 soniyada bir marta sakrash va harakatlanish paketini yuboradi
    setInterval(() => {
      if (client.queue) {
        // Harakat paketlarini uzatib botni aktiv ushlaydi
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
