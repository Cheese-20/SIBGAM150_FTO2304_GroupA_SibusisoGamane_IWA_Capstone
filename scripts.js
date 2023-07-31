import { authors, books, BOOKS_PER_PAGE } from "./data.js";
import { genres as Types } from "./data.js";

const matches = books;
let page = 1;

if (!books && !Array.isArray(books)) throw new Error("Source required");

const css = {
  day: {
    dark: "10, 10, 20",
    light: "255, 255, 255",
  },
  night: {
    dark: "255, 255, 255",
    light: "10, 10, 20",
  },
};

const element = document.querySelector("[data-list-items]");
const summary = document.querySelector("[data-list-active]");
const searchGenres = document.querySelector("[data-search-genres]");
const searchAuthors = document.querySelector("[data-search-authors]");
const cancel = document.querySelector("[data-search-cancel]");
const searchForm = document.querySelector("[data-search-form]");
const searchHeader = document.querySelector("[data-header-search]");
const listBtn = document.querySelector("[data-list-button]");
const searchOverlay = document.querySelector("[data-search-overlay]");
const settingsClose = document.querySelector("[data-settings-cancel]");
const formSettings = document.querySelector("[data-settings-form]");
const searchTitle = document.querySelector("[data-search-title]");
const searchCancel = document.querySelector("[data-search-cancel]");
const settingsOverlay = document.querySelector("[data-settings-overlay]");
const settings = document.querySelector("[data-header-settings]");
const search = document.querySelector("[data-search-add]");
// const searchChild = searchForm.children;
const save = document.querySelector('.overlay__row .overlay__button_primary');
const theme = document.querySelector(".overlay__input overlay__input_select");
const fragment = document.createDocumentFragment();
const extracted = books.slice(0, 36);
let counter = 0;

// displaying preview
for (let extractedIndex in extracted) {
  const { author: authorId, id, image, title } = extracted[extractedIndex];
  const elementPreview = document.createElement("div");
  elementPreview.classList = "preview";
  elementPreview.setAttribute("data-preview", id);
  elementPreview.innerHTML = /* html */ `
        <img
            class="preview__image"
            src="${image}"
        />
        <div class="preview__info">
            <h3 class="preview__title">${title}</h3>
            <div class="preview__author">${authors[authorId]}</div>
        </div>`;
  fragment.appendChild(elementPreview);
  element.appendChild(fragment);
  counter ++
}

/**
 * Displays the dialog and adds functionality to the close button
 * @param {*} event
 */
element.addEventListener("click", function (event) {
  //path array of the clicked element to find the book preview button
  const pathArray = Array.from(event.path || event.composedPath());
  let active;

  for (const node of pathArray) {
    if (active==true) break; 

    const previewId = node?.dataset?.preview;
   
    for (const previewBook of books) { // Searching for the book with the matching id in the 'books' array
      if (previewBook.id === previewId) {
        active = previewBook; // Found the active book
        break;
      }
    }
  }
 
  if (!active) return;

  // finds the author
  let authText ;
  for (let authIndex in authors) {
    if (active.author == authIndex) {
      authText = authors[authIndex];
    }
  }

  summary.style.display = "block";
  document.querySelector("[data-list-blur]").src = active.image;
  document.querySelector("[data-list-image]").src = active.image;
  document.querySelector("[data-list-title]").textContent = active.title;
  document.querySelector(
    "[data-list-subtitle]"
  ).textContent = ` ${authText}  (${new Date(active.published).getFullYear()})`;
  document.querySelector("[data-list-description]").textContent =
    active.description;

  const close = () => {
    summary.style.display = "none";
  };
  document.querySelector("[data-list-close]").addEventListener("click", close);
});

/**
 * Adds values towards the genre dropdown menu
 */
const genresFrag = document.createDocumentFragment();
const elementOpt = document.createElement("text");
elementOpt.value = "any";
elementOpt.value = "All Genres";
genresFrag.appendChild(elementOpt);

for (let genreIndex in Types) {
  const { id, genreName } = Object.entries(Types);
  const genreOpt = document.createElement("option");
  genreOpt.value = genreName;
  genreOpt.innerText = Types[genreIndex];
  genresFrag.appendChild(genreOpt);
}

searchGenres.appendChild(genresFrag);

/**
 * Adds values towards the author dropdown menu
 */
const authorsFrag = document.createDocumentFragment();
const elementAuth = document.createElement("option");
elementAuth.value = "any";
elementAuth.innerText = "All Authors";
authorsFrag.appendChild(elementAuth);

for (let authIndex in authors) {
  const { id, authName } = Object.entries(authors);
  const authOtions = document.createElement("option");
  authOtions.value = authName;
  authOtions.textContent = authors[authIndex];
  authorsFrag.appendChild(authOtions);
}

searchAuthors.appendChild(authorsFrag);

/**
 * Changes the theme between Light and Dark
 */

document.querySelector("[data-settings-theme]").value === window.matchMedia &&
window.matchMedia("(prefers-color-scheme: dark)").matches
  ? "night"
  : "day";
const v =
  window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "night"
    : "day";

