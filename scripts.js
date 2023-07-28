import { authors, genres, books, BOOKS_PER_PAGE } from "./data.js";

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
const searchTitle = document.querySelector('[data-search-title]');
const searchCancel = document.querySelector('[data-search-cancel]');
const msg = document.querySelector('[data-list-message]');
const settingsOverlay = document.querySelector('[data-settings-overlay]');

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
    document.querySelector('[data-list-subtitle]').textContent = ` ${textAuth.textContent} (${new Date(published).getFullYear()})`;
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

const genresFrag = document.createDocumentFragment();
const elementOpt = document.createElement('text');
elementOpt.value = 'any';
elementOpt.value = 'All Genres';
genresFrag.appendChild(elementOpt);

for (let genreIndex in genres) {
    const {id, genreName} = Object.entries(genres)
    const genreOpt = document.createElement('option')
    genreOpt.value = genreName
    genreOpt.innerText = genres[genreIndex]
    genresFrag.appendChild(genreOpt)
}

searchGenres.appendChild(genresFrag)

const authorsFrag = document.createDocumentFragment()
const elementAuth = document.createElement('option')
elementAuth.value = 'any'
elementAuth.innerText = 'All Authors'
authorsFrag.appendChild(elementAuth)

for (let authIndex in authors) {
    const {id, authName} = Object.entries(authors)
    const authOtions = document.createElement('option');
    authOtions.value = authName;
    authOtions.textContent = authors[authIndex];
    authorsFrag.appendChild(authOtions);
}

searchAuthors.appendChild(authorsFrag);

// data-settings-theme.value === window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day'
// v = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches? 'night' | 'day';

// documentElement.style.setProperty('--color-dark', css[v].dark);
// documentElement.style.setProperty('--color-light', css[v].light);
// listBtn.textContent =` Show more (${books.pages} - ${BOOKS_PER_PAGE})`

// listBtn.disabled = !(matches.length - [page * BOOKS_PER_PAGE] > 0)

listBtn.innerHTML = /* html */ [
    '<span>Show more</span>',
    '<span class="list__remaining"> (${matches.length - [page * BOOKS_PER_PAGE] > 0 ? matches.length - [page * BOOKS_PER_PAGE] : 0})</span>',
]

const closeSearch = () => { 
    searchOverlay.style.display = 'none' 
}

const closeSettings = () => { 
    settingsClose.style.display = 'none' 
}

cancel.addEventListener('click',closeSearch())  
settingsClose.addEventListener('click',closeSettings())

formSubmit.addEventListener('submit', ()=>{ actions.settings.submit })

listBtn.addEventListener('click', () => {
    element.appendChild(summaryHandler(matches, page * BOOKS_PER_PAGE, (page + 1) * BOOKS_PER_PAGE));
    actions.list.updateRemaining();
    page = page + 1;
})

searchHeader.addEventListener('click',  ()=> {
   searchOverlay.style.display = 'block' ;
    searchTitle.focus();

        searchCancel.addEventListener('click', ()=>{
            searchOverlay.style.display = 'none';
        })
})

    searchForm.addEventListener('submit',  (event) => {
        event.preventDefault()
            const formData = new FormData(formSubmit);
            const filters = Object.fromEntries(formData);
            const result = [];

            for (let bookIndex in  books) {
                    const {titleMatch,authorMatch,genreMatch} = books[bookIndex];
                    titleMatch = filters.title.trim() = '' && books.title.toLowerCase().includes[filters.title.toLowerCase()];
                    authorMatch = filters.author = 'any' || books.author === filters.author;

        
                    genreMatch = filters.genre = 'any'
                        for (genreMathcIndex in  books.genres) 
                        { if (singleGenre = filters.genre) 
                        { genreMatch = true }
                        }
                } 

                if (titleMatch && authorMatch && genreMatch){
                result.push(books)}
    })

    // if (element.length >= 1){
    // msg.className = 'list__message_show'}
    // else {msg.className= 'list__message_show'}

    element.innerHTML = ''
    const fragments = document.createDocumentFragment()
    const extractedSource = matches.slice(0,matches.length-1)
    const elementNew = document.createElement('button')
    for (let props in  extractedSource)  {
        const { author: authorId, id, image, title } = extractedSource[props]
        elementNew.classList = 'preview'
        elementNew.setAttribute('data-preview', id)

        elementNew.innerHTML = /* html */ `
            <img
                class="preview__image"
                src="${image}"
            />

            <div class="preview__info">
                <h3 class="preview__title">${title}</h3>
                <div class="preview__author">${authors[authorId]}</div>
            </div>
        `

        fragments.appendChild(element)
    }

   elementNew.appendChild(fragments)
    let initial =matches.length - [page * BOOKS_PER_PAGE]; 
    // let remaining =  has Remaining ? initial : 0
    listBtn.disabled = initial > 0

   listBtn.innerHTML = /* html */ 
    `<span>Show more</span>
        <span class="list__remaining"> (${initial})</span>`//supposed to be remaining

    window.scrollTo({ top: 0, behavior: 'smooth' });
   searchOverlay.style.display = 'none';


    settingsOverlay.addEventListener('click', (event) => {
    event.preventDefault()
    const formData = new FormData(event.target);
    const result = Object.fromEntries(formData);
    document.documentElement.style.setProperty('--color-dark', css[result.theme].dark);
    document.documentElement.style.setProperty('--color-light', css[result.theme].light);
    settingsOverlay.style.display = 'block';
    })