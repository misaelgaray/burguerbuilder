import React from 'react';
import  classes  from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {
        label : "Salad",
        type : "salad"
    },
    {
        label: "Bacon",
        type: "bacon"
    },
    {
        label: "Cheese",
        type: "cheese"
    },
    {
        label: "Meat",
        type: "meat"
    }
];

const builControls= (props)=> {
    return <div className={classes.BuildControls}>
        <p>
          Current price: <strong>$ {props.price}</strong>
        </p>
        {controls.map(control => {
          return <BuildControl ingredientAdded={() => props.ingredientAdded(control.type)} ingredientRemoved={() => props.ingredientRemoved(control.type)} key={control.label} label={control.label} type={control.type} disabled={props.disabled[control.type]} />;
        })}
        <button onClick={props.ordered} disabled={!props.purchase} className={classes.OrderButton}>
          ORDER NOW
        </button>
      </div>;
};

export default builControls;