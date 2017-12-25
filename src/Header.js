import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Autocomplete from 'react-autocomplete';
import { matchLessonToTerm, sortLessons } from './utils';
import './App.css';

class Header extends Component {

  render() {
    let nextLesson = this.props.value || 'No lesson selected. See all lessons.';
    return (
      <div>
        <div className="header">
        <a href="#main" className="skip-to-main-link link-button link-button-ghost">Skip to main content</a>
          <div className="mx-auto mw-1024 p3">
            <nav>
              <div className="site-heading-banner">
                <Link to="/" className="heading-link dib"><h1>Typey&nbsp;type</h1></Link>
              </div>
              <div className="table search-container">
                <Link to="/lessons" className="link-button link-button-ghost mr1 table-cell">Lessons</Link>
                <label htmlFor="lessons-autocomplete" className="visually-hidden">Search for a lesson</label>
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
                  wrapperStyle={{ position: 'relative', display: 'table-cell', paddingLeft: '0.5em', paddingRight: '0.5em', width: '100%' }}
                />
                <div className="visually-hidden">Selected lesson to start next:
                  <div role="status" aria-live="assertive">
                    {nextLesson}
                  </div>
                </div>
                <Link to={'/lessons'+this.props.nextLessonPath.replace(/lesson\.txt$/,'')} className="link-button table-cell" role="button">Start</Link>
              </div>
            </nav>
          </div>
        </div>
      </div>
    )
  }
}

export default Header;
