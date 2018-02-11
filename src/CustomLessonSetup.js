import React, { Component } from 'react';
import './App.css';

class CustomLessonSetup extends Component {

  render() {

    return (
      <main id="main">
        <div className="lesson-wrapper mw-1024 p3">
          <div className="panel p2">
            <div>
              <h4 className="mb1 mt0">Starting a custom lesson</h4>
              <div>
                <p>To start a custom lesson, supply a list of words and their strokes. An easy way to create a lesson is to copy columns from a spreadsheet. See the <a className="" href="/typey-type/progress">community's lessons</a>.</p>
                <ul className="text-small">
                  <li>Each word must be on its own line.</li>
                  <li>Each word must be separated from its stroke hint by a "Tab" character.</li>

                  <li>The strokes are used to work out stroke accuracy.</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="lesson-canvas panel p2 overflow-scroll">
            <div className="mx-auto">
              <div role="alert" aria-live="polite">
                <div className="typed-text-container">
                  <label htmlFor="your-material">Paste your material here:</label>
                  <p className="input-text">
                    <textarea
                      id="your-material"
                      className="input-textarea"
                      autoComplete="off"
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellCheck="false"
                      placeholder="consist	KAOFT
consist of	SKAOF
consisted of	KAOFTD
consistency	KAOPBS"
                      rows="8"
                      wrap="off"
                      onChange={this.props.createCustomLesson}
                      >
                    </textarea>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="scores panel p2">
          </div>
        </div>
      </main>
    )
  }

}

export default CustomLessonSetup;
