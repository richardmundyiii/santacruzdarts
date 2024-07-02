import { useState } from "react";
import { Container, Paper } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import CamelliaFlyer from "../../assets/images/camellia23.jpg";
import StocktonFlyer from "../../assets/images/stocktonRB.jpg";
import TurkeyFlyer from "../../assets/images/turkeyShoot.jpg";
import "./CarouselComponent.css";

export default function CarouselComponent() {
  const carouselImages = [
    {
      src: TurkeyFlyer,
      alt: "Santa Cruz Turkey Shoot",
      caption: "2024 Santa Cruz Turkey Shoot",
    },
    {
      src: CamelliaFlyer,
      alt: "Camellia Flyer",
      caption: "2024 Camellia Flyer",
    },
    {
      src: StocktonFlyer,
      alt: "Stockton Flyer",
      caption: "2024 Stockton Flyer",
    },
  ];
  return (
    <>
      <Container>
        <Carousel>
          {carouselImages.map((item, idx) => (
            <Paper key={idx} style={{ position: "relative" }}>
              <img
                src={item.src}
                alt={item.src}
                style={{ width: "100%", height: "auto", objectFit: "contain" }}
              />
              {item.caption && (
                <div
                  style={{
                    position: "absolute",
                    bottom: "10px",
                    left: "10px",
                    color: "white",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    padding: "5px",
                  }}
                >
                  {item.caption}
                </div>
              )}
            </Paper>
          ))}
        </Carousel>
      </Container>
    </>
  );
}
