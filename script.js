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


/** (Phase 1) Click Listeners:
 * .addEventListener("click", ...); to search button variable
 * 
 * typically the syntax is for a simple button click listener arrow functions
 * are used but function() {} is also more beginner friendly
 * the BIG DIFFERENCE IS THAT arrow functions do NOT have their own this,
 * they inherit this from whatever scope they are written in
 *
 * searchBarBtn is the button element reference I grabbed in Phase 0
 * .addEventListener() is a method that exists on every DOM element telling the browser to pay attention to this specific element when something happens to it run some code
 * "click" is the first arguement telling the browser exactly which event to watch for and there are many different event types
*/ 
searchBarBtn.addEventListener("click", () => 
{
    console.log("clicked");
    // the moment you click the button will be whatever the user just typed
    const searchTerm = searchBarInput.value; // every text input in the DOM has a .value property
    console.log(searchTerm);
});

