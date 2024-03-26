import { useState } from 'react';

import Button from '@/component/ui/Button';
import TextField from '@/component/ui/TextField';

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
        <TextField placeholder="Input Here..." />
      </div>
      <div style={{ width: '300px' }}>
        <TextField
          placeholder="Input Here..."
          value={text}
          onKeyUp={handleKeyUp}
          onChange={handleChange}
          onSend={handleSend}
          hideBorder
        />
      </div>
      <div style={{ display: 'flex', gap: '8px' }}>
        <Button variants="primary">PRIMARY</Button>
        <Button variants="secondary">SECONDARY</Button>
        <Button variants="link">LINK</Button>
      </div>
      <div style={{ display: 'flex', gap: '8px' }}>
        <Button variants="primary" disabled>
          PRIMARY
        </Button>
        <Button variants="secondary" disabled>
          SECONDARY
        </Button>
        <Button variants="link" disabled>
          LINK
        </Button>
      </div>
    </main>
  );
}
