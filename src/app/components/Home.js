import React, { useState } from 'react';
import ReactDOM from 'react-dom/client'
import './Home.css'
import { ResponseChat } from './Response';
import { ReviewResponse } from './ReviewResponse'; 

function Home() {
  eval
  const [message, setMessage] = useState('');
  const [result, setResult] = useState('console.log("hello world")')
  const [createComponent, setCreateComponent] = useState(null)
  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (message.length > 5 ) {
      
      const res = await fetch('api/v1/recommended/get-recomended',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          question: message
        })
      })
      
      if (res.status == 200){
        const data = await res.json()
        console.log(data)
        setResult(data)
        

        const result = await Babel.transform(data, {presets: ['env', 'react']}).code 
        
        console.log(result)
        const RenderComponent = await eval(result)?.default
        
        console.log(RenderComponent)

        const reviewComponent = ReactDOM.createRoot(document.getElementById("review-component"))
        reviewComponent.render(<RenderComponent/>)
      }else{
        console.log('Error')
      }
    }
 
    
    setMessage('');
  };


  return (
    <div className='home-container'>
      <div className='cards-container'>
        <ReviewResponse values = {{createComponent}}></ReviewResponse>
        <ResponseChat values = {{result}}/>
      </div>



     <form onSubmit={handleSubmit} className="chat-input-container">
      <input
        type="text"
        placeholder="Escribe un mensaje..."
        value={message}
        onChange={handleMessageChange}
      />
      <button type="submit">Enviar</button>
    </form>
    </div>
  );
}

export {Home};
