import { useState } from 'react';

import Button from '@/component/ui/Button';
import Dropdown from '@/component/ui/Dropdown';
import TextField from '@/component/ui/TextField';
import Toast from '@/component/ui/Toast';
import { useToast } from '@/lib/useToast';

const style = {
  width: '1024px',
  margin: 'auto',
  paddingTop: '2rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
};

const options = [
  { title: 'Oldest', value: 'Oldest' },
  { title: 'Latest', value: 'Latest' },
];

export default function Test() {
  const [text, setText] = useState('');
  const [selected, setSelected] = useState(options[0].value);
  const { showToast } = useToast();

  function handleUpdate(value) {
    setText(value);
  }

  function handleSubmit() {
    alert(text);
  }

  function handleOpenClick() {
    showToast('abcdefg');
  }

  return (
    <main className="test-page" style={style}>
      <div style={{ width: '300px' }}>
        <TextField type="text" placeholder="Text test" value="" onUpdate={() => {}} />
      </div>
      <div style={{ width: '300px' }}>
        <TextField type="email" placeholder="Email test" value="" onUpdate={() => {}} />
      </div>
      <div style={{ width: '300px' }}>
        <TextField
          type="text"
          placeholder="Input Here..."
          value={text}
          onUpdate={handleUpdate}
          onSubmit={handleSubmit}
          hideBorder
        />
      </div>
      <div style={{ display: 'flex', gap: '8px' }}>
        <Dropdown value={selected} options={options} onChange={v => setSelected(v)} />
        <select style={{ padding: '0 16px' }}>
          <option>Oldest</option>
          <option>Latest</option>
        </select>
      </div>
      <div style={{ display: 'flex', gap: '8px' }}>
        <Button variants="primary" onClick={handleOpenClick}>
          OPEN TOAST
        </Button>
        <Button variants="secondary" onClick={() => setText('CHANGE!')}>
          SECONDARY
        </Button>
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
      <Toast />
    </main>
  );
}
