import React from "react";
import * as stroke from "../utils/stroke";

const idKeyLookup = {
  "rightZ": stroke.Z,
  "rightD": stroke.D,
  "rightS": stroke.RS,
  "rightT": stroke.RT,
  "rightG": stroke.G,
  "rightL": stroke.L,
  "rightB": stroke.B,
  "rightP": stroke.RP,
  "rightR": stroke.RR,
  "rightF": stroke.F,
  "rightU": stroke.U,
  "rightE": stroke.E,
  "star": stroke.STAR,
  "leftO": stroke.O,
  "leftA": stroke.A,
  "leftR": stroke.R,
  "leftH": stroke.H,
  "leftW": stroke.W,
  "leftP": stroke.P,
  "leftK": stroke.K,
  "leftT": stroke.T,
  "leftSLower": stroke.S,
  "leftSUpper": stroke.S,
  "numberBar": stroke.HASH,
  "Z": stroke.Z,
  "D": stroke.D,
  "SRight": stroke.RS,
  "TRight": stroke.RT,
  "G": stroke.G,
  "L": stroke.L,
  "B": stroke.B,
  "PRight": stroke.RP,
  "RRight": stroke.RR,
  "F": stroke.F,
  "U": stroke.U,
  "E": stroke.E,
  "O": stroke.O,
  "A": stroke.A,
  "starLetter": stroke.STAR,
  "RLeft": stroke.R,
  "H": stroke.H,
  "W": stroke.W,
  "PLeft": stroke.P,
  "K": stroke.K,
  "TLeft": stroke.T,
  "SLower": stroke.S,
  "SUpper": stroke.S,
  "hashLetter": stroke.HASH
}

