import { useState, useEffect,lazy, Suspense } from 'react';
import { useParams, NavLink, useRouteMatch, useHistory, Route, Switch, useLocation} from 'react-router-dom';
import { fetchMovieById } from "../services/ApiService";
import styles from "./MovieDetailsPage.module.css";
import notFound from "../images/notFound.png";
import Loader from "react-loader-spinner";
import PropTypes from 'prop-types';

const Cast = lazy(() => import('./Cast' /* webpackChunkName:'cast'*/));
const Reviews = lazy(() => import('./Reviews' /* webpackChunkName:'reviews'*/));

const imageSrc = "https://image.tmdb.org/t/p/original";

export default function MovieDetailsPage() {
    const  {url}  = useRouteMatch()
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
   

    let history = useHistory();
    let location = useLocation();
    
   console.log(history)

     function handleClick() {
         history.push({
          pathname: (location.state? "/movies": "/"),
             search: (location.state? `query=${location.state}`: ''),
          state: location.state,
      })
    
    }
    


    useEffect(() => {
        fetchMovieById(movieId).then(setMovie)
    }, [movieId])


    
    return (
        <>
        <button type="button" className={styles.button} onClick={handleClick}>&#8592; Go back</button>
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
                   <NavLink to={{
                            pathname: `${url}/cast`,
                           search: '',
                            state: location.state,
                    }}
                        className={styles.link} activeClassName={styles.activeLink}>Cast</NavLink>
                   <NavLink to={{
                            pathname: `${url}/reviews`,
                           search: '',
                            state: location.state,
                    }}
                        className={styles.link} activeClassName={styles.activeLink}>Review</NavLink>
                </div>
                <Suspense fallback={<Loader type="Oval" color="#808080" height={80} width={80} radius={100} timeout={7000} />}>
                <Switch>
                    <Route path="/movies/:movieId/cast" exact><Cast /></Route>
                    <Route path="/movies/:movieId/reviews" exact><Reviews /></Route>
                    </Switch>
                    </Suspense>
            </div>): <p className={styles.error}>Details are not available(((</p>}
</>
)
}

MovieDetailsPage.propTypes = {
     movie: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        poster_path: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        vote_average:PropTypes.string.isRequired,
        overview:PropTypes.string.isRequired,
        genres:PropTypes.arrayOf(PropTypes.string),
     })),
   }