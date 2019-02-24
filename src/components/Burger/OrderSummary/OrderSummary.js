import React, {Component} from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
    .map(igKey=>{
        return (
            <li key={igKey}>
                <span style={{textTransform: 'capitalize'}}>{igKey}</span> : {props.ingredients[igKey]}
            </li>)
        ;
    });
    return <Aux>
        <h3>Your order</h3>
        <p>Delitious burger with the following ingredients</p>
        <ul>{ingredientSummary}</ul>
        <p><b>Total:</b> $ {props.price}</p>
        <p>Continue to checkout?</p>
        <Button clicked={props.onCancel} btnType="Danger">
          Cancel
        </Button>
        <Button clicked={props.onContinue} btnType="Success">
          Continue
        </Button>
      </Aux>;
};

export default orderSummary;