import React, {useState} from 'react';
import './App.css';
import ReactMarkdown from 'react-markdown';
import UserInput from './UserInput';

/* Markdown Component */
function App() {
  /* Maintain internal state for rendered markdown text*/
  const [markdown, setMarkdown] = useState("");
  
  /* 
    ReactMarkdown : Component to render markdown text
    UserInput : Component to handle user input (plain text)
  */
  return (
    <div className="container">
      <ReactMarkdown source={markdown} className="markdown-container"/>
      <UserInput sendMarkdown={setMarkdown}/>
    </div>
  )
}

export default App;
