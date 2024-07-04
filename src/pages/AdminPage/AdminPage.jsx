import { useEffect, useState } from "react";
import { Box, Container, MenuItem } from "@mui/material";
import AdminDash from "../../components/AdminDash/AdminDash";
import EventsComponent from "../../components/EventsComponent/EventsComponent";
import NewsComponent from "../../components/NewsComponent/NewsComponent";
import PlayersComponent from "../../components/League/PlayersComponent/PlayersComponent";
import SeasonsComponent from "../../components/League/SeasonsComponent/SeasonsComponent";
import TeamsComponent from "../../components/League/TeamsComponent/TeamsComponent";
import VenuesComponent from "../../components/League/VenuesComponent/VenuesComponent";
import * as EventApi from "../../utilities/events-api";
import "./AdminPage.css";

export default function AdminPage() {
  const [selectedComponent, setSelectedComponent] = useState("dashboard");
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function getAllEvents() {
      const events = await EventApi.getAllEvents();
      setEvents(events);
    }

    getAllEvents();
  }, []);
  console.log(events);

  function renderComponents() {
    switch (selectedComponent) {
      case "dashboard":
        return <AdminDash />;
      case "events":
        return <EventsComponent />;
      case "news":
        return <NewsComponent />;
      case "teams":
        return <TeamsComponent />;
      case "venues":
        return <VenuesComponent />;
      case "players":
        return <PlayersComponent />;
      case "seasons":
        return <SeasonsComponent />;

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
            <MenuItem
              onClick={() => handleChangeComponent("events")}
              sx={{ p: 5 }}
              style={{ fontSize: "1.5rem", fontWeight: "bold" }}
            >
              Events
            </MenuItem>
            <MenuItem
              onClick={() => handleChangeComponent("news")}
              sx={{ p: 5 }}
              style={{ fontSize: "1.5rem", fontWeight: "bold" }}
            >
              News
            </MenuItem>
            <MenuItem
              onClick={() => handleChangeComponent("teams")}
              sx={{ p: 5 }}
              style={{ fontSize: "1.5rem", fontWeight: "bold" }}
            >
              Teams
            </MenuItem>
            <MenuItem
              onClick={() => handleChangeComponent("venues")}
              sx={{ p: 5 }}
              style={{ fontSize: "1.5rem", fontWeight: "bold" }}
            >
              Venues
            </MenuItem>
            <MenuItem
              onClick={() => handleChangeComponent("players")}
              sx={{ p: 5 }}
              style={{ fontSize: "1.5rem", fontWeight: "bold" }}
            >
              Players
            </MenuItem>
            <MenuItem
              onClick={() => handleChangeComponent("Seasons")}
              sx={{ p: 5 }}
              style={{ fontSize: "1.5rem", fontWeight: "bold" }}
            >
              Seasons
            </MenuItem>
          </Box>
        </Box>
        <Box>{renderComponents()}</Box>
      </Container>
    </>
  );
}
