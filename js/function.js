let books = [];
const KEY_STORAGE = "BOOK_SHELF";

function checkAvailabilityStorageBrowser() {
  if (typeof Storage === undefined) {
    alert("Maaf, Browser Anda tidak Mendukung Local Storage. Mohon gunakan browser yang mendukung Local Storage");
    window.close();
  }

  return true;
}

function generateIdBook() {
  return +new Date();
}

function generateBookObject(id, title, author, year, isComplete) {
  return { id, title, author, year, isComplete };
}

function saveDataStorage() {
  if (checkAvailabilityStorageBrowser()) {
    const parsed = JSON.stringify(books);
    localStorage.setItem(KEY_STORAGE, parsed);
  }
}

function loadDataFromStorage() {
  if (checkAvailabilityStorageBrowser()) {
    const dataFromStorage = JSON.parse(localStorage.getItem(KEY_STORAGE));

    if (dataFromStorage !== null) {
      for (const book of dataFromStorage) {
        books.push(book);
      }

      renderElemen();
    }
  }
}

function templateElement(bookObject) {
  const articleElement = document.createElement("article");
  articleElement.setAttribute("class", "book_item");
  articleElement.setAttribute("id", `book-item-${bookObject.id}`);

  const h3Element = document.createElement("h3");
  h3Element.innerText = bookObject.title;

  const p1Element = document.createElement("p");
  p1Element.innerText = "Penulis: " + bookObject.author;

  const p2Element = document.createElement("p");
  p2Element.innerText = "Tahun: " + bookObject.year;

  const actionContainerElement = document.createElement("div");
  actionContainerElement.setAttribute("class", "action");

  // Button action
  const button1 = document.createElement("button");
  button1.setAttribute("class", "blue");

  const button2 = document.createElement("button");
  button1.setAttribute("class", "red");

  if (bookObject.isComplete === true) {
    button1.innerText = "Buku Belum Selesai Dibaca";
    button2.innerText = "Hapus Buku";

    // event listener button
    button1.addEventListener("click", () => {
      undoCompleteReadBook(bookObject.id);
      renderElemen();
    });

    button2.addEventListener("click", () => {
      removeBook(bookObject.id);
      renderElemen();
    });
  } else {
    button1.innerText = "Buku Selesai Dibaca";
    button2.innerText = "Hapus Buku";

    // event listener button
    button1.addEventListener("click", () => {
      addCompleteReadBook(bookObject.id);
      renderElemen();
    });

    button2.addEventListener("click", () => {
      removeBook(bookObject.id);
      renderElemen();
    });
  }

  actionContainerElement.append(button1, button2);
  articleElement.append(h3Element, p1Element, p2Element, actionContainerElement);

  return articleElement;
}

function renderElemen() {
  const incompleteBookshelfList = document.getElementById("incompleteBookshelfList");
  incompleteBookshelfList.innerHTML = "";

  const completeBookshelfList = document.getElementById("completeBookshelfList");
  completeBookshelfList.innerHTML = "";

  if (books !== null) {
    for (const book of books) {
      const bookElemen = templateElement(book);

      if (!book.isComplete) {
        incompleteBookshelfList.append(bookElemen);
      } else {
        completeBookshelfList.append(bookElemen);
      }
      console.log(book);
    }
  }
}

function addBook() {
  const inputJudul = document.getElementById("inputBookTitle").value;
  const inputPenulis = document.getElementById("inputBookAuthor").value;
  const inputTahun = document.getElementById("inputBookAuthor").value;
  const inputIsComplete = document.getElementById("inputBookIsComplete").checked;

  const id_buku = generateIdBook();
  const data_book = generateBookObject(id_buku, inputJudul, inputPenulis, inputTahun, inputIsComplete);

  books.push(data_book);

  saveDataStorage();
  renderElemen();
}

function findBookById(bookId) {
  for (const book of books) {
    if (book.id === bookId) {
      return book;
    }
  }

  return null;
}

function findBookByTitle(bookTitle) {
  for (const book of books) {
    if (book.title === bookTitle) {
      return book;
    }
  }

  return null;
}

function addCompleteReadBook(bookId) {
  const book = findBookById(bookId);

  if (book === null) return;

  book.isComplete = true;

  saveDataStorage();
}

function undoCompleteReadBook(bookId) {
  const book = findBookById(bookId);

  if (book === null) return;

  book.isComplete = false;

  saveDataStorage();
}

function removeBook(bookId) {
  const book = findBookById(bookId);

  if (book === null) return;

  books.splice(book, 1);

  saveDataStorage();
  window.alert(`Buku ${toTitleCase(book.title)} berhasil dihapus`);
}

function searchElemen() {
  const searchBookTitle = document.getElementById("searchBookTitle").value;

  if (searchBookTitle === "") {
    return window.alert("Tidak Ada data yang dimasukkan");
  }

  const book = findBookByTitle(searchBookTitle);
  if (!book) {
    return window.alert("Sistem tidak menemukan buku yang dicari");
  }

  undoCompleteReadBook(book.id);
  renderElemen();
}

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

// export
export { checkAvailabilityStorageBrowser, addBook, loadDataFromStorage, searchElemen };
