import './style.css';
import { showAllMovies, filterMovies, getRandomMovie} from "./apicall";
const genreDropdown = document.querySelector<HTMLSelectElement>(".filter-by");
const movieSearch = document.querySelector<HTMLInputElement>(".search");
const randomButton = document.querySelector<HTMLButtonElement>("#randomButton");


showAllMovies();

genreDropdown?.addEventListener("change",filterMovies);
movieSearch?.addEventListener("input", filterMovies);
randomButton?.addEventListener("click",getRandomMovie);