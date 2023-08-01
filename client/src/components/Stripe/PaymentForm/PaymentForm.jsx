import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import { basketLogout } from '../../../store/actions/basketAction';
import '../Stripe.css';

const CARD_OPTIONS = {
  iconStyle: 'solid',
  style: {
    base: {
      iconColor: '#c4f0ff',
      color: '#fff',
      fontWeight: 500,
      fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
      fontSize: '16px',
      fontSmoothing: 'antialiased',
      ':-webkit-autofill': { color: '#fce883' },
      '::placeholder': { color: '#87bbfd' },
    },
    invalid: {
      iconColor: '#ffc7ee',
      color: '#ffc7ee',
    },
  },
};

export default function PaymentForm() {
  const basket = useSelector((state) => state.basketStore);
  const dispatch = useDispatch();
  const finalPrice = basket.reduce((acc, el) => acc + el.price, 0);
  console.log('===>>> 👉👉👉 file: PaymentForm.jsx:33 👉👉👉 finalPrice', finalPrice);
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const [load, setLoad] = useState(false);

  const handleSubmit = async (e) => {
    setLoad(true);
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });
    if (!error) {
      const { id } = paymentMethod;
      const response = await axios.post('http://localhost:3001/payment', {
        amount: finalPrice * 100,
        id,
      });

      if (response.data.success) {
        setLoad(false);
        console.log(response.data);
        console.log('Succesful payment!');
        setSuccess(true);

        fetch('http://localhost:3001/basket', {
          method: 'PUT',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(
            basket,
          ),
        })
          .then((res) => res.json())
          .then((res) => {
            console.log(res.status);
            if (res.status === 'bought') {
              dispatch(basketLogout([]));
            }
          })
          .catch();
      }
    }
  };

  return (
    <div>

        {!success
          ? (
  <form className="wrapperStrapi" onSubmit={handleSubmit}>
    <img className="item secondPic" src="http://localhost:3001/public/images/asda23851-vmkrup.gif" alt="img error" />
    <fieldset className="FormGroup ">
        <div className="FormRow">
      <CardElement options={CARD_OPTIONS} />
        </div>
    </fieldset>
    <button className="buttonPayStripe1">Оплатить</button>
    {load
    && (
  <>
    {/* <div id="wrapper">
        <div id="corpus" />
        <div id="spinner" />
    </div> */}

  <div className="spinner spinner--steps2 icon-spinner-7" aria-hidden="true" />
  <div id="text">&nbsp;Loading ...</div>
  </>
    )}
  </form>
          ) : (
    <div className="successPaymentDiv">
      <h2>Оплата прошла успешно!</h2>
      <img src="http://localhost:3001/public/images/giphyMoney1231.webp" alt="img" />
    </div>
          )}
    </div>
  );
}
