import React, { useEffect, useState } from "react";
import { ImageList } from "@mui/material";
import { ImageListItem } from "@mui/material";
import "./GallerySet.css";
import { useWindowSize } from "../../events/useWindowSize";

const WovenImageList = (itemsList, showModal, setSelectedImage) => {
  const windowSize = useWindowSize();

  const handleShowModal = (itemsList, index) => {
    showModal();
    setSelectedImage({
      imageList: itemsList,
      index: parseInt(index),
    });
  };

  const setColumns = () => {
    if (windowSize.width > 1100) return 4;
    if (windowSize.width < 1100 && windowSize.width > 860) return 3;
    if (windowSize.width < 860 && windowSize.width > 530) return 2;
    if (windowSize.width < 530) return 1;
  };

  return (
    <ImageList
      sx={{ width: "100%", height: "max-content" }}
      variant="woben"
      cols={setColumns()}
      gap={8}
    >
      {itemsList.pics.map((img, index) => (
        <ImageListItem key={index}>
          <div className="img-container">
            <img
              className="min-image"
              src={img}
              alt={`${itemsList.name}-${itemsList.pics.indexOf(img)}`}
              loading="lazy"
              onClick={() => handleShowModal(itemsList, index)}
            />
          </div>
        </ImageListItem>
      ))}
    </ImageList>
  );
};
const GallerySet = ({ itemSet, showModal, setSelectedImage }) => {
  return (
    <section>{WovenImageList(itemSet, showModal, setSelectedImage)}</section>
  );
};

export default GallerySet;
