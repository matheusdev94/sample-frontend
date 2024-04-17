// src/components/Products.js
import React, { useEffect, useState } from "react";

import { Modal } from "../../../Components/modal";
import GallerySet from "../../../Components/gallerySet/GallerySet";

import services from "../../../mocks/services";

import { themeColors } from "../../../themes/styles";
import { useSelector } from "react-redux";

import "./gallery.css";

const Products = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState({});
  const themeMode = useSelector((state) => state.theme.mode);

  const showModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const closeModal = () => {
    setSelectedImage({});
    setIsModalOpen(false);
  };
  const increaseIndex = () => {
    const newIndex = selectedImage.index + 1;
    if (newIndex >= selectedImage.imageList.pics.length) {
      setSelectedImage({ ...selectedImage, index: 0 });
    } else {
      setSelectedImage({ ...selectedImage, index: newIndex });
    }
  };

  const decreaseIndex = () => {
    const newIndex = selectedImage.index - 1;
    if (newIndex < 0) {
      setSelectedImage({
        ...selectedImage,
        index: selectedImage.imageList.pics.length - 1,
      });
    } else {
      setSelectedImage({ ...selectedImage, index: newIndex });
    }
  };

  return (
    <section
      className="main-gallery"
      style={{
        backgroundColor: themeColors[themeMode].backgroundColor,
        color: "white",
        // color: themeColors[themeMode].textColor,
      }}
    >
      <h1
        style={{
          backgroundColor: themeColors[themeMode].backgroundColor,
          color: themeColors[themeMode].textColor,
          padding: "10px 0px",
        }}
      >
        Galeria
      </h1>
      <div className="gallery-content">
        {services.map((item) => {
          return (
            <div
              className="gallery-section"
              style={{
                background: themeColors[themeMode].backgroundItem,
              }}
            >
              <h2
                className="gallery-section-name"
                style={{
                  color: themeColors[themeMode].textColor,
                }}
              >
                {item.name}
              </h2>
              <GallerySet
                itemSet={item}
                setSelectedImage={setSelectedImage}
                showModal={showModal}
              />
              {isModalOpen && (
                <Modal closeModal={() => closeModal()}>
                  <div className="modal-image">
                    <h3>{selectedImage.imageList.name}</h3>
                    <div className="modal-gallery-container">
                      <button
                        className="modal-image-button"
                        onClick={() => decreaseIndex()}
                      >
                        &lt;
                      </button>
                      <img
                        className="modal-image-item"
                        src={selectedImage.imageList.pics[selectedImage.index]}
                        alt="zoom-image"
                      />
                      <button
                        className="modal-image-button"
                        onClick={() => increaseIndex()}
                      >
                        &gt;
                      </button>
                    </div>
                  </div>
                </Modal>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Products;
