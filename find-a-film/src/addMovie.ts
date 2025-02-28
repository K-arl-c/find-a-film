const title = document.querySelector<HTMLInputElement>("#title");
const genre = document.querySelector<HTMLInputElement>("#genre");
const description = document.querySelector<HTMLInputElement>("#description");
const release = document.querySelector<HTMLInputElement>("#release");
const image = document.querySelector<HTMLInputElement>("#image");
const user = document.querySelector<HTMLInputElement>("#user");
const submitButton = document.querySelector<HTMLButtonElement>(".add-movie-submit-button");


const addMovie = async (movieDetails:{
    addedBy: string,
    description: string,
    genre: string,
    imageURL: string,
    releaseYear: string,
    title: string
}) =>{
    try{
        const response = await fetch ("https://find-a-film-api-production.up.railway.app/movies",{
            method: "POST",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify(movieDetails),
        });
        if(!response.ok){
            throw new Error("Failed to create new movie");
        }
    } catch (error){
        console.error("There has been an error", error)
    }
}

submitButton?.addEventListener("click", () =>{
    const addedMovie = {
  "title": title?.value || "",
  "genre": genre?.value || "",
  "description": description?.value || "",
  "releaseYear": release?.value || "",
  "imageURL": image?.value || "",
  "addedBy": user?.value || "",
};
    addMovie(addedMovie);
    title!.value = ""
    genre!.value = ""
    description!.value = ""
    release!.value = ""
    image!.value = ""
    user!.value = ""
});