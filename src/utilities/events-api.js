import sendRequest from "./send-request";
const BASE_URL = "/api/events";

export async function getAllEvents() {
  return sendRequest(`${BASE_URL}/`);
}

export async function createEvent(event) {
  return sendRequest(`${BASE_URL}/`, "POST", event);
}

export async function updateEvent(id, event) {
  return sendRequest(`${BASE_URL}/${id}`, "PUT", event);
}

export async function deleteEvent(id) {
  return sendRequest(`${BASE_URL}/${id}`, "DELETE");
}
