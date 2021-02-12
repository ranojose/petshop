import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productsReducer, productDetailsReducer } from './reducer/productReducer';
import { authReducer, userReducer, forgotPasswordReducer } from './reducer/userReducer';
import { cartReducer } from './reducer/cartReducers';
import { newOrderReducer, myOrdersReducer } from './reducer/orderReducers'

const reducer = combineReducers({
        products: productsReducer,
        productsDetails: productDetailsReducer,
        auth: authReducer,
        user: userReducer,
        forgotPassword: forgotPasswordReducer,
        cart: cartReducer,
        newOrder: newOrderReducer,
        myOrders: myOrdersReducer
})      
        
let initialState = {
        cart: {
          cartItems: localStorage.getItem('cartItems')
          ? JSON.parse(localStorage.getItem('cartItems'))
          : [],
          shippingInfo: localStorage.getItem('shippingInfo')
          ? JSON.parse(localStorage.getItem('shippingInfo'))
          : {}
        }
} ;

const middleware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store;
        