element.style.setProperty("--color-dark", css[v].dark);
element.style.setProperty("--color-light", css[v].light);
listBtn.textContent = ` Show more (${books.pages} - ${BOOKS_PER_PAGE})`;

// Disables the button if the length of the books is greater thn 0

listBtn.disabled = !(matches.length - [page * BOOKS_PER_PAGE] > 0)
  ? true
  : false;

listBtn.innerHTML = /* html */ [
  `
    <span>Show more</span>,
    <span class="list__remaining"> (${
      matches.length - [page * BOOKS_PER_PAGE] > 0
        ? matches.length - [page * BOOKS_PER_PAGE]
        : 0
    })</span>`,
];

const closeSearch = () => {
  searchOverlay.style.display = "none";
};

const closeSettings = () => {
  settingsClose.style.display = "none";
};

cancel.addEventListener("click", closeSearch());
settingsClose.addEventListener("click", closeSettings());

// searchForm.addEventListener('submit', () => { actions.settings.submit })

listBtn.addEventListener("click", () => {
  // element.appendChild( matches ,page * BOOKS_PER_PAGE, (page + 1) * BOOKS_PER_PAGE);
  // actions.list.updateRemaining();
  searchForm.actions = "???";
  page = page + 1;
});

searchHeader.addEventListener("click", () => {
  searchOverlay.style.display = "block";
  searchTitle.focus();

  searchCancel.addEventListener("click", () => {
    searchOverlay.style.display = "none";
  });
});

/**
 *
 * What should happen when i click search
 */

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(searchForm);
  const entries = formData.entries();
  const filters = Object.fromEntries(entries);
  const searchTitle = document.querySelector('[data-search-title]').value;
  filters.genres = searchGenres.options[searchGenres.selectedIndex].text;
  filters.authour = searchAuthors.options[searchAuthors.selectedIndex].text;
   let result = [];

        if(searchTitle !== 'Any' || searchTitle !== ''){
         result = books.filter( val => {
        return val.title === searchTitle;})}
         
        if (filters.genres !== ''){
            result = books.filter( val => {
                return Types[val.genres] === filters.genres;})}
                 
                if(filters.author !== 'All Authors'){
                    result = books.filter( val => {
                        return authors[val.author] === filters.author;})
                }  
//displaying the filtered data
                search.addEventListener('click', (event)=>{
                for (let resultIndex in result) {
                    const { author: authorId, id, image, title } = result[resultIndex];
                    element.remove();
                    const elementPreview = document.createElement("div");
                    elementPreview.classList = "preview";
                    elementPreview.setAttribute("data-preview", id);
                    elementPreview.innerHTML = /* html */ `
                          <img
                              class="preview__image"
                              src="${image}"
                          />
                          <div class="preview__info">
                              <h3 class="preview__title">${title}</h3>
                              <div class="preview__author">${authors[authorId]}</div>
                          </div>`;
                    fragment.appendChild(elementPreview);
                    element.appendChild(fragment);
                  };})

                // Checking and displaying the the correct button according to the length of result array
                 if (result.length < 1) {
                     document.querySelector('[data-list-message]').classList.add('list__message_show')
                 } else {
                               document.querySelector('[data-list-message]').classList.remove('list__message_show')
                         }
});

//button mess
const msgnew = document.createAttribute("class");
if (counter >= 1) {
  msgnew.value = "list__message_show";
} else {
  msgnew.value = "";
}

listBtn.addEventListener("click", (event) => {

  element.innerHTML = "";
  const fragments = document.createDocumentFragment();
  const extractedSource = matches.slice(0, (counter + 30));

  for (let props in extractedSource) {
    const { author: authorId, id, image, title } = extractedSource[props];
    const elementNew = document.createElement("div");
    elementNew.classList = "preview";
    elementNew.setAttribute("data-preview", id);
    elementNew.innerHTML = /* html */ `
            <img
                class="preview__image"
                src="${image}"
            />

            <div class="preview__info">
                <h3 class="preview__title">${title}</h3>
                <div class="preview__author">${authors[authorId]}</div>
            </div>
        `;

        counter++
        page ++
        
    fragments.appendChild(elementNew);
  }
  element.appendChild(fragments);
});

let initial = [page * BOOKS_PER_PAGE];
let remaining =matches.length - counter;
const isremaining = initial - remaining < 0 ? true : false;
const val = isremaining == true ? initial - remaining : (listBtn.disabled = true );
 listBtn.disabled ? listBtn.innerHTML==`0` : 
listBtn.innerHTML =
  /* html */
  `<span>Show more</span>
        <span class="list__remaining"> (${-val})</span>`; //supposed to be remaining;

window.scrollTo({ top: 0, behavior: "smooth" });
searchOverlay.style.display = "none";

settings.addEventListener("click", (event) => {
  event.preventDefault();
  settingsOverlay.style.display = "block";
  const formData = new FormData(formSettings);
  const {theme} = Object.fromEntries(formData);

    if (theme === 'night') {
    document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
    document.documentElement.style.setProperty('--color-light', '10, 10, 20');
   } else {
    document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
    document.documentElement.style.setProperty('--color-light', '255, 255, 255');
    } 

    save.addEventListener("click", (event) => {
    event.preventDefault();
    settingsOverlay.style.display = "none";
    });
})