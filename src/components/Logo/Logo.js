import React from 'react';
import classes from './Logo.css';
import logoImage from '../../assets/images/37318.png';


const logo = (props) => {
    return <div className={classes.Logo} style={{height : props.height}}>
        <img src={logoImage} alt="Dont look back in anguer" />
      </div>;
}

export default logo;