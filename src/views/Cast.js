import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCast } from "../services/ApiService";
import styles from "./Cast.module.css";
import notFound from "../images/notFound.png";


const imageSrc = "https://image.tmdb.org/t/p/original";

export default function Cast() {
    const { movieId } = useParams();
    const [cast, setCast]= useState([])
 
    useEffect(() => {
        fetchMovieCast(movieId).then(setCast)
    }, [movieId]);
    
    return (
        <ul className={styles.list}>
            {cast && cast.map(({ name, profile_path, id }) => <li key={id} className={styles.item}>
                <img src={profile_path?`${imageSrc}${profile_path}`: notFound} alt={name} className={styles.image}></img>
                <p className={styles.name}>{name}</p>
            </li>)}
        </ul>)
}