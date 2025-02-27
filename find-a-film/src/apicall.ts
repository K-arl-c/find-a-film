// API Call to fetch all information relating to all movies - using a caching statement to 
// avoid repeated apicalls


let savedMovies:any = null;

const fetchMovies = async () =>{


    if(savedMovies != null){
        return savedMovies;
    }

    try{
    const response = await fetch ("http://localhost:8080/movies/add");
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

// get details of all movies. TO DO - enhance this function with DOM manipulation to 
// append a child div for every movie
export const showAllMovies = async () => {
    try{
        const movies = await fetchMovies();
        movies.forEach((movie:any) => getMovieDetails(movie))
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

