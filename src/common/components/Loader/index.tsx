import Spinner from 'react-bootstrap/Spinner';

import styles from './styles.module.scss';

const Loader = () => (
  <main className={styles['loader__wrapper']}>
    <Spinner animation="border" variant="secondary" />
  </main>
)

export { Loader }