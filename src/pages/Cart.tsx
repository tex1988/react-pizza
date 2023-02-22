import CartBlock from '../components/CartBlock';
import { useSelector } from 'react-redux';
import EmptyCart from '../components/CartBlock/EmptyCart';
import { ReactElement } from 'react';
import { selectCart } from '../redux/slices/cart/selector';

function Cart(): ReactElement | null {
  const { totalCount } = useSelector(selectCart);

  return <div className="container--cart">{totalCount > 0 ? <CartBlock /> : <EmptyCart />}</div>;
}

export default Cart;
