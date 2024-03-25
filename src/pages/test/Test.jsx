import { useState } from 'react';

import TextField from '../../component/ui/TextField';

const style = {
  width: '1024px',
  margin: 'auto',
  paddingTop: '2rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
};

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
    <main className="test-page" style={style}>
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
      <div style={{ width: '300px' }}>
        <TextField
          placeholder="Input Here..."
          value={text}
          onKeyUp={handleKeyUp}
          onChange={handleChange}
          onSend={handleSend}
          showBorder
        />
      </div>
    </main>
  );
}
