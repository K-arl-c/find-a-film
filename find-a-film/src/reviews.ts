const reviewerName = document.querySelector<HTMLInputElement>("#userName");
const reviewDescription = document.querySelector<HTMLInputElement>("#review");
const reviewRating = document.querySelector<HTMLSelectElement>("#rating");
const urlParam = new URLSearchParams(window.location.search);
const movieId = urlParam.get("id");
// Add review

console.log("Movie ID is " + movieId);

export const addReview = async (userDetails: {
    addedBy: string, 
    rating: string, 
    review: string, 
    }) =>{
        try{
            const response = await fetch ("http://localhost:8080/reviews/2", {
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
