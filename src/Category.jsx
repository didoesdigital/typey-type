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
      <ul className="unstyled-list">
        <li><Link to={`${match.url}/drills`} className="link-button table-cell" role="button">Drills</Link></li>
        <li><Link to={`${match.url}/collections`} className="link-button table-cell" role="button">Collections</Link></li>
        <li><Link to={`${match.url}/stories`} className="link-button table-cell" role="button">Stories</Link></li>
      </ul>
      <Route path={`${match.path}/:name`} render={({match}) => (
        <div><h3>{match.params.name}</h3></div>)}/>
    </div>
  )
}

export default Category;
