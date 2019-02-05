import React from "react";
import classes from './BuildControl.css';

const buildControl = (props) => {
    return <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.label}</div>
        <button onClick={props.ingredientAdded} className={classes.More}>
          more
        </button>
      <button disabled={props.disabled} onClick = { props.ingredientRemoved} className={classes.Less}>less</button>
      </div>;
};
export default buildControl;