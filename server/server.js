

const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');
const { authMiddleware } = require('./utils/auth');
// GraphQL schema definitions and resolvers
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
// Server configuration
const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
  await server.start();
  // Middleware for parsing JSON and urlencoded form data
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  // Serve up static assets
  app.use('/images', express.static(path.join(__dirname, '../client/images')));
  // Apply the Apollo GraphQL middleware with expressMiddleware function
  app.use('/graphql', expressMiddleware(server, {
    // Apply authentication middleware for GraphQL operations
    context: authMiddleware
  }));
  // Serve the static files from the React app in production mode
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));
    // Redirect all requests to the React app
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }
  // Start the Express server once the database connection is open
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

// Call the async function to start the server
startApolloServer();
