import React, { useState } from 'react';
import {getTypeMessage} from './MessagesType'
import './InputWithMessages.css';
import { Modal } from '../../modal';

const InputWithMessages = ({values}) => {
  const {productid} = values
  const [chatOpen, setChatOPen] = useState(false)
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
        productid: productid
      }),
    })
    .then(res => res.json())
    .then((data) => {
      const added = [{type: 'CHAT', sender: 'client', data: value}, ...data]
      setMessages([...messages,...added]);
    })
    setValue('');

  };

  if(!chatOpen){
    return (<input
      type="text"
      placeholder="¿Deseas saber mas sobre este producto?"
      value={''}
      onChange={(e) => {}}
      className="input-message"
      onClick={() => setChatOPen(true)}
      />)
  }

  return (
    <Modal>
    <div className="input-container">
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
    </div>
    </Modal>
  );
};

export {InputWithMessages};
