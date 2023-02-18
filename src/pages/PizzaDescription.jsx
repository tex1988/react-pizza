import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../redux/slices/pizzaSlice';

function PizzaDescription() {
  const { id } = useParams();
  const [pizza, setPizza] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetch() {
      try {
        const { data } = await axios.get(`${baseUrl}/pizza/${id}`);
        setPizza(data);
      } catch (e) {
        alert('Error' + e);
        navigate('/');
      }
    }

    fetch();
  }, []);

  if (!pizza) {
    return (
      <div className="container">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} alt={'Loading...'} />
      <h2>{pizza.title}</h2>
      <p>Description</p>
      <h4>Price: ${pizza.price}</h4>
    </div>
  );
}

export default PizzaDescription;
