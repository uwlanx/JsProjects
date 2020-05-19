const url = 'https://api.datamuse.com/words?';
const queryParams = 'rel_rhy=';

//selecting page elements
const inputField = document.querySelector('#input');
const submit = document.querySelector('#submit');
const responseField = document.querySelector('#responseField');

// AJAX function 
const getSuggestions = () => {
    const wordQuery = inputField.value;
    const endpoint = url + '' + queryParams + '' + wordQuery;
    const xhr = XMLHttpRequest;
    xhr.responseType = 'json';
    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            renderResponse(xhr.response)
        }
        xhr.open('GET', endpoint);
        xhr.send();
    }
}

//clear previous results and display results to webpage
const displaySuggestions = (event) => {
    event.preventDefault()
    while(responseField.firstChild){
        responseField.removeChild(responseField.firstChild)
};
getSuggestions();
};

submit.addEventListener('click', displaySuggestions)