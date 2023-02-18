import Categories, { categoriesList } from '../components/CategoriesList';
import Sort, { sortList } from '../components/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton';
import PizzaBlock from '../components/PizzaBlock';
import { useEffect, useRef } from 'react';
import Pagination from '../components/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilter, setCategoryId, setFilters, setPage } from '../redux/slices/filterSlice';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { fetchPizzas, selectPizzas } from '../redux/slices/pizzaSlice';

function Home() {
  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);
  const sortType = sort.sortType;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { pizzas, status } = useSelector(selectPizzas);

  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (Number) => {
    dispatch(setPage(Number));
  };

  function getPizzas() {
    const params = {};
    categoryId > 0 && (params.category = categoryId);
    searchValue && (params.search = searchValue);
    params.sortBy = sortType;
    params.limit = 8;
    params.page = currentPage;
    params.order = 'desc';
    dispatch(fetchPizzas(params));
  }

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.split('?').slice(-1)[0]);
      const sort = sortList.find((sort) => sort.sortType === params.sortType);
      dispatch(setFilters({ ...params, sort }));
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sortType, searchValue, currentPage]);

  useEffect(() => {
    if (isMounted.current) {
      const query = qs.stringify({ sortType, categoryId, searchValue, currentPage });
      navigate(`?${query}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType, searchValue, currentPage]);

  const sortedPizzas = pizzas.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />);
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
