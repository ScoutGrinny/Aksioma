import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from '../PaymentForm/PaymentForm';

const PUBLIC_KEY = 'pk_test_51MCqbeKrUsVPh5QNBAUMaKALcYcH3BdVGzE3IjOzKv0ww58b378W0Z9O9dL0xO5PCMRKoPTNtn9NVLLanmoQwKEs00mXhaTaQc';

const stipeTestPromise = loadStripe(PUBLIC_KEY);

export default function StripeContainer() {
  return (
    <Elements stripe={stipeTestPromise}>
      <PaymentForm />
    </Elements>
  );
}
