import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Autocomplete from 'react-autocomplete';
import GoogleAnalytics from 'react-ga';
import { IconTypeyType, IconSearch } from './Icon';
import { matchLessonToTerm, sortLessons } from './../utils/utils';

class Header extends Component {
  componentDidMount() {
    if (this.mainHeading) {
      this.mainHeading.focus();
    }
  }

  onStart() {
    if (this.props.nextLessonPath) {
      GoogleAnalytics.event({
        category: 'Search',
        action: 'Start',
        label: this.props.nextLessonPath
      });
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
        <a href="#main" className="skip-to-main-link link-button" id="ga--header--skip-to-main-content">Skip to main content</a>
        <div className={"header min-h-88 hide-in-fullscreen" + fullscreen} role="banner">
          <div className="mx-auto mw-1920 p3">
            <nav>
              <div className="site-heading-banner">
                <Link to="/" className="heading-link dib" aria-label="Typey Type" id="ga--header--logo">
                  <h1 ref={(heading) => { this.mainHeading = heading; }} tabIndex="-1" className="flex items-end">
                    <IconTypeyType role="presentation" iconWidth="64" iconHeight="34" className="mr1 svg-icon-wrapper svg-icon-wrapper--typey-type-logo svg-baseline" />
                    <span className="heading-link__logo-text">Typey&nbsp;Type</span>
                  </h1>
                </Link>
              </div>
              <div className="nav-menu-xs">
                <Link to="/progress" className="nav-button-xs link-button link-button-ghost mr1 table-cell" id="ga--header--xs--progress">Progress</Link>
                <Link to="/writer" className="nav-button-xs link-button link-button-ghost mr1 table-cell" id="ga--header--xs--writer">Writer</Link>
                <Link to="/lookup" className="nav-button-xs link-button link-button-ghost mr1 table-cell" id="ga--header--xs--lookup">Lookup</Link>
                <Link to="/dictionaries" className="nav-button-xs link-button link-button-ghost mr1 table-cell" id="ga--header--xs--dictionaries">Dictionaries</Link>
                <Link to="/lessons" className="nav-button-xs link-button link-button-ghost mr1 table-cell" id="ga--header--xs--lessons">Lessons</Link>
              </div>
              <div className="table search-container relative">
                <Link to="/progress" className="nav-button-lg link-button link-button-ghost mr1 table-cell" id="ga--header--progress">Progress</Link>
                <Link to="/writer" className="nav-button-lg link-button link-button-ghost mr1 table-cell" id="ga--header--writer">Writer</Link>
                <Link to="/lookup" className="nav-button-lg link-button link-button-ghost mr1 table-cell" id="ga--header--lookup">Lookup</Link>
                <Link to="/dictionaries" className="nav-button-lg link-button link-button-ghost mr1 table-cell" id="ga--header--dictionaries">Dictionaries</Link>
                <Link to="/lessons" className="nav-button-lg link-button link-button-ghost mr1 table-cell" id="ga--header--lessons">Lessons</Link>
                <label htmlFor="lessons-autocomplete" className="visually-hidden">Search lessons</label>
                <Autocomplete
                  getItemValue={(item) => item.title}
                  inputProps={{ id: 'lessons-autocomplete', spellCheck: 'false', autoCapitalize: "off", autoCorrect: "off", placeholder: "Search" }}
                  items={this.props.items}
                  menuStyle={{ }}
                  onChange={this.props.onChange}
                  onSelect={this.props.onSelect}
                  renderInput={function(props) {
                    return <input {...props} className="inline-form-control inline-form-control--with-right-icon inline-form-control--reverse" />
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
                <IconSearch role="presentation" iconWidth="24" iconHeight="24" className="mr1 svg-icon-wrapper svg-baseline search-icon pointer-none" />
                <div className="visually-hidden">Selected lesson to start next:
                  <div role="status" aria-live="assertive" aria-atomic="true">
                    {nextLesson}
                  </div>
                </div>
                <Link to={'/lessons'+this.props.nextLessonPath.replace(/lesson\.txt$/,'')} className="link-button table-cell" role="button" id="ga--header--start" onClick={this.onStart.bind(this)}>Start</Link>
              </div>
            </nav>
          </div>
        </div>
      </div>
    )
  }
}

export default Header;
