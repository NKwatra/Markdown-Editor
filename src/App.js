import React from 'react';
import './App.css';
import ReactMarkdown from 'react-markdown';
import UserInput from './UserInput';

function App() {
  return (
    <div className="container">
      <ReactMarkdown source={"Lorem ipsum sit **amid donor**"} className="markdown-container"/>
      <UserInput />
    </div>
  )
}

export default App;
