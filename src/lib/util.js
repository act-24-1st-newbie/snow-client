/**
 * 시간에 따른 인사말 반환
 * @returns {string} 인사말
 */
export function getGreeting() {
  const now = new Date();
  const hhmm = now.getHours() * 100 + now.getMinutes();

  if (hhmm >= 700 && hhmm < 1200) {
    return 'Good morning';
  } else if (hhmm >= 1200 && hhmm < 1800) {
    return 'Good afternoon';
  } else if (hhmm >= 1800 && hhmm < 2200) {
    return 'Good evening';
  }
  return 'Good night';
}

/**
 * Todo의 개수 세기
 * @param {Array<Todo>} list
 * @returns {string} 일감 개수
 */
export function getTodoCount(list) {
  const undone = list.filter(item => !item.isDone).length;
  const all = list.length;

  return `${undone}/${all}`;
}
