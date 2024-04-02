import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

import styles from './ErrorBoundary.module.css';
import Topbar from './Topbar';
import notFound from './illust_not_found.png';

export default function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error) && error.status === 404) {
    return (
      <>
        <Topbar />
        <main className={styles.container}>
          <img src={notFound} />
        </main>
      </>
    );
  }

  return <></>;
}
