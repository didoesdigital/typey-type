import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';
import { Route, Link } from 'react-router-dom';
// import './index.css';

const Category = ({ match }) => {
  // console.log(match);
  return(
    <div>
      <h2>Categories</h2>
      <ul>
        <li><Link to={`${match.url}/drills`}>Drills</Link></li>
        <li><Link to={`${match.url}/collections`}>Collections</Link></li>
        <li><Link to={`${match.url}/stories`}>Stories</Link></li>
      </ul>
      <Route path={`${match.path}/:name`} render={({match}) => (
        <div><h3>{match.params.name}</h3></div>)}/>
    </div>
  )
}

export default Category;
