import React, { Component } from "react";

let hidden = true;
let theカStrokeColor = "#7109AA";
let theカOnColor = "#7109AA";
let theカOffColor = "#E9D9F2";
let theRightKagikakkoStrokeColor = "#7109AA";
let theRightKagikakkoOnColor = "#7109AA";
let theRightKagikakkoOffColor = "#E9D9F2";
let theRightっStrokeColor = "#7109AA";
let theRightっOnColor = "#7109AA";
let theRightっOffColor = "#E9D9F2";
let theRightおStrokeColor = "#7109AA";
let theRightおOnColor = "#7109AA";
let theRightおOffColor = "#E9D9F2";
let theRight1StrokeColor = "#7109AA";
let theRight1OnColor = "#7109AA";
let theRight1OffColor = "#E9D9F2";
let theRightうStrokeColor = "#7109AA";
let theRightうOnColor = "#7109AA";
let theRightうOffColor = "#E9D9F2";
let theRightいStrokeColor = "#7109AA";
let theRightいOnColor = "#7109AA";
let theRightいOffColor = "#E9D9F2";
let theRight2StrokeColor = "#7109AA";
let theRight2OnColor = "#7109AA";
let theRight2OffColor = "#E9D9F2";
let theRightさStrokeColor = "#7109AA";
let theRightさOnColor = "#7109AA";
let theRightさOffColor = "#E9D9F2";
let theRightかStrokeColor = "#7109AA";
let theRightかOnColor = "#7109AA";
let theRightかOffColor = "#E9D9F2";
let theRight3StrokeColor = "#7109AA";
let theRight3OnColor = "#7109AA";
let theRight3OffColor = "#E9D9F2";
let theRightなStrokeColor = "#7109AA";
let theRightなOnColor = "#7109AA";
let theRightなOffColor = "#E9D9F2";
let theRightたStrokeColor = "#7109AA";
let theRightたOnColor = "#7109AA";
let theRightたOffColor = "#E9D9F2";
let theRight4StrokeColor = "#7109AA";
let theRight4OnColor = "#7109AA";
let theRight4OffColor = "#E9D9F2";
let theStarStrokeColor = "#7109AA";
let theStarOnColor = "#7109AA";
let theStarOffColor = "#E9D9F2";
let theLeftっStrokeColor = "#7109AA";
let theLeftっOnColor = "#7109AA";
let theLeftっOffColor = "#E9D9F2";
let theLeftおStrokeColor = "#7109AA";
let theLeftおOnColor = "#7109AA";
let theLeftおOffColor = "#E9D9F2";
let theLeft1StrokeColor = "#7109AA";
let theLeft1OnColor = "#7109AA";
let theLeft1OffColor = "#E9D9F2";
let theLeftうStrokeColor = "#7109AA";
let theLeftうOnColor = "#7109AA";
let theLeftうOffColor = "#E9D9F2";
let theLeftいStrokeColor = "#7109AA";
let theLeftいOnColor = "#7109AA";
let theLeftいOffColor = "#E9D9F2";
let theLeft2StrokeColor = "#7109AA";
let theLeft2OnColor = "#7109AA";
let theLeft2OffColor = "#E9D9F2";
let theLeftさStrokeColor = "#7109AA";
let theLeftさOnColor = "#7109AA";
let theLeftさOffColor = "#E9D9F2";
let theLeftかStrokeColor = "#7109AA";
let theLeftかOnColor = "#7109AA";
let theLeftかOffColor = "#E9D9F2";
let theLeft3StrokeColor = "#7109AA";
let theLeft3OnColor = "#7109AA";
let theLeft3OffColor = "#E9D9F2";
let theLeftなStrokeColor = "#7109AA";
let theLeftなOnColor = "#7109AA";
let theLeftなOffColor = "#E9D9F2";
let theLeftたStrokeColor = "#7109AA";
let theLeftたOnColor = "#7109AA";
let theLeftたOffColor = "#E9D9F2";
let theLeft4StrokeColor = "#7109AA";
let theLeft4OnColor = "#7109AA";
let theLeft4OffColor = "#E9D9F2";
let theLeftKagikakkoStrokeColor = "#7109AA";
let theLeftKagikakkoOnColor = "#7109AA";
let theLeftKagikakkoOffColor = "#E9D9F2";
let the漢StrokeColor = "#7109AA";
let the漢OnColor = "#7109AA";
let the漢OffColor = "#E9D9F2";
let theカSymbolOnColor = "#FFFFFF";
let theカSymbolOffColor = "#FFFFFF";
let theRightKagikakkoSymbolOnColor = "#FFFFFF";
let theRightKagikakkoSymbolOffColor = "#FFFFFF";
let theRightっSymbolOnColor = "#FFFFFF";
let theRightっSymbolOffColor = "#FFFFFF";
let theRightおSymbolOnColor = "#FFFFFF";
let theRightおSymbolOffColor = "#FFFFFF";
let theRight1SymbolOnColor = "#FFFFFF";
let theRight1SymbolOffColor = "#FFFFFF";
let theRightうSymbolOnColor = "#FFFFFF";
let theRightうSymbolOffColor = "#FFFFFF";
let theRightいSymbolOnColor = "#FFFFFF";
let theRightいSymbolOffColor = "#FFFFFF";
let theRight2SymbolOnColor = "#FFFFFF";
let theRight2SymbolOffColor = "#FFFFFF";
let theRightさSymbolOnColor = "#FFFFFF";
let theRightさSymbolOffColor = "#FFFFFF";
let theRightかSymbolOnColor = "#FFFFFF";
let theRightかSymbolOffColor = "#FFFFFF";
let theRight3SymbolOnColor = "#FFFFFF";
let theRight3SymbolOffColor = "#FFFFFF";
let theRightなSymbolOnColor = "#FFFFFF";
let theRightなSymbolOffColor = "#FFFFFF";
let theRightたSymbolOnColor = "#FFFFFF";
let theRightたSymbolOffColor = "#FFFFFF";
let theRight4SymbolOnColor = "#FFFFFF";
let theRight4SymbolOffColor = "#FFFFFF";
let theStarSymbolOnColor = "#FFFFFF";
let theStarSymbolOffColor = "#FFFFFF";
let theLeftっSymbolOnColor = "#FFFFFF";
let theLeftっSymbolOffColor = "#FFFFFF";
let theLeftおSymbolOnColor = "#FFFFFF";
let theLeftおSymbolOffColor = "#FFFFFF";
let theLeft1SymbolOnColor = "#FFFFFF";
let theLeft1SymbolOffColor = "#FFFFFF";
let theLeftうSymbolOnColor = "#FFFFFF";
let theLeftうSymbolOffColor = "#FFFFFF";
let theLeftいSymbolOnColor = "#FFFFFF";
let theLeftいSymbolOffColor = "#FFFFFF";
let theLeft2SymbolOnColor = "#FFFFFF";
let theLeft2SymbolOffColor = "#FFFFFF";
let theLeftさSymbolOnColor = "#FFFFFF";
let theLeftさSymbolOffColor = "#FFFFFF";
let theLeftかSymbolOnColor = "#FFFFFF";
let theLeftかSymbolOffColor = "#FFFFFF";
let theLeft3SymbolOnColor = "#FFFFFF";
let theLeft3SymbolOffColor = "#FFFFFF";
let theLeftなSymbolOnColor = "#FFFFFF";
let theLeftなSymbolOffColor = "#FFFFFF";
let theLeftたSymbolOnColor = "#FFFFFF";
let theLeftたSymbolOffColor = "#FFFFFF";
let theLeft4SymbolOnColor = "#FFFFFF";
let theLeft4SymbolOffColor = "#FFFFFF";
let theLeftKagikakkoSymbolOnColor = "#FFFFFF";
let theLeftKagikakkoSymbolOffColor = "#FFFFFF";
let the漢SymbolOnColor = "#FFFFFF";
let the漢SymbolOffColor = "#FFFFFF";
class JapaneseStenoDiagram extends Component {
  render() {
    let diagramWidth = this.props.diagramWidth || 140;
    let svgDiagramID = this.props.id || "stenoDiagram";
    return (
      <svg id={svgDiagramID} width={diagramWidth} viewBox="0 0 202 108" xmlns="http://www.w3.org/2000/svg" aria-hidden={hidden} className={this.props.classes}>
        <g id={"stenoboard-" + this.props.brief } fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
          <g fillRule="nonzero" transform="translate(1 2)">
            <rect height="24" id="theカ" width="20" fill={this.props.theカ ? theカOnColor : theカOffColor} rx="4" stroke={theカStrokeColor} x="126" y="81"/>
            <rect height="24" id="theRightKagikakko" width="20" fill={this.props.theRightKagikakko ? theRightKagikakkoOnColor : theRightKagikakkoOffColor} rx="4" stroke={theRightKagikakkoStrokeColor} x="104" y="81"/>
            <rect height="24" id="theRightっ" width="20" fill={this.props.theRightっ ? theRightっOnColor : theRightっOffColor} rx="4" stroke={theRightっStrokeColor} x="180" y="51"/>
            <rect height="26" id="theRightお" width="20" fill={this.props.theRightお ? theRightおOnColor : theRightおOffColor} rx="4" stroke={theRightおStrokeColor} x="180" y="22"/>
            <rect height="19" id="theRight1" width="20" fill={this.props.theRight1 ? theRight1OnColor : theRight1OffColor} rx="4" stroke={theRight1StrokeColor} x="180" y="0"/>
            <rect height="24" id="theRightう" width="20" fill={this.props.theRightう ? theRightうOnColor : theRightうOffColor} rx="4" stroke={theRightうStrokeColor} x="158" y="51"/>
            <rect height="26" id="theRightい" width="20" fill={this.props.theRightい ? theRightいOnColor : theRightいOffColor} rx="4" stroke={theRightいStrokeColor} x="158" y="22"/>
            <rect height="19" id="theRight2" width="20" fill={this.props.theRight2 ? theRight2OnColor : theRight2OffColor} rx="4" stroke={theRight2StrokeColor} x="158" y="0"/>
            <rect height="24" id="theRightさ" width="20" fill={this.props.theRightさ ? theRightさOnColor : theRightさOffColor} rx="4" stroke={theRightさStrokeColor} x="136" y="51"/>
            <rect height="26" id="theRightか" width="20" fill={this.props.theRightか ? theRightかOnColor : theRightかOffColor} rx="4" stroke={theRightかStrokeColor} x="136" y="22"/>
            <rect height="19" id="theRight3" width="20" fill={this.props.theRight3 ? theRight3OnColor : theRight3OffColor} rx="4" stroke={theRight3StrokeColor} x="136" y="0"/>
            <rect height="24" id="theRightな" width="20" fill={this.props.theRightな ? theRightなOnColor : theRightなOffColor} rx="4" stroke={theRightなStrokeColor} x="114" y="51"/>
            <rect height="26" id="theRightた" width="20" fill={this.props.theRightた ? theRightたOnColor : theRightたOffColor} rx="4" stroke={theRightたStrokeColor} x="114" y="22"/>
            <rect height="19" id="theRight4" width="20" fill={this.props.theRight4 ? theRight4OnColor : theRight4OffColor} rx="4" stroke={theRight4StrokeColor} x="114" y="0"/>
            <rect height="75" id="theStar" width="20" fill={this.props.theStar ? theStarOnColor : theStarOffColor} rx="4" stroke={theStarStrokeColor} x="90" y="0"/>
            <rect height="24" id="theLeftっ" width="20" fill={this.props.theLeftっ ? theLeftっOnColor : theLeftっOffColor} rx="4" stroke={theLeftっStrokeColor} x="0" y="51"/>
            <rect height="26" id="theLeftお" width="20" fill={this.props.theLeftお ? theLeftおOnColor : theLeftおOffColor} rx="4" stroke={theLeftおStrokeColor} x="0" y="22"/>
            <rect height="19" id="theLeft1" width="20" fill={this.props.theLeft1 ? theLeft1OnColor : theLeft1OffColor} rx="4" stroke={theLeft1StrokeColor} x="0" y="0"/>
            <rect height="24" id="theLeftう" width="20" fill={this.props.theLeftう ? theLeftうOnColor : theLeftうOffColor} rx="4" stroke={theLeftうStrokeColor} x="22" y="51"/>
            <rect height="26" id="theLeftい" width="20" fill={this.props.theLeftい ? theLeftいOnColor : theLeftいOffColor} rx="4" stroke={theLeftいStrokeColor} x="22" y="22"/>
            <rect height="19" id="theLeft2" width="20" fill={this.props.theLeft2 ? theLeft2OnColor : theLeft2OffColor} rx="4" stroke={theLeft2StrokeColor} x="22" y="0"/>
            <rect height="24" id="theLeftさ" width="20" fill={this.props.theLeftさ ? theLeftさOnColor : theLeftさOffColor} rx="4" stroke={theLeftさStrokeColor} x="44" y="51"/>
            <rect height="26" id="theLeftか" width="20" fill={this.props.theLeftか ? theLeftかOnColor : theLeftかOffColor} rx="4" stroke={theLeftかStrokeColor} x="44" y="22"/>
            <rect height="19" id="theLeft3" width="20" fill={this.props.theLeft3 ? theLeft3OnColor : theLeft3OffColor} rx="4" stroke={theLeft3StrokeColor} x="44" y="0"/>
            <rect height="24" id="theLeftな" width="20" fill={this.props.theLeftな ? theLeftなOnColor : theLeftなOffColor} rx="4" stroke={theLeftなStrokeColor} x="66" y="51"/>
            <rect height="26" id="theLeftた" width="20" fill={this.props.theLeftた ? theLeftたOnColor : theLeftたOffColor} rx="4" stroke={theLeftたStrokeColor} x="66" y="22"/>
            <rect height="19" id="theLeft4" width="20" fill={this.props.theLeft4 ? theLeft4OnColor : theLeft4OffColor} rx="4" stroke={theLeft4StrokeColor} x="66" y="0"/>
            <rect height="24" id="theLeftKagikakko" width="20" fill={this.props.theLeftKagikakko ? theLeftKagikakkoOnColor : theLeftKagikakkoOffColor} rx="4" stroke={theLeftKagikakkoStrokeColor} x="76" y="81"/>
            <rect height="24" id="the漢" width="20" fill={this.props.the漢 ? the漢OnColor : the漢OffColor} rx="4" stroke={the漢StrokeColor} x="54" y="81"/>
            <path id="theカSymbol" d="M133.76 86.2h2.08q0 1.28-.048 2.4h6.08v1.648q0 2.465-.096 4.08t-.28 2.656-.552 1.56-.808.704q-.44.184-1.144.184-1.056 0-3.296-.224l.176-1.936q1.648.16 2.48.16.512 0 .76-.376t.384-1.696.136-4.072v-.768h-3.968q-.32 3.425-1.392 5.48t-3.248 3.736l-1.344-1.472q1.824-1.392 2.712-3.072t1.192-4.672h-3.776V88.6h3.904q.048-1.104.048-2.4" fill={this.props.theカSymbol ? theカSymbolOnColor : theカSymbolOffColor}/>
            <path id="theRightKagikakkoSymbol" d="M114.648 87.488h2.032v12.224h-6.672V98h4.64z" fill={this.props.theRightKagikakkoSymbol ? theRightKagikakkoSymbolOnColor : theRightKagikakkoSymbolOffColor}/>
            <path id="theRightっSymbol" d="M184.592 62.048q3.888-.928 5.888-.928 4.928 0 4.928 4.112 0 5.184-8.416 5.184l-.144-1.824q3.456 0 4.976-.8t1.52-2.416q0-1.232-.728-1.808-.727-.576-2.328-.576-1.536 0-5.312.88z" fill={this.props.theRightっSymbol ? theRightっSymbolOnColor : theRightっSymbolOffColor}/>
            <path id="theRightおSymbol" d="M183.872 30.072h3.728v-1.984h2.032v1.984h3.52v1.696h-3.52v2.016q.608-.032.96-.032 2.368 0 3.824 1.104t1.456 2.672q0 1.888-1.16 2.976-1.16 1.087-3.432 1.344l-.432-1.808q1.535-.192 2.24-.776.704-.584.704-1.624 0-.8-.872-1.384-.871-.585-2.328-.584-.352 0-.96.032v3.328q0 1.472-.576 2.04t-2.048.568q-1.6 0-2.72-.984t-1.12-2.424q0-1.408 1.16-2.536t3.272-1.624v-2.304h-3.728zm9.792.368 1.424-1.008a42 42 0 0 1 2.48 3.648l-1.504.896a40 40 0 0 0-2.4-3.536m-6.064 5.584q-1.185.335-1.792.92-.608.585-.608 1.288 0 .624.504 1.112t1.096.488q.464 0 .632-.192t.168-.72z" fill={this.props.theRightおSymbol ? theRightおSymbolOnColor : theRightおSymbolOffColor}/>
            <path id="theRight1Symbol" d="M189.672 15V5.928h-.016l-2.8 2.56-.752-1.856 3.568-3.312h2.304V15z" fill={this.props.theRight1Symbol ? theRight1SymbolOnColor : theRight1SymbolOffColor}/>
            <path id="theRightうSymbol" d="M161.856 62.64a38 38 0 0 1 3.896-.776q2.024-.296 3.416-.296 2.496 0 3.704.952t1.208 2.52q0 2.415-2.272 3.92t-6.688 1.84l-.4-1.888q3.696-.368 5.464-1.36t1.768-2.4q0-1.665-2.88-1.664-2.32 0-6.768 1.024zm2.24-3.248.24-1.872q3.825.528 7.456.528v1.92q-3.52 0-7.696-.576" fill={this.props.theRightうSymbol ? theRightうSymbolOnColor : theRightうSymbolOffColor}/>
            <path id="theRightいSymbol" d="m170.56 30.248 1.968-.576q2.192 4.416 2.192 10.368h-2.128q0-2.576-.536-5.136t-1.496-4.656m-6.032-.224q-.736 2.527-.736 5.376 0 1.776.568 2.992t1.128 1.216q.4 0 1.072-.912.671-.912 1.328-2.608l1.872.72q-.8 2.32-2.048 3.632t-2.384 1.312q-1.36 0-2.52-1.856t-1.16-4.496q0-3.008.8-5.616z" fill={this.props.theRightいSymbol ? theRightいSymbolOnColor : theRightいSymbolOffColor}/>
            <path id="theRight2Symbol" d="M164.296 13.192q2.192-1.712 3.368-2.872 1.177-1.16 1.576-1.928a3.4 3.4 0 0 0 .4-1.6q0-1.776-1.904-1.776-1.344 0-3.056 1.104l-.592-1.792a6.6 6.6 0 0 1 1.864-.856 7.5 7.5 0 0 1 2.104-.312q1.871 0 2.888.904t1.016 2.504q0 1.504-.952 2.896-.953 1.392-3.72 3.696v.032h4.688V15h-7.68z" fill={this.props.theRight2Symbol ? theRight2SymbolOnColor : theRight2SymbolOffColor}/>
            <path id="theRightさSymbol" d="m147.744 63.6.016-.016q-.56-1.135-.896-2.592a282 282 0 0 1-7.312.096V59.28q3.472 0 6.992-.096-.128-.975-.176-1.92l2.032-.128q.048 1.153.16 1.984 2.56-.096 3.888-.16l.064 1.808q-1.2.064-3.632.16.496 2 1.856 4.128l-1.936.976q-1.728-1.152-3.712-1.152-1.215 0-1.888.488a1.55 1.55 0 0 0-.672 1.32q0 1.104.992 1.704t2.96.6q1.76 0 3.888-.432l.336 1.808a20.3 20.3 0 0 1-4.224.432q-3.072 0-4.576-1.152t-1.504-3.056q0-1.6 1.216-2.56t3.376-.96q1.408 0 2.752.528" fill={this.props.theRightさSymbol ? theRightさSymbolOnColor : theRightさSymbolOffColor}/>
            <path id="theRightかSymbol" d="m142.672 41 .56-1.84q1.695.608 2.4.608.272 0 .496-.4t.392-1.416.168-2.504q0-1.92-.168-2.24t-1.208-.32h-1.664a60 60 0 0 1-2.88 8.992l-1.808-.64a64.5 64.5 0 0 0 2.656-8.352h-2.448V31.08h2.864q.368-1.745.608-3.216l1.92.176a45 45 0 0 1-.528 3.04h2.28q.408 0 .904.096.495.096.68.16.184.064.432.368t.296.544.128.856.08 1.128v1.536q0 3.072-.752 4.528t-2.032 1.456q-.625 0-1.6-.216a11.4 11.4 0 0 1-1.776-.536m6.4-10.544 1.936-.576a65 65 0 0 1 2.624 8.064l-1.968.48a63 63 0 0 0-2.592-7.968" fill={this.props.theRightかSymbol ? theRightかSymbolOnColor : theRightかSymbolOffColor}/>
            <path id="theRight3Symbol" d="M142.264 3.32h7.488v1.808l-3.28 2.976v.032h.272q1.472 0 2.32.84t.848 2.344q0 1.84-1.12 2.84t-3.2 1q-1.872 0-3.408-.848l.576-1.76q1.488.8 2.736.8 1.056 0 1.632-.512.576-.511.576-1.488 0-.896-.648-1.288t-2.28-.392h-.96v-1.6l3.2-2.912v-.032h-4.752z" fill={this.props.theRight3Symbol ? theRight3SymbolOnColor : theRight3SymbolOffColor}/>
            <path id="theRightなSymbol" d="M130.88 61.312q-1.328-.225-2.752-.272v5.136q1.392.864 3.072 2.4l-1.264 1.408a60 60 0 0 0-1.904-1.584q-.24 1.296-1.136 1.904t-2.512.608q-1.776 0-2.776-.816t-1-2.224q0-1.376.984-2.184t2.792-.808q.816 0 1.712.304v-6.016q2.832 0 5.024.32zm-13.808-.32v-1.824h2.736q.352-1.36.56-2.256l1.92.256a35 35 0 0 1-.48 2h2.672v1.824h-3.152a74 74 0 0 1-2.768 8.016l-1.856-.624a82 82 0 0 0 2.592-7.392zm9.024 6.096q-.945-.48-1.712-.48-.88 0-1.32.336t-.44.928q0 .624.464.976t1.296.352q.976 0 1.344-.4t.368-1.52z" fill={this.props.theRightなSymbol ? theRightなSymbolOnColor : theRightなSymbolOffColor}/>
            <path id="theRightたSymbol" d="M130.208 34.792q-3.408 0-6.464.368l-.128-1.792a57 57 0 0 1 6.592-.368zm.128 4.72.24 1.808q-1.712.32-3.376.32-2.208 0-3.528-.808-1.32-.809-1.32-2.072 0-1.232 1.6-2.48l1.456.928q-.624.528-.832.808t-.208.536q0 .56.76.92t2.072.36q1.425 0 3.136-.32M117.6 31.72v-1.808h2.544q.224-1.28.336-1.936l2.032.176q-.192 1.184-.304 1.76h5.584v1.808h-5.936a82 82 0 0 1-2.72 10.208l-2.016-.464a81 81 0 0 0 2.656-9.744z" fill={this.props.theRightたSymbol ? theRightたSymbolOnColor : theRightたSymbolOffColor}/>
            <path id="theRight4Symbol" d="M124.488 10.84V6.248h-.032l-3.168 4.56v.032zm2.16 0h1.792v1.76h-1.792V15h-2.16v-2.4h-5.28v-1.76l5.28-7.52h2.16z" fill={this.props.theRight4Symbol ? theRight4SymbolOnColor : theRight4SymbolOffColor}/>
            <path id="theStarSymbol" d="m103.872 34.232-2.288.672 1.456 1.904-1.408 1.008-1.344-1.968-1.344 1.968-1.408-1.008 1.472-1.904-2.304-.672.528-1.648 2.256.816-.064-2.4h1.728l-.064 2.4 2.256-.816z" fill={this.props.theStarSymbol ? theStarSymbolOnColor : theStarSymbolOffColor}/>
            <path id="theLeftっSymbol" d="M4.592 62.048q3.888-.928 5.888-.928 4.928 0 4.928 4.112 0 5.184-8.416 5.184l-.144-1.824q3.456 0 4.976-.8t1.52-2.416q0-1.232-.728-1.808-.727-.576-2.328-.576-1.536 0-5.312.88z" fill={this.props.theLeftっSymbol ? theLeftっSymbolOnColor : theLeftっSymbolOffColor}/>
            <path id="theLeftおSymbol" d="M3.872 30.072H7.6v-1.984h2.032v1.984h3.52v1.696h-3.52v2.016q.607-.032.96-.032 2.368 0 3.824 1.104t1.456 2.672q0 1.888-1.16 2.976-1.16 1.087-3.432 1.344l-.432-1.808q1.535-.192 2.24-.776.704-.584.704-1.624 0-.8-.872-1.384-.871-.585-2.328-.584-.352 0-.96.032v3.328q0 1.472-.576 2.04t-2.048.568q-1.6 0-2.72-.984t-1.12-2.424q0-1.408 1.16-2.536T7.6 34.072v-2.304H3.872zm9.792.368 1.424-1.008a42 42 0 0 1 2.48 3.648l-1.504.896a40 40 0 0 0-2.4-3.536M7.6 36.024q-1.185.335-1.792.92-.608.585-.608 1.288 0 .624.504 1.112t1.096.488q.465 0 .632-.192.168-.192.168-.72z" fill={this.props.theLeftおSymbol ? theLeftおSymbolOnColor : theLeftおSymbolOffColor}/>
            <path id="theLeft1Symbol" d="M9.672 15V5.928h-.016l-2.8 2.56-.752-1.856L9.672 3.32h2.304V15z" fill={this.props.theLeft1Symbol ? theLeft1SymbolOnColor : theLeft1SymbolOffColor}/>
            <path id="theLeftうSymbol" d="M25.856 62.64a38 38 0 0 1 3.896-.776q2.024-.296 3.416-.296 2.496 0 3.704.952t1.208 2.52q0 2.415-2.272 3.92T29.12 70.8l-.4-1.888q3.696-.368 5.464-1.36t1.768-2.4q0-1.665-2.88-1.664-2.32 0-6.768 1.024zm2.24-3.248.24-1.872q3.825.528 7.456.528v1.92q-3.52 0-7.696-.576" fill={this.props.theLeftうSymbol ? theLeftうSymbolOnColor : theLeftうSymbolOffColor}/>
            <path id="theLeftいSymbol" d="m34.56 30.248 1.968-.576q2.192 4.416 2.192 10.368h-2.128q0-2.576-.536-5.136t-1.496-4.656m-6.032-.224q-.736 2.527-.736 5.376 0 1.776.568 2.992.569 1.216 1.128 1.216.4 0 1.072-.912.671-.912 1.328-2.608l1.872.72q-.8 2.32-2.048 3.632t-2.384 1.312q-1.36 0-2.52-1.856t-1.16-4.496q0-3.008.8-5.616z" fill={this.props.theLeftいSymbol ? theLeftいSymbolOnColor : theLeftいSymbolOffColor}/>
            <path id="theLeft2Symbol" d="M28.296 13.192q2.192-1.712 3.368-2.872 1.177-1.16 1.576-1.928a3.4 3.4 0 0 0 .4-1.6q0-1.776-1.904-1.776-1.344 0-3.056 1.104l-.592-1.792a6.6 6.6 0 0 1 1.864-.856 7.5 7.5 0 0 1 2.104-.312q1.871 0 2.888.904t1.016 2.504q0 1.504-.952 2.896-.953 1.392-3.72 3.696v.032h4.688V15h-7.68z" fill={this.props.theLeft2Symbol ? theLeft2SymbolOnColor : theLeft2SymbolOffColor}/>
            <path id="theLeftさSymbol" d="m55.744 63.6.016-.016q-.56-1.135-.896-2.592a282 282 0 0 1-7.312.096V59.28q3.472 0 6.992-.096-.128-.975-.176-1.92l2.032-.128q.048 1.153.16 1.984 2.56-.096 3.888-.16l.064 1.808q-1.2.064-3.632.16.496 2 1.856 4.128l-1.936.976q-1.728-1.152-3.712-1.152-1.215 0-1.888.488a1.55 1.55 0 0 0-.672 1.32q0 1.104.992 1.704t2.96.6q1.76 0 3.888-.432l.336 1.808a20.3 20.3 0 0 1-4.224.432q-3.072 0-4.576-1.152T48.4 66.592q0-1.6 1.216-2.56t3.376-.96q1.408 0 2.752.528" fill={this.props.theLeftさSymbol ? theLeftさSymbolOnColor : theLeftさSymbolOffColor}/>
            <path id="theLeftかSymbol" d="m50.672 41 .56-1.84q1.695.608 2.4.608.272 0 .496-.4t.392-1.416.168-2.504q0-1.92-.168-2.24t-1.208-.32h-1.664a60 60 0 0 1-2.88 8.992l-1.808-.64a64.5 64.5 0 0 0 2.656-8.352h-2.448V31.08h2.864q.368-1.745.608-3.216l1.92.176a45 45 0 0 1-.528 3.04h2.28q.408 0 .904.096.495.096.68.16.184.064.432.368t.296.544.128.856.08 1.128v1.536q0 3.072-.752 4.528t-2.032 1.456q-.625 0-1.6-.216A11.4 11.4 0 0 1 50.672 41m6.4-10.544 1.936-.576a65 65 0 0 1 2.624 8.064l-1.968.48a63 63 0 0 0-2.592-7.968" fill={this.props.theLeftかSymbol ? theLeftかSymbolOnColor : theLeftかSymbolOffColor}/>
            <path id="theLeft3Symbol" d="M50.264 3.32h7.488v1.808l-3.28 2.976v.032h.272q1.472 0 2.32.84t.848 2.344q0 1.84-1.12 2.84t-3.2 1q-1.872 0-3.408-.848l.576-1.76q1.488.8 2.736.8 1.056 0 1.632-.512.576-.511.576-1.488 0-.896-.648-1.288t-2.28-.392h-.96v-1.6l3.2-2.912v-.032h-4.752z" fill={this.props.theLeft3Symbol ? theLeft3SymbolOnColor : theLeft3SymbolOffColor}/>
            <path id="theLeftなSymbol" d="M82.88 61.312q-1.328-.225-2.752-.272v5.136q1.392.864 3.072 2.4l-1.264 1.408a60 60 0 0 0-1.904-1.584q-.24 1.296-1.136 1.904t-2.512.608q-1.776 0-2.776-.816t-1-2.224q0-1.376.984-2.184t2.792-.808q.816 0 1.712.304v-6.016q2.832 0 5.024.32zm-13.808-.32v-1.824h2.736q.352-1.36.56-2.256l1.92.256a35 35 0 0 1-.48 2h2.672v1.824h-3.152a74 74 0 0 1-2.768 8.016l-1.856-.624a82 82 0 0 0 2.592-7.392zm9.024 6.096q-.945-.48-1.712-.48-.88 0-1.32.336t-.44.928q0 .624.464.976t1.296.352q.976 0 1.344-.4t.368-1.52z" fill={this.props.theLeftなSymbol ? theLeftなSymbolOnColor : theLeftなSymbolOffColor}/>
            <path id="theLeftたSymbol" d="M82.208 34.792q-3.408 0-6.464.368l-.128-1.792A57 57 0 0 1 82.208 33zm.128 4.72.24 1.808q-1.712.32-3.376.32-2.208 0-3.528-.808-1.32-.809-1.32-2.072 0-1.232 1.6-2.48l1.456.928q-.624.528-.832.808t-.208.536q0 .56.76.92t2.072.36q1.425 0 3.136-.32M69.6 31.72v-1.808h2.544q.224-1.28.336-1.936l2.032.176q-.192 1.184-.304 1.76h5.584v1.808h-5.936a82 82 0 0 1-2.72 10.208l-2.016-.464a81 81 0 0 0 2.656-9.744z" fill={this.props.theLeftたSymbol ? theLeftたSymbolOnColor : theLeftたSymbolOffColor}/>
            <path id="theLeft4Symbol" d="M76.488 10.84V6.248h-.032l-3.168 4.56v.032zm2.16 0h1.792v1.76h-1.792V15h-2.16v-2.4h-5.28v-1.76l5.28-7.52h2.16z" fill={this.props.theLeft4Symbol ? theLeft4SymbolOnColor : theLeft4SymbolOffColor}/>
            <path id="theLeftKagikakkoSymbol" d="M85.352 98.992H83.32V86.768h6.672v1.712h-4.64z" fill={this.props.theLeftKagikakkoSymbol ? theLeftKagikakkoSymbolOnColor : theLeftKagikakkoSymbolOffColor}/>
            <path id="the漢Symbol" d="M64.8 89.096h2.512v-.624H64.8zm.128 5.92h-4.304q-.128.449-.208.672h4.448a3.3 3.3 0 0 0 .064-.56zm.032-4.624h-1.84v1.216h1.84zm2.08 0v1.216h1.824v-1.216zm-7.84 3.072a34 34 0 0 0-2.96-2.448l1.184-1.424q1.376.976 2.96 2.416zm11.952-6.624v1.632h-1.92v.624h1.616v3.792h-3.792v.56h3.984v1.568h-3.984v.112q0 .288.048.56h4.144v1.616h-3.232q1.024.945 3.376 1.52l-.752 1.664a7.5 7.5 0 0 1-2.616-1.096q-1.224-.808-1.976-1.88-.88 1.072-2.256 1.888a8.6 8.6 0 0 1-2.912 1.088l-.784-1.616q2.576-.544 3.776-1.568h-3.616v-1.12q-.832 2.4-2.016 4.208l-1.696-1.072q1.424-2.24 2.352-5.04l1.584.624v-1.456h4.448v-.56H61.2v-3.792h1.68v-.624h-2.352l-.992 1.2a33 33 0 0 0-2.656-2.176l1.184-1.424a37 37 0 0 1 2.384 1.888v-1.12h2.432v-1.072h1.92v1.072h2.512v-1.072h1.92v1.072z" fill={this.props.the漢Symbol ? the漢SymbolOnColor : the漢SymbolOffColor}/>
          </g>
        </g>
      </svg>
    );
  }
}

export default JapaneseStenoDiagram;
