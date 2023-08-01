import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import StripeContainer from './StripeContainer/StripeContainer';
import './Stripe.css';

export default function Stripe() {
  const basket = useSelector((state) => state.basketStore);
  const finalPrice = basket.reduce((acc, el) => acc + el.price, 0);
  const [showItem, setShowItem] = useState(false);
  return (
    <div>
    {showItem
      ? <StripeContainer />
      : (
    <div className="wrapperStrapi">
          <img className="item elemStripe" src="http://localhost:3001/public/images/f754ef05e2e46234a2f8f60b5ee80041.gif" alt="item" />
          <div className="elemStripe priceStripe">${finalPrice}</div>
          <button className="buttonPayStripe elemStripe" onClick={() => setShowItem(true)} type="">Купить</button>
    </div>
      )}
    </div>
  );
}
