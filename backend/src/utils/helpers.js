
const model = 'llama3.1:8b';
const initialPrompt = `
Você é um assistente de IA que ajuda os usuários a encontrar as melhores receitas de bolo.
Tente entender a demanda do usuário e responda com a receita de bolo mais adequada.
responda de forma clara e objetiva, se necessário com comentários.
**Responda uma mensagem de text marcada em HTML puro, sem formatação.**
**Não use markdown, nem formatação de código.**
**use emojis sempre que possível.**
`;

const makePrompt = async (messages) => {
  // pegar os modelos disponíveis
  // const result = fetch(process.env.AI_URL + '/api/tags').then((result) => result.json());

  if (!messages || !messages.length) throw new Error('mensagens não podem ser vazias');
  if (!messages.every((message) => message.role && message.content)) {
    console.log({messages});
    throw new Error('mensagens devem ter role e content');
  }

  const result = await fetch(process.env.AI_URL + '/api/chat', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      "stream": false,
      model,
      messages: [
        { role: 'system', content: initialPrompt },
        ...messages,
      ]
    })
  }).then((response) => response.json());
  return result;
};

module.exports = {
  makePrompt
}