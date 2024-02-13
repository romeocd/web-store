import { useEffect } from 'react';
import ProductItem from '../ProductItem';
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_PRODUCTS } from '../../utils/actions';
import { useQuery } from '@apollo/client';
import { QUERY_PRODUCTS } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import spinner from '../../assets/spinner.gif';
// The ProductList component fetches and displays products
function ProductList() {
  // Access global state and dispatch function
  const [state, dispatch] = useStoreContext();
  // Extract currentCategory from state to filter products displayed
  const { currentCategory } = state;
  // Execute the QUERY_PRODUCTS GraphQL query
  const { loading, data } = useQuery(QUERY_PRODUCTS);
  // Effect hook to update global state and IndexedDB with fetched products
  useEffect(() => {
    if (data) {
      // Dispatch action to update products in global state
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products,
      });
      // Cache fetched products in IndexedDB
      data.products.forEach((product) => {
        idbPromise('products', 'put', product);
      });
    } else if (!loading) {
       // Load products from IndexedDB if not loading (e.g., offline)
      idbPromise('products', 'get').then((products) => {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: products,
        });
      });
    }
  }, [data, loading, dispatch]);
  // Filters products by the current category
  function filterProducts() {
    if (!currentCategory) {
      return state.products;
    }
     // Renders the product list or a message if no products are available
    return state.products.filter(
      (product) => product.category._id === currentCategory
    );
  }

  return (
    <div className="my-2">
      <h2>Our Products:</h2>
      {state.products.length ? (
        <div className="flex-row">
          {filterProducts().map((product) => (
            <ProductItem
              key={product._id}
              _id={product._id}
              image={product.image}
              name={product.name}
              price={product.price}
              quantity={product.quantity}
            />
          ))}
        </div>
      ) : (
        <h3>You have no products yet!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

export default ProductList;
