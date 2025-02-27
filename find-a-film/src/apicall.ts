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
    const response = await fetch ("http://localhost:8080/movies");
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
        console.log("Movie ID:", movie.movieId);
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
        const randomIndex = Math.floor(Math.random()*movies.length)
        getMovieDetails(randomIndex);
    } catch(error){
        console.error("There has been an error", error);
    }
}

// get details of all movies
export const showAllMovies = async () => {
    try{
        const movies = await fetchMovies();
        movies.forEach((movie:any) => {
            const movieDiv = document.createElement("div");
            movieDiv.classList.add("movie-container");
            movieDiv.innerHTML = `
            <div class="movie-title">${movie.title}</div>
            <img class="movie-image"
          src="${movie.imageURL}"
          alt="elf movie poster" width="50%" height="100%"/>
          <div>Genre: ${movie.genre}</div>
          <div>Release Year: ${movie.releaseYear}</div>
          <div>Rating:</div>
          
            `;
            allMovieContainer!.appendChild(movieDiv);
        });
    } catch (error){
        console.error("Error retrieving all movies" ,error);
    }
};






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
            const response = await fetch ("http://localhost:8080/movies", {
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
            const response = await fetch ("http://localhost:8080/users", {
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

// // filtering using Genre 
export const filterByGenre = async () =>{
    try{
        const selectedGenre = genreDropdown?.value.trim().toLowerCase();
        const movies = await fetchMovies();
        


        allMovieContainer!.innerHTML=``;

        if (selectedGenre === "genre"){
            showAllMovies();
            return;
        }

        const filteredMovies = movies.filter((movie:any) => movie.genre.toLowerCase() === selectedGenre);
        
        

        filteredMovies.forEach((movie:any) => {
        const movieDiv = document.createElement("div");
        movieDiv.classList.add("movie-container");
        movieDiv.innerHTML = `
            <div class="movie-title">${movie.title}</div>
            <img class="movie-image"
            src="${movie.imageURL}"
            alt="elf movie poster" width="50%" height="100%"/>
            <div>Genre: ${movie.genre}</div>
            <div>Release Year: ${movie.releaseYear}</div>
            <div>Rating:</div>
            `;
            allMovieContainer!.appendChild(movieDiv);
        });
    } catch (error){
        console.error("Error filtering movies by genre", error)
    }
};

// Search bar functionality 
export const searchInput = async () =>{
    try{
        const searchTerm = movieSearch?.value.toLowerCase().trim();
        const movies = await fetchMovies();

        allMovieContainer!.innerHTML=``;

        const filteredMovies = movies.filter((movie:any) => movie.title.toLowerCase().includes(searchTerm));

        filteredMovies.forEach((movie:any) => {
        const movieDiv = document.createElement("div");
        movieDiv.classList.add("movie-container");
        movieDiv.innerHTML = `
            <div class="movie-title">${movie.title}</div>
            <img class="movie-image"
            src="${movie.imageURL}"
            alt="elf movie poster" width="50%" height="100%"/>
            <div>Genre: ${movie.genre}</div>
            <div>Release Year: ${movie.releaseYear}</div>
            <div>Rating:</div>
            `;
            allMovieContainer!.appendChild(movieDiv);
        });
    } catch (error){
        console.error("There has been an error searching", error)
    }
}