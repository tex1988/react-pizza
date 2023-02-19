import { Link } from 'react-router-dom';
import img from '../../assets/img/empty-cart.png';
import { ReactElement } from 'react';

function EmptyCart(): ReactElement | null {
  return (
    <div className="cart cart--empty">
      <h2>
        Cart is empty <span>😕</span>
      </h2>
      <p>
        It might be you not purchase pizza yet.
        <br />
        To purchase pizza follow a main page.
      </p>
      <img src={img} alt="Empty cart" />
      <Link to="/" className="button button--black">
        <span>Return</span>
      </Link>
    </div>
  );
}

export default EmptyCart;
