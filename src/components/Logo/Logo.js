import React from 'react';

import bergerLogo from '../../assets/images/burger-logo.png';
import classes from './Logo.css';

const Logo = props => (
    <div className={classes.Logo}>
        <img src={bergerLogo} alt="Burger Logo" />
    </div>
);

export default Logo;