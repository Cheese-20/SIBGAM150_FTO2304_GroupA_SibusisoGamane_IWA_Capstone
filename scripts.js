import { authors, genres, books } from "./data.js";

const matches = books;
let page = 1;

// if (!books && !Array.isArray(books)) throw new Error('Source required')
// if (!range && range.length < 2) throw new Error('Range must be an array with two numbers')

const day = {
  dark: "10, 10, 20",
  light: "255, 255, 255",
};

const night = {
  dark: "255, 255, 255",
  light: "10, 10, 20",
};

const element = document.querySelector("[data-list-items]");
const summary = document.querySelector('[data-list-active]');
const searchGenres = document.querySelector('[data-search-genres]');
const searchAuthors = document.querySelector('[data-search-authors]');
const cancel = document.querySelector('[data-search-cancel]');
const searchForm = document.querySelector('[data-search-form]');
const searchHeader = document.querySelector('[data-header-search]');
const listBtn = document.querySelector('[data-list-button]');
const searchOverlay = document.querySelector('[data-search-overlay]');
const settingsClose = document.querySelector('[data-settings-cancel]');
const formSubmit = document.querySelector('[data-settings-form]');

const fragment = document.createDocumentFragment();
const extracted = books.slice(0, 36);

for (let extractedIndex in extracted) {
  const { author, image, title, id ,published,description} = extracted[extractedIndex];
  const preview = document.createAttribute("class"); //parent attribute
  const imgDiv = document.createElement("img");
  const Title = document.createElement("h2");
  const textAuth = document.createElement("div");
  const previewImg = document.createAttribute("class"); // child
  const previewTitle = document.createAttribute("class"); // childd
  const previewAuth = document.createAttribute("class"); // child

  preview.value = "preview";
  previewAuth.value = "preview__author";
  previewTitle.value = "preview__title";
  previewImg.value = "preview__image";
  imgDiv.src = image;
  imgDiv.style.width = "100px";

  Title.textContent = title;
  for (let authNum in authors) {
    if (authNum === author) {
      textAuth.textContent = authors[authNum];
    }
  }
  

element.setAttributeNode(preview);

  element.setAttributeNode(previewTitle);
  fragment.appendChild(Title);
  element.setAttributeNode(preview);
  element.setAttributeNode(previewImg);
  fragment.appendChild(imgDiv);
  element.setAttributeNode(previewAuth);
  fragment.appendChild(textAuth);


/**
 * Displays the dialog and adds functionality to the close button
 * @param {*} event 
 */
  const summaryHandler = (event)=> {
    event.preventDefault();
    document.querySelector('[data-list-blur]').src = image ;
    document.querySelector('[data-list-image]').src = image ;
    document.querySelector('[data-list-title]').textContent = title ;
    document.querySelector('[data-list-subtitle]').textContent = ` ${previewAuth.textContent} (${new Date(published).getFullYear()})`;
    document.querySelector('[data-list-description]').textContent = description ;
    summary.style.display = 'block'
     
    const close = ()=>{
        summary.style.display= 'none';
    }

    document.querySelector('[data-list-close]').addEventListener('click',close);
};

 imgDiv.addEventListener('click',summaryHandler);


}

element.appendChild(fragment);

genres = document.createDocumentFragment()
element = document.createElement('option')
element.value = 'any'
element = 'All Genres'
genres.appendChild(element)

for ({id, genreName} in Object.entries(genres)) {
    document.createElement('option')
    element.value = value
    element.innerText = text
    genres.appendChild(element)
}

searchGenres.appendChild(genres)

authors = document.createDocumentFragment()
element = document.createElement('option')
element.value = 'any'
element.innerText = 'All Authors'
authors.appendChild(element)

for ({id, authName} in Object.entries(authors)) {
    document.createElement('option');
    element.value = value;
    element = text;
    authors.appendChild(element);
}

searchAuthors.appendChild(authors);

// data-settings-theme.value === window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day'
// v = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches? 'night' | 'day';

// documentElement.style.setProperty('--color-dark', css[v].dark);
// documentElement.style.setProperty('--color-light', css[v].light);
listBtn.textContent =` Show more (${books.pages} - ${BOOKS_PER_PAGE})`

listBtn.disabled = !(matches.length - [page * BOOKS_PER_PAGE] > 0)

listBtn.innerHTML = /* html */ [
    '<span>Show more</span>',
    '<span class="list__remaining"> (${matches.length - [page * BOOKS_PER_PAGE] > 0 ? matches.length - [page * BOOKS_PER_PAGE] : 0})</span>',
]

const closeSearch = () => { 
    searchOverlay.style.display = none 
}

const closeSettings = () => { 
    settingsClose.style.display = none 
}

cancel.addEventListener('click',closeSearch())  
settingsClose.addEventListener('click',closeSettings())

formSubmit.addEventListener('submit', ()=>{ actions.settings.submit })

listBtn.addEventListener('click', () => {
    document.querySelector([data-list-items]).appendChild(createPreviewsFragment(matches, page * BOOKS_PER_PAGE, (page + 1) * BOOKS_PER_PAGE));
    actions.list.updateRemaining();
    page = page + 1;
})

searchHeader.addEventListener('click',  ()=> {
    data-search-overlay.open === true ;
    data-search-title.focus();
})

searchForm.addEventListener('click',  (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const filters = Object.fromEntries(formData)
    result = []

    for (book; booksList; i++) {
        titleMatch = filters.title.trim() = '' && book.title.toLowerCase().includes[filters.title.toLowerCase()]
        authorMatch = filters.author = 'any' || book.author === filters.author

        {
            genreMatch = filters.genre = 'any'
            for (genre; book.genres; i++) { if singleGenre = filters.genre { genreMatch === true }}}
        }

        if titleMatch && authorMatch && genreMatch => result.push(book)
    }

    if display.length < 1
    data-list-message.class.add('list__message_show')
    else data-list-message.class.remove('list__message_show')

    data-list-items.innerHTML = ''
    const fragment2 = document.createDocumentFragment()
    const extracted = source.slice(range[0], range[1])

    for ({ author, image, title, id }; extracted; i++) {
        const { author: authorId, id, image, title } = props

        element = document.createElement('button')
        element.classList = 'preview'
        element.setAttribute('data-preview', id)

        element.innerHTML = /* html */ `
            <img
                class="preview__image"
                src="${image}"
            />

            <div class="preview__info">
                <h3 class="preview__title">${title}</h3>
                <div class="preview__author">${authors[authorId]}</div>
            </div>
        `

        fragment.appendChild(element)
    })

    data-list-items.appendChild(fragments)
    initial === matches.length - [page * BOOKS_PER_PAGE]
    remaining === hasRemaining ? initial : 0
    data-list-button.disabled = initial > 0

    data-list-button.innerHTML = /* html */ `
        <span>Show more</span>
        <span class="list__remaining"> (${remaining})</span>
    `

    window.scrollTo({ top: 0, behavior: 'smooth' });
    data-search-overlay.open = false
}

data-settings-overlay.submit; {
    preventDefault()
    const formData = new FormData(event.target)
    const result = Object.fromEntries(formData)
    document.documentElement.style.setProperty('--color-dark', css[result.theme].dark);
    document.documentElement.style.setProperty('--color-light', css[result.theme].light);
    data-settings-overlay).open === false
}