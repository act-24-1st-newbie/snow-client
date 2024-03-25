import { useState } from 'react';

/**
 * @param {string=} defaultValue
 * @param {Function=} submitFunction
 * @returns {{
 *   onChange: React.ChangeEventHandler<HTMLInputElement>,
 *   onKeyUp: React.KeyboardEventHandler<HTMLInputElement>,
 *   value: string
 * }}
 */
export default function useInput(defaultValue, submitFunction) {
  const [value, setValue] = useState(defaultValue);

  return [
    {
      onChange: function (e) {
        setValue(e.target.value);
      },
      onKeyUp: function (e) {
        if (e.key === 'Enter') {
          submitFunction?.();
        }
      },
      value: value,
    },
    setValue,
  ];
}
