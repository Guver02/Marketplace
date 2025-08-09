import React, { useState } from 'react';
import './InputWithMessages.css';
import { Modal } from '../modal';
import { ProductChat } from './ProductChat';
import { Chat } from './Chat';

const InputWithMessages = ({ values }) => {
    const [productId, setProductId] = useState(values.productId)
    const [chatOpen, setChatOPen] = useState(false)

    if (!chatOpen) {
        return (<input
            type="text"
            placeholder="¿Deseas saber mas sobre este producto?"
            value={''}
            onChange={(e) => { }}
            className="input-message"
            onClick={() => setChatOPen(true)}
        />)
    }

    return (
        <Modal>
            <ProductChat values={{ productId: productId }} functions={{ setProductId }} />
            <Chat values={{ productId }} functions={{ setChatOPen }} />
        </Modal>
    );
};

export { InputWithMessages };
