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
        <g id={"stenoboard-" + this.props.brief } fill="none" fillRule="evenodd">
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
          <path id="fRightLowercaseLetter" d="M253.864 48.24c-.394669 0-.719999.0693326-.976.208-.256001.1386674-.384.341332-.384.608v.768h2.752v1.616h-2.752v4.944h2.176V58h-5.776v-1.616h1.76V51.44h-1.76v-1.616h1.76v-1.12c0-.7680038.274664-1.3093318.824-1.624.549336-.3146682 1.207996-.472 1.976-.472.778671 0 1.429331.133332 1.952.4v1.52c-.458669-.192001-.975997-.288-1.552-.288z" fill={this.props.fRightLowercase ? fRightLowercaseLetterOnColor : fRightLowercaseLetterOffColor}/>
          <path id="sRightLowercaseLetter" d="M246.976 93.192c-.693337 0-1.33333-.1306654-1.92-.392-.58667-.2613346-1.055998-.6159978-1.408-1.064l1.2-1.088c.672003.6506699 1.413329.976 2.224.976.394669 0 .719999-.0693326.976-.208.256001-.1386674.384-.3466653.384-.624 0-.1600008-.077333-.3119993-.232-.456-.154667-.1440007-.333332-.2639995-.536-.36-.202668-.0960005-.501331-.2239992-.896-.384-.042667-.0213334-.077333-.0373333-.104-.048-.026667-.0106667-.061333-.0239999-.104-.04s-.08-.0293333-.112-.04c-.394669-.1706675-.687999-.3013329-.88-.392-.192001-.0906671-.423999-.2186658-.696-.384-.272001-.1653342-.469333-.3226659-.592-.472-.122667-.1493341-.232-.3386655-.328-.568-.096-.2293345-.144-.4879986-.144-.776 0-.6933368.298664-1.239998.896-1.64.597336-.400002 1.349329-.6 2.256-.6 1.26934 0 2.287996.4319957 3.056 1.296l-1.232 1.008c-.58667-.4906691-1.215997-.736-1.888-.736-.416002 0-.749332.0613327-1 .184s-.376.2959989-.376.52c0 .1066672.042666.2106662.128.312s.234666.2079994.448.32.389333.197333.528.256c.138667.058667.373332.1519994.704.28.981338.3946686 1.631998.7146654 1.952.96.565336.4480022.853333 1.0293298.864 1.744 0 .7573371-.28533 1.3493312-.856 1.776-.57067.4266688-1.341328.64-2.312.64z" fill={this.props.sRightLowercase ? sRightLowercaseLetterOnColor : sRightLowercaseLetterOffColor}/>
          <path id="cRightLowercaseLetter" d="M227.088 93.192c-1.152006 0-2.063997-.3786629-2.736-1.136-.672003-.7573371-1.008-1.80266-1.008-3.136 0-1.3226733.343997-2.3679962 1.032-3.136.688003-.7680038 1.602661-1.152 2.744-1.152 1.738675 0 2.858664.7413259 3.36 2.224l-1.744.592c-.277335-.7146702-.810663-1.072-1.6-1.072-.608003 0-1.079998.229331-1.416.688-.336002.458669-.504 1.0773294-.504 1.856 0 .7786706.167998 1.3919978.504 1.84.336002.4480022.79733.672 1.384.672.853338 0 1.413332-.399996 1.68-1.2l1.744.544c-.490669 1.6106747-1.637324 2.416-3.44 2.416z" fill={this.props.cRightLowercase ? cRightLowercaseLetterOnColor : cRightLowercaseLetterOffColor}/>
          <path id="zRightLowercaseLetter" d="M214.568 58v-1.392l4.368-5.136h-4.064v-1.648h6.416v1.36l-4.368 5.168h4.352V58z" fill={this.props.zRightLowercase ? zRightLowercaseLetterOnColor : zRightLowercaseLetterOffColor}/>
          <path id="pRightLowercaseLetter" d="M203.408 96.216V84.824h1.84v.624c.501336-.5440027 1.167996-.816 2-.816 1.098672 0 1.970663.3786629 2.616 1.136.645337.7573371.968 1.8079933.968 3.152 0 1.3120066-.33333 2.3519962-1 3.12-.66667.7680038-1.522661 1.152-2.568 1.152-.853338 0-1.525331-.2826638-2.016-.848v3.024l-1.84.848zm3.584-4.784c.629336 0 1.117332-.2159978 1.464-.648s.52-1.0533293.52-1.864c0-.7786706-.173332-1.397331-.52-1.856s-.839997-.688-1.48-.688c-.768004 0-1.343998.2719973-1.728.816v3.424c.384002.5440027.965329.816 1.744.816z" fill={this.props.pRightLowercase ? pRightLowercaseLetterOnColor : pRightLowercaseLetterOffColor}/>
          <path id="nRightLowercaseLetter" d="M198.504 49.632c.896004 0 1.623997.2693306 2.184.808.560003.5386694.84 1.3946608.84 2.568V58h-1.84v-4.608c0-.7040035-.154665-1.2159984-.464-1.536-.309335-.3200016-.719997-.48-1.232-.48-1.205339 0-1.808.6613267-1.808 1.984V58h-1.84v-8.176h1.696v1.008c.160001-.3200016.471998-.5999988.936-.84.464002-.2400012.973331-.36 1.528-.36z" fill={this.props.nRightLowercase ? nRightLowercaseLetterOnColor : nRightLowercaseLetterOffColor}/>
          <path id="aRightLowercaseLetter" d="M186.304 93.192c-.896004 0-1.623997-.2346643-2.184-.704-.560003-.4693357-.84-1.141329-.84-2.016 0-.8853378.319997-1.557331.96-2.016s1.407996-.688 2.304-.688c.778671 0 1.455997.1439986 2.032.432v-.48c0-.9813382-.538661-1.472-1.616-1.472-.896004 0-1.759996.2773306-2.592.832l-.56-1.504c.992005-.6293365 2.095994-.944 3.312-.944 2.165344 0 3.248 1.0239898 3.248 3.072V93h-1.792v-.64c-.576003.5546694-1.333329.832-2.272.832zm.336-1.616c.768004 0 1.413331-.2719973 1.936-.816v-1.056c-.490669-.2453346-1.071997-.368-1.744-.368-.512003 0-.935998.095999-1.272.288-.336002.192001-.504.4746648-.504.848 0 .3306683.138665.5973323.416.8s.666664.304 1.168.304z" fill={this.props.aRightLowercase ? aRightLowercaseLetterOnColor : aRightLowercaseLetterOffColor}/>
          <path id="eRightLowercaseLetter" d="M181.656 53.504c0 .4693357-.021333.8426653-.064 1.12h-5.568c.117334.5973363.354665 1.0693316.712 1.416.357335.3466684.818664.52 1.384.52.71467 0 1.317331-.266664 1.808-.8l1.104 1.168c-.768004.8426709-1.743994 1.264-2.928 1.264-1.205339 0-2.15733-.3893294-2.856-1.168-.69867-.7786706-1.048-1.8186602-1.048-3.12 0-1.3226733.351996-2.3653295 1.056-3.128.704004-.7626705 1.653327-1.144 2.848-1.144 1.045339 0 1.898663.3279967 2.56.984.661337.6560033.992 1.6186603.992 2.888zm-5.648-.448h3.84c-.053334-.5973363-.242665-1.0479985-.568-1.352-.325335-.3040015-.717331-.456-1.176-.456-.58667 0-1.058665.1599984-1.416.48-.357335.3200016-.584.7626638-.68 1.328z" fill={this.props.eRightLowercase ? eRightLowercaseLetterOnColor : eRightLowercaseLetterOffColor}/>
          <path id="iRightLowercaseLetter" d="M166.992 83.688c-.298668 0-.554666-.1066656-.768-.32-.213334-.2133344-.32-.4746651-.32-.784s.106666-.567999.32-.776c.213334-.208001.469332-.312.768-.312.309335 0 .570666.103999.784.312.213334.208001.32.4666651.32.776s-.106666.5706656-.32.784c-.213334.2133344-.474665.32-.784.32zm.928 7.696h2.256V93h-6.352v-1.616h2.256V86.44h-2.256v-1.616h4.096v6.56z" fill={this.props.iRightLowercase ? iRightLowercaseLetterOnColor : iRightLowercaseLetterOffColor}/>
          <path id="uRightLowercaseLetter" d="M146.384 93.192c-.906671 0-1.639997-.2693306-2.2-.808-.560003-.5386694-.84-1.3999941-.84-2.584v-4.976h1.84V89.4c0 1.3546734.559994 2.032 1.68 2.032 1.205339 0 1.808-.66666 1.808-2v-4.608h1.84V93h-1.84v-.784c-.522669.6506699-1.285328.976-2.288.976z" fill={this.props.uRightLowercase ? uRightLowercaseLetterOnColor : uRightLowercaseLetterOffColor}/>
          <path id="leftCapitalULetter" d="M110.928 93.192c-1.109339 0-2.015996-.3546631-2.72-1.064-.704004-.7093369-1.056-1.8426589-1.056-3.4V81.8h1.888v6.928c0 .9706715.165332 1.655998.496 2.056.330668.400002.794664.6 1.392.6 1.258673 0 1.888-.8853245 1.888-2.656V81.8h1.904v6.928c0 1.5360077-.351996 2.6639964-1.056 3.384-.704004.7200036-1.615994 1.08-2.736 1.08z" fill={this.props.leftCapitalU ? leftCapitalULetterOnColor : leftCapitalULetterOffColor}/>
          <path id="leftCapitalILetter" d="M94.224 83.48h-2.352v7.84h2.352V93h-6.592v-1.68h2.336v-7.84h-2.336V81.8h6.592z" fill={this.props.leftCapitalI ? leftCapitalILetterOnColor : leftCapitalILetterOffColor}/>
          <path id="leftCapitalXLetter" d="M84.28 58h-2.192l-2.176-4-2.144 4h-2.192l3.328-5.792L75.8 46.8h2.192l1.936 3.584 1.92-3.584h2.192l-3.104 5.376z" fill={this.props.leftCapitalX ? leftCapitalXLetterOnColor : leftCapitalXLetterOffColor}/>
          <path id="leftCapitalRLetter" d="M74.752 85.192c0 .725337-.1946647 1.3813304-.584 1.968-.3893353.5866696-.9519963 1.0026654-1.688 1.248L74.736 93h-2.112l-2.176-4.384H69.12V93h-1.904V81.8h3.872c.6613366 0 1.2373309.0933324 1.728.28.4906691.1866676.8719986.442665 1.144.768.2720014.325335.4719994.6826647.6 1.072.1280006.3893353.192.813331.192 1.272zm-5.632-1.6v3.232h2c.5973363 0 1.0266654-.1519985 1.288-.456.2613346-.3040015.392-.6906643.392-1.16 0-.4480022-.1279987-.8293318-.384-1.144-.2560013-.3146682-.687997-.472-1.296-.472h-2z" fill={this.props.leftCapitalR ? leftCapitalRLetterOnColor : leftCapitalRLetterOffColor}/>
          <path id="leftCapitalNLetter" d="M56.216 58V46.8h1.808l3.488 6.912c.192001.3306683.325333.5866658.4.768-.0213334-.4053354-.032-.6613328-.032-.768V46.8h1.76V58h-1.728l-3.552-6.944c-.192001-.3306683-.3306662-.5866658-.416-.768.0320002.1600008.048.4159982.048.768V58h-1.776z" fill={this.props.leftCapitalN ? leftCapitalNLetterOnColor : leftCapitalNLetterOffColor}/>
          <path id="leftCapitalPLetter" d="M47.216 93V81.8h3.952c1.2906731 0 2.2373303.3359966 2.84 1.008.6026697.6720034.904 1.4933285.904 2.464 0 .9173379-.3146635 1.7253298-.944 2.424s-1.5626605 1.048-2.8 1.048H49.12V93h-1.904zm1.904-6.048h2.144c.5760029 0 1.0053319-.1653317 1.288-.496s.424-.725331.424-1.184c0-.4373355-.1359986-.826665-.408-1.168-.2720014-.341335-.7066637-.512-1.304-.512H49.12v3.36z" fill={this.props.leftCapitalP ? leftCapitalPLetterOnColor : leftCapitalPLetterOffColor}/>
          <path id="leftCapitalZLetter" d="M43.72 46.8v1.44l-5.104 7.952h5.088V58h-7.552v-1.44l5.072-7.968h-4.72V46.8z" fill={this.props.leftCapitalZ ? leftCapitalZLetterOnColor : leftCapitalZLetterOffColor}/>
          <path id="leftCapitalCLetter" d="M31.12 93.176c-.6293365 0-1.1973308-.1119989-1.704-.336-.5066692-.2240011-.9279983-.5199982-1.264-.888-.3360017-.3680018-.6159989-.8053308-.84-1.312-.2240011-.5066692-.3839995-1.0293306-.48-1.568-.0960005-.5386694-.144-1.0959971-.144-1.672 0-.7040035.0826658-1.3839967.248-2.04.1653342-.6560033.418665-1.2693305.76-1.84.341335-.5706695.8053304-1.0293316 1.392-1.376.5866696-.3466684 1.2639962-.52 2.032-.52.874671 0 1.6053304.2239978 2.192.672.5866696.4480022 1.013332 1.0026634 1.28 1.664l-1.696.816c-.2346678-.4480022-.4879986-.7839989-.76-1.008-.2720014-.2240011-.6106646-.336-1.016-.336-.5760029 0-1.0559981.2133312-1.44.64-.3840019.4266688-.6506659.9253305-.8 1.496-.1493341.5706695-.224 1.1813301-.224 1.832 0 1.0560053.2133312 1.9813294.64 2.776.4266688.7946706 1.0346627 1.192 1.824 1.192.7466704 0 1.3439978-.4799952 1.792-1.44l1.728.656c-.7040035 1.7280086-1.8773251 2.592-3.52 2.592z" fill={this.props.leftCapitalC ? leftCapitalCLetterOnColor : leftCapitalCLetterOffColor}/>
          <path id="leftCapitalSLetter" d="M11.056 93.192c-.9066712 0-1.72266304-.2613307-2.448-.784-.72533696-.5226693-1.23733184-1.221329-1.536-2.096l1.728-.64c.24533456.5226693.58399784.9413318 1.016 1.256.4320022.3146682.8986642.472 1.4.472.4906691 0 .8853318-.1279987 1.184-.384.2986682-.2560013.448-.6239976.448-1.104 0-.4053354-.2026646-.7653318-.608-1.08-.4053354-.3146682-.970663-.6319984-1.696-.952-.458669-.2026677-.82666528-.3786659-1.104-.528-.27733472-.1493341-.5893316-.357332-.936-.624-.3466684-.266668-.60533248-.5813315-.776-.944-.17066752-.3626685-.256-.7679978-.256-1.216 0-.8320042.31733016-1.5333305.952-2.104.63466984-.5706695 1.46932816-.856 2.504-.856.8213374 0 1.5386636.2239978 2.152.672.6133364.4480022 1.0213323 1.0186632 1.224 1.712l-1.712.576c-.3840019-.7786706-.975996-1.168-1.776-1.168-.4160021 0-.757332.1066656-1.024.32s-.4.5066648-.4.88c0 .0853338.01066656.1679996.032.248.02133344.0800004.0586664.1546663.112.224s.10399976.133333.152.192.12266616.1226663.224.192c.1013338.0693337.1866663.1253331.256.168.0693337.0426669.1733326.0986663.312.168.1386674.0693337.245333.1199998.32.152.074667.0320002.1973325.0879996.368.168.1706675.0800004.293333.1359998.368.168.4480022.2026677.8213318.3919991 1.12.568.2986682.1760009.6293315.4079986.992.696.3626685.2880014.639999.6293314.832 1.024.192001.3946686.288.8266643.288 1.296 0 1.0240051-.3599964 1.8346637-1.08 2.432-.7200036.5973363-1.5973282.896-2.632.896z" fill={this.props.leftCapitalS ? leftCapitalSLetterOnColor : leftCapitalSLetterOffColor}/>
          <path id="leftCapitalFLetter" d="M2.216 58V46.8h7.552v1.808H4.12v2.704h4.112v1.808H4.12V58z" fill={this.props.leftCapitalF ? leftCapitalFLetterOnColor : leftCapitalFLetterOffColor}/>
        </g>
      </svg>
    );
  }
}

export default ItalianMichelaStenoDiagram;

