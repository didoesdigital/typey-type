import React, { Component } from 'react';
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
            <div role="banner" className="site-heading-banner"><a href="/" className="site-heading-link">Typey type</a></div>
            <div className="table search-container">
              <Autocomplete
                getItemValue={(item) => item.title}
                inputProps={{ id: 'lessons-autocomplete' }}
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
                    style={{ backgroundColor: highlighted ? '#ffd073' : 'transparent'}}
                  >
                    <h5>{item.title}</h5>
                    <h6>{item.subtitle}</h6>
                    {item.category} >&nbsp;
                    {item.subcategory}
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
              <a href={this.props.path} onClick={this.props.getLesson} className="link-button table-cell" role="button">Start lesson</a>
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
          <a href={this.props.path} onClick={this.props.getLesson} className="link-button table-cell" role="button">Restart lesson</a>
          <a href={this.props.path} onClick={this.props.stopLesson} className="link-button table-cell" role="button">Stop lesson</a>
        </div>
      </div>
    )
  }
}

export default Header;
