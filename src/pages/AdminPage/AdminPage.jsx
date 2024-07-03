import { useState } from "react";
import { Box, Container, MenuItem } from "@mui/material";
import AdminDash from "../../components/AdminDash/AdminDash";
import EventsComponent from "../../components/EventsComponent/EventsComponent";
import "./AdminPage.css";

export default function AdminPage() {
  const [selectedComponent, setSelectedComponent] = useState("dashboard");

  function renderComponents() {
    switch (selectedComponent) {
      case "dashboard":
        return <AdminDash />;
      case "events":
        return <EventsComponent />;

      default:
        return null;
    }
  }

  function handleChangeComponent(component) {
    setSelectedComponent(component);
  }

  return (
    <>
      <Container maxWidth={false} disableGutters className="admin-page-wrapper">
        <Box className="admin-nav-wrapper">
          <Box onSelect={(selectedKey) => setSelectedComponent(selectedKey)}>
            <MenuItem onClick={() => handleChangeComponent("events")}>
              Events
            </MenuItem>
            <MenuItem onClick={handleChangeComponent} value="...">
              Items
            </MenuItem>
          </Box>
        </Box>
        <Box>{renderComponents()}</Box>
      </Container>
    </>
  );
}
