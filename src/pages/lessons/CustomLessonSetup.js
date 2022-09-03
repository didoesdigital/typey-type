import React, { Component } from 'react';
import CustomJSONLesson from "./CustomJSONLesson";
import CustomLessonIntro from "./CustomLessonIntro";
import CustomShareLessons from "./CustomShareLessons";
import CustomWordListLesson from './CustomWordListLesson';

class CustomLessonSetup extends Component {
  componentDidMount() {
    if (this.mainHeading) {
      this.mainHeading.focus();
    }

    if (this.props.globalLookupDictionary && this.props.globalLookupDictionary.size < 2 && !this.props.globalLookupDictionaryLoaded) {
      const shouldUsePersonalDictionaries = this.props.personalDictionaries
        && Object.entries(this.props.personalDictionaries).length > 0
        && !!this.props.personalDictionaries.dictionariesNamesAndContents;

      this.props.fetchAndSetupGlobalDict(false, shouldUsePersonalDictionaries ? this.props.personalDictionaries : null)
        .catch(error => {
          console.error(error);
          // this.showDictionaryErrorNotification();
        });
    }
  }

  render() {
    const {
      createCustomLesson,
      customLessonMaterial,
      customLessonMaterialValidationState,
      customLessonMaterialValidationMessages,
      globalLookupDictionary,
      setAnnouncementMessage
    } = this.props;

    return (
      <main id="main">
        <div className="subheader">
          <div className="flex items-baseline mx-auto mw-1920 justify-between px3 py2">
            <div className="flex mr1 self-center">
              <header className="flex items-center min-h-40">
                <h2 ref={(heading) => { this.mainHeading = heading; }} tabIndex="-1" id="about-typey-type-for-stenographers">Create a custom lesson</h2>
              </header>
            </div>
          </div>
        </div>

          <div className="bg-info landing-page-section">
            <CustomLessonIntro
              createCustomLesson={createCustomLesson}
              customLessonMaterial={customLessonMaterial}
              customLessonMaterialValidationState={customLessonMaterialValidationState}
              customLessonMaterialValidationMessages={customLessonMaterialValidationMessages}
              setAnnouncementMessage={setAnnouncementMessage}
            />
          </div>

          <div className="bg-white landing-page-section">
            <CustomWordListLesson
              globalLookupDictionary={globalLookupDictionary}
            />
          </div>

          <div className="bg-info landing-page-section">
            <CustomJSONLesson />
          </div>

          <div className="bg-white landing-page-section">
            <CustomShareLessons
              setAnnouncementMessage={setAnnouncementMessage}
            />
          </div>

      </main>
    )
  }

}

export default CustomLessonSetup;
