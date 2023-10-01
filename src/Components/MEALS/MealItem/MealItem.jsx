import React, { useContext } from "react";
import styles from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import CartContext from "../../../store/CartContext";
import Card from "../../UI/Card";
const MealItem = (props) => {
  const ctx = useContext(CartContext);
  const FinalItemDataAdded = (quantity) => {
    const item = {
      id: props.id,
      name: props.name,
      price: props.price,
      amount: quantity,
    };
    // console.log(item);
    ctx.addItemToCart(item);
  };

  return (
    <Card>
      <li className={styles.meal}>
        <div>
          <h3>{props.name}</h3>
          <div className={styles.description}>{props.description}</div>
          <div className={styles.price}>{`$${props.price.toFixed(2)}`}</div>
        </div>
        <div>
          <MealItemForm id={props.id} addAmount={FinalItemDataAdded} />
        </div>
      </li>
    </Card>
  );
};
export default MealItem;
