import './style.css'


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


const getMovieDetails = async (i:any) =>{
    try{
    const movies = await fetchMovies();
    if(movies[i]){
        const movie = movies[i];
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

// getMovieDetails(0);


const addMovie = async (movieDetails: {
    title: string, 
    genre: string, 
    releaseYear: string, 
    rating: string,
    uploadedBy: string,
    imageURL: string,
    description: string }) =>{
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

const testMovie = {
  "title": "Elf",
  "genre": "Comedy",
  "releaseYear":"2003",
  "rating": "7",
  "uploadedBy": "Karl",
  "imageURL": "https://www.google.com",
  "description": "Buddy, a human, is raised amongst elves at the North Pole. When he discovers that he is not an elf, he travels to New York to search for his biological father."
};

addMovie(testMovie);

