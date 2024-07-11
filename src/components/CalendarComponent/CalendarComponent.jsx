import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../../features/eventSlice";
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
import {
  Box,
  Container,
  Grid,
  Modal,
  Typography,
  IconButton,
  Paper,
} from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

export default function CalendarComponent() {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events.events);
  const status = useSelector((state) => state.events.status);
  const error = useSelector((state) => state.events.error);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchEvents());
    }
  }, [status, dispatch]);

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  function handleOpen(evt) {
    setSelectedEvent(evt);
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
    setSelectedEvent(null);
  }

  function renderHeader() {
    return (
      <Grid
        container
        justifyContent="space-evenly"
        alignItems="center"
        style={{ marginBottom: "20px", width: "100%" }}
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
  }

  function renderDays() {
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
  }

  function renderCells() {
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

        // Ensure events are being processed correctly
        console.log("Current Date:", cloneDay);
        console.log("Events:", events);

        const eventForDay = events.find((event) => {
          console.log("Processing event:", event);
          if (typeof event.date === "string") {
            try {
              const parsedDate = parseISO(event.date);
              console.log("Parsed Date:", parsedDate);
              return isSameDay(parsedDate, cloneDay);
            } catch (error) {
              console.error("Error parsing date:", event.date, error);
              return false;
            }
          } else {
            console.error("Invalid date format in event:", event);
            return false;
          }
        });

        days.push(
          <Grid item xs={1} key={day} style={{ textAlign: "center" }}>
            <Paper
              style={{
                backgroundColor: isSameMonth(day, monthStart)
                  ? isSameDay(day, new Date())
                    ? "#90caf9"
                    : "#fff"
                  : "#f5f5f5",
                height: "6rem",
                width: "5rem",
                padding: "1rem",
              }}
              onClick={() => eventForDay && handleOpen(eventForDay)}
            >
              <Typography variant="body2">{formattedDate}</Typography>
              {eventForDay && (
                <Typography
                  variant="caption"
                  key={eventForDay._id}
                  style={{ color: "#fff" }}
                >
                  {eventForDay.title}
                </Typography>
              )}
            </Paper>
          </Grid>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <Grid
          container
          key={day}
          style={{ justifyContent: "center", width: "100%" }}
        >
          {days}
        </Grid>
      );
      days = [];
    }
    return <>{rows}</>;
  }

  function nextMonth() {
    setCurrentMonth(addMonths(currentMonth, 1));
  }

  function prevMonth() {
    setCurrentMonth(subMonths(currentMonth, 1));
  }

  return (
    <Container>
      {renderHeader()}
      {renderDays()}
      {renderCells()}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="event-modal-title"
        aria-describedby="event-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          {selectedEvent && (
            <>
              <Typography id="event-modal-title" variant="h6" component="h2">
                {selectedEvent.title}
              </Typography>
              <Typography id="event-modal-description" sx={{ mt: 2 }}>
                {selectedEvent.details}
              </Typography>
              <Typography sx={{ mt: 2 }}>
                Date: {format(parseISO(selectedEvent.date), "yyyy-MM-dd")}
              </Typography>
            </>
          )}
        </Box>
      </Modal>
    </Container>
  );
}
