import { Fragment } from "react";
import React, { useState } from "react";
import Cart from "../../Components/Cart/Cart";

import MainNavigation from "./MainNavigation";
import CartContextProvider from "../../store/CartContextProvider";

const Layout = (props) => {
  const [CartIsShown, setCartShown] = useState(false);
  const showCartHandler = () => {
    setCartShown(true);
  };
  const HideCartHandler = () => {
    setCartShown(false);
  };

  return (
    <Fragment>
      <CartContextProvider>
        {CartIsShown && <Cart onHideCart={HideCartHandler} />}
        <MainNavigation onShowCart={showCartHandler} />
        <main>{props.children}</main>
      </CartContextProvider>
    </Fragment>
  );
};

export default Layout;
