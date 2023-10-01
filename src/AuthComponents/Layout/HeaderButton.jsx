import React, { useContext } from "react";
import CartIcon from "../../Components/Cart/CartIcon";
import styles from "./HeaderButton.module.css";
import CartContext from "../../store/CartContext";
const HeaderButton = (props) => {
  const Ctx = useContext(CartContext);
  const CartAmount = Ctx.items.reduce((currNumber, item) => {
    return currNumber + item.amount;
  }, 0);
  return (
    <button className={styles.button} onClick={props.onShowCart}>
      <span className={styles.CartIcon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={styles.badge}>{CartAmount}</span>
    </button>
  );
};
export default HeaderButton;
