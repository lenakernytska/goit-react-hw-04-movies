import React from 'react';
import { Switch, Route, Redirect  } from 'react-router-dom';
import AppBar from "./components/AppBar"
import Container from "./components/Container"
import HomeView from "./views/HomeView"
import MovieDetailsPage from "./views/MovieDetailsPage"
import MoviePage from "./views/MoviesPage";


function App() {
  return (
    <Container>
      <AppBar />
      <Switch>
      <Route path="/" exact><HomeView /></Route>
        <Route path="/movies" exact><MoviePage/></Route>
        <Route path="/movies/:movieId"><MovieDetailsPage/></Route>
        <Redirect to="/" />
        </Switch>
      </Container>
    )
  }
export default App;
