const fetchApi = async () =>{
    try{
    const response = await fetch ("INPUT API HERE");
    if(!response.ok){
        throw new Error("Could not fetch API :(");
    }
    const data = await response.json();
    const movieTitle = data.title;
    const movieGenre = data.genre;
    const movieReleaseYear = data.releaseYear;
    const movieRating = data.rating;
    const movieUploadedBy = data.uploadedBy;
    const movieImageURL = data.imageURL;
    }
    catch(error){
        console.error(error);
    }
}


// title
// genre
// release year
// rating
// uploaded by
// image url