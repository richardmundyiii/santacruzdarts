import sendRequest from "./send-request";
const BASE_URL = "/api/events";

export async function getAllEvents() {
  return sendRequest(`${BASE_URL}/`);
}

export async function createEvents(blogFeed) {
  return sendRequest(`${BASE_URL}/`, "POST", blogFeed);
}

export async function updateEvent(id, blogFeed) {
  return sendRequest(`${BASE_URL}/${id}`, "PUT", blogFeed);
}

export async function deleteEvent(id) {
  return sendRequest(`${BASE_URL}/${id}`, "DELETE");
}
