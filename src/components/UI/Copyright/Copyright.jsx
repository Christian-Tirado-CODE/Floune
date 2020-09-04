import React from 'react';
import Logo from '../Logo/Logo';
import './Copyright.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const copyright = () => (
    <div>
        <Logo/>
        <p><FontAwesomeIcon icon="copyright"/> 2020 Flone.</p>
        <p>All Rights Reserved</p>
    </div>

    
);

export default copyright;