import { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/client';
import { QUERY_CHECKOUT } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import CartItem from '../CartItem';
import Auth from '../../utils/auth';
import { useStoreContext } from '../../utils/GlobalState';
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from '../../utils/actions';
import './style.css';

const stripePromise = loadStripe('pk_test_51OfAPQAEasXPaTc1bwWFkcoKqpSAJHXn3hATk3a6GZFyR9uGKSNluiOn5fikBE3z5SD0uPVtdQWK4weQF01LFiig00w9EUm2e9');

const Cart = () => {
  // State and dispatch from the global context
  const [state, dispatch] = useStoreContext();
  // Lazy query hook for checkout process
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);
  // Effect for handling checkout process
  useEffect(() => {
    // If checkout data is available, redirect to Stripe checkout
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);
  // Effect for loading cart items from IndexedDB on component mount or cart length change
  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise('cart', 'get');
      dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
    }

    if (!state.cart.length) {
      getCart();
    }
  }, [state.cart.length, dispatch]);
  // Toggles the cart's visibility
  function toggleCart() {
    dispatch({ type: TOGGLE_CART });
  }
  // Calculates the total price of items in the cart
  function calculateTotal() {
    let sum = 0;
    state.cart.forEach((item) => {
      sum += item.price * item.purchaseQuantity;
    });
    return sum.toFixed(2);
  }
  // Initiates the checkout process
  function submitCheckout() {
    getCheckout({
      variables: { 
        products: [...state.cart],
      },
    });
  }
  // Render logic for when the cart is closed
  if (!state.cartOpen) {
    return (
      <div className="cart-closed" onClick={toggleCart} value="value">
        <span role="img" aria-label="trash" id="id">
          🛒
        </span>
      </div>
    );
  }
  // Main render for the open cart
  return (
    <div className="cart">
      <div className="close" onClick={toggleCart}>
        [close]
      </div>
      <h2>Shopping Cart</h2>
      {state.cart.length ? (
        <div>
          {state.cart.map((item) => (
            <CartItem key={item._id} item={item} />
          ))}

          <div className="flex-row space-between">
            <strong>Total: ${calculateTotal()}</strong>

            {Auth.loggedIn() ? (
              <button onClick={submitCheckout}>Checkout</button>
            ) : (
              <span>(log in to check out)</span>
            )}
          </div>
        </div>
      ) : (
        <h3>
          <span role="img" aria-label="empty">
            🧺
          </span>
          You have nothing in your cart yet!
        </h3>
      )}
    </div>
  );
};

export default Cart;
