import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';
// Login component handles user login functionality
function Login(props) {
  // Local state to manage form inputs
  const [formState, setFormState] = useState({ email: '', password: '' });
  // GraphQL mutation hook for the login operation
  const [login, { error }] = useMutation(LOGIN);
  // Handles form submission for login
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      // Attempt to execute login mutation with form state variables
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token; // Extract token from response
      Auth.login(token);// Authenticate user with token
    } catch (e) {
      console.log('error', e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;// Destructure updated input name and value
    setFormState({
      ...formState,// Spread existing form state
      [name]: value,// Update changed value
    });
  };
  // Render the login form
  return (
    <div className="container my-1">
      <Link to="/signup">← Go to Signup</Link>

      <h2>Login</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="flex-row space-between my-2">
          <label htmlFor="email">Email address:</label>
          <input
            placeholder="youremail@test.com"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="pwd">Password:</label>
          <input
            placeholder="******"
            name="password"
            type="password"
            id="pwd"
            onChange={handleChange}
          />
        </div>
        {error ? (
          <div>
            <p className="error-text">The provided credentials are incorrect</p>
          </div>
        ) : null}
        <div className="flex-row flex-end">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Login;