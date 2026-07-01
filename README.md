# Personal Show Tracker

**The Goal:** Build a single-page application from scratch using pure HTML, CSS, and JavaScript. You will build a tool that searches a live database of TV shows, displays the results, and lets users save their favorites to a reading/watch list that survives a page refresh.

### 1. The Search Interface & Layout

* **HTML Structure:** Create a clean header with an input field and a "Search" button.
* **CSS Layout:** Use **CSS Grid** to set up a responsive main canvas where the show cards will eventually sit. Use **CSS Flexbox** inside the cards to keep text and images aligned.
* **Theming:** Define your main colors and fonts using **CSS Variables** at the top of your stylesheet.

### 2. Fetching the Data (The API)

You will use the **TVmaze API**. It is completely free, requires no API key, and returns high-quality data and images.

* **The Endpoint:** When a user types a show and clicks search, your JavaScript needs to grab that input and fetch from this URL:
`[https://api.tvmaze.com/search/shows?q=YOUR_SEARCH_TERM](https://api.tvmaze.com/search/shows?q=YOUR_SEARCH_TERM)`

**API Hints & Gotchas:**

* **The Response Shape:** The API returns an array of objects. Inside your `.then()` or `await` block, you will need to loop through this array.
* **Data Paths:** Inside that loop, the data is nested under a `show` object. For a given `item` in the array, you will find what you need here:
* Title: `item.show.name`
* Summary: `item.show.summary`
* Image: `item.show.image.medium`


* **The "Null" Trap:** Not every show in the database has a poster image. If you try to read `item.show.image.medium` on a show with no image, your script will crash.
* *Hint:* Use a ternary operator to check if the image object exists before grabbing the URL:


```javascript
const imageUrl = item.show.image ? item.show.image.medium : 'path-to-your-local-placeholder.jpg';

```



### 3. Dynamic DOM Rendering

* **No Hardcoding:** Your HTML file should have an empty `<div id="results"></div>`. Do not write the show cards in your HTML.
* **The Loop:** Inside your API fetch loop, use `document.createElement()` and `.innerHTML` to generate a card for every result.
* **Card Contents:** Each card must include the show's poster, title, and a "Save to List" button.

### 4. Event Delegation & Local Storage

* **Targeting the Click:** Because you are generating the "Save" buttons dynamically, you can't attach standard event listeners to them on page load.
* *Hint:* Attach one event listener to the main `#results` container and use `e.target` to figure out if a "Save" button was clicked. You can use DOM traversal (like `e.target.closest('.card')`) to figure out exactly which show to save.


* **Saving Data:** When a show is saved, push its title and image URL into a JavaScript array.
* **Persistence:** Immediately use `localStorage.setItem()` to convert that array into a JSON string and save it to the browser.
* **On Load:** When you refresh the page, your script should check `localStorage`. If saved shows exist, parse them and render them in a dedicated "My Watchlist" section on the screen. Include a "Remove" button on these saved items to delete them from the array and update storage.

## Mockup
<img width="1024" height="559" alt="image" src="https://github.com/user-attachments/assets/b743a6c8-031b-4976-8302-0c434555f866" />
