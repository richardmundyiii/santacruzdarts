import Image from "mui-image";
import { Box, Container, Typography, Button } from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import HomepageSplash from "../../assets/images/homepageSplash.jpg";
import CalendarComponent from "../../components/CalendarComponent/CalendarComponent";
import "./HomePage.css";
import CarouselComponent from "../../components/CarouselComponent/CarouselComponent";

export default function HomePage() {
  return (
    <Container maxWidth={false} disableGutters style={{ minHeight: "180vh" }}>
      <Box className="homepage-splash">
        <Image src={HomepageSplash} alt="Homepage Splash" />
        <div className="overlay"></div>
        <div className="text-overlay">
          <p>Sun.</p>
          <p>Beach.</p>
          <p>Darts.</p>
        </div>
      </Box>
      <Box className="calendar-section">
        <Box className="homepage-carousel-wrapper">
          <CarouselComponent />
        </Box>
        <Box>
          <CalendarComponent />
        </Box>
      </Box>
    </Container>
  );
}
