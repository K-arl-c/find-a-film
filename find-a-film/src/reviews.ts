const reviewerName = document.querySelector<HTMLInputElement>("#userName");
const reviewDescription = document.querySelector<HTMLInputElement>("#review");
const reviewRating = document.querySelector<HTMLSelectElement>("#rating");
const submitButton = document.querySelector<HTMLButtonElement>("#submit-button");
const filmTitle = document.querySelector<HTMLSpanElement>(".film-title");
const filmImage = document.querySelector<HTMLImageElement>(".film-image");
const filmGenre = document.querySelector<HTMLSpanElement>(".film-genre");
const filmRelease = document.querySelector<HTMLSpanElement>(".release-year");
const filmDescription = document.querySelector<HTMLParagraphElement>(".film-description");
const urlParam = new URLSearchParams(window.location.search);
const movieId = urlParam.get("id");



// get selected movie
const fetchCurrentMovie = async () =>{
    try{
    const response = await fetch (`http://localhost:8080/movies/${movieId}`);
    if(!response.ok){
        throw new Error("Could not fetch API :(");
    }
    const data = await response.json();
    return data;
    }
    catch(error){
        console.error("There has been an error", error);
    }
}

const getCurrentMovieDetails = async () =>{
    try{
        const currentMovie = await fetchCurrentMovie();
        filmTitle!.innerText = currentMovie.title;
        filmImage?.setAttribute("src",`${currentMovie.imageURL}`);
        filmGenre!.innerText = currentMovie.genre;
        filmRelease!.innerText = currentMovie.releaseYear;
        filmDescription!.innerText = currentMovie.description;
        console.log(currentMovie);
    } catch (error){
        console.error("Error retreiving current film ",  error)
    }
}

getCurrentMovieDetails();

// Add review

console.log("Movie ID is " + movieId);

export const addReview = async (userDetails: {
    addedBy: string, 
    rating: string, 
    review: string, 
    }) =>{
        try{
            const response = await fetch (`http://localhost:8080/reviews/${movieId}`, {
                method: "POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userDetails),
            });
            if(!response.ok){
                throw new Error("Failure to create review");
            }
            console.log("Review created successfully");
        } 
        catch (error){
        console.error("There has been an error",error)
}
} 










submitButton?.addEventListener("click", () =>{
    const userReview = {
  "review": reviewDescription?.value || "",
  "rating": reviewRating?.value || "",
  "addedBy": reviewerName?.value || "",
};
    addReview(userReview);
    reviewDescription!.value = ""
    reviewRating!.value = ""
    reviewerName!.value = ""

});

