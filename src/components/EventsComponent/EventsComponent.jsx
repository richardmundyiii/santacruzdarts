import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createEvt,
  deleteEventById,
  fetchEvents,
  updateEventById,
} from "../../features/eventSlice";
import {
  Box,
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/lab";
import AdapterDayjs from "@mui/lab/AdapterDayjs"; // Adapter for Day.js
import dayjs from "dayjs";
import "./EventsComponent.css";

export default function EventsComponent() {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events.events);
  const status = useSelector((state) => state.events.status);
  const error = useSelector((state) => state.events.error);
  const [creatingEvent, setCreatingEvent] = useState(false); // Track create event state
  const [editEvent, setEditEvent] = useState(null);
  const [formValues, setFormValues] = useState({
    title: "",
    details: "",
    date: null,
  });

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchEvents());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (editEvent) {
      setFormValues({
        title: editEvent.title,
        details: editEvent.details,
        date: dayjs(editEvent.date), // Convert ISO string to Day.js object
      });
    }
  }, [editEvent]);

  function handleDateChange(date) {
    setFormValues({
      ...formValues,
      date,
    });
  }

  function handleSubmitNewEvent(evt) {
    evt.preventDefault();
    dispatch(
      createEvt({
        title: formValues.title,
        details: formValues.details,
        date: formValues.date.toISOString(),
      })
    );
    setCreatingEvent(false); // Reset create event state after submission
    setFormValues({
      title: "",
      details: "",
      date: null,
    });
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    if (editEvent && dayjs.isDayjs(formValues.date)) {
      dispatch(
        updateEventById({
          ...editEvent,
          title: formValues.title,
          details: formValues.details,
          date: formValues.date.toISOString(), // Convert Day.js object to ISO string
        })
      );
      setEditEvent(null);
    } else {
      console.error("Invalid date value");
    }
  }

  function handleNewEventClick() {
    setEditEvent(null);
    setCreatingEvent(true);
  }

  function handleEditClick(event) {
    setCreatingEvent(false);
    const eventId = event._id;
    const selectedEvent = events.find((event) => event._id === eventId);
    setEditEvent(selectedEvent);
  }

  function handleEventDelete(eventId) {
    dispatch(deleteEventById(eventId));
  }

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>Events Component</h1>
        <Button
          variant="contained"
          sx={{ bgcolor: "#005A9C", marginLeft: "auto", mb: 5 }}
          onClick={handleNewEventClick}
        >
          Create Event
        </Button>
        <Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 800 }} aria-label="all-events-table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ textAlign: "center" }}>Date</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>Name</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>Info</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>Edit</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {events.map((event) => (
                  <TableRow
                    key={event._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {dayjs(event.date).format("YYYY-MM-DD")}{" "}
                      {/* Display formatted date */}
                    </TableCell>
                    <TableCell>{event.title}</TableCell>
                    <TableCell>{event.details}</TableCell>
                    <TableCell>
                      <Button onClick={() => handleEditClick(event)}>
                        Edit
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button onClick={() => handleEventDelete(event._id)}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        {/* Edit Form */}
        {editEvent && (
          <Box mt={4}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <h2>Edit Event</h2>
              <form onSubmit={handleFormSubmit}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Event Date"
                    value={formValues.date}
                    onChange={handleDateChange}
                    renderInput={(params) => <TextField {...params} />}
                    fullWidth
                    margin="normal"
                  />
                </LocalizationProvider>
                <TextField
                  label="Title"
                  value={formValues.title}
                  onChange={(e) =>
                    setFormValues({ ...formValues, title: e.target.value })
                  }
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Details"
                  value={formValues.details}
                  onChange={(e) =>
                    setFormValues({ ...formValues, details: e.target.value })
                  }
                  multiline
                  rows={4}
                  fullWidth
                  margin="normal"
                />
                <Button type="submit" variant="contained" color="primary">
                  Save
                </Button>
              </form>
            </Paper>
          </Box>
        )}

        {/* Create Form */}
        {creatingEvent && (
          <Box mt={4}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <h2>Create Event</h2>
              <form onSubmit={handleSubmitNewEvent}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Event Date"
                    value={formValues.date}
                    onChange={handleDateChange}
                    renderInput={(params) => <TextField {...params} />}
                    fullWidth
                    margin="normal"
                  />
                </LocalizationProvider>
                <TextField
                  label="Title"
                  value={formValues.title}
                  onChange={(e) =>
                    setFormValues({ ...formValues, title: e.target.value })
                  }
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Details"
                  value={formValues.details}
                  onChange={(e) =>
                    setFormValues({ ...formValues, details: e.target.value })
                  }
                  multiline
                  rows={4}
                  fullWidth
                  margin="normal"
                />
                <Button type="submit" variant="contained" color="primary">
                  Create
                </Button>
              </form>
            </Paper>
          </Box>
        )}
      </Container>
    </>
  );
}
