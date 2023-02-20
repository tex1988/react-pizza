import { ReactElement, useEffect, useState } from 'react';
import { addItem, CartItem, selectCart } from '../../redux/slices/cartSlice';
import { Link } from 'react-router-dom';
import { Pizza } from '../../redux/slices/pizzaSlice';
import { useAppDispatch } from '../../redux/store';
import { useSelector } from 'react-redux';

function PizzaBlock({ id, imageUrl, title, types, sizes, price, category, rating }: Pizza): ReactElement | null {
  const [activeType, setActiveType] = useState(types[0]);
  const [activeSize, setActiveSize] = useState(sizes[0]);
  const [pizzaCount, setPizzaCount] = useState(0);
  const { purchasePizzas } = useSelector(selectCart);
  const typeNames: string[] = ['standard', 'thin'];
  const dispatch = useAppDispatch();

  function onClickAdd(): void {
    const cartItem: CartItem = {
      id,
      title,
      price,
      imageUrl,
      type: typeNames[activeType],
      size: activeSize,
      count:0
    };
    dispatch(addItem(cartItem));
    setPizzaCount(getPizzaCount() + 1);
  }

  function getPizzaCount() {
    const filteredPizzas = purchasePizzas
      .filter((pizza: any) => pizza.id === id)
      .map((pizza: any) => pizza.count);
    return filteredPizzas.length > 0 ? filteredPizzas.reduce((a: number, b: number) => a + b) : 0;
  }

  useEffect(() => {
    setPizzaCount(getPizzaCount);
  }, []);

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <Link to={`/pizza/${id}`}>
          <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
        </Link>
        <h4 className="pizza-block__title">{title}</h4>
        <div className="pizza-block__selector">
          <ul>
            {types.map((typeId) => (
              <li
                key={typeId}
                onClick={() => setActiveType(typeId)}
                className={activeType === typeId ? 'active' : ''}>
                {typeNames[typeId]}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((size, index) => (
              <li
                key={index}
                onClick={() => setActiveSize(size)}
                className={activeSize === size ? 'active' : ''}>
                {size} cm
              </li>
            ))}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">from ${price}</div>
          <button onClick={() => onClickAdd()} className="button button--outline button--add">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Add</span>
            {pizzaCount > 0 && <i>{pizzaCount}</i>}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PizzaBlock;
