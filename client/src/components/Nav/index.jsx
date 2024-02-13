import Auth from "../../utils/auth";
import { Link } from "react-router-dom";

// Navigation component that renders the site's navigation bar
function Nav() {

  // Function to conditionally render navigation links based on user authentication status
  function showNavigation() {
    // If user is logged in, show order history and logout links
    if (Auth.loggedIn()) {
      return (
        <ul className="flex-row">
          <li className="mx-1">
            <Link to="/orderHistory">
              Order History
            </Link>
          </li>
          <li className="mx-1">
            {/* Logout link - when clicked, logs out user and refreshes the application */}
            <a href="/" onClick={() => Auth.logout()}>
              Logout
            </a>
          </li>
        </ul>
      );
    } else {
      // If user is not logged in, show signup and login links
      return (
        <ul className="flex-row">
          <li className="mx-1">
            <Link to="/signup">
              Signup
            </Link>
          </li>
          <li className="mx-1">
            <Link to="/login">
              Login
            </Link>
          </li>
        </ul>
      );
    }
  }

  // Render the navigation component
  return (
    <header className="flex-row px-1">
  <h1>
    <Link to="/">
      <span role="img" aria-label="shopping bag">
        <img src="../../public/images/siteswift.png" alt="WEBSITELOGO" style={{"width":"100px", "height": "auto"}} />
      </span>
    </Link>
  </h1>

      {/* Render navigation links */}
      <nav>
        {showNavigation()}
      </nav>
    </header>
  );
}

export default Nav;
