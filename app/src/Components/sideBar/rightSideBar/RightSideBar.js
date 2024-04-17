import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import { removeItem } from "../../../store/slices/cartSlice";
import { themeColors } from "../../../themes/styles";
import { useDispatch } from "react-redux";
import { toogleCart } from "../../../store/slices/cartSlice";

import "./RightSideBar.css";

const slideIn = keyframes`
  from {
    right: -300px;
  }
  to {
    right: 0;
  }
`;

const Container = styled.div`
  right: ${(props) => (props.cartState ? "0" : "-350px")};
  animation: ${(props) => (props.cartState ? slideIn : "none")} 0.3s;
  // display: ${(props) => (props.changeDisplay ? "flex" : "none")};
`;

const Wrapper = styled.div`
  width: 100%;
  position: absolute;
  z-index: 1000;
  height: 100%;
  display: ${(props) => (props.cartState ? "flex" : "none")};
`;

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleRemoveItem = (serviceItem) => {
    dispatch(removeItem(serviceItem));
  };
  return (
    <div className="cart-item">
      <p className="cart-item-title">{item.name}</p>
      <img
        className="cart-item-pic"
        src={item.pics[0]}
        alt={`cart-item-${item.name}`}
      />
      <button
        className="cart-item-remove-btn"
        onClick={() => handleRemoveItem(item)}
      >
        Remover
      </button>
    </div>
  );
};

const RightSideBar = () => {
  const dispatch = useDispatch();

  const themeMode = useSelector((state) => state.theme.mode);
  const cartItems = useSelector((state) => state.cart.items);
  const cartState = useSelector((state) => state.cart.isCartOpen);
  const [changeDisplay, setChangeDisplay] = useState(cartState);

  const handleToogleCart = () => {
    dispatch(toogleCart());
    setTimeout(() => {
      setChangeDisplay(!cartState);
    }, 1500);
  };
  const createOrder = (orederList) => {
    let orderText = "Olá, quero um orçamento dos seguintes itens: ";
    let orderItems = " ";
    orederList.forEach((element) => {
      if (orederList.indexOf(element) === orederList.length - 1) {
        orderItems = orderItems + element.name + ".";
      } else {
        orderItems = orderItems + element.name + ", ";
      }
    });
    orderText =
      orderText + orderItems.substring(0, orderItems.length - 1) + ".";

    const link =
      process.env.REACT_APP_WHATSAPP_LINK +
      `?text=${orderText.replace(/ /g, "%20")}`;
    window.open(link, "_blank");
  };

  return (
    cartState && (
      <>
        <Wrapper
          cartState={cartState}
          onClick={() => handleToogleCart()}
        ></Wrapper>
        <Container
          changeDisplay={changeDisplay}
          className={`right-sidebar-container${cartState ? "" : "-close"}`}
          cartState={cartState}
          style={{
            color: themeColors[themeMode].cartTextColor,
            backgroundColor: themeColors[themeMode].cartBg,
          }}
        >
          <section>
            <button
              className="close-cart-btn"
              onClick={() => handleToogleCart()}
            >
              X
            </button>
            <h1 className="cart-title">Pedido de orçamento</h1>
            <div className="cart-list-items">
              {cartItems.length > 0 ? (
                <h2 className="cart-subtitle">Seus itens</h2>
              ) : (
                <></>
              )}
              {cartItems.length > 0 ? (
                cartItems.map((item, index) => {
                  return <CartItem key={index} item={item} />;
                })
              ) : (
                <p className="cart-info">
                  Você não possui itens no seu pedido de orçamento.{" "}
                  <a href="/servicos">Ir para serviços.</a>
                </p>
              )}
            </div>
            <div className="finalize-order">
              {cartItems.length < 1 ? (
                <></>
              ) : (
                <button
                  className="cart-finalize-order-btn"
                  disabled={cartItems.length < 1}
                  onClick={() => createOrder(cartItems)}
                >
                  Realizar orçamento
                </button>
              )}
            </div>
          </section>
        </Container>
      </>
    )
  );
};

export default RightSideBar;
