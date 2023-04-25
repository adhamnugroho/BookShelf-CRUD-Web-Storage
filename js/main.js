import { addBook, checkAvailabilityStorageBrowser, loadDataFromStorage, searchElemen } from "./function.js";

const formInputBook = document.getElementById("inputBook");
const formInputSearch = document.getElementById("searchBook");

document.addEventListener("DOMContentLoaded", () => {
  checkAvailabilityStorageBrowser();
  loadDataFromStorage();

  formInputBook.addEventListener("submit", (event) => {
    event.preventDefault();
    addBook();
  });

  formInputSearch.addEventListener("submit", (event) => {
    event.preventDefault();

    searchElemen();
  });
});
