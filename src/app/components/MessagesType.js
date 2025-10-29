import React from "react";
import { Link } from "react-router-dom";
import './MessagesType.css'

function Chat({values}) {
    const {type, data, sender} = values
    return (
        <div className={`chat ${sender=='assistant' ? 'assistant-message' : 'client-message'}`}>
            {data}
        </div>
    );
}

function List ({values}){
    const {type, data, sender} = values
    return (
        <div className="list">
            {data.map((elem, i) => {
                return (
                <Link key={i} to={elem.url}>
                    <span>{elem.description}</span>
                </Link>
                );
            })}
        </div>
    );
}

function Action ({values}){
    const {type, data, sender} = values
    return (
        <div className="message">
            {data}
        </div>
    );
}

function OneCheck ({values, functions}) {
    const {type, data, sender} = values
    const {setMessages} = functions
    
    const getData = async (id) => {
        const res = await fetch('api/v1/recommended/order-data',{
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                question: 'cual es el estado de mi orden?',
                orderid: id
            })
        })
        const data = await res.json()
        setMessages(prevMessages => [...prevMessages, ...data])
    }              

       

    return (
        <div className={`onecheck ${sender=='assistant' ? 'assistant-message' : 'client-message'}`}>
            {data.map((elem, i) => {
                return (
                <div key={i}
                onClick={() => {getData(elem.id)}}> 
                    <span>{elem.myProduct.product}</span>
                </div>
                );
            })}
        </div>
    );
}

function OneCheckTime ({values, functions}) {
    const {type, data, sender, aditionalData} = values
    const {setMessages} = functions
    console.log(data)
    const getData = async (id) => {
        const res = await fetch('api/v1/recommended/order-time',{
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                question: aditionalData,
                orderid: id
            })
        })
        const data = await res.json()
        setMessages(prevMessages => [...prevMessages, ...data])
        console.log(data)  
    }              

       

    return (
        <div className={`onecheck ${sender=='assistant' ? 'assistant-message' : 'client-message'}`}>
            {data.map((elem, i) => {
                return (
                <div key={i}
                onClick={() => {getData(elem.id)}}> 
                    <span>{elem.myProduct.product}</span>
                </div>
                );
            })}
        </div>
    );
}

function getTypeMessage (message, functions) {
    console.log('LLAMADO')
    switch (message.type) {
        case 'CHAT':
            //enviando componente
            return (<Chat values={message} />)
            break;
        case 'LIST':
            //enviando componente
            return (<List values={message}/>)
            break;
        case 'ONECHECK':
            //enviando componente
            return (<OneCheck values={message} functions={functions}/>)
            break;
        case 'ONECHECKTIME':
            //enviando componente
            return (<OneCheckTime values={message} functions={functions}/>)
            break;
        default:
            console.log('ERROR TYPE MESSAGE')
            break;
    }
}

export {getTypeMessage}