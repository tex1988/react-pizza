import { ReactElement, useEffect, useRef, useState } from 'react';
import { selectFilter, setSort } from '../redux/slices/filterSlice';
import { useAppDispatch } from '../redux/store';
import { useSelector } from 'react-redux';

export type SortItem = {
  name: string;
  sortType: string;
};

export const sortList: SortItem[] = [
  { name: 'popularity', sortType: 'rating' },
  { name: 'price', sortType: 'price' },
  { name: 'alphabet', sortType: 'title' },
];

function Sort(): ReactElement | null {
  const dispatch = useAppDispatch();
  const { currentSortItem } = useSelector(selectFilter);
  const sortRef = useRef<HTMLDivElement>(null);
  const [isOpen, setOpen] = useState<boolean>(false);

  function sortOnClick(sortItem: SortItem): void {
    dispatch(setSort(sortItem));
    setOpen(false);
  }

  useEffect(() => {
    function handleClick(event: MouseEvent): void {
      if (sortRef && sortRef.current && !event.composedPath().includes(sortRef.current)) {
        setOpen(false);
      }
    }

    document.body.addEventListener('click', handleClick);
    return () => document.body.removeEventListener('click', handleClick);
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Sort by:</b>
        <span onClick={() => setOpen(!isOpen)}>{currentSortItem.name}</span>
      </div>
      {isOpen && (
        <div className="sort__popup">
          <ul>
            {sortList.map((sortItem, index) => (
              <li
                key={index}
                onClick={() => sortOnClick(sortItem)}
                className={currentSortItem.sortType === sortItem.sortType ? 'active' : ''}>
                {sortItem.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Sort;
