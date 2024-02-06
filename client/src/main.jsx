import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// THIS CODE BELOW SHOULD WORK for routing DONT use before client/src/pages/'whatever the file name'.jsx
//  is created this will mess up the front end


// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import { createBrowserRouter, RouterProvider } from 'react-router-dom' 
// import './index.css'

// import App from './App.jsx'
// import Detail from './pages/Detail.jsx'
// import Home from './pages/Home.jsx'
// import Login from './pages/Login.jsx'
// import NoMatch from './pages/NoMatch.jsx'
// import OrderHistory from './pages/OrderHistory.jsx'
// import Signup from './pages/Signup.jsx'
// import Success from './pages/Success.jsx'

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <App />,
//     error: <NoMatch />,
//     children: [
//       {
//         index: true,
//         element: <Home />
//       }, {
//         path: '/login',
//         element: <Login />
//       }, {
//         path: '/signup',
//         element: <Signup />
//       }, {
//         path: '/success',
//         element: <Success />
//       }, {
//         path: '/orderHistory',
//         element: <OrderHistory/>
//       }, {
//         path: '/products/:id',
//         element: <Detail />
//       }
//     ]
//   }]);

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   <RouterProvider router={router} />
// )