import { createContext, useContext, useReducer } from "react";
import { reducer } from './reducers'

const StoreContext = createContext();
const { Provider } = StoreContext;

export function useProductReducer(initialState) {
  return useReducer(reducer, initialState) // Import the reducer function for state updates

}
// StoreProvider component wraps children components to provide global state access
const StoreProvider = ({ value = [], ...props }) => {
  // Initialize the global state with default values and the custom reducer
  const [state, dispatch] = useProductReducer({
    products: [],
    cart: [],
    cartOpen: false,
    categories: [],
    currentCategory: '',
  });
  // Render the Provider component with state and dispatch provided to children
  return <Provider value={[state, dispatch]} {...props} />;
};
// Custom hook to access the global state and dispatch function from any component
const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };
