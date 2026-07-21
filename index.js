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
    host: 'Sherzod.aternos.me',     // Bedrock IP manzil
    port: 62297,                    // Bedrock Port raqami
    username: 'Bedrock_247_Bot',    // Bot ismi
    offline: true                   // Cracked (Piratka) uchun
  })

  client.on('join', () => {
    console.log('Bot Bedrock serverga muvaffaqiyatli kirdi!')
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
