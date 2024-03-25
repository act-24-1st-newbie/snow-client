import { useState } from 'react';
import { useNavigate } from 'react-router';

import TextField from '../../component/ui/TextField';
import styles from './Login.module.css';

export default function Login() {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  function handleKeyUp(e) {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  }

  function handleSubmit() {
    if (!name) {
      return;
    }

    // save name
    sessionStorage.setItem('name', name);
    // move to homepage
    navigate('/home');
  }

  return (
    <main className={styles['login-page']}>
      <div className={styles['welcome']}>
        <p>Welcome Newbie!!</p>
        <p>MyTodo makes it easy to stay organized and manage your life.</p>
      </div>
      <div className={styles['login']}>
        <h1>What is your name?</h1>
        <TextField value={name} onChange={e => setName(e.target.value)} onKeyUp={handleKeyUp} onSend={handleSubmit} />
      </div>
    </main>
  );
}