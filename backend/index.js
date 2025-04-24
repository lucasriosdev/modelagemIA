

const express = require('express')
const app = express()
const cors = require('cors')
const port = 3000
const { makePrompt } = require('./src/utils/helpers.js')

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  console.log('endpoint foi alcançado')
  res.send('Hello World!')
})

/**
 * curl http://localhost:11434/api/chat -d '{
  "model": "llama3.2",
  "messages": [
    { "role": "user", "content": "why is the sky blue?" }
  ]
}'
 */

app.post('/', async (req, res) => {
  const payload = req.body;
  console.log(payload);
  const result = await makePrompt([
    ...payload?.history || [],
    {role: 'user', content: payload.prompt},
  ]);
  const text = result?.message?.content;
  console.log({text});
  res.json({text})
});

app.listen(port, () => {
  console.clear()
  console.log(`Meu servidor está rodando na porta ${port}`)
  // makePrompt(messages).then(async (result) => {
  //   console.log(result)
  //   // console.table(result.models)
  // })
})