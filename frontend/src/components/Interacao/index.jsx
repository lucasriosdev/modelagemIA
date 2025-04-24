import React, {useState, useEffect} from 'react'
import './styles.css'

export default function Interacao() {

  const [inputText, setInputText] = useState('');
  /**
   * historico
   * {
   * role: 'user' | 'assistant'
   * content: text
   * }
   */
  const [historico, setHistorico] = useState([]);

  useEffect(() => {
    console.log({inputText});
  }, [inputText])

  const makePrompt = async () => {
    if (!inputText.length) return alert('ei, o texto ta vazio, preencha!');
    const response = await fetch('http://localhost:3000', {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({
        prompt: inputText,
        history: historico
      })
    })
      .then((result) => result.json());
    setHistorico(prevState => ([
      ...prevState,
      {role: 'user', content: inputText},
      {role: 'assistant', content: response.text}
    ]))
      setInputText('');
  }

  return (
    <section className='interacao'>
      <div className='historico'>
        {/* histórico de chat */}
        {historico.map((history) => (<div className='row'>
          <span className={history.role} dangerouslySetInnerHTML={{
            __html: history.content
              .replace(/(?:\r\n|\r|\n)/g, '<br>')
              .replace(/(?:\*\*(.*?)\*\*)/g, '<strong>$1</strong>')
              .replace(/(?:\*(.*?)\*)/g, '<em>$1</em>')
            }}></span>
        </div>))}
      </div>
      <div className='input'>
        {/* text input e botão de submit */}
        <textarea
          name="input"
          id="input"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        ></textarea>
        <button onClick={makePrompt}>enviar</button>
      </div>
    </section>
  )
}
