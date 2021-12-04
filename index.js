const AUTHOR_LABEL = 'labelAuthor'
const AUTHOR_INPUT = 'author';
const CATEGORY = 'category'
const CONTAINER = 'container'
const PRIORITY = 'priority'
const SUBMIT_BUTTON = 'submit';
const TITLE_INPUT = 'title';
const TITLE_LABEL = 'labelTitle';

const authorErrorMessage = document.getElementById(AUTHOR_LABEL);
const authorInput = document.getElementById(AUTHOR_INPUT);
const categoryInput = document.getElementById(CATEGORY);
const container = document.getElementById(CONTAINER);
const priorityInput = document.getElementById(PRIORITY);
const submitButton = document.getElementById(SUBMIT_BUTTON);
const titleErrorMessage = document.getElementById(TITLE_LABEL);
const titleInput = document.getElementById(TITLE_INPUT);

let books = [];

window.onload = () => {
    const booksFromLocalStorage = JSON.parse(localStorage.getItem("books"));
    if(booksFromLocalStorage !== null) {
        books = booksFromLocalStorage;
    }
    displayBooks();
}

const showErrorMessage = (input, message) => {
    input.style.setProperty("--error-message", `"${message}"`);
}

const validateInput = () => {
    const titleLength = titleInput.value.trim().length;
    const authorLength = authorInput.value.trim().length;
    const minTitleLength = 1;
    const minAuthorLength = 3;

    if(titleLength < minTitleLength && authorLength < minAuthorLength){
        showErrorMessage(titleErrorMessage, ' Tytuł musi mieć minimum 1 znak');
        showErrorMessage(authorErrorMessage, ' Autor musi mieć minimum 3 znaki');
    } else if(titleLength < minTitleLength){
        showErrorMessage(titleErrorMessage, ' Tytuł musi mieć minimum 1 znak');
        showErrorMessage(authorErrorMessage, '');
    } else if(authorLength < minAuthorLength) {
        showErrorMessage(authorErrorMessage, ' Autor musi mieć minimum 3 znaki');
        showErrorMessage(titleErrorMessage, '');
    } else {
        showErrorMessage(titleErrorMessage, '');
        showErrorMessage(authorErrorMessage, '');
        return true;
    }
}

const createBook = () =>{
    books.push({
        title: titleInput.value,
        author: authorInput.value,
        priority: priorityInput.value,
        category: categoryInput.value
    });
    localStorage.setItem("books", JSON.stringify(books));
}

const displayBooks = () =>{
    container.textContent= '';
    books.forEach(item => {
        const author = document.createElement('div');
        const category = document.createElement('div');
        const priority = document.createElement('div');
        const row = document.createElement('div');
        const titile = document.createElement('div');

        container.appendChild(row);
        row.appendChild(titile);
        row.appendChild(author);
        row.appendChild(priority);
        row.appendChild(category);

        author.classList.add("author");
        category.classList.add("category");
        priority.classList.add("priority");
        row.classList.add("row");
        titile.classList.add("title");

        author.textContent = item.author;
        category.textContent = item.category;
        priority.textContent = item.priority;
        titile.textContent = item.title;
    })
}

const addNewBook = (e)=> {
    e.preventDefault();
    const valid = validateInput();
    if(valid){
        createBook();
        displayBooks();
        titleInput.value = '';
        authorInput.value = '';
    }
}

submitButton.addEventListener('click', addNewBook);