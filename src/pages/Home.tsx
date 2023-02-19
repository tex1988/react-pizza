import Categories, { categoriesList } from '../components/Categories';
import Sort, { sortList } from '../components/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton';
import PizzaBlock from '../components/PizzaBlock';
import { ReactElement, useEffect, useRef } from 'react';
import Pagination from '../components/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilter, setCategoryId, setFilters, setPage } from '../redux/slices/filterSlice';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { fetchPizzas, selectPizzas } from '../redux/slices/pizzaSlice';

function Home(): ReactElement | null {
  const { categoryId, currentSortItem, currentPage, searchValue } = useSelector(selectFilter);
  const { pizzas, status } = useSelector(selectPizzas);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isMounted = useRef(false);
  const sortType = currentSortItem.sortType;

  function onClickCategory(id: number): void {
    dispatch(setCategoryId(id));
  }

  function onChangePage(number: number): void {
    dispatch(setPage(number));
  }

  function getPizzas() {
    const params: any = {};
    categoryId > 0 && (params.category = categoryId);
    searchValue && (params.search = searchValue);
    params.sortBy = sortType;
    params.limit = 8;
    params.page = currentPage;
    params.order = 'desc';
    // @ts-ignore
    dispatch(fetchPizzas(params));
  }

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.split('?').slice(-1)[0]);
      const currentSortItem = sortList.find((sortItem) => sortItem.sortType === params.sortType);
      dispatch(setFilters({ ...params, currentSortItem }));
    }
  }, []);

  useEffect(() => {
    getPizzas();
  }, [categoryId, sortType, searchValue, currentPage]);

  useEffect(() => {
    if (isMounted.current) {
      const query = qs.stringify({ sortType, categoryId, searchValue, currentPage });
      navigate(`?${query}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType, searchValue, currentPage]);

  const sortedPizzas = pizzas.map((pizza: any) => <PizzaBlock key={pizza.id} {...pizza} />);
  const skeletons = [...new Array(4)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onClickCategory} />
        <Sort />
      </div>
      <h2 className="content__title">{categoriesList[categoryId]} pizzas</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>An error occurred &#128577;</h2>
          <p> Please try again later</p>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeletons : sortedPizzas}</div>
      )}
      <Pagination onChangePage={onChangePage} />
    </div>
  );
}

export default Home;
