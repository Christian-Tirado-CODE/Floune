import React, { Component } from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Homepage from './components/Homepage/Homepage';
import Aux from './hoc/Auxialiary';
import "./components/FontAwesomeIcons/FontAwesomeIcons";
import Login from './components/Login/Login';
import Layout from './components/Layout/Layout';
import Authentication from './components/Authentication/Authentication';
import Cart from './components/Cart/Cart';
import ProductDetails from './components/Product/ProductDetails/ProductDetais';
import Logout from './components/Authentication/Logout/Logout';
import Checkout from './components/Checkout/Checkout';
import {connect} from 'react-redux';
import * as actions from './store/actions/index';
import { act } from 'react-dom/test-utils';
import AdminPanel from './components/Admin/AdminPanel/AdminPanel';
import Chats from './components/Admin/Chats/Chats';
import AdminChatBox from './components/Admin/Chats/ChatBox/ChatBox';
import Products from './components/Admin/Products/Products';
import Categories from './components/Categories/Categories';
import UserSettings from './components/UserSettings/UserSettings';
import Orders from './components/Admin/Orders/Orders';
import AdminLogin from './components/Admin/Login/Login';
import Dashboard from './components/Admin/Dashboard/Dashboard';
import Blog from './components/Blog/Blog';
import Contact from './components/Contact/Contact';
import ThankYou from './components/ThankYou/ThankYou';

class App extends Component {

componentDidMount(){
  this.props.onTryAutoSignIn();
  
}


render(){

  return (
    <BrowserRouter>
    <Switch>

      <Route path="/admin-login">
      <AdminLogin/>
      </Route>
   

    <Route path="/admin-panel/">
    
          <AdminPanel>
            <Switch>
            
            <Route path="/admin-panel/chats/chat-box/:room" component={AdminChatBox} />
            <Route path="/admin-panel/chats" component={Chats}/>
            <Route path="/admin-panel/products" component={Products} />
            <Route path="/admin-panel/orders" component={Orders} />
            <Route path="/admin-panel" component={Dashboard} />
            </Switch>
          </AdminPanel>
        </Route>


     <Route>
     <Layout>
    <Switch>
    <Route path="/login-register" component={Authentication}/>
    <Route path="/cart/:id?" component={Cart} />
    <Route path="/product-details"  component={ProductDetails} />
     <Route path="/logout" component={Logout}/>
     <Route path="/checkout" component={Checkout} />
     <Route path="/thank-you" component={ThankYou} />
     <Route path="/categories" component={Categories}/>
     <Route path="/user-settings" component={UserSettings}/>
     <Route path="/blog" component={Blog}/>
     <Route path="/contact" component={Contact}/>
     <Route exact path="/" component={Homepage} />
       </Switch>
       </Layout>
     </Route>

     

     </Switch>
    
    </BrowserRouter>
  );
}

 
}
const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignIn: () => dispatch(actions.authCheckState())
  }
}
export default connect(null, mapDispatchToProps)(App);
