import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Typography } from "@mui/material";
import "./PhotoCarousel.css";

const Item = ({ pic, name }) => {
  return (
    <Paper className="paper">
      <img className="carousel-image" src={pic} alt={`${name}`} />
    </Paper>
  );
};

const PhotoCarousel = ({ item }) => {
  return (
    <section className="carousel">
      <Carousel navButtonsAlwaysVisible={false}>
        {item.pics.map((pic, index) => (
          <Item key={index} pic={pic} name={item.name} />
        ))}
      </Carousel>
    </section>
  );
};

export default PhotoCarousel;
