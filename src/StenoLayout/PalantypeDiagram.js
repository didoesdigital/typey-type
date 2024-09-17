import React, { Component } from "react";

let hidden = true;

const strokeColor = "#7109AA";
const onTextColor = "#fff";
// const offTextColor = "#fff";

let leftEOnColor = "#7109AA";
let leftOOnColor = "#7109AA";
let leftYOnColor = "#7109AA";
let leftLOnColor = "#7109AA";
let leftNOnColor = "#7109AA";
let leftROnColor = "#7109AA";
let leftFOnColor = "#7109AA";
let leftMOnColor = "#7109AA";
let leftPlusTwoOnColor = "#7109AA";
let leftPlusOneOnColor = "#7109AA";
let leftHOnColor = "#7109AA";
let leftTOnColor = "#7109AA";
let leftPOnColor = "#7109AA";
let leftSOnColor = "#7109AA";
let leftCOnColor = "#7109AA";
let rightSOnColor = "#7109AA";
let rightHOnColor = "#7109AA";
let rightPlusOnColor = "#7109AA";
let rightTOnColor = "#7109AA";
let rightPOnColor = "#7109AA";
let rightROnColor = "#7109AA";
let rightFOnColor = "#7109AA";
let rightMOnColor = "#7109AA";
let rightCOnColor = "#7109AA";
let rightLOnColor = "#7109AA";
let rightNOnColor = "#7109AA";
let rightCaretTwoOnColor = "#7109AA";
let rightCaretOneOnColor = "#7109AA";
let rightAOnColor = "#7109AA";
let rightUOnColor = "#7109AA";
let centerIOnColor = "#7109AA";

let leftEOffColor = "#e9d9f2";
let leftOOffColor = "#e9d9f2";
let leftYOffColor = "#e9d9f2";
let leftLOffColor = "#e9d9f2";
let leftNOffColor = "#e9d9f2";
let leftROffColor = "#e9d9f2";
let leftFOffColor = "#e9d9f2";
let leftMOffColor = "#e9d9f2";
let leftPlusTwoOffColor = "#e9d9f2";
let leftPlusOneOffColor = "#e9d9f2";
let leftHOffColor = "#e9d9f2";
let leftTOffColor = "#e9d9f2";
let leftPOffColor = "#e9d9f2";
let leftSOffColor = "#e9d9f2";
let leftCOffColor = "#e9d9f2";
let rightSOffColor = "#e9d9f2";
let rightHOffColor = "#e9d9f2";
let rightPlusOffColor = "#e9d9f2";
let rightTOffColor = "#e9d9f2";
let rightPOffColor = "#e9d9f2";
let rightROffColor = "#e9d9f2";
let rightFOffColor = "#e9d9f2";
let rightMOffColor = "#e9d9f2";
let rightCOffColor = "#e9d9f2";
let rightLOffColor = "#e9d9f2";
let rightNOffColor = "#e9d9f2";
let rightCaretTwoOffColor = "#e9d9f2";
let rightCaretOneOffColor = "#e9d9f2";
let rightAOffColor = "#e9d9f2";
let rightUOffColor = "#e9d9f2";
let centerIOffColor = "#e9d9f2";

class PalantypeDiagram extends Component {

