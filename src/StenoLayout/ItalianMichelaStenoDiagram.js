import React, { Component } from "react";

let hidden = true;
let sRightLowercaseStrokeColor = "#7109AA";
let sRightLowercaseOnColor = "#FFFFFF";
let sRightLowercaseOffColor = "#E9D9F2";
let cRightLowercaseStrokeColor = "#7109AA";
let cRightLowercaseOnColor = "#FFFFFF";
let cRightLowercaseOffColor = "#E9D9F2";
let pRightLowercaseStrokeColor = "#7109AA";
let pRightLowercaseOnColor = "#FFFFFF";
let pRightLowercaseOffColor = "#E9D9F2";
let aRightLowercaseStrokeColor = "#7109AA";
let aRightLowercaseOnColor = "#FFFFFF";
let aRightLowercaseOffColor = "#E9D9F2";
let iRightLowercaseStrokeColor = "#7109AA";
let iRightLowercaseOnColor = "#FFFFFF";
let iRightLowercaseOffColor = "#E9D9F2";
let uRightLowercaseStrokeColor = "#7109AA";
let uRightLowercaseOnColor = "#FFFFFF";
let uRightLowercaseOffColor = "#E9D9F2";
let fRightLowercaseStrokeColor = "#7109AA";
let fRightLowercaseOnColor = "#7109AA";
let fRightLowercaseOffColor = "#E9D9F2";
let zRightLowercaseStrokeColor = "#7109AA";
let zRightLowercaseOnColor = "#7109AA";
let zRightLowercaseOffColor = "#E9D9F2";
let nRightLowercaseStrokeColor = "#7109AA";
let nRightLowercaseOnColor = "#7109AA";
let nRightLowercaseOffColor = "#E9D9F2";
let eRightLowercaseStrokeColor = "#7109AA";
let eRightLowercaseOnColor = "#7109AA";
let eRightLowercaseOffColor = "#E9D9F2";
let leftCapitalUStrokeColor = "#7109AA";
let leftCapitalUOnColor = "#FFFFFF";
let leftCapitalUOffColor = "#E9D9F2";
let leftCapitalIStrokeColor = "#7109AA";
let leftCapitalIOnColor = "#FFFFFF";
let leftCapitalIOffColor = "#E9D9F2";
let leftCapitalRStrokeColor = "#7109AA";
let leftCapitalROnColor = "#FFFFFF";
let leftCapitalROffColor = "#E9D9F2";
let leftCapitalPStrokeColor = "#7109AA";
let leftCapitalPOnColor = "#FFFFFF";
let leftCapitalPOffColor = "#E9D9F2";
let leftCapitalCStrokeColor = "#7109AA";
let leftCapitalCOnColor = "#FFFFFF";
let leftCapitalCOffColor = "#E9D9F2";
let leftCapitalSStrokeColor = "#7109AA";
let leftCapitalSOnColor = "#FFFFFF";
let leftCapitalSOffColor = "#E9D9F2";
let leftCapitalXStrokeColor = "#7109AA";
let leftCapitalXOnColor = "#7109AA";
let leftCapitalXOffColor = "#E9D9F2";
let leftCapitalNStrokeColor = "#7109AA";
let leftCapitalNOnColor = "#7109AA";
let leftCapitalNOffColor = "#E9D9F2";
let leftCapitalZStrokeColor = "#7109AA";
let leftCapitalZOnColor = "#7109AA";
let leftCapitalZOffColor = "#E9D9F2";
let leftCapitalFStrokeColor = "#7109AA";
let leftCapitalFOnColor = "#7109AA";
let leftCapitalFOffColor = "#E9D9F2";
let fRightLowercaseLetterOnColor = "#FFFFFF";
let fRightLowercaseLetterOffColor = "#E9D9F2";
let sRightLowercaseLetterOnColor = "#7109AA";
let sRightLowercaseLetterOffColor = "#E9D9F2";
let cRightLowercaseLetterOnColor = "#7109AA";
let cRightLowercaseLetterOffColor = "#E9D9F2";
let zRightLowercaseLetterOnColor = "#FFFFFF";
let zRightLowercaseLetterOffColor = "#E9D9F2";
let pRightLowercaseLetterOnColor = "#7109AA";
let pRightLowercaseLetterOffColor = "#E9D9F2";
let nRightLowercaseLetterOnColor = "#FFFFFF";
let nRightLowercaseLetterOffColor = "#E9D9F2";
let aRightLowercaseLetterOnColor = "#7109AA";
let aRightLowercaseLetterOffColor = "#E9D9F2";
let eRightLowercaseLetterOnColor = "#FFFFFF";
let eRightLowercaseLetterOffColor = "#E9D9F2";
let iRightLowercaseLetterOnColor = "#7109AA";
let iRightLowercaseLetterOffColor = "#E9D9F2";
let uRightLowercaseLetterOnColor = "#7109AA";
let uRightLowercaseLetterOffColor = "#E9D9F2";
let leftCapitalULetterOnColor = "#7109AA";
let leftCapitalULetterOffColor = "#E9D9F2";
let leftCapitalILetterOnColor = "#7109AA";
let leftCapitalILetterOffColor = "#E9D9F2";
let leftCapitalXLetterOnColor = "#FFFFFF";
let leftCapitalXLetterOffColor = "#E9D9F2";
let leftCapitalRLetterOnColor = "#7109AA";
let leftCapitalRLetterOffColor = "#E9D9F2";
let leftCapitalNLetterOnColor = "#FFFFFF";
let leftCapitalNLetterOffColor = "#E9D9F2";
let leftCapitalPLetterOnColor = "#7109AA";
let leftCapitalPLetterOffColor = "#E9D9F2";
let leftCapitalZLetterOnColor = "#FFFFFF";
let leftCapitalZLetterOffColor = "#E9D9F2";
let leftCapitalCLetterOnColor = "#7109AA";
let leftCapitalCLetterOffColor = "#E9D9F2";
let leftCapitalSLetterOnColor = "#7109AA";
let leftCapitalSLetterOffColor = "#E9D9F2";
let leftCapitalFLetterOnColor = "#FFFFFF";
let leftCapitalFLetterOffColor = "#E9D9F2";
class ItalianMichelaStenoDiagram extends Component {
  render() {
    let diagramWidth = this.props.diagramWidth || 160;
    let svgDiagramID = this.props.id || "stenoDiagram";

    // NOTE: we have not handled dark mode for this diagram because there are overlapping elements
    return (
      <svg id={svgDiagramID} width={diagramWidth} viewBox="0 0 258 99" xmlns="http://www.w3.org/2000/svg" aria-hidden={hidden} className={this.props.classes}>
        <g id={"stenoboard-" + this.props.brief } fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
          <rect height="96" id="sRightLowercase" width="20" fill={this.props.sRightLowercase ? sRightLowercaseOnColor : sRightLowercaseOffColor} fillRule="nonzero" rx="2" stroke={sRightLowercaseStrokeColor} x="237" y="2"/>
          <rect height="96" id="cRightLowercase" width="20" fill={this.props.cRightLowercase ? cRightLowercaseOnColor : cRightLowercaseOffColor} fillRule="nonzero" rx="2" stroke={cRightLowercaseStrokeColor} x="217" y="2"/>
          <rect height="96" id="pRightLowercase" width="20" fill={this.props.pRightLowercase ? pRightLowercaseOnColor : pRightLowercaseOffColor} fillRule="nonzero" rx="2" stroke={pRightLowercaseStrokeColor} x="197" y="2"/>
          <rect height="96" id="aRightLowercase" width="20" fill={this.props.aRightLowercase ? aRightLowercaseOnColor : aRightLowercaseOffColor} fillRule="nonzero" rx="2" stroke={aRightLowercaseStrokeColor} x="177" y="2"/>
          <rect height="96" id="iRightLowercase" width="20" fill={this.props.iRightLowercase ? iRightLowercaseOnColor : iRightLowercaseOffColor} fillRule="nonzero" rx="2" stroke={iRightLowercaseStrokeColor} x="157" y="2"/>
          <rect height="96" id="uRightLowercase" width="20" fill={this.props.uRightLowercase ? uRightLowercaseOnColor : uRightLowercaseOffColor} fillRule="nonzero" rx="2" stroke={uRightLowercaseStrokeColor} x="137" y="2"/>
          <rect height="72" id="fRightLowercase" width="10" fill={this.props.fRightLowercase ? fRightLowercaseOnColor : fRightLowercaseOffColor} fillRule="nonzero" rx="2" stroke={fRightLowercaseStrokeColor} x="247" y="2"/>
          <rect height="60" id="zRightLowercase" width="10" fill={this.props.zRightLowercase ? zRightLowercaseOnColor : zRightLowercaseOffColor} fillRule="nonzero" rx="2" stroke={zRightLowercaseStrokeColor} x="213" y="2"/>
          <rect height="60" id="nRightLowercase" width="10" fill={this.props.nRightLowercase ? nRightLowercaseOnColor : nRightLowercaseOffColor} fillRule="nonzero" rx="2" stroke={nRightLowercaseStrokeColor} x="193" y="2"/>
          <rect height="60" id="eRightLowercase" width="10" fill={this.props.eRightLowercase ? eRightLowercaseOnColor : eRightLowercaseOffColor} fillRule="nonzero" rx="2" stroke={eRightLowercaseStrokeColor} x="173" y="2"/>
          <rect height="96" id="leftCapitalU" width="20" fill={this.props.leftCapitalU ? leftCapitalUOnColor : leftCapitalUOffColor} fillRule="nonzero" rx="2" stroke={leftCapitalUStrokeColor} x="101" y="2"/>
          <rect height="96" id="leftCapitalI" width="20" fill={this.props.leftCapitalI ? leftCapitalIOnColor : leftCapitalIOffColor} fillRule="nonzero" rx="2" stroke={leftCapitalIStrokeColor} x="81" y="2"/>
          <rect height="96" id="leftCapitalR" width="20" fill={this.props.leftCapitalR ? leftCapitalROnColor : leftCapitalROffColor} fillRule="nonzero" rx="2" stroke={leftCapitalRStrokeColor} x="61" y="2"/>
          <rect height="96" id="leftCapitalP" width="20" fill={this.props.leftCapitalP ? leftCapitalPOnColor : leftCapitalPOffColor} fillRule="nonzero" rx="2" stroke={leftCapitalPStrokeColor} x="41" y="2"/>
          <rect height="96" id="leftCapitalC" width="20" fill={this.props.leftCapitalC ? leftCapitalCOnColor : leftCapitalCOffColor} fillRule="nonzero" rx="2" stroke={leftCapitalCStrokeColor} x="21" y="2"/>
          <rect height="96" id="leftCapitalS" width="20" fill={this.props.leftCapitalS ? leftCapitalSOnColor : leftCapitalSOffColor} fillRule="nonzero" rx="2" stroke={leftCapitalSStrokeColor} x="1" y="2"/>
          <rect height="60" id="leftCapitalX" width="10" fill={this.props.leftCapitalX ? leftCapitalXOnColor : leftCapitalXOffColor} fillRule="nonzero" rx="2" stroke={leftCapitalXStrokeColor} x="75" y="2"/>
          <rect height="60" id="leftCapitalN" width="10" fill={this.props.leftCapitalN ? leftCapitalNOnColor : leftCapitalNOffColor} fillRule="nonzero" rx="2" stroke={leftCapitalNStrokeColor} x="55" y="2"/>
          <rect height="60" id="leftCapitalZ" width="10" fill={this.props.leftCapitalZ ? leftCapitalZOnColor : leftCapitalZOffColor} fillRule="nonzero" rx="2" stroke={leftCapitalZStrokeColor} x="35" y="2"/>
          <rect height="72" id="leftCapitalF" width="10" fill={this.props.leftCapitalF ? leftCapitalFOnColor : leftCapitalFOffColor} fillRule="nonzero" rx="2" stroke={leftCapitalFStrokeColor} x="1" y="2"/>
          <path id="fRightLowercaseLetter" d="M253.864 48.24q-.592 0-.976.208t-.384.608v.768h2.752v1.616h-2.752v4.944h2.176V58h-5.776v-1.616h1.76V51.44h-1.76v-1.616h1.76v-1.12q0-1.153.824-1.624.825-.472 1.976-.472 1.169 0 1.952.4v1.52a4 4 0 0 0-1.552-.288" fill={this.props.fRightLowercase ? fRightLowercaseLetterOnColor : fRightLowercaseLetterOffColor}/>
          <path id="sRightLowercaseLetter" d="M246.976 93.192q-1.04 0-1.92-.392t-1.408-1.064l1.2-1.088q1.008.975 2.224.976.592 0 .976-.208t.384-.624q0-.24-.232-.456a2.1 2.1 0 0 0-.536-.36 18 18 0 0 0-.896-.384 1.5 1.5 0 0 0-.208-.088l-.112-.04q-.592-.255-.88-.392a8 8 0 0 1-.696-.384q-.409-.248-.592-.472a2.3 2.3 0 0 1-.328-.568 2 2 0 0 1-.144-.776q0-1.04.896-1.64t2.256-.6q1.905 0 3.056 1.296l-1.232 1.008q-.88-.736-1.888-.736-.624 0-1 .184-.375.184-.376.52 0 .16.128.312t.448.32.528.256.704.28q1.472.593 1.952.96.847.672.864 1.744 0 1.136-.856 1.776-.855.64-2.312.64" fill={this.props.sRightLowercase ? sRightLowercaseLetterOnColor : sRightLowercaseLetterOffColor}/>
          <path id="cRightLowercaseLetter" d="M227.088 93.192q-1.728 0-2.736-1.136t-1.008-3.136q0-1.984 1.032-3.136t2.744-1.152q2.608 0 3.36 2.224l-1.744.592q-.415-1.072-1.6-1.072-.912 0-1.416.688t-.504 1.856.504 1.84 1.384.672q1.28 0 1.68-1.2l1.744.544q-.735 2.415-3.44 2.416" fill={this.props.cRightLowercase ? cRightLowercaseLetterOnColor : cRightLowercaseLetterOffColor}/>
          <path id="zRightLowercaseLetter" d="M214.568 58v-1.392l4.368-5.136h-4.064v-1.648h6.416v1.36l-4.368 5.168h4.352V58z" fill={this.props.zRightLowercase ? zRightLowercaseLetterOnColor : zRightLowercaseLetterOffColor}/>
          <path id="pRightLowercaseLetter" d="M203.408 96.216V84.824h1.84v.624q.752-.816 2-.816 1.648 0 2.616 1.136t.968 3.152q0 1.968-1 3.12t-2.568 1.152q-1.28 0-2.016-.848v3.024zm3.584-4.784q.944 0 1.464-.648t.52-1.864q0-1.168-.52-1.856t-1.48-.688q-1.152 0-1.728.816v3.424q.576.816 1.744.816" fill={this.props.pRightLowercase ? pRightLowercaseLetterOnColor : pRightLowercaseLetterOffColor}/>
          <path id="nRightLowercaseLetter" d="M198.504 49.632q1.344 0 2.184.808.84.809.84 2.568V58h-1.84v-4.608q0-1.056-.464-1.536t-1.232-.48q-1.808 0-1.808 1.984V58h-1.84v-8.176h1.696v1.008q.24-.48.936-.84t1.528-.36" fill={this.props.nRightLowercase ? nRightLowercaseLetterOnColor : nRightLowercaseLetterOffColor}/>
          <path id="aRightLowercaseLetter" d="M186.304 93.192q-1.344 0-2.184-.704t-.84-2.016q0-1.328.96-2.016t2.304-.688q1.168 0 2.032.432v-.48q0-1.472-1.616-1.472-1.344 0-2.592.832l-.56-1.504q1.488-.945 3.312-.944 3.248 0 3.248 3.072V93h-1.792v-.64q-.864.832-2.272.832m.336-1.616q1.152 0 1.936-.816v-1.056q-.736-.368-1.744-.368-.768 0-1.272.288t-.504.848q0 .495.416.8.416.304 1.168.304" fill={this.props.aRightLowercase ? aRightLowercaseLetterOnColor : aRightLowercaseLetterOffColor}/>
          <path id="eRightLowercaseLetter" d="M181.656 53.504q0 .705-.064 1.12h-5.568q.176.896.712 1.416t1.384.52q1.072 0 1.808-.8l1.104 1.168q-1.152 1.264-2.928 1.264-1.808 0-2.856-1.168-1.048-1.169-1.048-3.12 0-1.984 1.056-3.128t2.848-1.144q1.568 0 2.56.984t.992 2.888m-5.648-.448h3.84q-.08-.896-.568-1.352a1.66 1.66 0 0 0-1.176-.456q-.88 0-1.416.48t-.68 1.328" fill={this.props.eRightLowercase ? eRightLowercaseLetterOnColor : eRightLowercaseLetterOffColor}/>
          <path id="iRightLowercaseLetter" d="M166.992 83.688q-.448 0-.768-.32a1.07 1.07 0 0 1-.32-.784q0-.465.32-.776.32-.312.768-.312.464 0 .784.312t.32.776-.32.784-.784.32m.928 7.696h2.256V93h-6.352v-1.616h2.256V86.44h-2.256v-1.616h4.096z" fill={this.props.iRightLowercase ? iRightLowercaseLetterOnColor : iRightLowercaseLetterOffColor}/>
          <path id="uRightLowercaseLetter" d="M146.384 93.192q-1.36 0-2.2-.808t-.84-2.584v-4.976h1.84V89.4q0 2.032 1.68 2.032 1.808 0 1.808-2v-4.608h1.84V93h-1.84v-.784q-.784.975-2.288.976" fill={this.props.uRightLowercase ? uRightLowercaseLetterOnColor : uRightLowercaseLetterOffColor}/>
          <path id="leftCapitalULetter" d="M110.928 93.192q-1.665 0-2.72-1.064t-1.056-3.4V81.8h1.888v6.928q0 1.456.496 2.056t1.392.6q1.888 0 1.888-2.656V81.8h1.904v6.928q0 2.304-1.056 3.384t-2.736 1.08" fill={this.props.leftCapitalU ? leftCapitalULetterOnColor : leftCapitalULetterOffColor}/>
          <path id="leftCapitalILetter" d="M94.224 83.48h-2.352v7.84h2.352V93h-6.592v-1.68h2.336v-7.84h-2.336V81.8h6.592z" fill={this.props.leftCapitalI ? leftCapitalILetterOnColor : leftCapitalILetterOffColor}/>
          <path id="leftCapitalXLetter" d="M84.28 58h-2.192l-2.176-4-2.144 4h-2.192l3.328-5.792L75.8 46.8h2.192l1.936 3.584 1.92-3.584h2.192l-3.104 5.376z" fill={this.props.leftCapitalX ? leftCapitalXLetterOnColor : leftCapitalXLetterOffColor}/>
          <path id="leftCapitalRLetter" d="M74.752 85.192a3.5 3.5 0 0 1-.584 1.968q-.585.88-1.688 1.248L74.736 93h-2.112l-2.176-4.384H69.12V93h-1.904V81.8h3.872q.992 0 1.728.28t1.144.768.6 1.072.192 1.272m-5.632-1.6v3.232h2q.896 0 1.288-.456t.392-1.16q0-.672-.384-1.144t-1.296-.472z" fill={this.props.leftCapitalR ? leftCapitalRLetterOnColor : leftCapitalRLetterOffColor}/>
          <path id="leftCapitalNLetter" d="M56.216 58V46.8h1.808l3.488 6.912q.288.496.4.768a20 20 0 0 1-.032-.768V46.8h1.76V58h-1.728l-3.552-6.944a11 11 0 0 1-.416-.768q.048.24.048.768V58z" fill={this.props.leftCapitalN ? leftCapitalNLetterOnColor : leftCapitalNLetterOffColor}/>
          <path id="leftCapitalPLetter" d="M47.216 93V81.8h3.952q1.935 0 2.84 1.008t.904 2.464q0 1.375-.944 2.424-.945 1.048-2.8 1.048H49.12V93zm1.904-6.048h2.144q.864 0 1.288-.496.424-.495.424-1.184 0-.656-.408-1.168t-1.304-.512H49.12z" fill={this.props.leftCapitalP ? leftCapitalPLetterOnColor : leftCapitalPLetterOffColor}/>
          <path id="leftCapitalZLetter" d="M43.72 46.8v1.44l-5.104 7.952h5.088V58h-7.552v-1.44l5.072-7.968h-4.72V46.8z" fill={this.props.leftCapitalZ ? leftCapitalZLetterOnColor : leftCapitalZLetterOffColor}/>
          <path id="leftCapitalCLetter" d="M31.12 93.176a4.2 4.2 0 0 1-1.704-.336 3.7 3.7 0 0 1-1.264-.888 4.8 4.8 0 0 1-.84-1.312 6.8 6.8 0 0 1-.48-1.568 9.5 9.5 0 0 1-.144-1.672q0-1.056.248-2.04.248-.985.76-1.84t1.392-1.376 2.032-.52q1.312 0 2.192.672a3.9 3.9 0 0 1 1.28 1.664l-1.696.816q-.352-.672-.76-1.008-.407-.336-1.016-.336-.864 0-1.44.64-.575.64-.8 1.496a7.2 7.2 0 0 0-.224 1.832q0 1.584.64 2.776t1.824 1.192q1.12 0 1.792-1.44l1.728.656q-1.056 2.592-3.52 2.592" fill={this.props.leftCapitalC ? leftCapitalCLetterOnColor : leftCapitalCLetterOffColor}/>
          <path id="leftCapitalSLetter" d="M11.056 93.192a4.1 4.1 0 0 1-2.448-.784 4.18 4.18 0 0 1-1.536-2.096l1.728-.64q.368.784 1.016 1.256a2.33 2.33 0 0 0 1.4.472q.735 0 1.184-.384t.448-1.104q0-.607-.608-1.08-.607-.472-1.696-.952a16 16 0 0 1-1.104-.528 7 7 0 0 1-.936-.624 2.56 2.56 0 0 1-.776-.944 2.8 2.8 0 0 1-.256-1.216q0-1.248.952-2.104.953-.855 2.504-.856 1.232 0 2.152.672t1.224 1.712l-1.712.576q-.576-1.168-1.776-1.168-.624 0-1.024.32t-.4.88q0 .128.032.248t.112.224.152.192.224.192.256.168.312.168.32.152.368.168.368.168q.672.304 1.12.568t.992.696q.544.433.832 1.024.288.593.288 1.296 0 1.536-1.08 2.432t-2.632.896" fill={this.props.leftCapitalS ? leftCapitalSLetterOnColor : leftCapitalSLetterOffColor}/>
          <path id="leftCapitalFLetter" d="M2.216 58V46.8h7.552v1.808H4.12v2.704h4.112v1.808H4.12V58z" fill={this.props.leftCapitalF ? leftCapitalFLetterOnColor : leftCapitalFLetterOffColor}/>
        </g>
      </svg>
    );
  }
}

export default ItalianMichelaStenoDiagram;
