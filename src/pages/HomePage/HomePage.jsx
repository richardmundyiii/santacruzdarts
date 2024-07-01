import Image from "mui-image";
import { Box, Container, CssBaseline } from "@mui/material";
import HomepageSplash from "../../assets/images/homepageSplash.jpg";
import CalendarComponent from "../../components/CalendarComponent/CalendarComponent";
import "./HomePage.css";

export default function HomePage() {
  return (
    <Container maxWidth={false} disableGutters>
      <Box className="homepage-splash">
        <Image src={HomepageSplash} alt="Homepage Splash" />
        <div className="overlay"></div>
        <div className="text-overlay">
          <p>Sun.</p>
          <p>Beach.</p>
          <p>Darts.</p>
        </div>
      </Box>
      <Box style={{ height: "30rem", m: 5, p: 5 }}>
        <CssBaseline />

        <CalendarComponent />
      </Box>
    </Container>
  );
}
