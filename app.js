const add_movie_model = document.getElementById("add-modal")

console.log(add_movie_model)

const add_movie_button = document.querySelector("header button")

const backdrop = document.getElementById("backdrop")

const cancelAddMovieButton = add_movie_model.querySelector(".btn--passive")

const confirmAddMovie = cancelAddMovieButton.nextElementSibling;

const userInputs = document.querySelectorAll("input")

const entryTextSection = document.getElementById("entry-text")

const movies = [];



const toggleBackDrop = () => {
    backdrop.classList.toggle("visible")
}
 
const updateUI = () => {
    if(movies.length==0){
        entryTextSection.style.display = "block"
    }
    else{
        entryTextSection.style.display = "none"
    }
}

const deleteMovieHandler = (ID) =>{
    let movieIdx = 0
    for(const film of movies){
        if(film.id==ID){
            break
        }
        movieIdx++
    }
    movies.splice(movieIdx,1)
    const movie_list = document.getElementById("movie-list")
    movie_list.children[movieIdx].remove()
}

const renderMovieElement = (id,title,imageUrl,rating) => {
    const newElement = document.createElement('li')
    newElement.className = "movie-element"
    newElement.innerHTML = `
            <div class="movie-element__image">
                <img src="${imageUrl}",alt="${title}">
            </div>
            <div class="movie-element__info">
                <h2>${title}</h2>
                <p>${rating}/5 stars</p>
            </div>
    `

    newElement.addEventListener('click',deleteMovieHandler.bind(null,id))
    const movie_list = document.getElementById("movie-list")
    movie_list.append(newElement)
}

console.log(add_movie_button)

const toggleMovieModal = () => {
    add_movie_model.classList.toggle("visible")
    toggleBackDrop();
}

const backdropClickHandler = () =>{
    toggleMovieModal();
}

const addMovieHandler = () =>{
   const title = userInputs[0].value
   const img = userInputs[1].value
   const rating = userInputs[2].value

   if(title.trim()=="0" || img.trim()==="" || rating.trim()===""){
       alert("Please enter valid values")
   }

   const new_movie = {
       id : Math.random().toString(),
       title : title,
       image : img,
       rating : rating
   }

   movies.push(new_movie)
   console.log(movies)
   toggleMovieModal()
   clearInp()
   renderMovieElement(new_movie.id,new_movie.title,new_movie.image,new_movie.rating)
   updateUI()
}

const clearInp = () =>{
    userInputs[0].value = "";
    userInputs[1].value = "";
    userInputs[2].value = "";
}

const cancelMovie = () => {
    toggleMovieModal();
    clearInp()
}

add_movie_button.addEventListener('click',toggleMovieModal)
backdrop.addEventListener('click',backdropClickHandler)
cancelAddMovieButton.addEventListener('click',cancelMovie)
confirmAddMovie.addEventListener('click',addMovieHandler)