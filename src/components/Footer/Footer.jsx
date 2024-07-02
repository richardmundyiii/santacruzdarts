import { Box, Container } from "@mui/material";
import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <>
      <Container
        className="footer-container"
        maxWidth={false}
        sx={{ display: "flex" }}
      >
        <Box sx={{ flexDirection: "column" }}>
          <p>Copyright 2024 - Darts of Santa Cruz</p>
          <p>Site Built by RDM Designs</p>
        </Box>
        <Box></Box>
        <Box>
          <ul>
            <li>
              <Link>Venues</Link>
            </li>
            <li>
              <Link>Sponsors</Link>
            </li>
            <li>
              <Link>Teams</Link>
            </li>
          </ul>
        </Box>
      </Container>
    </>
  );
}
