import styles from './NotFoundBlock.module.scss';

function NotFoundBlock() {
  return (
    <div className={styles.root}>
      <h1>
        <span>&#128577;</span>
        <br />
        404 Not Found
      </h1>
      <p className={styles.description}>Page is missing in our store</p>
    </div>
  );
}

export default NotFoundBlock;
