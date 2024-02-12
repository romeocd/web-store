import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useStoreContext } from '../../utils/GlobalState';
import {
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
} from '../../utils/actions';
import { QUERY_CATEGORIES } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
// Component that fetches category data from a GraphQL server and updates the global state and IndexedDB for offline access
function CategoryMenu() {
  // Destructure state and dispatch from the global context to manage application state
  const [state, dispatch] = useStoreContext();
  // Extract categories from the state for rendering
  const { categories } = state;
  // Execute the GraphQL query to fetch categories, monitor loading state and result data
  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);
  // Effect hook to update categories in global state and IndexedDB based on query results
  useEffect(() => {
    // If category data is available, update global state and IndexedDB
    if (categoryData) {
      dispatch({
        type: UPDATE_CATEGORIES,
        categories: categoryData.categories,
      });
      // Store each category in IndexedDB
      categoryData.categories.forEach((category) => {
        idbPromise('categories', 'put', category);
      });
    } else if (!loading) {
      // If loading is complete but no data, attempt to load categories from IndexedDB
      idbPromise('categories', 'get').then((categories) => {
        dispatch({
          type: UPDATE_CATEGORIES,
          categories: categories,
        });
      });
    }
  }, [categoryData, loading, dispatch]);
  // Handles click events on category buttons, updating the current category in global state.
  const handleClick = (id) => {
    dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: id,
    });
  };
  // Renders the category menu with buttons for each category
  return (
    <div>
      <h2>Browse Categories</h2>
      {categories.map((item) => (
        <button
          key={item._id}
          onClick={() => {
            handleClick(item._id);
          }}
        >
          {item.name}
        </button>
      ))}
      <button
        onClick={() => {
          handleClick('');
        }}
      >
        All
      </button>
    </div>
  );
}

export default CategoryMenu;
