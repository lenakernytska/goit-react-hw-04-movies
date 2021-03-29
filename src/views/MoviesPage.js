import { useState, useEffect } from 'react';
import styles from "./MoviePage.module.css";
import { fetchMovieQuery } from "../services/ApiService"
import { Link } from 'react-router-dom';
import notFound from "../images/notFound.png";
import Container from '../components/Container';

const imageSrc ="https://image.tmdb.org/t/p/original"

export default function MoviePage() {
    const [inputState, setInputState] = useState('')
    const [movies, setMovies] = useState([]);
    const [query, setQuery] = useState("");
    const [error, setError]= useState('')
    console.log(inputState)

    const handleChange = event => {
    setInputState(event.target.value.toLowerCase())
    }
 
const handleSubmit = event => {
    event.preventDefault();
    setQuery(inputState)
    setInputState('')
    };
    
    useEffect(() => {
        if (query === "") {
            return
            
        }
     fetchMovieQuery(query).then(setMovies).catch(setError("Sorry, there are no movies for yor request!"))
           }, [query])

    return (
        <Container>
        <form className={styles.form} onSubmit={handleSubmit}>
       <input
                className={styles.input}
                type="text"
                name="name"
                value={inputState}
                autoComplete="off"
                onChange={handleChange}/>
            <button className={styles.button} type="submit">Search</button>
            </form>
            <ul className={styles.list}>
                {movies.length>0
                    ? (movies.map(({ title, name, id , poster_path}) => <li key={id} className={styles.card}>
              
              <Link to={`/movies/${id}`}><img className={styles.image} src={poster_path? `${imageSrc}${poster_path}` : notFound} alt={title} />
              <h2 className={styles.cardTitle}>{title || name}</h2></Link>
      </li>))
                    : error}
            </ul>
            </Container>
    )
}