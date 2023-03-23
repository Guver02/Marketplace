import React from "react";
import {Controlled as CodeMirror} from 'react-codemirror2'
import './Response.css'
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/xml/xml';

function ResponseChat({values}) {
    const {result} = values
    const handleChange = () => {
        console.log(result)
    }
    console.log(result)
    return (
        <div className="response-container">
            <CodeMirror 
               value={result}
               onBeforeChange={handleChange}
               options={{
                 mode: 'xml',
                 theme: 'material',
                 lineNumbers: true
               }}></CodeMirror>
       </div>
    );
}

export {ResponseChat}