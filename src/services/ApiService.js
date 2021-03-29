import axios from "axios";

const apiKey="030295876ec9637cb436e167c8c73741"
const baseUrl = 'https://api.themoviedb.org/3';


const fetchTrendFilms=async ()=>{
    const { data } = await axios.get(`${baseUrl}/trending/all/day?api_key=${apiKey}`);
    return data.results;
}
  
 const fetchMovieById=async (movieId)=>{
  const response = await axios.get(`${baseUrl}/movie/${movieId}?api_key=${apiKey}`);
     return response.data;
  
}

const fetchMovieCast = async (movieId) => {
    const response = await axios.get(`${baseUrl}/movie/${movieId}/credits?api_key=${apiKey}`);
    return response.data.cast;
}

const fetchMovieReviews = async (movieId) => {
    const response = await axios.get(`${baseUrl}/movie/${movieId}/reviews?api_key=${apiKey}`);
    return response.data.results;
}

function fetchMovieQuery(inputValue) {
  return axios.get(`${baseUrl}/search/movie?api_key=${apiKey}&query=${inputValue}`)
        .then(response => response.data.results)
      }

export {fetchTrendFilms, fetchMovieById, fetchMovieCast, fetchMovieReviews, fetchMovieQuery}
