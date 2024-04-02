import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

import Topbar from '@/component/Topbar';
import TextField from '@/component/ui/TextField';
import { getMember } from '@/lib/service';
import { useToast } from '@/lib/useToast';

import styles from './Login.module.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const { showToast } = useToast();

  async function handleSubmit() {
    if (!email) return;

    const res = await getMember(email);

    if (res.data) {
      const { id, username } = res.data;
      sessionStorage.setItem('memberId', id);
      sessionStorage.setItem('name', username);
      navigate('/home');
    } else {
      showToast('Not registered user.');
    }
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
          <h1>What is your email?</h1>
          <TextField type="text" value={email} onUpdate={setEmail} onSubmit={handleSubmit} />
        </div>
      </main>
    </>
  );
}
