import React, { useState, useEffect } from 'react';
import {fetchTrendFilms} from "../services/ApiService"
import styles from "./HomeView.module.css"
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';



const imageSrc = "https://image.tmdb.org/t/p/original";

export default function HomeView() {
   
    const [trends, setTrends] = useState([]);

    useEffect(() => {
        fetchTrendFilms().then(setTrends)
    }, []);

    return (
        <main className={styles.main}>
            <h1 className={styles.sectionTitle}>Trendy movies for today</h1>
  <ul className={styles.list}>
          {trends && trends.map(({id, poster_path, title, name}) => <li key={id} className={styles.card}>
              
              <Link to={`/movies/${id}`}><img className={styles.image} src={`${imageSrc}${poster_path}`} alt={title} />
              <h2 className={styles.cardTitle}>{title || name}</h2></Link>
      </li>)}
     </ul>
         
              </main>
  );
}

HomeView.propTypes = {
     trends: PropTypes.arrayOf(PropTypes.shape({
         id: PropTypes.number.isRequired,
         poster_path: PropTypes.string.isRequired,
         title: PropTypes.string.isRequired,
         name: PropTypes.string.isRequired
     })),
   }