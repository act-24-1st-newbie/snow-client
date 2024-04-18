import { useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Topbar from '@/component/Topbar';
import Button from '@/component/ui/Button';
import TextField from '@/component/ui/TextField';
import { postMember, postMemberCheck } from '@/lib/service';
import { useToast } from '@/lib/useToast';

import styles from './Signup.module.css';

const defaultMember = {
  email: '',
  username: '',
};

export default function Signup() {
  const [member, setMember] = useState({ ...defaultMember });
  const [status, setStatus] = useState(0);
  const [statusMsg, setStatusMsg] = useState(null);
  const emailRef = useRef(null);
  const nameRef = useRef(null);

  const { showToast } = useToast();
  const navigate = useNavigate();

  function handleEmailUpdate(v) {
    setStatus(0);
    setStatusMsg(null);
    setMember({ ...member, email: v });
  }

  function handleNameUpdate(v) {
    setMember({ ...member, username: v });
  }

  async function handleEmailSubmit() {
    if (!member.email) return;

    const isValid = emailRef.current.validate();
    if (!isValid) {
      setStatus(2);
      return;
    }

    const res = await postMemberCheck(member.email);
    const { isExist } = res.data;

    if (isExist) {
      // 겹치므로 메시지 표시
      setStatus(2);
      setStatusMsg('This email already exists.');
    } else {
      // 안겹치므로 OK
      setMember({ ...member, isEmailValid: true });
      setStatus(1);
      setStatusMsg('This email is available.');
    }
  }

  function handleCancel() {
    setMember({ ...defaultMember });
    setStatus(0);
    setStatusMsg(null);
  }

  const isAvailable = useMemo(() => {
    if (!member.email || !member.username) {
      return false;
    }

    return emailRef.current.validate() && nameRef.current.validate() && status == 1;
  }, [member.email, member.username, status]);

  async function handleSave() {
    await postMember(member);
    showToast('Registered successfully.');
    navigate('/');
  }

  return (
    <>
      <Topbar />
      <main className={styles['signup']}>
        <h1 className={styles.title}>Sign up</h1>
        <div className={styles['email-container']}>
          <label className={styles.label}>
            E-mail
            <TextField
              type="email"
              placeholder="E-mail"
              value={member.email}
              status={status}
              statusMsg={statusMsg}
              onUpdate={handleEmailUpdate}
              onSubmit={handleEmailSubmit}
              ref={emailRef}
            />
          </label>
        </div>
        <div className={styles['name-container']}>
          <label className={styles.label}>
            User Name
            <TextField
              type="text"
              placeholder="User Name"
              value={member.username}
              onUpdate={handleNameUpdate}
              hideButton
              ref={nameRef}
            />
          </label>
        </div>
        <div className={styles['btn-container']}>
          <Button variants="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variants="primary" onClick={handleSave} disabled={!isAvailable}>
            Confirm
          </Button>
        </div>
      </main>
    </>
  );
}
