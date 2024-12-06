import React, { useState } from 'react';
import {getTypeMessage} from './MessagesType'
import './InputWithMessages.css';
import { Modal } from '../modal';
import { ProductInfo } from './ProductInfo';
import { Chat } from './Chat';

const InputWithMessages = ({values}) => {
  const [productId, setProductId] = useState(values.productId)
  console.log(productId)
  const [chatOpen, setChatOPen] = useState(false)
 
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
      <ProductInfo values={{productId: productId}} functions={{setProductId}}/>
      <Chat values={{productId}} functions={{setChatOPen}}/>
      
    </Modal>
  );
};

export {InputWithMessages};
