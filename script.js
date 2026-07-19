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
const resultCards = document.getElementById("result-cards");

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

function getGenre(show){
    // return a genre string if it exists return show.genre[0]
    // if it falls back, it will give show type when genres array is empty
    return show.genres.length > 0 ? show.genres[0] : show.type;
}

function getYear(show){
    // returns the extracted year it got released (premiered) string
    // if it fails to find it, return unknonw
    return show.premiered ? show.premiered.split("-")[0] : "Unknown";
}

function getRating(show){
    // returns rating, if the show isnt rated yet it will return N/A string instead
    return show.rating.average ?? "N/A";
}

// make this an async function so that you can use await, which means it will not continue to the next line until the operation is done
// this ensures it can fetch the data first before assigning seasons var with the value;
async function getSeasonCount(showId){
    // fetches season count from a seperate TVmaze endpoint since this requires the show ID
    const response = await fetch(`https://api.tvmaze.com/shows/${showId}/seasons`);
    const seasons = await response.json();
    return seasons.length;
}


/** (Phase 1) Event Listeners:
 * .addEventListener("click", ...); to search button variable;
 * 
 * searchBarBtn is the button element reference I grabbed in Phase 0
 * .addEventListener() is a method that exists on every DOM element telling the browser to pay attention to this specific element when something happens to it run some code
 * "click" is the first arguement telling the browser exactly which event to watch for and there are many different event types
*/ 
searchBarBtn.addEventListener("click", async() => {
    console.log("clicked");
    // the moment you click the button will be whatever the user just typed as searchTerm
    // (Phase 2) Read Input Value
    const searchTerm = searchBarInput.value; // grabs the input freshly every single click (every text input in the DOM has a .value property)
    const data = await searchShows(searchTerm);
    // console.log(searchTerm); for testing
    
    resultCards.innerHTML = ""; // clear old card's info before implementing new ones

    for (const item of data){
        const show = item.show;
        const seasonCount = await getSeasonCount(show.id);

        const card = document.createElement("div");
        card.className = "result-cards";
        card.dataset.id = show.id; // put id on the card for later (Phase 7/8)

        card.innerHTML = `
            <img src="${getImageUrl(show)}" width="100" alt="${show.name} poster">
            <h3>${show.name}</h3>
            <div class="genre-yr-row">
                <div class="genre">${getGenre(show)}</div>
                <p> · </p>
                <div class="year">${getYear(show)}</div>
            </div>
            <div class="stars">
                <p>${getRating(show)}/10 <i class="fa fa-star"></i></p>
            </div>
            <p>${seasonCount} Seasons</p>
            <button type="button" class="add-btn">Add</button>
        `;

        resultCards.appendChild(card);
    }
}); // closes searchBarBtn's addEventListener (ending the entire search-click function here)
/** (Phase 7) Event Delegation for Add Button */
resultCards.addEventListener("click", (e) => {
    // check if the actual clicked element is an Add button
    if(e.target.classList.contains("add-btn")){
        // find the card that the button belongs to
        const cards = e.target.closest(".result-cards");
        const showId = cards.dataset.id;

        console.log("Add clicked for show ID:", showId);
    }
});