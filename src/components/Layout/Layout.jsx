import React from 'react';
import NavBar from '../Navigation/Navigation';
import Footer from '../Footer/Footer';
import Aux from '../../hoc/Auxialiary';
import {Elements} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import ChatBox from '../ChatBox/ChatBox';
const stripePromise = loadStripe(process.env.REACT_APP_PUBLISHABLE_KEY);


const layout = (props) => {
console.log(`publishable key: ` +  process.env.REACT_APP_PUBLISHABLE_KEY);
    return (
        <Aux>
            <NavBar />
            
            <main>
               <Elements stripe={stripePromise}>{props.children}</Elements> 
               <ChatBox isAdmin={false}/>
            </main>

            <Footer />
        </Aux>
    );

}

export default layout;