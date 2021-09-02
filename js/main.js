const searchInputFeild = document.getElementById("search-input");
const searchButton = document.getElementById("button-search");
const errorDiv = document.getElementById("error");
const totalFound = document.getElementById("total-books");

//add event listener in button
searchButton.addEventListener("click", () => {
  const searchText = searchInputFeild.value;
  totalFound.innerText = "";
  if (searchText === "") {
    errorDiv.innerText = "Search feild cannot be empty!";
    return;
  } else {
    //get data
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => getBookArray(data.docs, data.numFound));
    //sppiner add
    document.getElementById("spinner").classList.remove("d-none");
   
  }
  searchInputFeild.value = "";
});
//book array
const getBookArray = (books, numFound) => {
  //if no result found
  if (numFound === 0) {
    errorDiv.innerText = "No result found";
    document.getElementById("spinner").classList.add("d-none");
  } else {
    const divContainer = document.getElementById("divContainer");
    divContainer.textContent = "";
    //total book found
    totalFound.innerText = `Book found ${books.length}`;

    // Get each book and display in a card
    books.forEach((book) => {
      //object distucturing
      const { title, author_name, first_publish_year, publisher } = book;

      //dynamic img url
      const imgUrl = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;

      const notFound = "Not found";

      const div = document.createElement("div");
      div.classList.add("col");
      div.innerHTML = `
          <div class="card h-100 p-3 rounded shadow">
          <img src="${imgUrl}"  class=" imgSize card-img-top img-fluid h-100 rounded shawdow" alt="...">
          <div class="card-body">
            <h5 class="card-title">${title.slice(0, 25)}</h5>
            <p class="card-title">Author Name:<b> ${
              author_name && author_name.slice(0, 1)
                ? author_name && author_name.slice(0, 1)
                : notFound || author_name
            }</b></p>
            <p class="card-title">Publisher:<b> ${
              publisher && publisher.slice(0, 1)
                ? publisher && publisher.slice(0, 1)
                : notFound || publisher
            }</b></p>
            <p class="card-title">First Publish: <b>${
              first_publish_year ? first_publish_year : notFound
            }</b></p>
          </div>
        </div>
           `;
      divContainer.appendChild(div);
      //remove spiner
      document.getElementById("spinner").classList.add("d-none");
    });
  }
};
