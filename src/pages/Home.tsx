import Categories, { categoriesList } from '../components/Categories';
import Sort, { SortItem, sortList } from '../components/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton';
import PizzaBlock from '../components/PizzaBlock';
import { ReactElement, useCallback, useEffect, useRef } from 'react';
import Pagination from '../components/Pagination';
import { useSelector } from 'react-redux';
import { FilterSliceState, selectFilter, setCategoryId, setFilters, setPage, } from '../redux/slices/filterSlice';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { fetchPizzas, Pizza, PizzaQueryParams, selectPizzas, Status, } from '../redux/slices/pizzaSlice';
import { useAppDispatch } from '../redux/store';

function Home(): ReactElement | null {
  const { categoryId, currentSortItem, currentPage, searchValue } = useSelector(selectFilter);
  const { pizzas, status } = useSelector(selectPizzas);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isMounted = useRef(false);
  const sortType = currentSortItem.sortType;

  const onChangeCategory = useCallback((id: number): void => {
    dispatch(setCategoryId(id));
  }, []);

  function onChangePage(number: number): void {
    dispatch(setPage(number));
  }

  function getPizzas() {
    const params: PizzaQueryParams = {
      sortBy: sortType,
      limit: 8,
      page: currentPage,
      order: 'desc',
    };
    categoryId > 0 && (params.category = categoryId);
    searchValue && (params.search = searchValue);
    dispatch(fetchPizzas(params));
  }

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.split('?').slice(-1)[0]);
      const _currentSortItem = sortList.find((sortItem) => sortItem.sortType === params.sortType);
      const currentSortItem: SortItem = _currentSortItem
        ? (_currentSortItem as SortItem)
        : sortList[0];
      dispatch(setFilters({ ...params, currentSortItem } as FilterSliceState));
    }
  }, []);

  useEffect(() => {
    getPizzas();
  }, [categoryId, sortType, searchValue, currentPage]);

  useEffect(() => {
    if (isMounted.current) {
      const query: string = qs.stringify({ sortType, categoryId, searchValue, currentPage });
      navigate(`?${query}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType, searchValue, currentPage]);

  const sortedPizzas: ReactElement[] = pizzas.map((pizza: Pizza) => (
    <PizzaBlock key={pizza.id} {...pizza} />
  ));
  const skeletons: ReactElement[] = [...new Array(4)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">{categoriesList[categoryId]} pizzas</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>An error occurred &#128577;</h2>
          <p> Please try again later</p>
        </div>
      ) : (
        <div className="content__items">{status === Status.LOADING ? skeletons : sortedPizzas}</div>
      )}
      <Pagination onChangePage={onChangePage} />
    </div>
  );
}

export default Home;
