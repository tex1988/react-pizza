import CartBlock from '../components/CartBlock';
import { useSelector } from 'react-redux';
import { selectCart } from '../redux/slices/cartSlice';
import EmptyCart from '../components/CartBlock/EmptyCart';
import { ReactElement } from 'react';

function Cart(): ReactElement | null {
  const { totalCount } = useSelector(selectCart);

  return <div className="container--cart">{totalCount > 0 ? <CartBlock /> : <EmptyCart />}</div>;
}

export default Cart;
