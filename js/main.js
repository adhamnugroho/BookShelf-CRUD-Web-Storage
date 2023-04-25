import { addBook, checkAvailabilityStorageBrowser, loadDataFromStorage } from "./function.js";

const formInput = document.getElementById("inputBook");

document.addEventListener("DOMContentLoaded", () => {
  checkAvailabilityStorageBrowser();
  loadDataFromStorage();

  formInput.addEventListener("submit", (event) => {
    event.preventDefault();
    addBook();
  });
});
