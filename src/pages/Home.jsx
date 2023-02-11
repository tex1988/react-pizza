import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton';
import PizzaBlock from '../components/PizzaBlock';
import { useEffect, useState } from 'react';

function Home() {
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const baseUrl = 'https://63e377a3619fce55d4198d8f.mockapi.io';

  useEffect(() => {
    fetch(`${baseUrl}/pizza`)
      .then((data) => data.json())
      .then((json) => {
        setPizzas(json);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">All pizzas</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : pizzas.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />)}
      </div>
    </div>
  );
}

export default Home;
