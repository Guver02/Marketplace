import React, { useState } from "react";
import { getTypeMessage } from "./MessagesType";

function Chat ({values, functions}) {
    const {productId} = values
    const {setChatOPen} = functions

    const [value, setValue] = useState('');
    const [messages, setMessages] = useState([{
      type: 'CHAT',
      data: 'Hola! En que puedo ayudarte?',
      sender: 'assistant'
    }]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessages([...messages, {type: 'CHAT', sender: 'client', data: value}]);
        
        fetch('api/v1/recommended/get-recomended',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            question: value,
            productid: productId
          }),
        })
        .then(res => res.json())
        .then((data) => {
          const added = [{type: 'CHAT', sender: 'client', data: value}, ...data]
          setMessages([...messages,...added]);
        })
        setValue('');
    
      };

      const closeModal = () => {
        setChatOPen(false)
      }

    return(   <div className="input-container">
    <div className="options-messages">
      <div 
      onClick={closeModal}>
        <span className="material-symbols-outlined">close</span>
      </div>
    </div>
    <div className="messages-container">
     
      {
        messages.map((elem, i) => {
          return (
            <div key={i} className='message-bubble'>
              {
                
                getTypeMessage(elem, {setMessages})
              }
            </div>
          );
        })
      }
    </div>

    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Escribe un mensaje..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="input-field"
      />
    </form>
  </div>);
}

export {Chat}