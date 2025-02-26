import './style.css'

// API Call to fetch all information relating to all movies - using a caching statement to 
// avoid repeated apicalls

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

fetchMovies();

const getMovieDetails = async (i:any) =>{
    const movies = await fetchMovies();
    if(movies[i]){
        return movies[i];
    } else{
        console.log("no movie found")
        return null;
    }
}

getMovieDetails(0).then((movie)=>console.log(movie));

// Function that does an api call to display all movies

// Function that does a post to an api to create a movie based off all 
// information provided by the user 
// Username 
// Title, 
// Genre, 
// Release Year 
// Rating


// Function that does a post to an api to create a reivew based off all information provided 
// by the user  
// Review Description 
// Rating 
// Username

// A Function that calls api getMovie based on provided search string

// A function that displays a random movie when button is clicked


