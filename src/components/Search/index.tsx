import styles from './Search.module.scss';
import { setSearchValue } from '../../redux/slices/filterSlice';
import { ChangeEvent, ReactElement, useCallback, useRef, useState } from 'react';
import debounce from 'lodash.debounce';
import { useAppDispatch } from '../../redux/store';

function Search(): ReactElement | null {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  function onClickClear(): void {
    dispatch(setSearchValue(''));
    setValue('');
    inputRef.current?.focus();
  }

  function onChangeInput(event: ChangeEvent<HTMLInputElement>): void {
    const value: string = event.target.value;
    setValue(value);
    setStateValue(value);
  }

  const setStateValue = useCallback(
    debounce((value: string) => {
      dispatch(setSearchValue(value));
    }, 300),
    [],
  );

  return (
    <div className={styles.root}>
      <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
        <path d="M 21 3 C 11.654545 3 4 10.654545 4 20 C 4 29.345455 11.654545 37 21 37 C 24.701287 37 28.127393 35.786719 30.927734 33.755859 L 44.085938 46.914062 L 46.914062 44.085938 L 33.875 31.046875 C 36.43682 28.068316 38 24.210207 38 20 C 38 10.654545 30.345455 3 21 3 z M 21 5 C 29.254545 5 36 11.745455 36 20 C 36 28.254545 29.254545 35 21 35 C 12.745455 35 6 28.254545 6 20 C 6 11.745455 12.745455 5 21 5 z" />
      </svg>
      <input
        ref={inputRef}
        onChange={onChangeInput}
        value={value}
        className={styles.input}
        placeholder="Search pizza..."
      />
      {value && (
          <svg
          onClick={onClickClear}
          className={styles.clearIcon}
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
        </svg>
      )}
    </div>
  );
}

export default Search;
