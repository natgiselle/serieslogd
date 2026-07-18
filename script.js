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

/** (Phase 2) Fetching Data: 
 * fetch() is a built-in browser funcion that makes HTTPS/HTTP requests:
 * it can hit either http:// or https:// URLs, whichever the address uses
 * it returns a Promise, which is why we use .then() or async/await
 * 
 * Promise: is a way to say "I dont have an answer yet, but I promise to give it eventually"
 * 
 * #########################    EXAMPLE: MULTI-PLAYER ONLINE GAME    #########################
 * fetch(): IS LIKE CLICKING QUEUE FOR MATCH
 *      ~you sent the request to the matchmaking server,
 *      ~the game DOES NOT freeze your whole screen while you wait,
 *      ~you CAN DO whatever while its connecting you to a server
 *      ~to play a match.
 * 
 *___________________________________________________________________________________________
 * promise: IS LIKE THE QUEUE TIMER/STATUS INDICATOR
 *      ~(letting you know how long it takes until you get put into a match)
 *          the moment you click queue you dont have a match yet but
 *          you immediately get a status called searching... 
 *          which tells you that a server for you to play a match
 *          is actively being searched for in which
 *          they will put you into one just not at this moment yet.
 * 
 *      ~so the promise is that although there isnt a server to fetch right now,
 *          they will give you what you requested eventually
 *          so that you can play the match you requested.
 * 
 *___________________________________________________________________________________________
 * await: PAUSES THE FUNCTION's LINE-BY-LINE EXECUTION, NOT THE WHOLE PAGE/USER 
 *      ~pauses THIS FUNCTION at this exact line, and DOES NOT let it move to the next line
 *          until the Promise (the request) resolves and real data comes back
 * 
 *      ~imagine loading into a Minecraft server like Hypixel:
 *          the game code WILL NOT run "spawn the player in " or "load the world"
 *          and will NOT proceed to "you are now in the lobby"
 *          until the connection/data-fetch (connecting to server) step finishes first.
 * 
 *      ~it is NOT you (the player) frozen everywhere,
 *          it is the SPECIFIC STEP in the code refuses to proceed until
 *          the data it waits on has actually arrrived.
 * 
 * ___________________________________________________________________________________________
 *  * async: LABELS A FUNCTION AS ONE THAT IS ALLOWED TO PAUSE AND WAIT ON PROMISES
 *      ~you can ONLY use await INSIDE a function marked ASYNC
 *          which basically is the permission that says this specific functino
 *          is allowed to pause mid-execution and wait for real data.
 *      ~imagine it's in match-making mdoe in the game menu:
 *          you can only sit at queue timer (await) if you are
 *          int the type of menu/mode that supports waiting for a match (async)
 *          you CANNOT just await random Promises in a regular non-async function,
 *          same way you CANNOT sit in a "searching..." queue screen
 *          if you are NOT in the match-making mode to begin with
 *      ~so in code writing async function searchShows(searchTerm){...}
 *          marks that whole function as queue-capable
 *          meaning await is allowed to be used somewhere inside it
*/