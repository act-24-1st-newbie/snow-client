import { useState } from 'react';

import TextField from '../component/ui/TextField';

export default function Test() {
  const [text, setText] = useState('');

  function handleChange(e) {
    setText(e.target.value);
  }

  function handleKeyUp(e) {
    if (e.key === 'Enter') {
      handleSend();
    }
  }

  function handleSend() {
    alert(text);
  }

  return (
    <>
      <div style={{ width: '300px' }}>
        <TextField />
      </div>
      <div style={{ width: '300px' }}>
        <TextField
          placeholder="Input Here..."
          value={text}
          onKeyUp={handleKeyUp}
          onChange={handleChange}
          onSend={handleSend}
        />
      </div>
      <div style={{ width: '300px', marginTop: '0.5rem' }}>
        <TextField
          placeholder="Input Here..."
          value={text}
          onKeyUp={handleKeyUp}
          onChange={handleChange}
          onSend={handleSend}
          showBorder
        />
      </div>
    </>
  );
}
