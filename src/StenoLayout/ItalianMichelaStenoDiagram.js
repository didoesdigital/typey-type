import React, { Component } from 'react';

class ItalianMichelaStenoDiagram extends Component {
  render() {

    let hidden = true;
    let sRightLowercaseStrokeColor = '#7109AA';
    let sRightLowercaseOnColor = '#FFFFFF';
    let sRightLowercaseOffColor = '#E9D9F2';
    let cRightLowercaseStrokeColor = '#7109AA';
    let cRightLowercaseOnColor = '#FFFFFF';
    let cRightLowercaseOffColor = '#E9D9F2';
    let pRightLowercaseStrokeColor = '#7109AA';
    let pRightLowercaseOnColor = '#FFFFFF';
    let pRightLowercaseOffColor = '#E9D9F2';
    let aRightLowercaseStrokeColor = '#7109AA';
    let aRightLowercaseOnColor = '#FFFFFF';
    let aRightLowercaseOffColor = '#E9D9F2';
    let iRightLowercaseStrokeColor = '#7109AA';
    let iRightLowercaseOnColor = '#FFFFFF';
    let iRightLowercaseOffColor = '#E9D9F2';
    let uRightLowercaseStrokeColor = '#7109AA';
    let uRightLowercaseOnColor = '#FFFFFF';
    let uRightLowercaseOffColor = '#E9D9F2';
    let fRightLowercaseStrokeColor = '#7109AA';
    let fRightLowercaseOnColor = '#7109AA';
    let fRightLowercaseOffColor = '#E9D9F2';
    let zRightLowercaseStrokeColor = '#7109AA';
    let zRightLowercaseOnColor = '#7109AA';
    let zRightLowercaseOffColor = '#E9D9F2';
    let nRightLowercaseStrokeColor = '#7109AA';
    let nRightLowercaseOnColor = '#7109AA';
    let nRightLowercaseOffColor = '#E9D9F2';
    let eRightLowercaseStrokeColor = '#7109AA';
    let eRightLowercaseOnColor = '#7109AA';
    let eRightLowercaseOffColor = '#E9D9F2';
    let leftCapitalUStrokeColor = '#7109AA';
    let leftCapitalUOnColor = '#FFFFFF';
    let leftCapitalUOffColor = '#E9D9F2';
    let leftCapitalIStrokeColor = '#7109AA';
    let leftCapitalIOnColor = '#FFFFFF';
    let leftCapitalIOffColor = '#E9D9F2';
    let leftCapitalRStrokeColor = '#7109AA';
    let leftCapitalROnColor = '#FFFFFF';
    let leftCapitalROffColor = '#E9D9F2';
    let leftCapitalPStrokeColor = '#7109AA';
    let leftCapitalPOnColor = '#FFFFFF';
    let leftCapitalPOffColor = '#E9D9F2';
    let leftCapitalCStrokeColor = '#7109AA';
    let leftCapitalCOnColor = '#FFFFFF';
    let leftCapitalCOffColor = '#E9D9F2';
    let leftCapitalSStrokeColor = '#7109AA';
    let leftCapitalSOnColor = '#FFFFFF';
    let leftCapitalSOffColor = '#E9D9F2';
    let leftCapitalXStrokeColor = '#7109AA';
    let leftCapitalXOnColor = '#7109AA';
    let leftCapitalXOffColor = '#E9D9F2';
    let leftCapitalNStrokeColor = '#7109AA';
    let leftCapitalNOnColor = '#7109AA';
    let leftCapitalNOffColor = '#E9D9F2';
    let leftCapitalZStrokeColor = '#7109AA';
    let leftCapitalZOnColor = '#7109AA';
    let leftCapitalZOffColor = '#E9D9F2';
    let leftCapitalFStrokeColor = '#7109AA';
    let leftCapitalFOnColor = '#7109AA';
    let leftCapitalFOffColor = '#E9D9F2';
    let fRightLowercaseLetterOnColor = '#FFFFFF';
    let fRightLowercaseLetterOffColor = '#E9D9F2';
    let sRightLowercaseLetterOnColor = '#7109AA';
    let sRightLowercaseLetterOffColor = '#E9D9F2';
    let cRightLowercaseLetterOnColor = '#7109AA';
    let cRightLowercaseLetterOffColor = '#E9D9F2';
    let zRightLowercaseLetterOnColor = '#FFFFFF';
    let zRightLowercaseLetterOffColor = '#E9D9F2';
    let pRightLowercaseLetterOnColor = '#7109AA';
    let pRightLowercaseLetterOffColor = '#E9D9F2';
    let nRightLowercaseLetterOnColor = '#FFFFFF';
    let nRightLowercaseLetterOffColor = '#E9D9F2';
    let aRightLowercaseLetterOnColor = '#7109AA';
    let aRightLowercaseLetterOffColor = '#E9D9F2';
    let eRightLowercaseLetterOnColor = '#FFFFFF';
    let eRightLowercaseLetterOffColor = '#E9D9F2';
    let iRightLowercaseLetterOnColor = '#7109AA';
    let iRightLowercaseLetterOffColor = '#E9D9F2';
    let uRightLowercaseLetterOnColor = '#7109AA';
    let uRightLowercaseLetterOffColor = '#E9D9F2';
    let leftCapitalULetterOnColor = '#7109AA';
    let leftCapitalULetterOffColor = '#E9D9F2';
    let leftCapitalILetterOnColor = '#7109AA';
    let leftCapitalILetterOffColor = '#E9D9F2';
    let leftCapitalXLetterOnColor = '#FFFFFF';
    let leftCapitalXLetterOffColor = '#E9D9F2';
    let leftCapitalRLetterOnColor = '#7109AA';
    let leftCapitalRLetterOffColor = '#E9D9F2';
    let leftCapitalNLetterOnColor = '#FFFFFF';
    let leftCapitalNLetterOffColor = '#E9D9F2';
    let leftCapitalPLetterOnColor = '#7109AA';
    let leftCapitalPLetterOffColor = '#E9D9F2';
    let leftCapitalZLetterOnColor = '#FFFFFF';
    let leftCapitalZLetterOffColor = '#E9D9F2';
    let leftCapitalCLetterOnColor = '#7109AA';
    let leftCapitalCLetterOffColor = '#E9D9F2';
    let leftCapitalSLetterOnColor = '#7109AA';
    let leftCapitalSLetterOffColor = '#E9D9F2';
    let leftCapitalFLetterOnColor = '#FFFFFF';
    let leftCapitalFLetterOffColor = '#E9D9F2';

    return (
      <svg width="160" viewBox="0 0 258 99" xmlns="http://www.w3.org/2000/svg" aria-hidden={hidden}>
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
          <path id="fRightLowercaseLetter" d="M253.864 48.24c-.395 0-.72.07-.976.208-.256.139-.384.341-.384.608v.768h2.752v1.616h-2.752v4.944h2.176V58h-5.776v-1.616h1.76V51.44h-1.76v-1.616h1.76v-1.12c0-.768.275-1.31.824-1.624.55-.315 1.208-.472 1.976-.472.779 0 1.43.133 1.952.4v1.52a3.985 3.985 0 0 0-1.552-.288z" fill={this.props.fRightLowercase ? fRightLowercaseLetterOnColor : fRightLowercaseLetterOffColor}/>
          <path id="sRightLowercaseLetter" d="M246.976 93.192c-.693 0-1.333-.13-1.92-.392-.587-.261-1.056-.616-1.408-1.064l1.2-1.088c.672.65 1.413.976 2.224.976.395 0 .72-.07.976-.208.256-.139.384-.347.384-.624 0-.16-.077-.312-.232-.456a2.098 2.098 0 0 0-.536-.36 18.396 18.396 0 0 0-.896-.384 1.445 1.445 0 0 0-.208-.088 3.267 3.267 0 0 0-.112-.04c-.395-.17-.688-.301-.88-.392a7.806 7.806 0 0 1-.696-.384c-.272-.165-.47-.323-.592-.472a2.275 2.275 0 0 1-.328-.568 1.993 1.993 0 0 1-.144-.776c0-.693.299-1.24.896-1.64.597-.4 1.35-.6 2.256-.6 1.27 0 2.288.432 3.056 1.296l-1.232 1.008c-.587-.49-1.216-.736-1.888-.736-.416 0-.75.061-1 .184s-.376.296-.376.52c0 .107.043.21.128.312.085.101.235.208.448.32.213.112.39.197.528.256.139.059.373.152.704.28.981.395 1.632.715 1.952.96.565.448.853 1.03.864 1.744 0 .757-.285 1.35-.856 1.776-.57.427-1.341.64-2.312.64z" fill={this.props.sRightLowercase ? sRightLowercaseLetterOnColor : sRightLowercaseLetterOffColor}/>
          <path id="cRightLowercaseLetter" d="M227.088 93.192c-1.152 0-2.064-.379-2.736-1.136-.672-.757-1.008-1.803-1.008-3.136 0-1.323.344-2.368 1.032-3.136.688-.768 1.603-1.152 2.744-1.152 1.739 0 2.859.741 3.36 2.224l-1.744.592c-.277-.715-.81-1.072-1.6-1.072-.608 0-1.08.23-1.416.688-.336.459-.504 1.077-.504 1.856 0 .779.168 1.392.504 1.84.336.448.797.672 1.384.672.853 0 1.413-.4 1.68-1.2l1.744.544c-.49 1.61-1.637 2.416-3.44 2.416z" fill={this.props.cRightLowercase ? cRightLowercaseLetterOnColor : cRightLowercaseLetterOffColor}/>
          <path id="zRightLowercaseLetter" d="M214.568 58v-1.392l4.368-5.136h-4.064v-1.648h6.416v1.36l-4.368 5.168h4.352V58z" fill={this.props.zRightLowercase ? zRightLowercaseLetterOnColor : zRightLowercaseLetterOffColor}/>
          <path id="pRightLowercaseLetter" d="M203.408 96.216V84.824h1.84v.624c.501-.544 1.168-.816 2-.816 1.099 0 1.97.379 2.616 1.136.645.757.968 1.808.968 3.152 0 1.312-.333 2.352-1 3.12-.667.768-1.523 1.152-2.568 1.152-.853 0-1.525-.283-2.016-.848v3.024l-1.84.848zm3.584-4.784c.63 0 1.117-.216 1.464-.648.347-.432.52-1.053.52-1.864 0-.779-.173-1.397-.52-1.856-.347-.459-.84-.688-1.48-.688-.768 0-1.344.272-1.728.816v3.424c.384.544.965.816 1.744.816z" fill={this.props.pRightLowercase ? pRightLowercaseLetterOnColor : pRightLowercaseLetterOffColor}/>
          <path id="nRightLowercaseLetter" d="M198.504 49.632c.896 0 1.624.27 2.184.808.56.539.84 1.395.84 2.568V58h-1.84v-4.608c0-.704-.155-1.216-.464-1.536-.31-.32-.72-.48-1.232-.48-1.205 0-1.808.661-1.808 1.984V58h-1.84v-8.176h1.696v1.008c.16-.32.472-.6.936-.84.464-.24.973-.36 1.528-.36z" fill={this.props.nRightLowercase ? nRightLowercaseLetterOnColor : nRightLowercaseLetterOffColor}/>
          <path id="aRightLowercaseLetter" d="M186.304 93.192c-.896 0-1.624-.235-2.184-.704-.56-.47-.84-1.141-.84-2.016 0-.885.32-1.557.96-2.016.64-.459 1.408-.688 2.304-.688.779 0 1.456.144 2.032.432v-.48c0-.981-.539-1.472-1.616-1.472-.896 0-1.76.277-2.592.832l-.56-1.504c.992-.63 2.096-.944 3.312-.944 2.165 0 3.248 1.024 3.248 3.072V93h-1.792v-.64c-.576.555-1.333.832-2.272.832zm.336-1.616c.768 0 1.413-.272 1.936-.816v-1.056c-.49-.245-1.072-.368-1.744-.368-.512 0-.936.096-1.272.288-.336.192-.504.475-.504.848 0 .33.139.597.416.8.277.203.667.304 1.168.304z" fill={this.props.aRightLowercase ? aRightLowercaseLetterOnColor : aRightLowercaseLetterOffColor}/>
          <path id="eRightLowercaseLetter" d="M181.656 53.504c0 .47-.021.843-.064 1.12h-5.568c.117.597.355 1.07.712 1.416.357.347.819.52 1.384.52.715 0 1.317-.267 1.808-.8l1.104 1.168c-.768.843-1.744 1.264-2.928 1.264-1.205 0-2.157-.39-2.856-1.168-.699-.779-1.048-1.819-1.048-3.12 0-1.323.352-2.365 1.056-3.128.704-.763 1.653-1.144 2.848-1.144 1.045 0 1.899.328 2.56.984.661.656.992 1.619.992 2.888zm-5.648-.448h3.84c-.053-.597-.243-1.048-.568-1.352a1.661 1.661 0 0 0-1.176-.456c-.587 0-1.059.16-1.416.48-.357.32-.584.763-.68 1.328z" fill={this.props.eRightLowercase ? eRightLowercaseLetterOnColor : eRightLowercaseLetterOffColor}/>
          <path id="iRightLowercaseLetter" d="M166.992 83.688c-.299 0-.555-.107-.768-.32a1.066 1.066 0 0 1-.32-.784c0-.31.107-.568.32-.776.213-.208.47-.312.768-.312.31 0 .57.104.784.312.213.208.32.467.32.776 0 .31-.107.57-.32.784-.213.213-.475.32-.784.32zm.928 7.696h2.256V93h-6.352v-1.616h2.256V86.44h-2.256v-1.616h4.096v6.56z" fill={this.props.iRightLowercase ? iRightLowercaseLetterOnColor : iRightLowercaseLetterOffColor}/>
          <path id="uRightLowercaseLetter" d="M146.384 93.192c-.907 0-1.64-.27-2.2-.808-.56-.539-.84-1.4-.84-2.584v-4.976h1.84V89.4c0 1.355.56 2.032 1.68 2.032 1.205 0 1.808-.667 1.808-2v-4.608h1.84V93h-1.84v-.784c-.523.65-1.285.976-2.288.976z" fill={this.props.uRightLowercase ? uRightLowercaseLetterOnColor : uRightLowercaseLetterOffColor}/>
          <path id="leftCapitalULetter" d="M110.928 93.192c-1.11 0-2.016-.355-2.72-1.064-.704-.71-1.056-1.843-1.056-3.4V81.8h1.888v6.928c0 .97.165 1.656.496 2.056.33.4.795.6 1.392.6 1.259 0 1.888-.885 1.888-2.656V81.8h1.904v6.928c0 1.536-.352 2.664-1.056 3.384-.704.72-1.616 1.08-2.736 1.08z" fill={this.props.leftCapitalU ? leftCapitalULetterOnColor : leftCapitalULetterOffColor}/>
          <path id="leftCapitalILetter" d="M94.224 83.48h-2.352v7.84h2.352V93h-6.592v-1.68h2.336v-7.84h-2.336V81.8h6.592z" fill={this.props.leftCapitalI ? leftCapitalILetterOnColor : leftCapitalILetterOffColor}/>
          <path id="leftCapitalXLetter" d="M84.28 58h-2.192l-2.176-4-2.144 4h-2.192l3.328-5.792L75.8 46.8h2.192l1.936 3.584 1.92-3.584h2.192l-3.104 5.376z" fill={this.props.leftCapitalX ? leftCapitalXLetterOnColor : leftCapitalXLetterOffColor}/>
          <path id="leftCapitalRLetter" d="M74.752 85.192a3.48 3.48 0 0 1-.584 1.968c-.39.587-.952 1.003-1.688 1.248L74.736 93h-2.112l-2.176-4.384H69.12V93h-1.904V81.8h3.872c.661 0 1.237.093 1.728.28.49.187.872.443 1.144.768.272.325.472.683.6 1.072.128.39.192.813.192 1.272zm-5.632-1.6v3.232h2c.597 0 1.027-.152 1.288-.456.261-.304.392-.69.392-1.16 0-.448-.128-.83-.384-1.144-.256-.315-.688-.472-1.296-.472h-2z" fill={this.props.leftCapitalR ? leftCapitalRLetterOnColor : leftCapitalRLetterOffColor}/>
          <path id="leftCapitalNLetter" d="M56.216 58V46.8h1.808l3.488 6.912c.192.33.325.587.4.768a20.287 20.287 0 0 1-.032-.768V46.8h1.76V58h-1.728l-3.552-6.944a10.95 10.95 0 0 1-.416-.768c.032.16.048.416.048.768V58h-1.776z" fill={this.props.leftCapitalN ? leftCapitalNLetterOnColor : leftCapitalNLetterOffColor}/>
          <path id="leftCapitalPLetter" d="M47.216 93V81.8h3.952c1.29 0 2.237.336 2.84 1.008.603.672.904 1.493.904 2.464 0 .917-.315 1.725-.944 2.424-.63.699-1.563 1.048-2.8 1.048H49.12V93h-1.904zm1.904-6.048h2.144c.576 0 1.005-.165 1.288-.496.283-.33.424-.725.424-1.184 0-.437-.136-.827-.408-1.168-.272-.341-.707-.512-1.304-.512H49.12v3.36z" fill={this.props.leftCapitalP ? leftCapitalPLetterOnColor : leftCapitalPLetterOffColor}/>
          <path id="leftCapitalZLetter" d="M43.72 46.8v1.44l-5.104 7.952h5.088V58h-7.552v-1.44l5.072-7.968h-4.72V46.8z" fill={this.props.leftCapitalZ ? leftCapitalZLetterOnColor : leftCapitalZLetterOffColor}/>
          <path id="leftCapitalCLetter" d="M31.12 93.176a4.17 4.17 0 0 1-1.704-.336 3.721 3.721 0 0 1-1.264-.888 4.812 4.812 0 0 1-.84-1.312 6.827 6.827 0 0 1-.48-1.568 9.514 9.514 0 0 1-.144-1.672c0-.704.083-1.384.248-2.04.165-.656.419-1.27.76-1.84.341-.57.805-1.03 1.392-1.376.587-.347 1.264-.52 2.032-.52.875 0 1.605.224 2.192.672a3.9 3.9 0 0 1 1.28 1.664l-1.696.816c-.235-.448-.488-.784-.76-1.008-.272-.224-.61-.336-1.016-.336-.576 0-1.056.213-1.44.64-.384.427-.65.925-.8 1.496a7.214 7.214 0 0 0-.224 1.832c0 1.056.213 1.981.64 2.776.427.795 1.035 1.192 1.824 1.192.747 0 1.344-.48 1.792-1.44l1.728.656c-.704 1.728-1.877 2.592-3.52 2.592z" fill={this.props.leftCapitalC ? leftCapitalCLetterOnColor : leftCapitalCLetterOffColor}/>
          <path id="leftCapitalSLetter" d="M11.056 93.192a4.086 4.086 0 0 1-2.448-.784 4.18 4.18 0 0 1-1.536-2.096l1.728-.64c.245.523.584.941 1.016 1.256a2.33 2.33 0 0 0 1.4.472c.49 0 .885-.128 1.184-.384.299-.256.448-.624.448-1.104 0-.405-.203-.765-.608-1.08-.405-.315-.97-.632-1.696-.952a16.36 16.36 0 0 1-1.104-.528 7.093 7.093 0 0 1-.936-.624 2.563 2.563 0 0 1-.776-.944 2.82 2.82 0 0 1-.256-1.216c0-.832.317-1.533.952-2.104.635-.57 1.47-.856 2.504-.856.821 0 1.539.224 2.152.672.613.448 1.021 1.019 1.224 1.712l-1.712.576c-.384-.779-.976-1.168-1.776-1.168-.416 0-.757.107-1.024.32-.267.213-.4.507-.4.88 0 .085.01.168.032.248.021.08.059.155.112.224.053.07.104.133.152.192s.123.123.224.192c.101.07.187.125.256.168a6.518 6.518 0 0 0 .632.32c.075.032.197.088.368.168.17.08.293.136.368.168.448.203.821.392 1.12.568.299.176.63.408.992.696.363.288.64.63.832 1.024.192.395.288.827.288 1.296 0 1.024-.36 1.835-1.08 2.432-.72.597-1.597.896-2.632.896z" fill={this.props.leftCapitalS ? leftCapitalSLetterOnColor : leftCapitalSLetterOffColor}/>
          <path id="leftCapitalFLetter" d="M2.216 58V46.8h7.552v1.808H4.12v2.704h4.112v1.808H4.12V58z" fill={this.props.leftCapitalF ? leftCapitalFLetterOnColor : leftCapitalFLetterOffColor}/>
        </g>
      </svg>
    );
  }
}

export default ItalianMichelaStenoDiagram;
