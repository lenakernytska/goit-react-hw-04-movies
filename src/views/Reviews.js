import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieReviews } from "../services/ApiService";
import styles from "./Reviews.module.css";


export default function Review() {
    const { movieId } = useParams();
    const [reviews, setReviews]= useState([])
 
    useEffect(() => {
        fetchMovieReviews(movieId).then(setReviews)
    }, [movieId]);

const noReviewMessage="We do not have any review for this movie :("
    return (
        <ul className={styles.list}>
            {reviews.length>0 ?
                reviews.map(({ author, content }) => <li key={author} className={styles.item}>
                <h3 className={styles.author}>{author}</h3>
                <p className={styles.content}>{content}</p>
            </li>) : noReviewMessage}
       </ul>)
}