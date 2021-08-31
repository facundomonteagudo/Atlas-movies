import React, { useContext } from 'react';
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  useRouteMatch
} from 'react-router-dom';

import MovieCatalog from './MovieCatalog/MovieCatalog';
import AuthContext from '../../Store/auth-context';
import './Home.css';
import FavMoviesCatalog from './FavMoviesCatalog/FavMoviesCatalog';

function Home() {
  const history = useHistory();
  const { path } = useRouteMatch();

  const authCtx = useContext(AuthContext);
  const { isLoggedIn } = authCtx;

  const handleBtn = () => {
    if (history.location.pathname === '/home') {
      history.push('/home/favourites');
    } else {
      history.replace('/home');
    }
  };

  return (
    <div>
      <div className="text-catalog">
        Movies / <em>Catalog.</em>
        {isLoggedIn && (
          <button onClick={handleBtn} className="btn-fav-movies">
            {history.location.pathname === '/home'
              ? 'FAVOURITES MOVIES'
              : 'VIEW ALL MOVIES'}
          </button>
        )}
      </div>
      <div className="card-container">
        <Switch>
          <Route exact path="/home">
            <MovieCatalog />
          </Route>

          <Route exact path={`${path}/favourites`}>
            {isLoggedIn ? <FavMoviesCatalog /> : <Redirect to="/home" />}
          </Route>

          <Route path={`${path}`}>
            <Redirect to="/home" />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Home;
