import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../Store/auth-context';
import './Header.css';

function Header() {
  const history = useHistory();
  const authCtx = useContext(AuthContext);
  const { isLoggedIn } = authCtx;
  const isAdmin = authCtx.role === 'admin';

  const singUp = () => {
    history.push('/');
  };

  const logoutHandler = () => {
    authCtx.logout();
  };

  return (
    <div className="header">
      <h2>Atlas Movies</h2>
      <div className="button-group">
        <button className="btn-header" onClick={() => history.push('/home')}>
          HOME
        </button>

        {isAdmin && (
          <button
            className="btn-header"
            onClick={() => history.push('/edit-movie')}
          >
            EDIT MOVIE
          </button>
        )}
        {isAdmin && (
          <button
            className="btn-header"
            onClick={() => history.push('/add-movie')}
          >
            ADD MOVIE
          </button>
        )}
        {!isLoggedIn && (
          <button onClick={singUp} className="btn-header">
            SIGN UP !
          </button>
        )}
        {isLoggedIn && (
          <button onClick={logoutHandler} className="btn-header">
            LOGOUT
          </button>
        )}
      </div>
    </div>
  );
}

export default Header;
