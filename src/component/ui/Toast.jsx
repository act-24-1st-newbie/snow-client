import cn from 'classnames';
import { useRecoilState } from 'recoil';

import { toastState } from '@/lib/atoms';

import styles from './Toast.module.css';
import closeImg from '/ic_close_white.svg';

export default function Toast() {
  const [toasts, setToasts] = useRecoilState(toastState);

  function handleCloseClick(id) {
    setToasts(toasts.filter(prev => prev.id !== id));
  }

  return (
    <div className={cn(styles.toastWrap, { [styles['toastWrap--show']]: toasts.length })}>
      {toasts.map(toast => (
        <div key={toast.id} className={styles.toast}>
          <span>{toast.message}</span>
          <input
            type="image"
            src={closeImg}
            className={styles.toast__close}
            onClick={() => handleCloseClick(toast.id)}
          />
        </div>
      ))}
    </div>
  );
}
