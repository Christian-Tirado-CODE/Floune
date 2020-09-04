import React from 'react';
import {Link} from 'react-router-dom';
const thankYOuPage = () => {
    return (
        <div  style={{border: '1px solid black', padding: '30px', width:'50%', margin:'100px auto', textAlign: 'center'}}>
            <h1 style={{marginBottom: '50px'}}>Thank You for doing bussiness with us!</h1>
            <Link to="/" style={{backgroundColor: '#a749ff', color:'white', padding: '10px', fontSize: '16px'}}>Homepage</Link>
        </div>
    );
};

export default thankYOuPage;