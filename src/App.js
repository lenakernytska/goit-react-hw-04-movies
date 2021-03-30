import React, {lazy, Suspense} from 'react';
import { Switch, Route, Redirect  } from 'react-router-dom';
import AppBar from "./components/AppBar";
import Container from "./components/Container";
import Loader from "react-loader-spinner";


const HomeView = lazy(() => import('./views/HomeView' /* webpackChunkName:'home-view'*/));
const MovieDetailsPage = lazy(() => import('./views/MovieDetailsPage' /* webpackChunkName:'movie-details-view'*/));
const MoviePage = lazy(() => import('./views/MoviesPage' /* webpackChunkName:'movie-page'*/));

function App() {
  return (
    <Container>
      <AppBar />
      <Suspense fallback={<Loader type="Oval" color="#808080" height={80} width={80} radius={100} timeout={7000} />}>
      <Switch>
      <Route path="/" exact><HomeView /></Route>
        <Route path="/movies" exact><MoviePage/></Route>
        <Route path="/movies/:movieId"><MovieDetailsPage/></Route>
        <Redirect to="/" />
        </Switch>
        </Suspense>
      </Container>
    )
  }
export default App;
