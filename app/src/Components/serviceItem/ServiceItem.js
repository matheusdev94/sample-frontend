import React from "react";
import "./ServiceItem.css";
import PhotoCarousel from "../carousel/PhotoCarousel";
import { useDispatch } from "react-redux";
import { addItem } from "../../store/slices/cartSlice";
import { useSelector } from "react-redux";
import { themeColors } from "../../themes/styles";
import { toogleCart } from "../../store/slices/cartSlice";

const ServiceItem = ({ serviceItem }) => {
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.cart.isCartOpen);
  const themeMode = useSelector((state) => state.theme.mode);
  const handleAddToCart = (serviceItem) => {
    dispatch(addItem(serviceItem));
    if (!cartState) dispatch(toogleCart());
  };
  return (
    <article
      className="item"
      style={{
        // color: themeColors[themeMode].textColor,
        color: themeColors[themeMode].textColor,
        backgroundColor: themeColors[themeMode].backgroundItem,
      }}
    >
      <h3>{serviceItem.name}</h3>
      <div className="item-details">
        <div className="item-info">
          <p className="item-description">{serviceItem.description}</p>
          <button
            className="service-button"
            onClick={() => handleAddToCart(serviceItem)}
            style={{
              color: themeColors[themeMode].buttonTextColor,
              backgroundColor: themeColors[themeMode].backgroundButon,
              // border: "1px solid black",
            }}
          >
            <p>Adicionar ao pedido de orçamento</p>
          </button>
        </div>
        <PhotoCarousel className="photo-carousel" item={serviceItem} />
      </div>
    </article>
  );
};
export default ServiceItem;
