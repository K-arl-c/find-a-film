import './style.css';
import { getMovieDetails, addMovie, showAllMovies, filterMovies} from "./apicall";
import {addReview} from "./reviews"
const genreDropdown = document.querySelector<HTMLSelectElement>(".filter-by");
const movieSearch = document.querySelector<HTMLInputElement>(".search");



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

const testMovie = {
  "title": "Inception",
  "genre": "Sci-Fi",
  "releaseYear": "2010",
  "rating": "8",
  "uploadedBy": "Karl",
  "imageURL": "https://www.google.com",
  "description": "A skilled thief, who specializes in stealing secrets from deep within the subconscious, is offered a chance to have his past crimes forgiven if he can successfully plant an idea into someone's mind."
};

const testReview = {
  "review": "Would defo see it again!",
  "rating": "10",
  "addedBy": "KarlC"
}

// addReview(testReview);
// addMovie(testMovie);

getMovieDetails(0);

showAllMovies();

genreDropdown?.addEventListener("change",filterMovies);
movieSearch?.addEventListener("input", filterMovies);