import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

import Topbar from '@/component/Topbar';
import TextField from '@/component/ui/TextField';

import styles from './Login.module.css';

export default function Login() {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  function handleSubmit() {
    if (!name) {
      return;
    }

    sessionStorage.setItem('name', name);

    navigate('/home');
  }

  return (
    <>
      <Topbar>
        <Link to="/signup" className={styles.signup}>
          Sign Up
        </Link>
      </Topbar>
      <main className={styles['login-page']}>
        <div className={styles['welcome']}>
          <p>Welcome Newbie!!</p>
          <p>MyTodo makes it easy to stay organized and manage your life.</p>
        </div>
        <div className={styles['login']}>
          <h1>What is your name?</h1>
          <TextField type="text" value={name} onUpdate={setName} onSubmit={handleSubmit} />
        </div>
      </main>
    </>
  );
}
