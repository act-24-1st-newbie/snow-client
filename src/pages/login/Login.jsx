import { useNavigate } from 'react-router';

import TextField from '@/component/ui/TextField';
import { useInput } from '@/lib/useInput';

import styles from './Login.module.css';

export default function Login() {
  const [nameProps] = useInput('', handleSubmit);
  const navigate = useNavigate();

  function handleSubmit() {
    const { value: name } = nameProps;

    if (!name) {
      return;
    }

    sessionStorage.setItem('name', name);

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
        <TextField {...nameProps} onSend={handleSubmit} />
      </div>
    </main>
  );
}
