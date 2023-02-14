import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton';
import PizzaBlock from '../components/PizzaBlock';
import { useEffect, useState } from 'react';
import Pagination from '../components/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId, setPage } from '../redux/slices/filterSlice';
import axios from 'axios';

function Home() {
  const { categoryId, sort, currentPage } = useSelector((state) => state.filter);
  const sortType = sort.sortType;
  const dispatch = useDispatch();
  const searchValue = useSelector((state) => state.search.searchValue);

  const [pizzas, setPizzas] = useState([]);
  //const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setLoading] = useState(true);
  const baseUrl = 'https://63e377a3619fce55d4198d8f.mockapi.io';

  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (Number) => {
    dispatch(setPage(Number));
  };

  useEffect(() => {
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