export default function AmericanStenoDiagram(props) {
  const onStrokeColor = props.onStrokeColor || "#7109AA";
  const offStrokeColor = props.offStrokeColor || "#7109AA";
  const onTextColor = props.onTextColor || "#fff";
  const offTextColor = props.offTextColor || "#fff";
  const onKeyColor = props.onKeyColor || "#7109AA";
  const offKeyColor = props.offKeyColor || "#e9d9f2";

  const handleClick = (event) => {
    if (props.handleOnClick) {
      const clickedKeyID = event.target["id"];
      const key = (idKeyLookup[clickedKeyID]) ? idKeyLookup[clickedKeyID] : 0;

      props.handleOnClick(key);
    }
  }

  return (
    <svg id={props.id || "stenoDiagram"} viewBox="0 0 215 101" width={props.diagramWidth || 140} xmlns="http://www.w3.org/2000/svg" aria-hidden={true} onClick={handleClick} className={props.classes}>
      <g id={"stenoboard-" + props.brief } transform="translate(1 1)" fill="none" fillRule="evenodd">
        <rect id="rightZ" stroke={props.rightZ ? onStrokeColor : offStrokeColor} fill={props.rightZ ? onKeyColor : offKeyColor} x="195" y="48" width="18" height="23" rx="4"/>
        <rect id="rightD" stroke={props.rightD ? onStrokeColor : offStrokeColor} fill={props.rightD ? onKeyColor : offKeyColor} x="195" y="20" width="18" height="23" rx="4"/>
        <rect id="rightS" stroke={props.rightS ? onStrokeColor : offStrokeColor} fill={props.rightS ? onKeyColor : offKeyColor} x="174" y="48" width="18" height="23" rx="4"/>
        <rect id="rightT" stroke={props.rightT ? onStrokeColor : offStrokeColor} fill={props.rightT ? onKeyColor : offKeyColor} x="174" y="20" width="18" height="23" rx="4"/>
        <rect id="rightG" stroke={props.rightG ? onStrokeColor : offStrokeColor} fill={props.rightG ? onKeyColor : offKeyColor} x="153" y="48" width="18" height="23" rx="4"/>
        <rect id="rightL" stroke={props.rightL ? onStrokeColor : offStrokeColor} fill={props.rightL ? onKeyColor : offKeyColor} x="153" y="20" width="18" height="23" rx="4"/>
        <rect id="rightB" stroke={props.rightB ? onStrokeColor : offStrokeColor} fill={props.rightB ? onKeyColor : offKeyColor} x="132" y="48" width="18" height="23" rx="4"/>
        <rect id="rightP" stroke={props.rightP ? onStrokeColor : offStrokeColor} fill={props.rightP ? onKeyColor : offKeyColor} x="132" y="20" width="18" height="23" rx="4"/>
        <rect id="rightR" stroke={props.rightR ? onStrokeColor : offStrokeColor} fill={props.rightR ? onKeyColor : offKeyColor} x="111" y="48" width="18" height="23" rx="4"/>
        <rect id="rightF" stroke={props.rightF ? onStrokeColor : offStrokeColor} fill={props.rightF ? onKeyColor : offKeyColor} x="111" y="20" width="18" height="23" rx="4"/>
        <rect id="rightU" stroke={props.rightU ? onStrokeColor : offStrokeColor} fill={props.rightU ? onKeyColor : offKeyColor} x="122" y="76" width="18" height="23" rx="4"/>
        <rect id="rightE" stroke={props.rightE ? onStrokeColor : offStrokeColor} fill={props.rightE ? onKeyColor : offKeyColor} x="101" y="76" width="18" height="23" rx="4"/>
          <rect id="star" stroke={props.star ? onStrokeColor : offStrokeColor} fill={props.star ? onKeyColor : offKeyColor} x="86" y="20" width="20" height="51" rx="4"/>
         <rect id="leftO" stroke={props.leftO ? onStrokeColor : offStrokeColor} fill={props.leftO ? onKeyColor : offKeyColor} x="73" y="76" width="18" height="23" rx="4"/>
         <rect id="leftA" stroke={props.leftA ? onStrokeColor : offStrokeColor} fill={props.leftA ? onKeyColor : offKeyColor} x="52" y="76" width="18" height="23" rx="4"/>
         <rect id="leftR" stroke={props.leftR ? onStrokeColor : offStrokeColor} fill={props.leftR ? onKeyColor : offKeyColor} x="63" y="48" width="18" height="23" rx="4"/>
         <rect id="leftH" stroke={props.leftH ? onStrokeColor : offStrokeColor} fill={props.leftH ? onKeyColor : offKeyColor} x="63" y="20" width="18" height="23" rx="4"/>
         <rect id="leftW" stroke={props.leftW ? onStrokeColor : offStrokeColor} fill={props.leftW ? onKeyColor : offKeyColor} x="42" y="48" width="18" height="23" rx="4"/>
         <rect id="leftP" stroke={props.leftP ? onStrokeColor : offStrokeColor} fill={props.leftP ? onKeyColor : offKeyColor} x="42" y="20" width="18" height="23" rx="4"/>
         <rect id="leftK" stroke={props.leftK ? onStrokeColor : offStrokeColor} fill={props.leftK ? onKeyColor : offKeyColor} x="21" y="48" width="18" height="23" rx="4"/>
         <rect id="leftT" stroke={props.leftT ? onStrokeColor : offStrokeColor} fill={props.leftT ? onKeyColor : offKeyColor} x="21" y="20" width="18" height="23" rx="4"/>
    <rect id="leftSLower" stroke={props.leftSLower ? onStrokeColor : offStrokeColor} fill={props.leftSLower ? onKeyColor : offKeyColor} y="48" width="18" height="23" rx="4"/>
    <rect id="leftSUpper" stroke={props.leftSUpper ? onStrokeColor : offStrokeColor} fill={props.leftSUpper ? onKeyColor : offKeyColor} y="20" width="18" height="23" rx="4"/>
     <rect id="numberBar" stroke={props.numberBar ? onStrokeColor : offStrokeColor} fill={props.numberBar ? onKeyColor : offKeyColor} width="213" height="15" rx="4"/>
        <g id="Outlines" transform="translate(5 2)" visibility={props.hideLetters ? 'hidden' : 'initial'}>
          <path d="M202.568 51v1.44l-5.104 7.952h5.088V62.2H195v-1.44l5.072-7.968h-4.72V51z" id="Z" fill={props.rightZ ? onTextColor : offTextColor}/>
          <path d="M195 34.2V23h2.816c3.744 0 5.152 2.816 5.152 5.6 0 2.56-1.28 5.6-5.216 5.6H195zm1.904-1.792h1.04c2.288 0 3.04-2.032 3.04-3.808 0-1.888-.832-3.808-2.864-3.808h-1.216v7.616z" id="D" fill={props.rightD ? onTextColor : offTextColor}/>
          <path d="M177.984 62.584c-1.824 0-3.392-1.136-3.984-2.88l1.728-.64c.48 1.024 1.408 1.728 2.416 1.728.96 0 1.632-.496 1.632-1.488 0-.88-1.072-1.488-2.304-2.032-1.424-.624-3.072-1.408-3.072-3.312 0-1.616 1.344-2.96 3.456-2.96 1.68 0 2.976 1.024 3.376 2.384l-1.712.576c-.32-.656-.928-1.168-1.776-1.168-.8 0-1.424.432-1.424 1.2 0 .784 1.008 1.152 2.144 1.68 1.392.64 3.232 1.584 3.232 3.584 0 2.128-1.728 3.328-3.712 3.328z" id="SRight" fill={props.rightS ? onTextColor : offTextColor}/>
          <path d="M177.248 34.2v-9.376H174V23h8.416v1.824h-3.264V34.2z" id="TRight" fill={props.rightT ? onTextColor : offTextColor}/>
          <path d="M157.416 62.584c-3.04 0-4.416-2.864-4.416-5.792 0-2.8 1.456-5.792 4.416-5.792 1.904 0 2.816 1.104 3.456 2.256l-1.68.96c-.4-.752-.928-1.408-1.776-1.408-1.792 0-2.432 2.208-2.432 3.984 0 2.032.768 3.984 2.432 3.984 1.184 0 1.776-.896 1.776-2.08v-.24h-1.952v-1.792h3.904v1.552c0 2.832-1.616 4.368-3.728 4.368z" id="G" fill={props.rightG ? onTextColor : offTextColor}/>
          <path d="M153 34.2V23h1.904v9.376h5.168V34.2z" id="L" fill={props.rightL ? onTextColor : offTextColor}/>
          <path d="M132 62.2V51h3.776c2.72 0 3.584 1.488 3.584 2.992 0 .992-.464 1.856-1.456 2.304 1.248.416 1.84 1.504 1.84 2.624 0 1.568-.944 3.28-3.728 3.28H132zm1.904-6.672h1.616c1.312 0 1.936-.56 1.936-1.408 0-.656-.272-1.36-1.632-1.36h-1.92v2.768zm0 4.912h2.24c1.328 0 1.696-.8 1.696-1.504 0-.832-.4-1.664-2.16-1.664h-1.776v3.168z" id="B" fill={props.rightB ? onTextColor : offTextColor}/>
          <path d="M132 34.2V23h3.952c2.784 0 3.744 1.76 3.744 3.472 0 1.6-1.056 3.472-3.744 3.472h-2.048V34.2H132zm1.904-6.048h2.144c1.248 0 1.712-.88 1.712-1.68 0-.72-.384-1.68-1.712-1.68h-2.144v3.36z" id="PRight" fill={props.rightP ? onTextColor : offTextColor}/>
          <path d="M118.536 54.392c0 1.376-.752 2.704-2.272 3.216l2.256 4.592h-2.112l-2.176-4.384h-1.328V62.2H111V51h3.872c2.768 0 3.664 1.632 3.664 3.392zm-5.632-1.6v3.232h2c1.28 0 1.68-.784 1.68-1.616 0-.752-.352-1.616-1.68-1.616h-2z" id="RRight" fill={props.rightR ? onTextColor : offTextColor}/>
          <path d="M111 34.2V23h7.552v1.808h-5.648v2.704h4.112v1.808h-4.112v4.88z" id="F" fill={props.rightF ? onTextColor : offTextColor}/>
          <path d="M125.928 90.5919996c-2.016 0-3.776-1.136-3.776-4.464v-6.928h1.888v6.928c0 2.064.8 2.656 1.888 2.656 1.072 0 1.888-.592 1.888-2.656v-6.928h1.904v6.928c0 3.28-1.744 4.464-3.792 4.464z" id="U" fill={props.rightU ? onTextColor : offTextColor}/>
          <path d="M101.216 90.3999996v-11.2h7.184v1.808h-5.28v2.704h3.44v1.808h-3.44v3.072h5.616v1.808z" id="E" fill={props.rightE ? onTextColor : offTextColor}/>
          <path d="M89.52 46.6239996l-1.392-.976 1.008-1.456.832-.672-1.088.256H87.2v-1.728h1.68l1.088.256-.832-.672-1.008-1.456 1.392-.976 1.184 1.664.224.976.224-.976 1.184-1.664 1.392.976-1.008 1.456-.832.672 1.088-.256h1.696v1.728h-1.696l-1.088-.256.832.672 1.008 1.456-1.392.976-1.184-1.664-.224-.976-.224.976z" id="starLetter" fill={props.star ? onTextColor : offTextColor}/>
          <path d="M76.928 90.5919996c-3.008 0-4.24-2.784-4.24-5.792s1.232-5.792 4.24-5.792 4.256 2.784 4.256 5.792-1.248 5.792-4.256 5.792zm0-1.808c1.584 0 2.272-1.984 2.272-3.984 0-2.128-.672-3.984-2.272-3.984-1.6 0-2.272 1.968-2.272 3.984 0 2.112.672 3.984 2.272 3.984z" id="O" fill={props.leftO ? onTextColor : offTextColor} />
          <path d="M58.44 90.3999996l-.736-2.464h-3.552l-.736 2.464h-2.048l3.664-11.2h1.792l3.664 11.2H58.44zm-3.776-4.192h2.528l-.992-3.328c-.08-.256-.208-.832-.272-1.248-.08.416-.192.992-.272 1.248l-.992 3.328z" id="A" fill={props.leftA ? onTextColor : offTextColor} />
          <path d="M70.536 54.392c0 1.376-.752 2.704-2.272 3.216L70.52 62.2h-2.112l-2.176-4.384h-1.328V62.2H63V51h3.872c2.768 0 3.664 1.632 3.664 3.392zm-5.632-1.6v3.232h2c1.28 0 1.68-.784 1.68-1.616 0-.752-.352-1.616-1.68-1.616h-2z" id="RLeft" fill={props.leftR ? onTextColor : offTextColor}/>
          <path d="M63 34.2V23h1.904v4.528h3.616V23h1.904v11.2H68.52v-4.88h-3.616v4.88z" id="H" fill={props.leftH ? onTextColor : offTextColor}/>
          <path d="M42.648 62.2L41 51h1.712l.88 6.672c.032.224.08.496.112.784.032-.24.096-.512.16-.8L45.208 51h1.024l1.36 6.624c.064.304.128.56.16.784.032-.272.08-.544.112-.768l.768-6.64h1.808l-1.664 11.2h-1.504l-1.424-6.848c-.064-.304-.112-.56-.144-.816-.032.256-.096.512-.144.8L44.152 62.2h-1.504z" id="W" fill={props.leftW ? onTextColor : offTextColor}/>
          <path d="M42 34.2V23h3.952c2.784 0 3.744 1.76 3.744 3.472 0 1.6-1.056 3.472-3.744 3.472h-2.048V34.2H42zm1.904-6.048h2.144c1.248 0 1.712-.88 1.712-1.68 0-.72-.384-1.68-1.712-1.68h-2.144v3.36z" id="PLeft" fill={props.leftP ? onTextColor : offTextColor}/>
          <path d="M26.952 62.2l-2.992-5.616-1.056 1.312V62.2H21V51h1.904v4.224L26.232 51h2.224l-3.216 3.984 3.936 7.216z" id="K" fill={props.leftK ? onTextColor : offTextColor}/>
          <path d="M24.248 34.2v-9.376H21V23h8.416v1.824h-3.264V34.2z" id="TLeft" fill={props.leftT ? onTextColor : offTextColor}/>
          <path d="M3.984 62.584c-1.824 0-3.392-1.136-3.984-2.88l1.728-.64c.48 1.024 1.408 1.728 2.416 1.728.96 0 1.632-.496 1.632-1.488 0-.88-1.072-1.488-2.304-2.032C2.048 56.648.4 55.864.4 53.96.4 52.344 1.744 51 3.856 51c1.68 0 2.976 1.024 3.376 2.384l-1.712.576c-.32-.656-.928-1.168-1.776-1.168-.8 0-1.424.432-1.424 1.2 0 .784 1.008 1.152 2.144 1.68 1.392.64 3.232 1.584 3.232 3.584 0 2.128-1.728 3.328-3.712 3.328z" id="SLower" fill={props.leftSLower ? onTextColor : offTextColor}/>
          <path d="M3.984 34.584c-1.824 0-3.392-1.136-3.984-2.88l1.728-.64c.48 1.024 1.408 1.728 2.416 1.728.96 0 1.632-.496 1.632-1.488 0-.88-1.072-1.488-2.304-2.032C2.048 28.648.4 27.864.4 25.96.4 24.344 1.744 23 3.856 23c1.68 0 2.976 1.024 3.376 2.384l-1.712.576c-.32-.656-.928-1.168-1.776-1.168-.8 0-1.424.432-1.424 1.2 0 .784 1.008 1.152 2.144 1.68 1.392.64 3.232 1.584 3.232 3.584 0 2.128-1.728 3.328-3.712 3.328z" id="SUpper" fill={props.leftSUpper ? onTextColor : offTextColor}/>
          <path d="M89.1264 9.92000008l.3584-2.34240004h-1.408l.192-1.28000002h1.408l.2816-1.92000003H88.576l.192-1.26720002h1.3952l.32-2.15040003h1.3056001l-.32 2.15040003h1.6128l.3456-2.15040003h1.2928l-.32 2.15040003h1.408l-.1792 1.26720002h-1.4208l-.2944 1.92000003h1.3952l-.192 1.28000002h-1.3952l-.3584 2.34240004h-1.3056l.3584-2.34240004H90.7904l-.3584 2.34240004h-1.3056zm1.856-3.62240006h1.6256001l.2816-1.92000003H91.2768l-.2944 1.92000003z" id="hashLetter" fill={props.numberBar ? onTextColor : offTextColor}/>
        </g>
      </g>
    </svg>
  );
}
