import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const TextEditor = () => {
  const [text, setText] = useState('');

  const handleTextChange = (value) => {
    setText(value);
  };

  return (
    <ReactQuill value={text} onChange={handleTextChange} />
  );
};

export default TextEditor;
