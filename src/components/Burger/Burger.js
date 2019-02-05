import React from 'react';
import BurguerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.css';

const burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients).map(key =>{
        return [...Array(props.ingredients[key])].map((_,i) => {
            return <BurguerIngredient key={key + i} type={key}></BurguerIngredient>;
        })
    }).reduce((arr, el) => {
        return arr.concat(el)
    }, []);
    if(transformedIngredients.length === 0){
        console.log(transformedIngredients);
        transformedIngredients = <p>Please start introducing ingredients</p>;
    }
    console.log(transformedIngredients);
    return <div className={classes.Burger}>
        <BurguerIngredient type="bread-top" />
        {transformedIngredients}
        <BurguerIngredient type="bread-bottom" />
      </div>;
};

export default burger;