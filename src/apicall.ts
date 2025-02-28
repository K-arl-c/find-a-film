// API Call to fetch all information relating to all movies - using a caching statement to 
// avoid repeated apicalls

// Query Selectors
const allMovieContainer = document.querySelector<HTMLDivElement>(".content");
const genreDropdown = document.querySelector<HTMLSelectElement>(".filter-by");
const movieSearch = document.querySelector<HTMLInputElement>(".search");
let savedMovies:any = null;

const fetchMovies = async () =>{


    if(savedMovies != null){
        return savedMovies;
    }

    try{
    const response = await fetch ("https://find-a-film-api-production.up.railway.app/movies");
    if(!response.ok){
        throw new Error("Could not fetch API :(");
    }
    const data = await response.json();

    savedMovies = data;
    return savedMovies;
    }
    catch(error){
        console.error("There has been an error", error);
    }
}

// get movie details of 1 movie
export const getMovieDetails = async (i:any) =>{
    try{
    const movies = await fetchMovies();
    if(movies[i]){
        const movie = movies[i];
        console.log("Movie ID:", movie.id);
        console.log("Movie Title:", movie.title);
        console.log("Movie Genre:", movie.genre);
        console.log("Release Year:", movie.releaseYear);
        console.log("Rating:", movie.rating);
        console.log("Uploaded By:", movie.uploadedBy);
        console.log("Image URL:", movie.imageURL);
        console.log("Description:", movie.description);    
        } else{
            console.log("No Movie found")
        }
    } catch (error){
        console.error("There has been an error",error)
    }
};



// get details of a random movie
export const getRandomMovie = async () =>{
    try{
        const movies = await fetchMovies();
        const moviesId = movies.length;
        const randomID = Math.floor(Math.random()*moviesId)
        window.location.href = `/src/review.html?id=${randomID}`;
    } catch(error){
        console.error("There has been an error", error);
    }
};



// get details of all movies
export const showAllMovies = async () => {
    try{
        const movies = await fetchMovies();
        movies.forEach(async(movie:any)=> {
            const movieId = movie.id;
            const response = await fetch (`https://find-a-film-api-production.up.railway.app/movies/${movieId}/average-rating`);
            let ratingData = await response.json();
            const rating = typeof ratingData ==='number' ? `${ratingData}/10` : "Not yet rated";
            const movieDiv = document.createElement("div");
            movieDiv.classList.add("movie-container");
            movieDiv.innerHTML = `
            <a href="src/review.html?id=${movie.id}" class="movie-link">
            <div class="movie-title">${movie.title}</div>
            <img class="movie-image"
          src="${movie.imageURL}"
          alt="elf movie poster" width="50%" height="100%"/>
          <div>Genre: ${movie.genre}</div>
          <div>Release Year: ${movie.releaseYear}</div>
          <div>Rating: ${rating}</div>
          </a>
            `;
            allMovieContainer!.appendChild(movieDiv);
        });
    } catch (error){
        console.error("Error retrieving all movies" ,error);
    }
};

// get rating
export const getMovieRating = async () =>{
    try{
        const movies = await fetchMovies();

        const movieId = movies.id;
        const response = await fetch (`https://find-a-film-api-production.up.railway.app/movies/${movieId}/average-rating`);
            if(!response.ok){
        throw new Error("Could not fetch API :(");
    }
    const data = await response.json();
    return data;
    } catch (error){
        console.error("Error retrieving all movies" ,error);
}
}




// Add a new movie
export const addMovie = async (movieDetails: {
    title: string, 
    genre: string, 
    releaseYear: string, 
    rating: string,
    uploadedBy: string,
    imageURL: string,
    description: string,
    addedBy: string }) =>{
        try{
            const response = await fetch ("https://find-a-film-api-production.up.railway.app/movies", {
                method: "POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(movieDetails),
            });
            if(!response.ok){
                throw new Error("Failure to create movie");
            }
            console.log("Movie created successfully");
        } 
        catch (error){
        console.error("There has been an error",error)
}
} 


// Add user 

export const addUser = async (userDetails: {
    firstName: string, 
    lastName: string, 
    email: string, }) =>{
        try{
            const response = await fetch ("https://find-a-film-api-production.up.railway.app/users", {
                method: "POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userDetails),
            });
            if(!response.ok){
                throw new Error("Failure to create user");
            }
            console.log("User created successfully");
        } 
        catch (error){
        console.error("There has been an error",error)
}
} 



// joining search / filter together
export const filterMovies = async () =>{
    try{
        const selectedGenre = genreDropdown?.value.trim().toLowerCase();
        const searchTerm = movieSearch?.value.toLowerCase().trim();
        const movies = await fetchMovies();

        allMovieContainer!.innerHTML=``;

        let filteredMovies = movies;

        if(selectedGenre !== "genre"){
            filteredMovies = filteredMovies.filter((movie:any) => movie.genre.toLowerCase() === selectedGenre);
        }

        if(searchTerm){
            filteredMovies = filteredMovies.filter((movie:any) => movie.title.toLowerCase().includes(searchTerm));
        }

        filteredMovies.forEach(async(movie:any) => {
            const movieId = movie.id;
            const response = await fetch (`https://find-a-film-api-production.up.railway.app/movies/${movieId}/average-rating`);
            let ratingData = await response.json();
            const rating = typeof ratingData ==='number' ? `${ratingData}/10` : "Not yet rated";
            const movieDiv = document.createElement("div");
            movieDiv.classList.add("movie-container");
            movieDiv.innerHTML = `
            <a href="src/review.html?id=${movie.id}" class="movie-link">
            <div class="movie-title">${movie.title}</div>
            <img class="movie-image"
          src="${movie.imageURL}"
          alt="elf movie poster" width="50%" height="100%"/>
          <div>Genre: ${movie.genre}</div>
          <div>Release Year: ${movie.releaseYear}</div>
          <div>Rating: ${rating}</div>
          </a>
            `;
            allMovieContainer!.appendChild(movieDiv);
        });
    } catch (error){
        console.error("error sorting movies", error);
    }
}