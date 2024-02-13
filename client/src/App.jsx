import { Outlet } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Nav from './components/Nav';
import { StoreProvider } from './utils/GlobalState';
// Create an HTTP link for the Apollo Client that points to the GraphQL server
const httpLink = createHttpLink({
  uri: '/graphql',
});
// Set up authentication context for Apollo Client requests
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  // Return the headers to the context so httpLink can read them,
  // including the authorization header if the token exists
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});
// Initialize Apollo Client with the authLink and httpLink
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
// App component serves as the root of the application
function App() {
  return (
    <ApolloProvider client={client}>
      <StoreProvider>
        <Nav />
        <Outlet />
      </StoreProvider>
    </ApolloProvider>
  );
}

export default App;
