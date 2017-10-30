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
            <div role="banner" className="site-heading-banner"><a href="/" className="site-heading-link">Typey type</a></div>
            <Autocomplete
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
              value={this.props.value}
              onChange={(ev, value) => {
                this.setState({
                  value: ev.target.value
                })}
              }
              onSelect={(value, item) => this.setState({
                value: value,
                path: item.path
              })}
              menuStyle={{ }}
              renderInput={function(props) {
                return <input {...props} className="form-control" />
              }}
              renderMenu={function(items, value, style) {
                return <div style={{ ...style, ...this.menuStyle }} className="autocomplete-menu" children={items}/>
              }}
              inputProps={{ id: 'lessons-autocomplete' }}
              wrapperStyle={{ position: 'relative', display: 'inline-block' }}
              items={this.props.items}
              getItemValue={(item) => item.title}
              shouldItemRender={matchLessonToTerm}
              sortItems={sortLessons}
            />
          </nav>
        </div>
        <div className="subheader">
          <h1>{this.props.lessonTitle}</h1>
          <h2>{this.props.lessonSubTitle}</h2>
        </div>
      </div>
    )
  }
}

export default Header;
