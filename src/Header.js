import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Autocomplete from 'react-autocomplete';
import { IconTypeyType, IconSearch } from './Icon';
import { matchLessonToTerm, sortLessons } from './utils';
import './App.css';

class Header extends Component {
  componentDidMount() {
    if (this.mainHeading) {
      this.mainHeading.focus();
    }
  }

  render() {
    const nextLesson = this.props.value || 'No lesson selected. See all lessons.';
    let fullscreen = '';
    if (this.props.fullscreen) {
      fullscreen = ' fullscreen';
    } else {
      fullscreen = '';
    }
    return (
      <div>
        <a href="#main" className="skip-to-main-link link-button link-button-ghost" id="ga--header--skip-to-main-content">Skip to main content</a>
        <div className={"header hide-in-fullscreen" + fullscreen} role="banner">
          <div className="mx-auto mw-1024 p3">
            <nav>
              <div className="site-heading-banner">
                <Link to="/" className="heading-link dib" aria-label="Typey Type" id="ga--header--logo">
                  <h1 ref={(heading) => { this.mainHeading = heading; }} tabIndex="-1">
                    <IconTypeyType role="presentation" iconWidth="64" iconHeight="34" className="mr1 svg-icon-wrapper svg-baseline" />
                    Typey&nbsp;Type
                  </h1>
                </Link>
                <Link to="/progress" className="progress-button-xs link-button link-button-ghost mr1 table-cell" id="ga--header--progress">Progress</Link>
              </div>
              <div className="table search-container relative">
                <Link to="/progress" className="progress-button-lg link-button link-button-ghost mr1 table-cell" id="ga--header--progress">Progress</Link>
                <span className="divider--vertical hide-sm"></span>
                <Link to="/lessons" className="link-button link-button-ghost mr1 table-cell" id="ga--header--lessons">Lessons</Link>
                <label htmlFor="lessons-autocomplete" className="visually-hidden">Search for a lesson</label>
                <Autocomplete
                  getItemValue={(item) => item.title}
                  inputProps={{ id: 'lessons-autocomplete', spellCheck: 'false', autoCapitalize: "off", autoCorrect: "off", placeholder: "Search for a lesson" }}
                  items={this.props.items}
                  menuStyle={{ }}
                  onChange={this.props.onChange}
                  onSelect={this.props.onSelect}
                  renderInput={function(props) {
                    return <input {...props} className="inline-form-control inline-form-control--with-right-icon" />
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
                  role="search"
                  shouldItemRender={matchLessonToTerm}
                  sortItems={sortLessons}
                  value={this.props.value}
                  wrapperStyle={{ position: 'relative', display: 'table-cell', paddingLeft: '0.5em', paddingRight: '0.5em', width: '100%' }}
                />
                <IconSearch role="presentation" iconWidth="24" iconHeight="24" className="mr1 svg-icon-wrapper svg-baseline search-icon" />
                <div className="visually-hidden">Selected lesson to start next:
                  <div role="status" aria-live="assertive" aria-atomic="true">
                    {nextLesson}
                  </div>
                </div>
                <Link to={'/lessons'+this.props.nextLessonPath.replace(/lesson\.txt$/,'')} className="link-button table-cell" role="button" id="ga--header--start">Start</Link>
              </div>
            </nav>
          </div>
        </div>
      </div>
    )
  }
}

export default Header;
