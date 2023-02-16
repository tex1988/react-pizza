import Categories from '../components/Categories';
import Sort, { sortList } from '../components/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton';
import PizzaBlock from '../components/PizzaBlock';
import { useEffect, useRef, useState } from 'react';
import Pagination from '../components/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId, setPage, setFilters } from '../redux/slices/filterSlice';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

function Home() {
  const { categoryId, sort, currentPage, searchValue } = useSelector((state) => state.filter);
  const sortType = sort.sortType;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const baseUrl = 'https://63e377a3619fce55d4198d8f.mockapi.io';

  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (Number) => {
    dispatch(setPage(Number));
  };

  function fetchPizzas() {
    setLoading(true);
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';
    const page = `&limit=8&page=${currentPage}`;

    axios
      .get(`${baseUrl}/pizza?${category}${search}${page}&sortBy=${sortType}&order=desc`)
      .then((res) => {
        setPizzas(res.data);
        setLoading(false);
      });
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
      fetchPizzas();
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
      <h2 className="content__title">All pizzas</h2>
      <div className="content__items">{isLoading ? skeletons : sortedPizzas}</div>
      <Pagination onChangePage={onChangePage} />
    </div>
  );
}

export default Home;
