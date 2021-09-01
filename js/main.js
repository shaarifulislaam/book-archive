const searchInputFeild = document.getElementById('search-input');
const searchButton = document.getElementById('button-search');
const errorDiv = document.getElementById('error');

//add event listener in button
searchButton.addEventListener('click',()=>{
    const searchText = searchInputFeild.value ;
    if(searchText === ''){
        errorDiv.innerText = "Search feild cannot be empty!";
        return;
    }else{
//get data
const url =`http://openlibrary.org/search.json?q=${searchText}`;
fetch(url)
.then(res =>res.json())
.then(data =>getBookArray(data.docs));
//sppiner add
document.getElementById('spinner').classList.remove("d-none");
    }
    searchInputFeild.value ='';
});
//book array
const getBookArray = data =>{
    
    if(data.length == []){
        errorDiv.innerText = "No result found";
        document.getElementById('spinner').classList.add("d-none");
    }
   else{
       errorDiv.innerText= '';
   }
    const divContainer = document.getElementById('divContainer');
    divContainer.textContent = '';
   document.getElementById('total-books').innerText = `Books found ${data.length}`
    data.forEach(books =>{
        const {title,author_name,first_publish_year,publisher} =books;
        const imgUrl =`https://covers.openlibrary.org/b/id/${books.cover_i}-M.jpg`;
        const notFound = 'Not found'
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100 p-2">
        <img src="${imgUrl}" class="card-img-top img-fluid h-100" alt="...">
        <div class="card-body">
          <h5 class="card-title">${title.slice(0,25)}</h5>
          <p class="card-title">Author Name:<b> ${author_name ? author_name : notFound}</b></p>
          <p class="card-title">Publisher:<b> ${publisher ? publisher : notFound}</b></p>
          <p class="card-title">First Publish: <b>${first_publish_year ? first_publish_year : notFound}</b></p>
          
        </div>
      </div>
        
         `
    divContainer.appendChild(div);
    document.getElementById('spinner').classList.add("d-none");
    });
   
}
