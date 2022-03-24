// Select elements from DOM 
let elWrapper = document.querySelector("#wrapper");
let elForm = document.querySelector("#form");
var elSearchInput = document.querySelector("#search_input")
let elCategorySelect = document.querySelector("#category-select");
let elRating = document.querySelector("#rating");
let elBtn = document.querySelector("#btn");
let elTitle = document.querySelector("#search-result");
let elTemplate = document.querySelector("#template").content;

// Get movies list 
let slicedMovies = movies.slice(0, 100);

var normolizedMovieList = slicedMovies.map(movieItem => {
    return {
        title: movieItem.Title.toString(),
        categories: movieItem.Categories,
        rating: movieItem.imdb_rating,
        year: movieItem.movie_year,
        imageLink: `https://i.ytimg.com/vi/${movieItem.ytid}/mqdefault.jpg`,
        youtubeLink: `https://www.youtube.com/watch?v=${movieItem.ytid}`  
    }
})

// Create categories
function generateCategories(movieArray) {
    let categoryList = []
    
    movieArray.forEach(function(item) {
        let splittedItem = item.categories.split("|");
        
        splittedItem.forEach(function (item) {
            if (!categoryList.includes(item)) {
                categoryList.push(item)
            }
        })
    })
    categoryList.sort()
    
    let categoryFragment = document.createDocumentFragment()
    
    categoryList.forEach(function (item) {
        let categoryOption = document.createElement("option");
        categoryOption.value = item
        categoryOption.textContent = item
        categoryFragment.appendChild(categoryOption)
    })
    
    elCategorySelect.appendChild(categoryFragment)
    
    console.log(elCategorySelect);
    console.log(categoryList);
}
generateCategories(normolizedMovieList)

// Create render function
function renderMovies(movieArray, wrapper){
    wrapper.innerHTML = null;
    let elFragment = document.createDocumentFragment()
    
    movieArray.forEach(movie => {
        let templateDiv = elTemplate.cloneNode(true)
        
        templateDiv.querySelector(".card-img-top").src = movie.imageLink
        templateDiv.querySelector(".card-title").textContent = movie.title
        templateDiv.querySelector(".card-year").textContent = movie.year
        templateDiv.querySelector(".card-rate").textContent = movie.rating
        templateDiv.querySelector(".card-link").href = movie.youtubeLink
        
        elFragment.appendChild(templateDiv);
    });
    wrapper.appendChild(elFragment)
    
    elTitle.textContent = movieArray.length;
}

renderMovies(normolizedMovieList , elWrapper);



elForm.addEventListener("submit", function(evt) {
    evt.preventDefault()
    
    var selectOption = elCategorySelect.value
    let categorisedMovies = []

    if (selectOption === "All") {
        categorisedMovies = normolizedMovieList
    }else {
        categorisedMovies = normolizedMovieList.filter(function (item) {
            return item.categories.split("|").includes(selectOption) 
        })
    }
    
    renderMovies(categorisedMovies , elWrapper);
})


