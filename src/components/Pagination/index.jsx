import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';

function Pagination({ onChangePage }) {
  return (
    <ReactPaginate
      className={styles.root}
      previousLabel={'<'}
      nextLabel={'>'}
      pageCount={3}
      pageRangeDisplayed={8}
      onPageChange={(event) => onChangePage(event.selected + 1)}
    />
  );
}

export default Pagination;
