import { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import Jumbotron from '../components/Jumbotron';
import { ADD_ORDER } from '../utils/mutations';
import { idbPromise } from '../utils/helpers';
// Success component is displayed after a user completes a purchase
function Success() {
  // Initialize the ADD_ORDER mutation
  const [addOrder] = useMutation(ADD_ORDER);

  useEffect(() => {
    // Function to save the order to the database and clear the cart
    async function saveOrder() {
      // Retrieve cart items from IndexedDB
      const cart = await idbPromise('cart', 'get');
      // Extract product IDs from the cart items
      const products = cart.map((item) => item._id);

      if (products.length) {
        // Use the ADD_ORDER mutation to save the order
        const { data } = await addOrder({ variables: { products } });
        const productData = data.addOrder.products;
        // Clear each item from the cart in IndexedDB
        productData.forEach((item) => {
          idbPromise('cart', 'delete', item);
        });
      }
      // Redirect to the home page after 3 seconds
      setTimeout(() => {
        window.location.assign('/');
      }, 3000);
    }

    saveOrder();
  }, [addOrder]);
  // Render success message and redirect notice
  return (
    <div>
      <Jumbotron>
        <h1>Success!</h1>
        <h2>Thank you for your purchase!</h2>
        <h2>You will now be redirected to the home page</h2>
      </Jumbotron>
    </div>
  );
}

export default Success;