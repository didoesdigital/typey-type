import React, { Component } from 'react';
import './App.css';

class StenoboardDiagram extends Component {
  // componentDidMount() {
  //   if (this.props.currentPhrase) {
  //     // let strokes = splitBriefsIntoStrokes(this.props.currentPhrase);
  //     // let keys = splitBriefsIntoStrokes(this.props.currentPhrase);

  //   }
  // }

  render() {
    // const strokeColor = '#321E3E';
    // const strokeColor = '#6c6076';
    const strokeColor = 'hsla(277, 10%, 60%, 1)';
    const onTextColor = '#CAC7CC';
    const offTextColor = '#fff';

    let rightZOnColor = '#7109AA';
    let rightDOnColor = '#7109AA';
    let rightSOnColor = '#7109AA';
    let rightTOnColor = '#7109AA';
    let rightGOnColor = '#7109AA';
    let rightLOnColor = '#7109AA';
    let rightBOnColor = '#7109AA';
    let rightPOnColor = '#7109AA';
    let rightROnColor = '#7109AA';
    let rightFOnColor = '#7109AA';
    let rightUOnColor = '#7109AA';
    let rightEOnColor = '#7109AA';
    let starOnColor = '#7109AA';
    let leftOOnColor = '#7109AA';
    let leftAOnColor = '#7109AA';
    let leftROnColor = '#7109AA';
    let leftHOnColor = '#7109AA';
    let leftWOnColor = '#7109AA';
    let leftPOnColor = '#7109AA';
    let leftKOnColor = '#7109AA';
    let leftTOnColor = '#7109AA';
    let leftSLowerOnColor = '#7109AA';
    let leftSUpperOnColor = '#7109AA';
    let numberBarOnColor = '#7109AA';

    let rightZOffColor = '#f2ddfd';
    let rightDOffColor = '#f2ddfd';
    let rightSOffColor = '#f2ddfd';
    let rightTOffColor = '#f2ddfd';
    let rightGOffColor = '#f2ddfd';
    let rightLOffColor = '#f2ddfd';
    let rightBOffColor = '#f2ddfd';
    let rightPOffColor = '#f2ddfd';
    let rightROffColor = '#f2ddfd';
    let rightFOffColor = '#f2ddfd';
    let rightUOffColor = '#f2ddfd';
    let rightEOffColor = '#f2ddfd';
    let starOffColor = '#f2ddfd';
    let leftOOffColor = '#f2ddfd';
    let leftAOffColor = '#f2ddfd';
    let leftROffColor = '#f2ddfd';
    let leftHOffColor = '#f2ddfd';
    let leftWOffColor = '#f2ddfd';
    let leftPOffColor = '#f2ddfd';
    let leftKOffColor = '#f2ddfd';
    let leftTOffColor = '#f2ddfd';
    let leftSLowerOffColor = '#f2ddfd';
    let leftSUpperOffColor = '#f2ddfd';
    let numberBarOffColor = '#f2ddfd';

      // numberBar: false,
      // leftSUpper: false,
      // leftSLower: false,
      // leftT: false,
      // leftK: false,
      // leftP: false,
      // leftW: false,
      // leftH: false,
      // leftR: false,
      // leftA: false,
      // leftO: false,
      // star: false,
      // dash: true,
      // rightE: false,
      // rightU: false,
      // rightF: false,
      // rightR: false,
      // rightP: false,
      // rightB: false,
      // rightL: false,
      // rightG: false,
      // rightT: true,
      // rightS: false,
      // rightD: false,
      // rightZ: false,
    //


    return (
      <svg viewBox="0 0 204 100" xmlns="http://www.w3.org/2000/svg">
        <title>
          Stenoboard
        </title>
        <g id="Stenoboard" fill="none" fillRule="evenodd">
          <rect id="rightZ" stroke={strokeColor} fill={this.props.rightZ ? rightZOnColor : rightZOffColor} x="188.5" y="48.5" width="15" height="23" rx="4"/>
          <rect id="rightD" stroke={strokeColor} fill={this.props.rightD ? rightDOnColor : rightDOffColor} x="188.5" y="20.5" width="15" height="23" rx="4"/>
          <rect id="rightS" stroke={strokeColor} fill={this.props.rightS ? rightSOnColor : rightSOffColor} x="168.5" y="48.5" width="15" height="23" rx="4"/>
          <rect id="rightT" stroke={strokeColor} fill={this.props.rightT ? rightTOnColor : rightTOffColor} x="168.5" y="20.5" width="15" height="23" rx="4"/>
          <rect id="rightG" stroke={strokeColor} fill={this.props.rightG ? rightGOnColor : rightGOffColor} x="148.5" y="48.5" width="15" height="23" rx="4"/>
          <rect id="rightL" stroke={strokeColor} fill={this.props.rightL ? rightLOnColor : rightLOffColor} x="148.5" y="20.5" width="15" height="23" rx="4"/>
          <rect id="rightB" stroke={strokeColor} fill={this.props.rightB ? rightBOnColor : rightBOffColor} x="128.5" y="48.5" width="15" height="23" rx="4"/>
          <rect id="rightP" stroke={strokeColor} fill={this.props.rightP ? rightPOnColor : rightPOffColor} x="128.5" y="20.5" width="15" height="23" rx="4"/>
          <rect id="rightR" stroke={strokeColor} fill={this.props.rightR ? rightROnColor : rightROffColor} x="108.5" y="48.5" width="15" height="23" rx="4"/>
          <rect id="rightF" stroke={strokeColor} fill={this.props.rightF ? rightFOnColor : rightFOffColor} x="108.5" y="20.5" width="15" height="23" rx="4"/>
          <rect id="rightU" stroke={strokeColor} fill={this.props.rightU ? rightUOnColor : rightUOffColor} x="118.5" y="76.5" width="15" height="23" rx="4"/>
          <rect id="rightE" stroke={strokeColor} fill={this.props.rightE ? rightEOnColor : rightEOffColor} x="98.5" y="76.5" width="15" height="23" rx="4"/>
          <rect id="star" stroke={strokeColor} fill={this.props.star ? starOnColor : starOffColor} x="82.5" y="20.5" width="19" height="51" rx="4"/>
          <rect id="leftO" stroke={strokeColor} fill={this.props.leftO ? leftOOnColor : leftOOffColor} x="70.5" y="76.5" width="15" height="23" rx="4"/>
          <rect id="leftA" stroke={strokeColor} fill={this.props.leftA ? leftAOnColor : leftAOffColor} x="50.5" y="76.5" width="15" height="23" rx="4"/>
          <rect id="leftR" stroke={strokeColor} fill={this.props.leftR ? leftROnColor : leftROffColor} x="60.5" y="48.5" width="15" height="23" rx="4"/>
          <rect id="leftH" stroke={strokeColor} fill={this.props.leftH ? leftHOnColor : leftHOffColor} x="60.5" y="20.5" width="15" height="23" rx="4"/>
          <rect id="leftW" stroke={strokeColor} fill={this.props.leftW ? leftWOnColor : leftWOffColor} x="40.5" y="48.5" width="15" height="23" rx="4"/>
          <rect id="leftP" stroke={strokeColor} fill={this.props.leftP ? leftPOnColor : leftPOffColor} x="40.5" y="20.5" width="15" height="23" rx="4"/>
          <rect id="leftK" stroke={strokeColor} fill={this.props.leftK ? leftKOnColor : leftKOffColor} x="20.5" y="48.5" width="15" height="23" rx="4"/>
          <rect id="leftT" stroke={strokeColor} fill={this.props.leftT ? leftTOnColor : leftTOffColor} x="20.5" y="20.5" width="15" height="23" rx="4"/>
          <rect id="leftSLower" stroke={strokeColor} fill={this.props.leftSLower ? leftSLowerOnColor : leftSLowerOffColor} x=".5" y="48.5" width="15" height="23" rx="4"/>
          <rect id="leftSUpper" stroke={strokeColor} fill={this.props.leftSUpper ? leftSUpperOnColor : leftSUpperOffColor} x=".5" y="20.5" width="15" height="23" rx="4"/>
          <rect id="numberBar" stroke={strokeColor} fill={this.props.numberBar ? numberBarOnColor : numberBarOffColor} x=".5" y=".5" width="203" height="15" rx="4"/>
          <path id="Z" fill={this.props.leftZ ? onTextColor : offTextColor} d="M199.632 53.8v1.024l-5.472 8.864h5.424V65H192.4v-1.008l5.472-8.896h-5.12V53.8z"/>
          <path d="M192.592 37V25.8h2.64c3.392 0 4.592 2.832 4.592 5.6 0 2.576-1.056 5.6-4.656 5.6h-2.576zm1.392-1.264h1.232c2.448 0 3.168-2.288 3.168-4.336 0-2.176-.832-4.336-2.992-4.336h-1.408v8.672z" id="D" fill={this.props.leftD ? onTextColor : offTextColor}/>
          <path d="M176.08 65.192c-1.744 0-3.104-1.088-3.568-2.48l1.28-.464c.416.992 1.28 1.68 2.352 1.68 1.152 0 1.904-.656 1.904-1.872 0-1.216-1.072-1.92-2.256-2.432-1.392-.608-2.944-1.424-2.944-3.296 0-1.488 1.168-2.72 3.104-2.72 1.552 0 2.672.848 2.992 1.984l-1.264.416c-.256-.608-.864-1.136-1.776-1.136-1.008 0-1.648.56-1.648 1.456 0 1.056 1.072 1.552 2.224 2.064 1.344.608 2.976 1.552 2.976 3.616 0 2.032-1.456 3.184-3.376 3.184z" id="SRight" fill={this.props.rightS ? onTextColor : offTextColor}/>
          <path id="TRight" fill={this.props.rightT ? onTextColor : offTextColor} d="M175.312 37v-9.872h-3.216V25.8h7.808v1.328h-3.216V37z"/>
          <path d="M156.256 65.192c-2.848 0-4.032-2.864-4.032-5.792 0-2.976 1.264-5.792 4.032-5.792 1.776 0 2.576.96 3.104 1.952l-1.216.704c-.4-.72-.912-1.376-1.888-1.376-1.92 0-2.592 2.432-2.592 4.512 0 2.32.768 4.512 2.592 4.512 1.28 0 2.032-1.024 2.032-2.544v-.528h-2.016v-1.264h3.456v1.344c0 2.784-1.52 4.272-3.472 4.272z" id="G" fill={this.props.leftG ? onTextColor : offTextColor}/>
          <path id="L" fill={this.props.rightL ? onTextColor : offTextColor} d="M152.608 37V25.8h1.376v9.872h5.328V37z"/>
          <path d="M132.608 65V53.8h3.216c2.656 0 3.472 1.472 3.472 2.944 0 1.088-.624 1.936-1.664 2.352 1.232.336 2.064 1.328 2.064 2.72 0 1.536-.864 3.184-3.632 3.184h-3.456zm1.376-6.432h1.568c1.616 0 2.416-.704 2.416-1.792 0-.832-.368-1.712-2.064-1.712h-1.92v3.504zm0 5.168h2.256c1.664 0 2.128-.928 2.128-1.856 0-1.056-.528-2.08-2.64-2.08h-1.744v3.936z" id="B" fill={this.props.leftB ? onTextColor : offTextColor}/>
          <path d="M132.608 37V25.8h3.456c2.72 0 3.616 1.696 3.616 3.36 0 1.536-.992 3.344-3.616 3.344h-2.08V37h-1.376zm1.376-5.776h2.176c1.6 0 2.16-1.088 2.16-2.064 0-.896-.464-2.096-2.16-2.096h-2.176v4.16z" id="PRight" fill={this.props.rightP ? onTextColor : offTextColor}/>
          <path d="M119.568 56.984c0 1.296-.656 2.704-2.448 3.104l2.4 4.912H118l-2.336-4.8h-1.68V65h-1.376V53.8h3.44c2.704 0 3.52 1.584 3.52 3.184zm-5.584-1.92v3.872h2.096c1.632 0 2.128-.976 2.128-1.92 0-.832-.448-1.952-2.128-1.952h-2.096z" id="RRight" fill={this.props.rightR ? onTextColor : offTextColor}/>
          <path id="F" fill={this.props.leftF ? onTextColor : offTextColor} d="M112.608 37V25.8h7.024v1.312h-5.648v3.44h3.952v1.312h-3.952V37z"/>
          <path d="M126 93.192c-2.144 0-3.6-1.216-3.6-4.432V81.8h1.376v6.96c0 2.496 1.024 3.152 2.224 3.152 1.2 0 2.224-.656 2.224-3.152V81.8h1.392v6.96c0 3.2-1.472 4.432-3.616 4.432z" id="U" fill={this.props.rightU ? onTextColor : offTextColor}/>
          <path id="E" fill={this.props.rightE ? onTextColor : offTextColor} d="M102.608 93V81.8h6.56v1.312h-5.184v3.44h3.536v1.312h-3.536v3.824h5.52V93z"/>
          <path d="M78 93.192c-2.8 0-3.808-2.944-3.808-5.792S75.2 81.608 78 81.608s3.824 2.944 3.824 5.792S80.8 93.192 78 93.192zm0-1.28c1.728 0 2.384-2.368 2.384-4.512 0-2.336-.64-4.512-2.384-4.512-1.744 0-2.384 2.352-2.384 4.512 0 2.32.64 4.512 2.384 4.512z" id="O" fill={this.props.leftO ? onTextColor : offTextColor}/>
          <path d="M60.848 93l-.864-2.752h-3.952L55.184 93h-1.472l3.696-11.2h1.168L62.288 93h-1.44zm-4.432-3.984h3.168l-1.296-4.096c-.08-.256-.24-.816-.304-1.088-.048.272-.208.832-.288 1.088l-1.28 4.096z" id="A" fill={this.props.leftA ? onTextColor : offTextColor}/>
          <path id="*" fill={this.props.star ? onTextColor : offTextColor} d="M90.592 48.096l-1.088-.688.976-1.6.88-.896-1.248.256H88.32v-1.296h1.792l1.248.272-.88-.912-.976-1.6 1.104-.688 1.024 1.664.368 1.2.368-1.2 1.024-1.664 1.104.688-.976 1.6-.88.912 1.248-.272h1.808v1.296h-1.808l-1.248-.256.88.896.976 1.6-1.104.688-1.024-1.664L92 45.248l-.368 1.184z"/>
          <path d="M71.568 56.984c0 1.296-.656 2.704-2.448 3.104L71.52 65H70l-2.336-4.8h-1.68V65h-1.376V53.8h3.44c2.704 0 3.52 1.584 3.52 3.184zm-5.584-1.92v3.872h2.096c1.632 0 2.128-.976 2.128-1.92 0-.832-.448-1.952-2.128-1.952h-2.096z" id="RLeft" fill={this.props.leftRLeft ? onTextColor : offTextColor}/>
          <path id="H" fill={this.props.leftH ? onTextColor : offTextColor} d="M64.608 37V25.8h1.376v4.736h4.032V25.8h1.376V37h-1.376v-5.152h-4.032V37z"/>
          <path d="M45.456 65l-1.76-11.2h1.312l1.04 7.392c.032.224.048.448.08.72.032-.256.08-.512.128-.72l1.28-7.392h.96l1.28 7.312c.048.224.08.432.112.656.016-.24.048-.464.08-.64l1.008-7.328h1.328L50.544 65h-1.12l-1.312-7.344c-.032-.24-.08-.496-.112-.752-.032.256-.064.512-.112.72L46.576 65h-1.12z" id="W" fill={this.props.leftW ? onTextColor : offTextColor}/>
          <path d="M44.608 37V25.8h3.456c2.72 0 3.616 1.696 3.616 3.36 0 1.536-.992 3.344-3.616 3.344h-2.08V37h-1.376zm1.376-5.776h2.176c1.6 0 2.16-1.088 2.16-2.064 0-.896-.464-2.096-2.16-2.096h-2.176v4.16z" id="PLeft" fill={this.props.leftPLeft ? onTextColor : offTextColor}/>
          <path id="K" fill={this.props.leftK ? onTextColor : offTextColor} d="M30.48 65l-3.216-6.096-1.28 1.616V65h-1.376V53.8h1.376v4.816l3.744-4.816h1.584l-3.104 3.92L32.064 65z"/>
          <path id="TLeft" fill={this.props.leftTLeft ? onTextColor : offTextColor} d="M27.312 37v-9.872h-3.216V25.8h7.808v1.328h-3.216V37z"/>
          <path d="M8.08 65.192c-1.744 0-3.104-1.088-3.568-2.48l1.28-.464c.416.992 1.28 1.68 2.352 1.68 1.152 0 1.904-.656 1.904-1.872 0-1.216-1.072-1.92-2.256-2.432-1.392-.608-2.944-1.424-2.944-3.296 0-1.488 1.168-2.72 3.104-2.72 1.552 0 2.672.848 2.992 1.984l-1.264.416c-.256-.608-.864-1.136-1.776-1.136-1.008 0-1.648.56-1.648 1.456 0 1.056 1.072 1.552 2.224 2.064 1.344.608 2.976 1.552 2.976 3.616 0 2.032-1.456 3.184-3.376 3.184z" id="SLower" fill={this.props.leftSLower ? onTextColor : offTextColor}/>
          <path d="M8.08 37.192c-1.744 0-3.104-1.088-3.568-2.48l1.28-.464c.416.992 1.28 1.68 2.352 1.68 1.152 0 1.904-.656 1.904-1.872 0-1.216-1.072-1.92-2.256-2.432-1.392-.608-2.944-1.424-2.944-3.296 0-1.488 1.168-2.72 3.104-2.72 1.552 0 2.672.848 2.992 1.984l-1.264.416c-.256-.608-.864-1.136-1.776-1.136-1.008 0-1.648.56-1.648 1.456 0 1.056 1.072 1.552 2.224 2.064 1.344.608 2.976 1.552 2.976 3.616 0 2.032-1.456 3.184-3.376 3.184z" id="SUpper" fill={this.props.leftSUpper ? onTextColor : offTextColor}/>
          <path d="M90.344 12l.384-2.52160004h-1.5104l.1664-.96000001h1.4848l.3328-2.16320003h-1.4464l.1536-.94720002h1.4336l.3584-2.36800003h1.0240001l-.3584 2.36800003h1.7536l.3712-2.36800003h1.0112l-.3712 2.36800003h1.536l-.1536.94720002h-1.5232l-.3328 2.16320003h1.4592l-.1408.96000001h-1.4592L94.1328001 12h-1.0112l.384-2.52160004H91.752L91.368 12h-1.024zm1.5488-3.48160005h1.7536001l.3328-2.16320003H92.2256l-.3328 2.16320003z" id="#" fill={this.props.numberBar ? onTextColor : offTextColor}/>
        </g>
      </svg>
    );
  }
}

export default StenoboardDiagram;