  render() {

    let diagramWidth = this.props.diagramWidth || 140;
    let svgDiagramID = this.props.id || "stenoDiagram";

    return (
      <svg id={svgDiagramID} viewBox="0 0 334 180" width={diagramWidth} xmlns="http://www.w3.org/2000/svg" aria-hidden={hidden} className={this.props.classes}>
        <g id={"stenoboard-" + this.props.brief } transform="translate(1 1)" fill="none" fillRule="evenodd">
          <rect id="leftE" stroke={strokeColor} fill={this.props.leftE? leftEOnColor : leftEOffColor} fillRule="nonzero" transform="rotate(27.065 131.1907 146.10855)" x="117.290594" y="132.208444" width="27.800212" height="27.800212" rx="4"/>
          <path fill={onTextColor} id="E" transform="rotate(27 130.598 146.7)" d="M126.368 153v-12.6h8.082v2.034h-5.94v3.042h3.87v2.034h-3.87v3.456h6.318V153z"/>
          <rect id="leftO" stroke={strokeColor} fill={this.props.leftO? leftOOnColor : leftOOffColor} fillRule="nonzero" transform="rotate(27.065 145.3895 118.30335)" x="131.489394" y="104.403244" width="27.800212" height="27.800212" rx="4"/>
          <path fill={onTextColor} d="M145.544 125.216c-3.384 0-4.77-3.132-4.77-6.516s1.386-6.516 4.77-6.516c3.384 0 4.788 3.132 4.788 6.516s-1.404 6.516-4.788 6.516zm0-2.034c1.782 0 2.556-2.232 2.556-4.482 0-2.394-.756-4.482-2.556-4.482s-2.556 2.214-2.556 4.482c0 2.376.756 4.482 2.556 4.482z" id="OLeft" transform="rotate(27 145.553 118.7)"/>
          <rect id="leftY" stroke={strokeColor} fill={this.props.leftY? leftYOnColor : leftYOffColor} fillRule="nonzero" transform="rotate(27.065 117.30685 103.90805)" x="103.406744" y="90.007944" width="27.800212" height="27.800212" rx="4"/>
          <path fill={onTextColor} id="YLeft" transform="rotate(27 117.544 103.7)" d="M119.956 97.4h2.358l-3.708 7.668V110h-2.124v-4.932l-3.708-7.668h2.376l2.394 5.382z"/>
          <rect id="leftL" stroke={strokeColor} fill={this.props.leftL? leftLOnColor : leftLOffColor} fillRule="nonzero" transform="rotate(27.065 131.50575 76.10285)" x="117.605644" y="62.202744" width="27.800212" height="27.800212" rx="4"/>
          <path fill={onTextColor} id="LLeft" transform="rotate(27 131.346 76.7)" d="M127.368 83V70.4h2.142v10.548h5.814V83z"/>
          <rect id="leftN" stroke={strokeColor} fill={this.props.leftN? leftNOnColor : leftNOffColor} fillRule="nonzero" transform="rotate(27.065 145.70455 48.29765)" x="131.804444" y="34.397544" width="27.800212" height="27.800212" rx="4"/>
          <path fill={onTextColor} d="M142.368 54V41.4h2.034l3.924 7.776c.126.216.324.558.45.864-.018-.342-.036-.648-.036-.864V41.4h1.98V54h-1.944l-3.996-7.812c-.126-.216-.342-.594-.468-.864.054.27.054.63.054.864V54h-1.998z" id="NLeft" transform="rotate(27 146.544 47.7)"/>
          <rect id="leftR" stroke={strokeColor} fill={this.props.leftR? leftROnColor : leftROffColor} fillRule="nonzero" transform="rotate(27.065 95.50005 77.1997)" x="81.599944" y="63.299594" width="27.800212" height="27.800212" rx="4"/>
          <path fill={onTextColor} d="M99.846 75.216c0 1.548-.846 3.042-2.556 3.618L99.828 84h-2.376l-2.448-4.932H93.51V84h-2.142V71.4h4.356c3.114 0 4.122 1.836 4.122 3.816zm-6.336-1.8v3.636h2.25c1.44 0 1.89-.882 1.89-1.818 0-.846-.396-1.818-1.89-1.818h-2.25z" id="RLeft" transform="rotate(27 95.607 77.7)"/>
          <rect id="leftF" stroke={strokeColor} fill={this.props.leftF? leftFOnColor : leftFOffColor} fillRule="nonzero" transform="rotate(27.065 109.69895 49.3945)" x="95.798844" y="35.494394" width="27.800212" height="27.800212" rx="4"/>
          <path fill={onTextColor} id="FLeft" transform="rotate(27 110.616 49.7)" d="M106.368 56V43.4h8.496v2.034h-6.354v3.042h4.626v2.034h-4.626V56z"/>
          <rect id="leftM" stroke={strokeColor} fill={this.props.leftM? leftMOnColor : leftMOffColor} fillRule="nonzero" transform="rotate(27.065 123.89775 21.5893)" x="109.997644" y="7.68919401" width="27.800212" height="27.800212" rx="4"/>
          <path fill={onTextColor} d="M119.168 27.470518v-12.6h2.088l1.818 6.912c.108.396.252.918.306 1.242.036-.324.162-.846.306-1.242l1.872-6.912h1.962v12.6h-1.854v-6.84c0-.27 0-.792.036-1.044l-.342 1.044-1.926 6.84h-.18l-1.926-6.84-.342-1.044c.018.252.036.774.036 1.044v6.84h-1.854z" id="MLeft" transform="rotate(27 123.344 21.170518)"/>
          <rect id="leftPlusTwo" stroke={strokeColor} fill={this.props.leftPlusTwo? leftPlusTwoOnColor : leftPlusTwoOffColor} fillRule="nonzero" transform="rotate(27.065 89.165175 124.18505)" x="59.5149489" y="110.284944" width="59.3004522" height="27.800212" rx="4"/>
          <path fill={onTextColor} id="plusLeftTwo" transform="rotate(27 89.054179 124.261734)" d="M90.0981788 125.269734v3.222h-2.088v-3.222h-3.186v-2.016h3.186v-3.222h2.088v3.222h3.186v2.016z"/>
          <rect id="leftPlusOne" stroke={strokeColor} fill={this.props.leftPlusOne? leftPlusOneOnColor : leftPlusOneOffColor} fillRule="nonzero" transform="rotate(27.065 32.954375 95.4836)" x="3.30414892" y="81.583494" width="59.3004522" height="27.800212" rx="4"/>
          <path fill={onTextColor} id="plusLeftOne" transform="rotate(27 33.269932 95.62691)" d="M34.3139321 96.6349099v3.222h-2.088v-3.222h-3.186v-2.016h3.186v-3.222h2.088v3.222h3.186v2.016z"/>
          <rect id="leftH" stroke={strokeColor} fill={this.props.leftH? leftHOnColor : leftHOffColor} fillRule="nonzero" transform="rotate(27.065 61.09615 75.2066)" x="47.196044" y="61.306494" width="27.800212" height="27.800212" rx="4"/>
          <path fill={onTextColor} id="HLeft" transform="rotate(27 61.544 75.7)" d="M57.368 82V69.4h2.142v5.094h4.068V69.4h2.142V82h-2.142v-5.49H59.51V82z"/>
          <rect id="leftT" stroke={strokeColor} fill={this.props.leftT? leftTOnColor : leftTOffColor} fillRule="nonzero" transform="rotate(27.065 75.29495 47.4014)" x="61.394844" y="33.501294" width="27.800212" height="27.800212" rx="4"/>
          <path fill={onTextColor} id="TLeft" transform="rotate(27 75.544 47.7)" d="M74.464 54V43.452H70.81V41.4h9.468v2.052h-3.672V54z"/>
          <rect id="leftP" stroke={strokeColor} fill={this.props.leftP? leftPOnColor : leftPOffColor} fillRule="nonzero" transform="rotate(27.065 89.49385 19.5962)" x="75.593744" y="5.69609401" width="27.800212" height="27.800212" rx="4"/>
          <path fill={onTextColor} d="M85.368 26V13.4h4.446c3.132 0 4.212 1.98 4.212 3.906 0 1.8-1.188 3.906-4.212 3.906H87.51V26h-2.142zm2.142-6.804h2.412c1.404 0 1.926-.99 1.926-1.89 0-.81-.432-1.89-1.926-1.89H87.51v3.78z" id="PLeft" transform="rotate(27 89.697 19.7)"/>
          <rect id="leftS" stroke={strokeColor} fill={this.props.leftS? leftSOnColor : leftSOffColor} fillRule="nonzero" transform="rotate(27.065 33.0135 60.8113)" x="19.113394" y="46.911194" width="27.800212" height="27.800212" rx="4"/>
          <path fill={onTextColor} d="M33.4139321 67.0169099c-2.052 0-3.816-1.278-4.482-3.24l1.944-.72c.54 1.152 1.584 1.944 2.718 1.944 1.08 0 1.836-.558 1.836-1.674 0-.99-1.206-1.674-2.592-2.286-1.602-.702-3.456-1.584-3.456-3.726 0-1.818 1.512-3.33 3.888-3.33 1.89 0 3.348 1.152 3.798 2.682l-1.926.648c-.36-.738-1.044-1.314-1.998-1.314-.9 0-1.602.486-1.602 1.35 0 .882 1.134 1.296 2.412 1.89 1.566.72 3.636 1.782 3.636 4.032 0 2.394-1.944 3.744-4.176 3.744z" id="SLeft" transform="rotate(27 33.260932 60.50091)"/>
          <rect id="leftC" stroke={strokeColor} fill={this.props.leftC ? leftCOnColor : leftCOffColor} fillRule="nonzero" transform="rotate(27.065 47.2123 33.0061)" x="33.312194" y="19.105994" width="27.800212" height="27.800212" rx="4"/>
          <path fill={onTextColor} d="M47.76 40.198c-3.654 0-4.986-3.348-4.986-6.498 0-3.024 1.386-6.498 4.986-6.498 2.124 0 3.384 1.314 3.906 2.628l-1.908.918c-.486-.936-1.026-1.512-1.998-1.512-2.052 0-2.772 2.448-2.772 4.464 0 2.142.864 4.464 2.772 4.464.972 0 1.566-.666 2.016-1.62l1.944.738c-.684 1.674-1.926 2.916-3.96 2.916z" id="CLeft" transform="rotate(27 47.247 33.7)"/>
          <g id="center" transform="translate(139 113)">
            <path d="M28.0754993 1.98460897L51.2617001 51.8954669c.4636757.9981131.0338163 2.1832977-.9619001 2.6520981L28.1493773 64.9763632c-1.1050817.5202914-2.3873232.5071558-3.4815141-.0356655L2.59454864 53.9902644c-.98949825-.4908839-1.39370504-1.6909708-.90282115-2.680469a1.99442738 1.99442738 0 0 1 .00144163-.0029001L26.273481 1.96005713c.2462428-.49435103.8466127-.69548251 1.3409637-.44923973.2029539.10109404.3655274.26815873.4610546.47379157z" id="centerI" stroke={strokeColor} fill={this.props.centerI? centerIOnColor : centerIOffColor} fillRule="nonzero"/>
            <path fill={onTextColor} id="Icenter" d="M30.252 36.29h-2.646v8.82h2.646V47h-7.416v-1.89h2.628v-8.82h-2.628V34.4h7.416z"/>
          </g>
          <g id="base-layout-right" transform="translate(168 4)">
            <rect id="rightS" stroke={strokeColor} fill={this.props.rightS? rightSOnColor : rightSOffColor} fillRule="nonzero" transform="rotate(155.298 133.83912 62.0855)" x="119.939032" y="48.185412" width="27.800176" height="27.800176" rx="4"/>
            <path fill={onTextColor} d="M133.688 68.216c-2.052 0-3.816-1.278-4.482-3.24l1.944-.72c.54 1.152 1.584 1.944 2.718 1.944 1.08 0 1.836-.558 1.836-1.674 0-.99-1.206-1.674-2.592-2.286-1.602-.702-3.456-1.584-3.456-3.726 0-1.818 1.512-3.33 3.888-3.33 1.89 0 3.348 1.152 3.798 2.682l-1.926.648c-.36-.738-1.044-1.314-1.998-1.314-.9 0-1.602.486-1.602 1.35 0 .882 1.134 1.296 2.412 1.89 1.566.72 3.636 1.782 3.636 4.032 0 2.394-1.944 3.744-4.176 3.744z" id="SRight" transform="rotate(-25 133.535 61.7)"/>
            <rect id="rightH" stroke={strokeColor} fill={this.props.rightH? rightHOnColor : rightHOffColor} fillRule="nonzero" transform="rotate(155.298 120.85143 33.73141)" x="106.951342" y="19.831322" width="27.800176" height="27.800176" rx="4"/>
            <path fill={onTextColor} id="HRight" transform="rotate(-25 120.544 33.7)" d="M116.368 40V27.4h2.142v5.094h4.068V27.4h2.142V40h-2.142v-5.49h-4.068V40z"/>
            <rect id="rightPlus" stroke={strokeColor} fill={this.props.rightPlus? rightPlusOnColor : rightPlusOffColor} fillRule="nonzero" transform="rotate(155.298 105.23908 75.33932)" x="91.338992" y="61.439232" width="27.800176" height="27.800176" rx="4"/>
            <path fill={onTextColor} id="PlusRight" transform="rotate(-25 105.544 74.826)" d="M106.588 75.834v3.222H104.5v-3.222h-3.186v-2.016h3.186v-3.222h2.088v3.222h3.186v2.016z"/>
            <rect id="rightT" stroke={strokeColor} fill={this.props.rightT? rightTOnColor : rightTOffColor} fillRule="nonzero" transform="rotate(155.298 92.2097 46.89438)" x="78.309612" y="32.994292" width="27.800176" height="27.800176" rx="4"/>
            <path fill={onTextColor} id="TRightTwo" transform="rotate(-25 92.544 46.7)" d="M91.464 53V42.452H87.81V40.4h9.468v2.052h-3.672V53z"/>
            <rect id="rightP" stroke={strokeColor} fill={this.props.rightP? rightPOnColor : rightPOffColor} fillRule="nonzero" transform="rotate(155.298 79.13106 18.58208)" x="65.230972" y="4.68199201" width="27.800176" height="27.800176" rx="4"/>
            <path fill={onTextColor} d="M75.368 25V12.4h4.446c3.132 0 4.212 1.98 4.212 3.906 0 1.8-1.188 3.906-4.212 3.906H77.51V25h-2.142zm2.142-6.804h2.412c1.404 0 1.926-.99 1.926-1.89 0-.81-.432-1.89-1.926-1.89H77.51v3.78z" id="PRight" transform="rotate(-25 79.697 18.7)"/>
            <rect id="rightR" stroke={strokeColor} fill={this.props.rightR? rightROnColor : rightROffColor} fillRule="nonzero" transform="rotate(155.298 70.79679 75.89127)" x="56.896702" y="61.991182" width="27.800176" height="27.800176" rx="4"/>
            <path fill={onTextColor} d="M74.596 73.366c0 1.548-.846 3.042-2.556 3.618l2.538 5.166h-2.376l-2.448-4.932H68.26v4.932h-2.142v-12.6h4.356c3.114 0 4.122 1.836 4.122 3.816zm-6.336-1.8v3.636h2.25c1.44 0 1.89-.882 1.89-1.818 0-.846-.396-1.818-1.89-1.818h-2.25z" id="RRight" transform="rotate(-25 70.357 75.85)"/>
            <rect id="rightF" stroke={strokeColor} fill={this.props.rightF? rightFOnColor : rightFOffColor} fillRule="nonzero" transform="rotate(155.298 57.67646 47.48812)" x="43.776372" y="33.588032" width="27.800176" height="27.800176" rx="4"/>
            <path fill={onTextColor} id="FRight" transform="rotate(-25 57.716 47.35)" d="M53.468 53.65v-12.6h8.496v2.034H55.61v3.042h4.626v2.034H55.61v5.49z"/>
            <rect id="rightM" stroke={strokeColor} fill={this.props.rightM? rightMOnColor : rightMOffColor} fillRule="nonzero" transform="rotate(155.298 44.68877 19.13403)" x="30.788682" y="5.23394201" width="27.800176" height="27.800176" rx="4"/>
            <path fill={onTextColor} d="M40.6659567 25.4582491v-12.6h2.088l1.818 6.912c.108.396.252.918.306 1.242.036-.324.162-.846.306-1.242l1.872-6.912h1.962v12.6h-1.854v-6.84c0-.27 0-.792.036-1.044l-.342 1.044-1.926 6.84h-.18l-1.926-6.84-.342-1.044c.018.252.036.774.036 1.044v6.84h-1.854z" id="MRight" transform="rotate(-25 44.841957 19.158249)"/>
            <rect id="rightC" stroke={strokeColor} fill={this.props.rightC? rightCOnColor : rightCOffColor} fillRule="nonzero" transform="rotate(155.298 47.86477 101.70705)" x="33.964682" y="87.806962" width="27.800176" height="27.800176" rx="4"/>
            <path fill={onTextColor} d="M48.2515667 108.656249c-3.654 0-4.986-3.348-4.986-6.498 0-3.0239999 1.386-6.4979999 4.986-6.4979999 2.124 0 3.384 1.314 3.906 2.628l-1.908.918c-.486-.936-1.026-1.512-1.998-1.512-2.052 0-2.772 2.4479999-2.772 4.4639999 0 2.142.864 4.464 2.772 4.464.972 0 1.566-.666 2.016-1.62l1.944.738c-.684 1.674-1.926 2.916-3.96 2.916z" id="CRight" transform="rotate(-25 47.738567 102.158249)"/>
            <rect id="rightL" stroke={strokeColor} fill={this.props.rightL? rightLOnColor : rightLOffColor} fillRule="nonzero" transform="rotate(155.298 34.83519 73.26211)" x="20.935102" y="59.362022" width="27.800176" height="27.800176" rx="4"/>
            <path fill={onTextColor} id="LRight" transform="rotate(-25 35.697811 73.46211)" d="M31.5218107 79.76211v-12.6h2.142v10.548h5.814v2.052z"/>
            <rect id="rightN" stroke={strokeColor} fill={this.props.rightN? rightNOnColor : rightNOffColor} fillRule="nonzero" transform="rotate(155.298 21.75665 44.94991)" x="7.85656201" y="31.049822" width="27.800176" height="27.800176" rx="4"/>
            <path fill={onTextColor} d="M17.3715233 51.45v-12.6h2.034l3.924 7.776c.126.216.324.558.45.864-.018-.342-.036-.648-.036-.864V38.85h1.98v12.6h-1.944l-3.996-7.812c-.126-.216-.342-.594-.468-.864.054.27.054.63.054.864v7.812h-1.998z" id="NRight" transform="rotate(-25 21.547523 45.15)"/>
            <rect id="rightCaretTwo" stroke={strokeColor} fill={this.props.rightCaretTwo? rightCaretTwoOnColor : rightCaretTwoOffColor} fillRule="nonzero" transform="rotate(155.298 132.524655 96.701455)" x="102.874467" y="82.801367" width="59.3003754" height="27.800176" rx="4"/>
            <path fill={onTextColor} id="CaretRightTwo" transform="rotate(-25 132.4625 96.428911)" d="M134.8205 99.7229109l-2.358-3.924-2.358 3.924h-2.142l3.672-6.588h1.656l3.672 6.588z"/>
            <rect id="rightCaretOne" stroke={strokeColor} fill={this.props.rightCaretOne? rightCaretOneOnColor : rightCaretOneOffColor} fillRule="nonzero" transform="rotate(155.298 75.150245 123.069185)" x="45.5000573" y="109.169097" width="59.3003754" height="27.800176" rx="4"/>
            <path fill={onTextColor} id="CaretRightOne" transform="rotate(-25 75.742 122.478)" d="M78.1 125.772l-2.358-3.924-2.358 3.924h-2.142l3.672-6.588h1.656l3.672 6.588z"/>
            <rect id="rightA" stroke={strokeColor} fill={this.props.rightA? rightAOnColor : rightAOffColor} fillRule="nonzero" transform="rotate(155.298 19.22294 114.87002)" x="5.32285201" y="100.969932" width="27.800176" height="27.800176" rx="4"/>
            <path fill={onTextColor} d="M21.37 121l-.828-2.772h-3.996L15.718 121h-2.304l4.122-12.6h2.016l4.122 12.6H21.37zm-4.248-4.716h2.844l-1.116-3.744c-.09-.288-.234-.936-.306-1.404-.09.468-.216 1.116-.306 1.404l-1.116 3.744z" id="ARight" transform="rotate(-25 18.544 114.7)"/>
            <rect id="rightU" stroke={strokeColor} fill={this.props.rightU? rightUOnColor : rightUOffColor} fillRule="nonzero" transform="rotate(155.298 32.30148 143.18232)" x="18.401392" y="129.282232" width="27.800176" height="27.800176" rx="4"/>
            <path fill={onTextColor} d="M31.8419567 149.674249c-2.268 0-4.248-1.278-4.248-5.022v-7.794h2.124v7.794c0 2.322.9 2.988 2.124 2.988 1.206 0 2.124-.666 2.124-2.988v-7.794h2.142v7.794c0 3.69-1.962 5.022-4.266 5.022z" id="URight" transform="rotate(-25 31.850957 143.266249)"/>
          </g>
        </g>
      </svg>
    );
  }
}

export default PalantypeDiagram;
