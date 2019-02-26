import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const INGREDIENT_PRICES = {
  salad: 2,
  bacon: 4,
  cheese: 5,
  meat: 7
};

class BurguerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 0,
    purchasable: false,
    purchasing: false,
    loading: false,
    error : false
  };

  componentDidMount() {
    axios.get("/ingredients.json").then(response => {
      this.setState({ ingredients: response.data });
    }).catch(error => {
        this.setState({error: true});
    });
  }

  updatePurchaseState = passed => {
    const ingredients = {
      ...passed
    };
    const sum = Object.keys(ingredients)
      .map(key => {
        return ingredients[key];
      })
      .reduce((newSum, indEl) => {
        return newSum + indEl;
      }, 0);
    this.setState({
      purchasable: sum > 0
    });
  };

  addIngredientHandler = type => {
    const oldCounter = this.state.ingredients[type];
    const updatedCount = oldCounter + 1;
    const updatedIngredientes = {
      ...this.state.ingredients
    };
    updatedIngredientes[type] = updatedCount;
    const priceAdition = this.state.totalPrice + INGREDIENT_PRICES[type];
    updatedIngredientes.totalPrice = priceAdition;
    this.setState({
      ingredients: updatedIngredientes,
      totalPrice: priceAdition
    });
    this.updatePurchaseState(updatedIngredientes);
  };

  removeIngredientHandler = type => {
    const oldCounter = this.state.ingredients[type];
    if (oldCounter === 0) return;
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
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  closePurchaseHandler = () => {
    this.setState({ purchasing: false });
  };

  onCancelOrderHandler = () => {
    this.closePurchaseHandler();
  };

  onContinueOrderHandler = () => {
    this.setState({ loading: true });
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      deliveryMethod: "fastes",
      customer: {
        name: "Misael",
        address: {
          street: "Mexquitito",
          zipCode: "65788",
          country: "Mexico"
        },
        email: "m@m.com"
      }
    };
    //alert("Hey, What's up motherfucker");
    axios
      .post("/orders.json", order)
      .then(response => {
        console.log(response);
        this.setState({ loading: false, purchasing: false });
      })
      .catch(response => {
        console.log(response);
        this.setState({ loading: false, purchasing: false });
      });
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] == 0;
    }

    let orderSummary = null;
    let burguer = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />;

      if (this.state.ingredients) {
          burguer = (
              <Aux>
                  <Burger ingredients={this.state.ingredients} />
                  <BuildControls
                      ordered={this.purchaseHandler}
                      ingredientRemoved={this.removeIngredientHandler}
                      ingredientAdded={this.addIngredientHandler}
                      disabled={disabledInfo}
                      price={this.state.totalPrice}
                      purchase={this.state.purchasable}
                  />
              </Aux>
          );

          orderSummary = (
              <OrderSummary
                  price={this.state.totalPrice}
                  ingredients={this.state.ingredients}
                  onCancel={this.onCancelOrderHandler}
                  onContinue={this.onContinueOrderHandler}
              />
          );
      }

      if (this.state.loading) {
          orderSummary = <Spinner />;
      }

    return (
      <Aux>
        <Modal clicked={this.closePurchaseHandler} show={this.state.purchasing}>
          {orderSummary}
        </Modal>
        {burguer}
      </Aux>
    );
  }
}

export default withErrorHandler(BurguerBuilder, axios);
