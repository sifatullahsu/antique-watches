import React, { useEffect, useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


const CheckoutForm = ({ order }) => {

  const { _id, userName, productID, userID, userEmail } = order;
  const navigate = useNavigate();


  const stripe = useStripe();
  const elements = useElements();

  const price = parseFloat(order.productPrice);

  const [clientSecret, setClientSecret] = useState("");


  useEffect(() => {
    fetch("http://localhost:5000/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ price: price }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [price]);



  const handleCheckout = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);

    if (card == null) return;

    /*     const { error, paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card, });
    
        if (error) {
          console.log('[error]', error);
        } else {
          console.log('[PaymentMethod]', paymentMethod);
        } */

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            name: userName,
            email: userEmail
          },
        },
      },
    );


    if (confirmError) {
      toast.error('Somthing is wrong');
      console.log(confirmError);
    }
    else {
      if (paymentIntent.id) {
        const order = {
          status: "true",
          orderID: paymentIntent.id,
          userID: userID,
          amount: paymentIntent.amount
        }

        fetch(`http://localhost:5000/orders/payment-confirm?orderID=${_id}&productID=${productID}`, {
          method: 'PATCH',
          headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('antique-token')}`
          },
          body: JSON.stringify(order)
        })
          .then(res => res.json())
          .then(data => {
            toast.success('Payment successful..');
            navigate('/dashboard/my-orders');
          })
      }
    }
  }

  return (
    <div>
      <form onSubmit={handleCheckout}>
        <CardElement
          className='max-w-xs'
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
        <button className='btn btn-primary btn-sm mt-5' type="submit" disabled={!stripe || !clientSecret}>
          Pay
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;