import React from 'react';
import classes from './NavigationItems.css';

const navigationItems = (proprs) => {
    return <ul className={classes.NavigationItems}>
        <li className={classes.NavigationItem}>
          <a>Burguer Builder</a>
        </li>
        <li className={classes.NavigationItem}>
            <a className={classes.active}>Checkout</a>
        </li>
      </ul>;
}

export default navigationItems;