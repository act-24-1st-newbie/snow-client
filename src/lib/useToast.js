import { useRecoilState } from 'recoil';

import { toastState } from './atoms';

export function useToast() {
  const [toasts, setToasts] = useRecoilState(toastState);

  function clearToast(id) {
    setToasts(prev => prev.filter(item => item.id !== id));
  }

  return {
    showToast: message => {
      const id = `${new Date().getTime() + Math.random()}`;

      if (toasts.length <= 3) {
        setToasts([{ id, message }, ...toasts]);
      } else {
        setToasts([{ id, message }, toasts.slice(0, 3)]);
      }

      setTimeout(() => clearToast(id), 3000);
    },
  };
}
