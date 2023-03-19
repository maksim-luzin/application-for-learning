import { NavLink } from 'react-router-dom';
import { Paths } from '../../common/enums';

import styles from './styles.module.scss';

const NotFound = () => (
  <div className={styles.notFoundPage}>
    <div className={styles.notFoundBlock}>
      <h1 className={styles.notFound}>404</h1>
      <p className={styles.messageStr1}>Oops, sorry we can&#39;t find that page!</p>
      <p className={styles.messageStr2}>Either something went wrong or the page doesn&#39;t exist anymore.</p>
      <NavLink to={Paths.Courses} className={styles.btnHomePage}>
        Return to Main Page
      </NavLink>
    </div>
  </div>
);

export { NotFound };
