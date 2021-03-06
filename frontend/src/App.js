import { useEffect, useState } from 'react'
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './components/Home';
import ProductDetails from './components/product/ProductDetails'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Register from './components/user/Register';
import { loadUser } from './actions/userActions';
import store from './store';
import Login from './components/user/Login';
import Profile from './components/user/Profile';
import ProtectedRoute from './components/route/ProtectedRoute';
import UpdateProfile from './components/user/UpdateProfile';
import UpdatePassword from './components/user/UpdatePassword';
import ForgotPassword from './components/user/ForgotPassword';
import NewPassword from './components/user/NewPassword';
import Cart from './components/cart/Cart'
import Shipping from './components/cart/Shipping'
import ConfirmOrder from './components/cart/ConfirmOrder';
import Payment from './components/cart/Payment';
import axios from 'axios';
import ListOrders from './components/order/ListOrders'
import { useDispatch, useSelector } from 'react-redux';
 
//payment
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'


function App() {

  const [stripeApiKey, setStripeApiKey] = useState('');

  useEffect(() => {
    store.dispatch(loadUser())

    async function getStripApiKey() {
      const { data } = await axios.get('/api/v1/stripeapi')
      setStripeApiKey(data.stripeApiKey)
    }

    getStripApiKey()
  }, [])

  const { user, isAuthenticated, loading } = useSelector(state => state.auth)  

  return (
     <Router>
         <div className="App">
      < Header />
      <div className="container container-fluid">
       
      <Route path="/" component={Home} exact />
      <Route path="/search/:keyword" component={Home} exact />
      <Route path="/product/:id" component={ProductDetails} exact />

      <Route path="/cart" component={Cart} exact />
      <ProtectedRoute path="/shipping" component={Shipping} exact  />
      <ProtectedRoute path="/order/confirm" component={ConfirmOrder} />
      {stripeApiKey &&   
        <Elements stripe={loadStripe(stripeApiKey)}>
          <ProtectedRoute path="/payment" component={Payment} />
            </Elements> 
      }

      

      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/password/forgot" component={ForgotPassword} />
      <Route path="/password/reset/:token" component={NewPassword} />
      <ProtectedRoute path="/me" component={Profile} exact  />
      <ProtectedRoute path="/me/update" component={UpdateProfile} exact  />
      <ProtectedRoute path="/password/update" component={UpdatePassword} exact  />
      <ProtectedRoute path="/orders/me" component={ListOrders} exact  />

    </div>
      {!loading && (!isAuthenticated || user.role !== 'admin') && (
      <Footer />
      
      )} 
  </div>
</Router>
  );
}

export default App;
