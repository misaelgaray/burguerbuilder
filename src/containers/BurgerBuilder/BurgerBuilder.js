import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
    salad: 2,
    bacon: 4,
    cheese: 5,
    meat: 7
};
 
class BurguerBuilder extends Component {

    state = {
        ingredients : {
            salad : 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice : 0,
        purchasable : false
    }

    updatePurchaseState = (passed) => {
        const ingredients = {
            ...passed
        }
        const sum = Object.keys(ingredients)
        .map(key => {
            return ingredients[key]
        }).reduce((newSum, indEl) => {
            return newSum + indEl;
        },0);
        this.setState({
            purchasable : sum > 0
        });
    }

    addIngredientHandler = (type) => {
        const oldCounter = this.state.ingredients[type];
        const updatedCount = oldCounter + 1;
        const updatedIngredientes = {
            ...this.state.ingredients
        };
        updatedIngredientes[type] = updatedCount;
        const priceAdition = this.state.totalPrice + INGREDIENT_PRICES[type];
        updatedIngredientes.totalPrice = priceAdition;
        this.setState({
            ingredients : updatedIngredientes,
            totalPrice : priceAdition
        });
        this.updatePurchaseState(updatedIngredientes);
    }

    removeIngredientHandler = (type) => {
        const oldCounter = this.state.ingredients[type];
        if(oldCounter === 0)
            return;
        const updatedCount = oldCounter - 1;
        const updatedIngredientes = {
            ...this.state.ingredients
        };
        updatedIngredientes[type] = updatedCount;
        const priceAdition = this.state.totalPrice - INGREDIENT_PRICES[type];
        updatedIngredientes.totalPrice = priceAdition;
        this.setState({
            ingredients: updatedIngredientes,
            totalPrice: priceAdition
        });
        this.updatePurchaseState(this.updatedIngredientes);
    }

    render(){
        const disabledInfo = {
            ...this.state.ingredients
        };
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] == 0;
        }
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients}></Burger>
                <BuildControls 
                ingredientRemoved={this.removeIngredientHandler} 
                ingredientAdded={this.addIngredientHandler}
                disabled={disabledInfo}
                price={this.state.totalPrice}
                purchase={this.state.purchasable}/>
            </Aux>
        );
    }
}

export default BurguerBuilder;