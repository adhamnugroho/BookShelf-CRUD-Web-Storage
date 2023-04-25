import { addBook, checkAvailabilityStorageBrowser } from "./function.js";

const formInput = document.getElementById("inputBook");

document.addEventListener("DOMContentLoaded", () => {
  checkAvailabilityStorageBrowser();

  formInput.addEventListener("submit", (event) => {
    event.preventDefault();
    addBook();
  });
});
