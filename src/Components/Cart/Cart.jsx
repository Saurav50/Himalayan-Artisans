import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import styles from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/CartContext";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import { AuthContext } from "../../store/auth-context";
import { ToastContainer, toast } from "react-toastify";

const Cart = (props) => {
  const history = useHistory();
  const ctx = useContext(CartContext);
  const authctx = useContext(AuthContext);
  const hasItemsInCart = ctx.items.length > 0;

  const addItemHandler = (item) => {
    ctx.addItemToCart({ ...item, amount: 1 });
  };
  const removeItemHandler = (id) => {
    ctx.removeItemFromCart(id);
  };
  // console.log(ctx.items);

  const CartItems = (
    <ul className={styles["cart-items"]}>
      {ctx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          price={item.price}
          amount={item.amount}
          onAdd={addItemHandler.bind(null, item)}
          onRemove={removeItemHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  const [hasCheckedOut, setHasCheckedOut] = useState(false);
  const onCheckoutHandler = () => {
    if (!authctx.isLoggedIn) {
      toast("Login to continue!");
      alert("Login to continue!");
      history.replace("/auth");
    } else {
      setHasCheckedOut(true);
    }
  };

  // states that manages the data posting to backend

  const [dataIsSubmitting, setDataIsSubmitting] = useState(false);
  const [dataSubmitted, setDataSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const userDataHandler = (userData) => {
    setDataIsSubmitting(true);
    const postData = async () => {
      const response = await fetch(
        "https://meals-kart-default-rtdb.firebaseio.com/orders.json",
        {
          method: "POST",
          body: JSON.stringify({ user: userData, products: ctx.items }),
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong.. Please try again!");
      }
      setDataIsSubmitting(false);
      setDataSubmitted(true);
      ctx.clearItemsInCart();
    };
    postData().catch((e) => {
      setError(e.message);
    });
  };

  return (
    <>
      {/* Submitting phase */}
      {dataIsSubmitting && !error && (
        <Modal onHideCart={props.onHideCart}>
          <p>Completing your order...</p>
        </Modal>
      )}
      {/* Submitted phase */}
      {!dataIsSubmitting && !error && dataSubmitted && (
        <Modal onHideCart={props.onHideCart}>
          <p>Your Order Has Been Placed Succesfully!</p>
        </Modal>
      )}
      {/* Modal for error */}
      {error && (
        <Modal onHideCart={props.onHideCart}>
          <p>{error}</p>
        </Modal>
      )}

      {/*actual cart */}
      {!dataSubmitted && !dataIsSubmitting && !error && (
        <Modal onHideCart={props.onHideCart}>
          {CartItems}
          <div>
            <div className={styles.total}>
              <span>Total Amount</span>
              <span>{`$${ctx.totalAmount}`}</span>
            </div>

            {hasCheckedOut && (
              <Checkout
                onClose={props.onHideCart}
                onConfirm={userDataHandler}
              />
            )}
            {!hasCheckedOut && (
              <div className={styles.actions}>
                <button
                  className={styles["button--alt"]}
                  onClick={props.onHideCart}
                >
                  Close
                </button>
                {hasItemsInCart && (
                  <button className={styles.button} onClick={onCheckoutHandler}>
                    Checkout
                  </button>
                )}
              </div>
            )}
          </div>
        </Modal>
      )}
      <ToastContainer />
    </>
  );
};
export default Cart;
