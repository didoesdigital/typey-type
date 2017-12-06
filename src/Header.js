import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Autocomplete from 'react-autocomplete';
import { matchLessonToTerm, sortLessons } from './utils';
import './App.css';

class Header extends Component {
  render() {
    return (
      <div>
        <div className="header">
          <nav>
            <label htmlFor="lessons-autocomplete" className="visually-hidden">Search for a lesson</label>
            <div role="banner" className="site-heading-banner">
              <Link to="/" className="site-heading-link">Typey type</Link>
              <Link to="/lessons">All lessons</Link>
            </div>
            <div className="table search-container">
              <Autocomplete
                getItemValue={(item) => item.title}
                inputProps={{ id: 'lessons-autocomplete', spellCheck: 'false', autoCapitalize: "off", autoCorrect: "off" }}
                items={this.props.items}
                menuStyle={{ }}
                onChange={this.props.onChange}
                onSelect={this.props.onSelect}
                renderInput={function(props) {
                  return <input {...props} className="inline-form-control" />
                }}
                renderItem={(item, highlighted) =>
                  <div
                    key={item.path}
                    className={ highlighted ? "autocomplete-highlight py05 px1 text-small" : "py05 px1 text-small" }
                  >
                    <span className={ highlighted ? "text-uppercase text-small" : "text-uppercase text-small de-emphasized" }>{item.category} >&nbsp;{item.subcategory}</span><br />
                    <span className="text-small">{item.title}</span> <span className="text-small">{item.subtitle}</span>
                  </div>
                }
                renderMenu={function(items, value, style) {
                  return <div style={{ ...style, ...this.menuStyle }} className="autocomplete-menu" children={items}/>
                }}
                shouldItemRender={matchLessonToTerm}
                sortItems={sortLessons}
                value={this.props.value}
                wrapperStyle={{ position: 'relative', display: 'table-cell', paddingRight: '0.5em', width: '100%' }}
              />
              <Link to={'/lessons'+this.props.path.replace(/lesson\.txt$/,'')} className="link-button table-cell" role="button">Start</Link>
            </div>
          </nav>
        </div>
        <div className="subheader">
          <div className="flex">
            <header>
              <h1>{this.props.lessonTitle}</h1>
              <h2>{this.props.lessonSubTitle}</h2>
            </header>
          </div>
          <Link to={'/lessons'+this.props.path.replace(/lesson\.txt$/,'')} className="link-button table-cell" role="button">Restart lesson</Link>
          <a href={this.props.path} onClick={this.props.handleStopLesson} className="link-button table-cell" role="button">Stop lesson</a>
        </div>
      </div>
    )
  }
}

export default Header;
