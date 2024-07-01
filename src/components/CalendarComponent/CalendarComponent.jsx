import React, { useState } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
  parseISO,
} from "date-fns";
import { Container, Grid, Typography, IconButton, Paper } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

const eventsData = [
  { date: "2024-07-01", name: "Event 1", info: "Details about event 1..." },
  { date: "2024-07-15", name: "Event 2", info: "Details about event 2..." },
  { date: "2024-08-05", name: "Event 3", info: "Details about event 3..." },
  { date: "2024-09-10", name: "Event 4", info: "Details about event 4..." },
  { date: "2024-10-22", name: "Event 5", info: "Details about event 5..." },
  { date: "2024-11-18", name: "Event 6", info: "Details about event 6..." },
  { date: "2024-12-25", name: "Event 7", info: "Details about event 7..." },
  { date: "2025-01-01", name: "Event 8", info: "Details about event 8..." },
  { date: "2025-02-14", name: "Event 9", info: "Details about event 9..." },
  { date: "2025-03-17", name: "Event 10", info: "Details about event 10..." },
];

export default function CalendarComponent() {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const renderHeader = () => {
    return (
      <Grid
        container
        justifyContent="space-evenly"
        alignItems="center"
        style={{ marginBottom: "20px" }}
      >
        <IconButton onClick={prevMonth} size="small">
          <ArrowBack />
        </IconButton>
        <Typography variant="h6">
          {format(currentMonth, "MMMM yyyy")}
        </Typography>
        <IconButton onClick={nextMonth}>
          <ArrowForward />
        </IconButton>
      </Grid>
    );
  };

  const renderDays = () => {
    const days = [];
    const startDate = startOfWeek(currentMonth, { weekStartsOn: 0 });
    for (let i = 0; i < 7; i++) {
      days.push(
        <Grid item xs={1} key={i} style={{ textAlign: "center" }}>
          {format(addDays(startDate, i), "EEEEEE")}
        </Grid>
      );
    }
    return (
      <Grid container style={{ justifyContent: "center" }}>
        {days}
      </Grid>
    );
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 0 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 0 });

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, "d");
        const cloneDay = day;
        days.push(
          <Grid item xs={1} key={day} style={{ textAlign: "center" }}>
            <Paper
              style={{
                backgroundColor: isSameMonth(day, monthStart)
                  ? isSameDay(day, new Date())
                    ? "#90caf9"
                    : "#fff"
                  : "#f5f5f5",
                padding: "10px",
              }}
            >
              <Typography variant="body2">{formattedDate}</Typography>
              {eventsData
                .filter((event) => isSameDay(parseISO(event.date), cloneDay))
                .map((event) => (
                  <Typography variant="caption" key={event.name}>
                    {event.name}
                  </Typography>
                ))}
            </Paper>
          </Grid>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <Grid container key={day} style={{ justifyContent: "center" }}>
          {days}
        </Grid>
      );
      days = [];
    }
    return <>{rows}</>;
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  return (
    <Container>
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </Container>
  );
}
