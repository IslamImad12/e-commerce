// import logo from './logo.svg';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Layout from './Component/Layout';
import Home from './Component/Home';
import Products from './Component/Products';
import Login from './Component/Login';
import Cart from './Component/Cart';
import Register from './Component/Register';
import Catgories from './Component/Catgories';
import NotFound from './Component/NotFound';
import Brands from './Component/Brands';
import'bootstrap/dist/css/bootstrap.min.css';
import'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css'
import { validateYupSchema } from 'formik';
import { CounterContextProvider } from './Component/CounterContext';
import { useContext, useEffect } from 'react';
import { UserContextProvider, userContext } from './UserContext';
import ProtectedRoute from './Component/ProtectedRoute';
import ProductDetails from './Component/ProductDetails';
import Orders from './Component/Orders';
import { WhishContextProvider } from './Component/WhishContext';
import Whish from './Whish';
import VertifyCode from './Component/VertifyCode';
import ResetCode from './Component/ResetCode';


// validateYupSchema


export default function App() {

  let { setIsUser,setLogin } = useContext(userContext)

  //handle refersh
  useEffect(() => {
    if (localStorage.getItem('userToken'))
      setIsUser(localStorage.getItem('userToken'))
      setLogin(localStorage.getItem('userName'))
  }, [])

  const routes = createBrowserRouter([
    {
      path: '', element: <Layout></Layout>, children: [
        { index: true, element: <Login></Login> },
        { path: 'login', element: <Login></Login> },
        { path: 'register', element: <Register></Register> },
        { path: 'home', element: <ProtectedRoute><Home></Home></ProtectedRoute> },
        { path: 'cart', element: <ProtectedRoute><Cart></Cart></ProtectedRoute> },
        { path: 'products', element: <ProtectedRoute><Products></Products></ProtectedRoute> },
        { path: 'productsDetails/:id', element: <ProtectedRoute><ProductDetails></ProductDetails></ProtectedRoute> },
        { path: 'brands', element: <ProtectedRoute><Brands></Brands> </ProtectedRoute> },
        { path: 'catgories', element: <ProtectedRoute><Catgories></Catgories></ProtectedRoute> },
        { path: 'whish', element: <ProtectedRoute><Whish></Whish></ProtectedRoute> },
        { path: 'vertifyCode', element: <VertifyCode></VertifyCode> },
        { path: 'resetCode', element: <ResetCode></ResetCode> },
        { path: '*', element: <NotFound></NotFound> },
        { path: '*', element: <Orders></Orders> }
      ]
    }
  ])


  return (
    <WhishContextProvider>
      <RouterProvider router={routes}></RouterProvider>
    </WhishContextProvider>
  )
}

