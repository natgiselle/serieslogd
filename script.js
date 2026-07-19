/** (Phase 0) DOM REFERENCES (Document Object Model): 
 * use document.querySelector(blank) for those without id
 * document.getElementById(blank) for #results
 * 
 * browser's internal representation of my index.html page
 * as a structured tree of objects that javascript can read and manipulate
*/

const searchBarInput = document.getElementById("search-bar-input");
const searchBarBtn = document.getElementById("search-bar-btn");
const results = document.getElementById("results");


/** (Phase 1) Event Listeners:
 * .addEventListener("click", ...); to search button variable;
 * 
 * searchBarBtn is the button element reference I grabbed in Phase 0
 * .addEventListener() is a method that exists on every DOM element telling the browser to pay attention to this specific element when something happens to it run some code
 * "click" is the first arguement telling the browser exactly which event to watch for and there are many different event types
*/ 
searchBarBtn.addEventListener("click", async() => 
{
    console.log("clicked");
    // the moment you click the button will be whatever the user just typed as searchTerm
    // (Phase 2) Read Input Value
    const searchTerm = searchBarInput.value; // grabs the input freshly every single click (every text input in the DOM has a .value property)
    const data = searchShows(searchTerm);
    console.log(searchTerm);
});

/** (Phase 3) Fetching Data
 * fetch() is a built-in browser funcion that makes HTTPS/HTTP requests:
 * it can hit either http:// or https:// URLs, whichever the address uses
 * it returns a Promise, which is why we use .then() or async/await
 * where a promise is a way to say "I dont have an answer yet, but I promise to give it eventually"
 *___________________________________________________________________________________________
 * promise: DOES NOT CURRENTLY HAVE RESPONSE BUT PROMISES THEIR REQUEST WILL HAVE A RESPONSE SOON
 *___________________________________________________________________________________________
 * await: PAUSES THE FUNCTION's LINE-BY-LINE EXECUTION, NOT THE WHOLE PAGE/USER 
 * ___________________________________________________________________________________________
 * async: LABELS A FUNCTION AS ONE THAT IS ALLOWED TO PAUSE AND WAIT ON PROMISES
 * ___________________________________________________________________________________________
 * response.json(): parses the raw response body into usable data
*/
// when user types a show and clicks search, it grabs the input and fetches it from TVMaze API
// searchTerm is the string that is sent to the TVMaze API
async function searchShows(searchTerm){
    const response = await fetch(`https://api.tvmaze.com/search/shows?q=${searchTerm}`); // this line pauses here
    // (Phase 4) Parsing Response:
    const data = await response.json(); // this line will not run until the line above finishes
    console.log(data);
    return data;
}

/** (Phase 5) Clear Old Results: 
 * add results.innerHTML
*/

// create seperate functions for any attributes of a show you need and call them in innerHTML
function getImageUrl(show){
    // checks if show.image exists in thw show image medium which holds all images of all shows
    // if it does not exist , then after : it will make that the default "null" no image background
    return show.image ? show.image.medium : "./src/noShowImage.jpg";
}

