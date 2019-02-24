import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux';

const sideDrawer = (props) =>{
    let attachClasses = [classes.SideDrawer, classes.Close];
    if(props.show){
        attachClasses = [classes.SideDrawer, classes.Open];
    }
    return <Aux>
        <Backdrop clicked={props.closed} show={props.show} />
        <div className={attachClasses.join(' ')}>
          <Logo height="11%" style={{ "margin-bottom": "32px" }} />
          <nav>
            <NavigationItems />
          </nav>
        </div>
      </Aux>;
}

export default sideDrawer;