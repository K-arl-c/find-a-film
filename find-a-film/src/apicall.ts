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


// addMovie(testMovie);