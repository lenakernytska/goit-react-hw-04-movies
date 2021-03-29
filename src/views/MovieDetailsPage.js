import { useState, useEffect } from 'react';
import { useParams, NavLink, useRouteMatch, Route, Switch} from 'react-router-dom';
import { fetchMovieById } from "../services/ApiService";
import styles from "./MovieDetailsPage.module.css";
import Cast from "./Cast";
import Reviews from "./Reviews";
import notFound from "../images/notFound.png";
import Container from '../components/Container';

const imageSrc = "https://image.tmdb.org/t/p/original";

export default function MovieDetailsPage() {
    const  {url}  = useRouteMatch()
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        fetchMovieById(movieId).then(setMovie)
    }, [movieId])
    return (
        <Container>
        <button type="button" className={styles.button}>&#8592; Go back</button>
            {movie?  (<div><div className={styles.wrapper}>
                <img src={movie.poster_path? `${imageSrc}${movie.poster_path}` : notFound} alt={movie.title} className={styles.poster} />
                <div className={styles.description}>
                    <h2 className={styles.title}>{movie.title}</h2>
                    <p className={styles.info}>User score: <span className={styles.votes}>{movie.vote_average}</span></p>
                    <h3 className={styles.subtitle}>Owerview</h3>
                    <p className={styles.info}>{movie.overview}</p>
                    <h3 className={styles.subtitle}>Genres</h3>
                    <p className={styles.info}>{movie.genres.map(({ name }) => <span key={name} className={styles.genre}>{name}</span>)}</p>
                </div>
            </div>
          
            
            <div className={styles.detailNav}>
                    <p className={styles.descr}>Additional information:</p>
                    <NavLink to={`${url}/cast`} className={styles.link} activeClassName={styles.activeLink}>Cast</NavLink>
                    <NavLink to={`${url}/reviews`} className={styles.link} activeClassName={styles.activeLink}>Review</NavLink>
                </div>
                <Switch>
                
                    <Route path="/movies/:movieId/cast" exact><Cast /></Route>
                    <Route path="/movies/:movieId/reviews" exact><Reviews /></Route>
                </Switch>
            </div>): <p className={styles.error}>Details are not available(((</p>}
</Container>
)
}

