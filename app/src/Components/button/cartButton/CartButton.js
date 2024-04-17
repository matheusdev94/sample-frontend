import React, { useEffect, useState } from "react";
import "./CartButton.css";
import { FaOpencart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { themeColors } from "../../../themes/styles";
import { toogleCart } from "../../../store/slices/cartSlice";
import { useWindowSize } from "../../../events/useWindowSize";

const CartButton = ({ width, heigth }) => {
  const cartState = useSelector((state) => state.cart.isCartOpen);
  const themeMode = useSelector((state) => state.theme.mode);
  const windowSize = useWindowSize();
  const dispatch = useDispatch();
  const handleToogle = () => {
    // toogleCart();
    dispatch(toogleCart());
  };

  return (
    <div
      className="cart-container"
      onClick={() => handleToogle()}
      style={{
        color: themeColors[themeMode].textColor,
        backgroundColor: themeColors[themeMode].cartBg,
        width: cartState
          ? windowSize.width < "400"
            ? "350px"
            : "405px"
          : "50px",
        boxShadow: width ? "" : "1px 1px 50px #000",
        // boxShadow: `1px 1px 50px ${themeColors[themeMode].shadowColor}`,
      }}
    >
      <div
        className="cart-button"
        style={{
          border: `2px solid #fff`,
          // border: `2px solid ${themeColors[themeMode].cartBorder}`,
        }}
      >
        <FaOpencart size={"20px"} color="white" />
      </div>
    </div>
  );
};

export default CartButton;
