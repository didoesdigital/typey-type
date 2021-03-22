import {
  addOutlinesToWordsInCombinedDict,
  chooseOutlineForPhrase,
  createStrokeHintForPhrase,
  generateListOfWordsAndStrokes,
  rankOutlines
} from './transformingDictionaries';

let globalLookupDictionary = new Map([
  ["{^^}", [["TK-LS", "typey-type.json"]]],
  ["example", [["KP-PL", "typey-type.json"]]],
  ["{^}™", [["TR*PL", "typey-type.json"], ["SPWO*L/TRAEUD/PHARBG", "typey-type.json"]]],
  ["™", [["PHOEPBLG/T*/PH*", "emoji.json"]]],
  ["<{^}", [["PWRABG", "typey-type.json"]]],
  ["<", [["HR*PB", "typey-type.json"]]],
  ["#{^}", [["HAERB", "typey-type.json"]]],
  // ["${^}", [["TK-PL", "typey-type.json"]]],
  ["$", [["TPHRORB", "typey-type.json"]]],
  ["--{^}", [["H-PBZ", "typey-type.json"]]],
  ["-{^}", [["H-PBS", "typey-type.json"]]],
  ["-", [["H*B", "typey-type.json"]]],
  ["{^-^}", [["H-PB", "typey-type.json"]]],
  ["<a href=\"{^}", [["A/HREF", "plover.json"]]],
  ["Object.{^}", [["O*B/P-P", "react.json"]]],
  ["\\{{^}", [["TPR-BGT", "typey-type.json"]]],
  ["flash[:{^}", [["TPHRARB/PWR-BGT", "ruby.json"]]],
  ["{>}http://{^}", [["HAOEPT", "typey-type.json"]]],
  ["{&%}", [["P*ERS", "typey-type.json"]]],
  ["{^}{#F1}{^}", [["1-BGS", "typey-type.json"]]],
  ["{^}:{^}", [["KHR-PB", "typey-type.json"]]],
  ["{^}^{^}", [["KR-RT", "typey-type.json"]]],
  ["{^}({^}", [["P*PB", "typey-type.json"]]],
  ["{~|‘^}", [["TP-P/TP-P", "typey-type.json"]]],
  ["{^~|’}", [["TP-L/TP-L", "typey-type.json"]]],
  ["{~|“^}", [["KW-GS/KW-GS", "typey-type.json"]]],
  ["{^~|”}", [["KR-GS/KR-GS", "typey-type.json"]]],
  ["a", [["AEU", "typey-type.json"]]],
  ["I", [["EU", "typey-type.json"]]],
  ["{^ ^}", [["S-P", "typey-type.json"]]],
  ["{?}", [["H-F", "typey-type.json"]]],
  ["?", [["KWEZ", "typey-type.json"]]],
  ["{,}", [["KW-BG", "typey-type.json"]]],
  ["{.}", [["TP-PL", "typey-type.json"]]],
  [".", [["PR-D", "typey-type.json"]]],
  ["Tom", [["TOPL", "typey-type.json"]]],
  ["heather", [["H*ET/*ER", "typey-type.json"]]],
  ["Tuesday", [["TAOUZ", "typey-type.json"]]],
  ["first", [["TPEUFRT", "typey-type.json"]]],
  ["3D", [["30*EUD", "typey-type.json"]]],
  ["address", [["A/TKRES", "typey-type.json"]]],
  ["bed", [["PWED", "typey-type.json"]]],
  ["bed,", [["PWED KW-BG", "typey-type.json"]]],
  ["man", [["PHAPB", "typey-type.json"]]],
  ["{!}", [["SKHRAPL", "typey-type.json"]]],
  ["and again", [["STKPWEPBG", "typey-type.json"]]],
  ["and", [["SKP", "typey-type.json"], ["APBD", "plover.json"]]],
  ["again", [["TKPWEPB", "typey-type.json"]]],
  ["media", [["PHO*EUD", "typey-type.json"]]],
  ["query", [["KWAOER/REU", "typey-type.json"]]],
  ["Sinatra", [["STPHAT/RA", "typey-type.json"]]],
  ["{^'}", [["AE", "typey-type.json"]]],
  ["push", [["PURB", "typey-type.json"]]],
  ["origin", [["O*RPBLG", "typey-type.json"]]],
  ["master", [["PHAFRT", "typey-type.json"]]],
  ["diff", [["TKEUF", "typey-type.json"]]],
  ["{--}", [["TK*RB", "typey-type.json"]]],
  ["cached", [["KAERBD", "typey-type.json"]]],
  ["{^>^}", [["A*EPBG", "typey-type.json"]]],
  ["{^<^}", [["AEPBG", "typey-type.json"]]],
  ["{^/^}", [["OEU", "typey-type.json"]]],
  ["title", [["TAOEULT", "typey-type.json"]]],
  ["learn", [["HRERPB", "typey-type.json"]]],
  ["oh{,}", [["OERBGS", "typey-type.json"]]],
  ["{,}like{,}", [["HRAO*EUBG", "typey-type.json"]]],
  ["lent", [["HREPBT", "typey-type.json"]]],
  ["scroll", [["SKROL", "typey-type.json"]]],
  ["farmer", [["TPAR/PHER", "typey-type.json"]]],
  ["{^~|\"}", [["KR-GS", "typey-type.json"]]],
  ["{~|\"^}", [["KW-GS", "typey-type.json"]]],
  ["it", [["T", "typey-type.json"]]],
  ["be", [["-B", "typey-type.json"]]],
  ["{be^}", [["BE", "typey-type.json"]]],
  ["{quasi-^}", [["KWAS/KWREU", "typey-type.json"]]],
  ["quasi", [["KWA/SEU", "typey-type.json"]]],
  ["experimental", [["SPAOERL", "typey-type.json"]]],
  ["{gly-^}", [["TKPWHRAOEU", "typey-type.json"]]],
  ["oxide", [["KPAOEUD", "typey-type.json"]]],
  ["{^ectomy}", [["EBGT/PHEU", "typey-type.json"]]],
  ["said", [["SAEUD", "typey-type.json"]]],
  ["computer", [["KPAOUR", "typey-type.json"]]],
  ["cat", [["KAT", "typey-type.json"]]],
  ["kettle", [["KET/*L", "typey-type.json"]]],
  ["can", [["K", "typey-type.json"]]],
  ["can't", [["K-PBT", "typey-type.json"]]],
  ["houses", [["HO*UFS", "typey-type.json"]]],
  ["her", [["HER", "typey-type.json"]]],
  ["long", [["HROPBG", "typey-type.json"]]],
  ["narrate", [["TPHAR/AEUT", "typey-type.json"]]],
  ["seethe", [["SAO*ET", "typey-type.json"]]],
  ["you", [["U", "typey-type.json"]]],
  ["store", [["STOR", "typey-type.json"]]],
  ["room", [["RAOPL", "typey-type.json"]]],
  ["{^room}", [["RAO*PL", "typey-type.json"]]],
  ["outside", [["OUDZ", "typey-type.json"]]],
  ["hit", [["HEUT", "typey-type.json"]]],
  ["miss", [["PHEUS", "typey-type.json"]]],
  ["hit-and-miss", [["H-PLS", "typey-type.json"]]],
  // ["buffet", [["PWUF/ET", "typey-type.json"]]],
  ["wandering", [["WAPBGD", "typey-type.json"],["WAPB/TKER/-G", "typey-type.json"]]], // currently pre-sorted to best stroke first
  ["lodge", [["HROPBLG", "typey-type.json"]]],
  ["isn't", [["S-PBT", "typey-type.json"]]],
  ["maiden", [["PHAEUD/*EPB", "typey-type.json"], ["PHAEUD/EPB", "typey-type.json"]]],

  ["$100", [["1-9DZ", "typey-type.json"], ["1-DZ", "typey-type.json"]]],
  ["$200", [["2-DZ", "typey-type.json"]]],
  ["$300", [["3-DZ", "typey-type.json"]]],
  ["$400", [["4-DZ", "typey-type.json"]]],
  ["$45", [["#45/TK-PL", "typey-type.json"], ["45/TK-PL", "typey-type.json"]]],
  ["$500", [["5DZ", "typey-type.json"]]],
  ["$600", [["-6DZ", "typey-type.json"]]],
  ["$700", [["-7DZ", "typey-type.json"]]],
  ["0", [["0EU", "typey-type.json"]]],
  ["00", [["#-Z", "typey-type.json"]]],
  ["01", [["10*EU", "typey-type.json"], ["10EU", "typey-type.json"]]],
  ["02", [["20EU", "typey-type.json"]]],
  ["03", [["30EU", "typey-type.json"]]],
  ["04", [["40EU", "typey-type.json"]]],
  ["05", [["50EU", "typey-type.json"]]],
  ["1 tablespoon", [["1/TPW-S", "typey-type.json"]]],
  ["1,000", [["#S/W-B/THUZ", "typey-type.json"], ["1/THO*EUPB", "typey-type.json"], ["1/THOEUB", "typey-type.json"], ["TPHOUZ", "typey-type.json"]]],
  ["1/2", [["HA*F", "typey-type.json"], ["TPHA*F", "typey-type.json"]]],
  ["1/3", [["130EU", "typey-type.json"], ["TH*EURD", "typey-type.json"]]],
  ["1/4", [["140EU", "typey-type.json"], ["KWA*RT", "typey-type.json"]]],
  ["1/8", [["10EU8", "typey-type.json"]]],
  ["10 percentage", [["10/PERS/APBLG", "typey-type.json"]]],
  ["10", [["1/0", "typey-type.json"]]],
  ["10%", [["10/P*ERS", "typey-type.json"]]],
  ["10,000", [["#SO/W-B/THUZ", "typey-type.json"]]],
  ["100", [["1-Z", "typey-type.json"], ["TPHUPBZ", "typey-type.json"]]],
  ["1000", [["1/THOUZ", "typey-type.json"]]],
  ["1001", [["1-DZ/1", "typey-type.json"]]],
  ["101", [["10/1", "typey-type.json"]]],
  ["10th", [["10/*PBT", "typey-type.json"], ["10/*T", "typey-type.json"]]],
  ["11", [["1-D", "typey-type.json"]]],
  ["11:00", [["1BGD", "typey-type.json"]]],
  ["11th", [["1-D/*T", "typey-type.json"]]],
  ["12", [["1/2", "typey-type.json"]]],
  ["12-in-1", [["12/TPH/1", "typey-type.json"]]],
  ["121", [["12/1", "typey-type.json"]]],
  ["125", [["12R5", "typey-type.json"]]],
  ["12:00", [["12-BG", "typey-type.json"]]],
  ["12th", [["12/*T", "typey-type.json"]]],
  ["13", [["1/3", "typey-type.json"]]],
  ["14", [["14", "typey-type.json"], ["14*", "typey-type.json"]]],
  ["15", [["1/5", "typey-type.json"]]],
  ["16", [["1/6", "typey-type.json"]]],
  ["17", [["1/7", "typey-type.json"]]],
  ["18", [["1/8", "typey-type.json"]]],
  ["1850s", [["18/50/-S", "typey-type.json"]]],
  ["19", [["1-9", "typey-type.json"], ["1-9D", "typey-type.json"]]],
  ["1930s", [["19/30/-S", "typey-type.json"]]],
  ["1950", [["1-9/50", "typey-type.json"], ["1-9D/50", "typey-type.json"]]],
  ["197", [["TPHEFPBT", "typey-type.json"]]],
  ["1970", [["19/OEUP", "typey-type.json"], ["TPHEFPBD", "typey-type.json"]]],
  ["198", [["TPHAEUPBT", "typey-type.json"]]],
  ["1980", [["TPHAEUPBD", "typey-type.json"]]],
  ["1986", [["19/8/6", "typey-type.json"]]],
  ["1990", [["TPHEUPBD", "typey-type.json"]]],
  ["1:00", [["1-BG", "typey-type.json"]]],
  ["1b", [["1/PW*", "typey-type.json"]]],
  ["1st", [["1/S*/T*", "typey-type.json"]]],
  ["2 x 4", [["2/KP*/4", "typey-type.json"]]],
  ["2,000", [["#T-/W-B/THUZ", "typey-type.json"]]],
  ["2/3", [["230EU", "typey-type.json"]]],
  ["20", [["2/0", "typey-type.json"]]],
  ["200", [["2-Z", "typey-type.json"]]],
  ["2001", [["KWRAOUPB/1", "typey-type.json"], ["STWOUPB/1", "typey-type.json"]]],
  ["2007", [["TWOUPB/-P", "typey-type.json"],["TWOUPB/7", "typey-type.json"]]],
  ["2010", [["TWOUPB/10", "typey-type.json"]]],
  ["20s", [["20/-S", "typey-type.json"]]],
  ["21", [["12EU", "typey-type.json"]]],
  ["22", [["2-D", "typey-type.json"]]],
  ["23", [["2/3", "typey-type.json"]]],
  ["24", [["2/4", "typey-type.json"]]],
  ["240", [["#240", "typey-type.json"]]],
  ["25", [["2/5", "typey-type.json"]]],
  ["26", [["2/6", "typey-type.json"]]],
  ["260", [["2/6/0", "typey-type.json"]]],
  ["27", [["2/7", "typey-type.json"]]],
  ["28", [["2/8", "typey-type.json"]]],
  ["29", [["2/9", "typey-type.json"]]],
  ["2:00", [["2-BG", "typey-type.json"]]],
  ["2d", [["2/TK*", "typey-type.json"]]],
  ["2nd", [["2/*PBD", "typey-type.json"]]],
  ["2s", [["2-S", "typey-type.json"]]],
  ["3 tablespoon", [["3/T-BS", "typey-type.json"]]],
  ["3 tablespoons", [["3/T-BS/-S", "typey-type.json"]]],
  ["3 x 6", [["3/KP*/6", "typey-type.json"]]],
  ["3,000", [["#P-/W-B/THUZ", "typey-type.json"]]],
  ["3/4", [["340EU", "typey-type.json"]]],
  ["3/8", [["30EU8", "typey-type.json"]]],
  ["30", [["3/0", "typey-type.json"]]],
  ["300", [["3-Z", "typey-type.json"]]],
  ["30s", [["30*S", "typey-type.json"], ["30/-S", "typey-type.json"]]],
  ["31", [["13EU", "typey-type.json"]]],
  ["32", [["23EU", "typey-type.json"]]],
  ["33", [["3-D", "typey-type.json"]]],
  ["34", [["3/4", "typey-type.json"]]],
  ["35", [["3/5", "typey-type.json"]]],
  ["350 degree", [["PAO/TKEG", "typey-type.json"]]],
  ["36", [["3/6", "typey-type.json"]]],
  ["360 degrees", [["36/0/TKEG/-S", "typey-type.json"]]],
  ["37", [["3/7", "typey-type.json"]]],
  ["38", [["3/8", "typey-type.json"]]],
  ["39", [["3/9", "typey-type.json"]]],
  ["3:00", [["3-BG", "typey-type.json"]]],
  ["3D", [["30*EUD", "typey-type.json"]]],
  ["3rd", [["3/R*D", "typey-type.json"]]],
  ["4 tablespoons", [["4/T-BS/-S", "typey-type.json"]]],
  ["4,000", [["#H/W-B/THUZ", "typey-type.json"]]],
  ["40", [["40", "typey-type.json"], ["40*", "typey-type.json"]]],
  ["400", [["4-Z", "typey-type.json"]]],
  ["40s", [["40ES", "typey-type.json"], ["40S", "typey-type.json"]]],
  ["40{,}", [["40RBGS", "typey-type.json"]]],
  ["41", [["14EU", "typey-type.json"]]],
  ["42", [["24EU", "typey-type.json"]]],
  ["43", [["34EU", "typey-type.json"]]],
  ["44", [["4-D", "typey-type.json"]]],
  ["45", [["4/5", "typey-type.json"]]],
  ["46", [["4/6", "typey-type.json"]]],
  ["47", [["4/7", "typey-type.json"]]],
  ["48", [["4/8", "typey-type.json"]]],
  ["49", [["4/9", "typey-type.json"]]],
  ["4:00", [["4-BG", "typey-type.json"]]],
  ["4s", [["4-S", "typey-type.json"]]],
  ["4th", [["4/*T", "typey-type.json"]]],
  ["5", [["R5", "typey-type.json"]]],
  ["5%", [["TPEUF/P*ERS", "typey-type.json"]]],
  ["5,000", [["#A/W-B/THUZ", "typey-type.json"]]],
  ["5.4", [["5/-P/4", "typey-type.json"]]],
  ["5/8", [["50EU8", "typey-type.json"]]],
  ["50 cents", [["50/KREPBT/-S", "typey-type.json"]]],
  ["50", [["5/0", "typey-type.json"]]],
  ["500", [["5Z", "typey-type.json"]]],
  ["50s", [["50S", "typey-type.json"]]],
  ["51", [["15EU", "typey-type.json"]]],
  ["52", [["25*EU", "typey-type.json"], ["25EU", "typey-type.json"]]],
  ["53", [["35EU", "typey-type.json"]]],
  ["54", [["45EU", "typey-type.json"]]],
  ["55", [["5D", "typey-type.json"]]],
  ["56", [["56", "typey-type.json"]]],
  ["57", [["57", "typey-type.json"]]],
  ["58", [["58", "typey-type.json"]]],
  ["59", [["59", "typey-type.json"]]],
  ["5:00", [["5BG", "typey-type.json"]]],
  ["5th", [["5/*T", "typey-type.json"]]],
  ["6,000", [["#F/W-B/THUZ", "typey-type.json"]]],
  ["60", [["0EU6", "typey-type.json"]]],
  ["600", [["-6Z", "typey-type.json"]]],
  ["61", [["1EU6", "typey-type.json"]]],
  ["62", [["2EU6", "typey-type.json"]]],
  ["63", [["3EU6", "typey-type.json"]]],
  ["64", [["4EU6", "typey-type.json"]]],
  ["65", [["5EU6", "typey-type.json"]]],
  ["66", [["-6D", "typey-type.json"]]],
  ["67", [["67", "typey-type.json"]]],
  ["68", [["68", "typey-type.json"]]],
  ["69", [["69", "typey-type.json"]]],
  ["6:00", [["K-6", "typey-type.json"]]],
  ["6th", [["6/*T", "typey-type.json"]]],
  ["7,000", [["#-P/W-B/THUZ", "typey-type.json"]]],
  ["70", [["0EU7", "typey-type.json"]]],
  ["700", [["-7Z", "typey-type.json"]]],
  ["70s", [["0EU7S", "typey-type.json"]]],
  ["71", [["1EU7", "typey-type.json"]]],
  ["72", [["2EU7", "typey-type.json"]]],
  ["73", [["3EU7", "typey-type.json"]]],
  ["74", [["4EU7", "typey-type.json"]]],
  ["75", [["5EU7", "typey-type.json"]]],
  ["76", [["EU67", "typey-type.json"]]],
  ["77", [["-7D", "typey-type.json"]]],
  ["78", [["78", "typey-type.json"]]],
  ["79", [["79", "typey-type.json"]]],
  ["7:00", [["K-7", "typey-type.json"]]],
  ["7th", [["7/*T", "typey-type.json"]]],
  ["8,000", [["#L/W-B/THUZ", "typey-type.json"]]],
  ["80 cents and", [["0EU8/KREPBT/SKP-S", "typey-type.json"]]],
  ["80", [["0EU8", "typey-type.json"]]],
  ["800", [["-8Z", "typey-type.json"]]],
  ["80s", [["0EU8S", "typey-type.json"]]],
  ["81", [["1EU8", "typey-type.json"]]],
  ["82", [["2EU8", "typey-type.json"]]],
  ["83", [["3EU8", "typey-type.json"]]],
  ["84", [["4EU8", "typey-type.json"]]],
  ["85 cents", [["8/5/KREPBT/-S", "typey-type.json"]]],
  ["85", [["5EU8", "typey-type.json"]]],
  ["86", [["EU68", "typey-type.json"]]],
  ["87", [["EU78", "typey-type.json"]]],
  ["88", [["-8D", "typey-type.json"]]],
  ["89", [["89", "typey-type.json"]]],
  ["8:00", [["K-8", "typey-type.json"]]],
  ["8th", [["8/*T", "typey-type.json"]]],
  ["8vo", [["8/SR*/O*", "typey-type.json"]]],
  ["9,000", [["#-T/W-B/THUZ", "typey-type.json"]]],
  ["90", [["0EU9", "typey-type.json"]]],
  ["90%", [["0EU9/PERS", "typey-type.json"]]],
  ["900", [["-9Z", "typey-type.json"], ["EU9", "typey-type.json"]]],
  ["91", [["1EU9", "typey-type.json"]]],
  ["92", [["2EU9", "typey-type.json"]]],
  ["93", [["3EU9", "typey-type.json"]]],
  ["94", [["4EU9", "typey-type.json"]]],
  ["95", [["5EU9", "typey-type.json"]]],
  ["96", [["EU69", "typey-type.json"]]],
  ["97", [["EU79", "typey-type.json"]]],
  ["98", [["EU89", "typey-type.json"]]],
  ["99", [["-9D", "typey-type.json"]]],
  ["9:00", [["K-9", "typey-type.json"]]],
  ["9th", [["9/*T", "typey-type.json"]]],
  ["I", [["1-R", "typey-type.json"]]],
  ["II", [["2-R", "typey-type.json"]]],
  ["III", [["3-R", "typey-type.json"]]],
  ["IV", [["4-R", "typey-type.json"]]],
  ["IX", [["R-9", "typey-type.json"]]],
  ["VI", [["R-6", "typey-type.json"]]],
  ["VII", [["R-7", "typey-type.json"]]],
  ["VIII", [["R-8", "typey-type.json"]]],
  ["X", [["10R", "typey-type.json"]]],
  ["XI", [["1-RD", "typey-type.json"]]],
  ["XII", [["12-R", "typey-type.json"]]],
  ["{&00}", [["0Z", "typey-type.json"]]],
  ["{&0}", [["#O", "typey-type.json"], ["0RBGS", "typey-type.json"]]],
  ["{&1}", [["#S", "typey-type.json"], ["1-RBGS", "typey-type.json"]]],
  ["{&2}", [["#T-", "typey-type.json"], ["2-RBGS", "typey-type.json"]]],
  ["{&3}", [["#P-", "typey-type.json"], ["3-RBGS", "typey-type.json"]]],
  ["{&4}", [["#H", "typey-type.json"], ["4-RBGS", "typey-type.json"]]],
  ["{&5}", [["#A", "typey-type.json"], ["5RBGS", "typey-type.json"]]],
  ["{&6}", [["#F", "typey-type.json"], ["1KWR-6", "typey-type.json"]]],
  ["{&7}", [["#-P", "typey-type.json"], ["1KWR-7", "typey-type.json"]]],
  ["{&8}", [["#L", "typey-type.json"], ["1KWR-8", "typey-type.json"]]],
  ["{&9}", [["#-T", "typey-type.json"], ["1KWR-9", "typey-type.json"]]],
  ["{200^}", [["TWOUPB", "typey-type.json"]]],
  ["{:}30", [["30*U", "typey-type.json"]]],
  ["{:}40", [["40U", "typey-type.json"]]],
  ["{:}45", [["45*U", "typey-type.json"]]],
  ["{>}{&t}", [["2*", "typey-type.json"]]],
  ["{^0rz}", [["0RZ", "typey-type.json"]]],
  ["{^:05}", [["50*EUBG", "typey-type.json"], ["50EUBG", "typey-type.json"]]],
  ["{^:10}", [["10*BG", "typey-type.json"], ["10BG", "typey-type.json"]]],
  ["{^:15}", [["15*BG", "typey-type.json"], ["15BG", "typey-type.json"]]],
  ["{^:20}", [["20*BG", "typey-type.json"], ["20BG", "typey-type.json"]]],
  ["{^:25}", [["25*BG", "typey-type.json"], ["25BG", "typey-type.json"]]],
  ["{^:30}", [["30*BG", "typey-type.json"], ["30BG", "typey-type.json"]]],
  ["{^:35}", [["35*BG", "typey-type.json"], ["35BG", "typey-type.json"]]],
  ["{^:40}", [["40*BG", "typey-type.json"], ["40BG", "typey-type.json"]]],
  ["{^:45}", [["45*BG", "typey-type.json"], ["45BG", "typey-type.json"]]],
  ["{^:50}", [["50*BG", "typey-type.json"], ["50BG", "typey-type.json"]]],
  ["{^:55}", [["5*BGD", "typey-type.json"], ["5BGD", "typey-type.json"]]],
  ["2009 dollars", [["TWOUPB/9/TKHRAR/-S", "typey-type.json"]]],
  ["2000", [["TWOUPBD", "typey-type.json"], ["TWOUZ", "typey-type.json"]]],
  ["©", [["KPR-T", "typey-type.json"]]],
]);

describe('add outlines for words to combined lookup dict', () => {
  it('returns combined dict without misstrokes', () => {
    let dictContent = {
      "TO": "to",
      "O": "to",
      "SED": "said",
      "SAEUD": "said",
      "SOUPBD/-Z": "sounds",
      "SOUPBDZ": "sounds",
      "SOUPBSD": "sounds"
    };
    let combinedLookupDictionary = new Map();
    let dictName = "typey-type.json";
    let misstrokes = {
      "O": "to",
      "SED": "sed",
      "SOUPBSD": "sounds"
    };
    let seenSet = new Set();
    let expectedSet = new Set();
    expectedSet.add("TO");
    expectedSet.add("SED");
    expectedSet.add("SAEUD");
    expectedSet.add("SOUPBD/-Z");
    expectedSet.add("SOUPBDZ");
    let expectedResult = new Map([
      ["to", [["TO", "typey-type.json"]]],
      ["said", [["SED", "typey-type.json"], ["SAEUD", "typey-type.json"]]],
      ["sounds", [["SOUPBD/-Z", "typey-type.json"], ["SOUPBDZ", "typey-type.json"]]]
    ]);
    expect(addOutlinesToWordsInCombinedDict(dictContent, combinedLookupDictionary, dictName, misstrokes, seenSet)).toEqual([expectedResult, expectedSet]);
  })
})


describe('create stroke hint for phrase', () => {
  describe('returns string showing all the space or slash separated strokes to write a whole phrase', () => {
    it('showing "KPA/AEU KPA/TPAR/PHER" for "A Farmer"', () => {
      let wordOrPhraseMaterial = "A Farmer";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("KPA/AEU KPA/TPAR/PHER");
    });

    it('showing "*EU/TP*P/A*/R*/PH*/*E/R*" for "iFarmer"', () => {
      let wordOrPhraseMaterial = "iFarmer";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("*EU/TP*P/A*/R*/PH*/*E/R*");
    });

    it('show full word hints for a phrase containing a capitalised word with an apostrophe', () => {
      let wordOrPhraseMaterial = "Isn't";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("KPA/S-PBT");
    });

    it('show full word hints for a phrase containing a word with an apostrophe', () => {
      let wordOrPhraseMaterial = "it can't";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("T K-PBT");
    });

    it('show full word hints for a phrase containing a word with an apostrophe and capitalisation', () => {
      let wordOrPhraseMaterial = "it Can't";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("T KPA/K-PBT");
    });

    it('show full word hints for a phrase of 12 words', () => {
      let wordOrPhraseMaterial = "a a a a a a a a a a a a";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("AEU AEU AEU AEU AEU AEU AEU AEU AEU AEU AEU AEU");
    });

    it('show hints for first 12 words of longer phrase', () => {
      let wordOrPhraseMaterial = "a a a a a a a a a a a a a a";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("AEU AEU AEU AEU AEU AEU AEU AEU AEU AEU AEU AEU xxx");
    });

    it('with only punctuation dash', () => {
      let wordOrPhraseMaterial = '-';
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("H-PB");
    });

    it('with only punctuation at symbol', () => {
      let wordOrPhraseMaterial = '@';
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("SKWRAT");
    });

    it('with preceding double quotes and capital letter', () => {
      let wordOrPhraseMaterial = '"It';
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("KW-GS KPA*/T");
    });

    it('with preceding exclamation mark and unknown word', () => {
      let wordOrPhraseMaterial = '!foo';
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("SKHRAPL TP*/O*/O*");
    });

    it('with and unknown word and trailing exclamation mark', () => {
      let wordOrPhraseMaterial = 'foo!';
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("TP*/O*/O* SKHRAPL");
    });

    it('with preceding double quotes and capital letter', () => {
      let wordOrPhraseMaterial = 'houses?" It';
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("HO*UFS H-F KR-GS KPA/T");
    });

    it('with trailing question mark', () => {
      let wordOrPhraseMaterial = 'houses?';
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("HO*UFS H-F");
    });

    it('with word that is a prefix and a word as a word with trailing punctuation', () => {
      let wordOrPhraseMaterial = 'be?';
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("-B H-F");
    });

    it('with word that is a prefix and a word as a word with multiple trailing punctuation', () => {
      let wordOrPhraseMaterial = "be?'";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("-B H-F AE");
    });

    it('with word that is a prefix and a word as a prefix to a word', () => {
      let wordOrPhraseMaterial = "bekettle";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("PWE/KET/*L");
    });

    it('with prefix that is also a word that has trailing hyphen and a word', () => {
      let wordOrPhraseMaterial = "quasi-experimental";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("KWAS/KWREU/SPAOERL");
    });

    // TODO
    xit('with prefix that is also a word that has trailing hyphen and a fake word', () => {
      let wordOrPhraseMaterial = "quasi-confuzzled";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("KWAS/KWREU KR*/O*/TPH*/TP*/*U/STKPW*/STKPW*/HR*/*E/TK*");
    });

    it('with prefix that is not a word that has trailing hyphen and a word', () => {
      let wordOrPhraseMaterial = "gly-oxide";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("TKPWHRAOEU/KPAOEUD");
    });

    // TODO
    xit('with prefix that is not a word that has trailing hyphen and a fake word', () => {
      let wordOrPhraseMaterial = "gly-confuzzled";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("TKPWHRAOEU KR*/O*/TPH*/TP*/*U/STKPW*/STKPW*/HR*/*E/TK*");
    });

    it('with hyphenated compound word and suffix', () => {
      let wordOrPhraseMaterial = "computer-ectomy";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("KPAOUR H-PB EBGT/PHEU");
    });

    it('with unhyphenated compound word and suffix', () => {
      let wordOrPhraseMaterial = "computerectomy";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("KPAOUR/EBGT/PHEU");
    });

    it('with hyphenated compound word and existing words', () => {
      let wordOrPhraseMaterial = 'store-room';
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("STOR H-PB RAOPL");
    });

    it('with only a suffix', () => {
      let wordOrPhraseMaterial = "ectomy";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("EBGT/PHEU");
    });

    it('with hyphenated phrase', () => {
      let wordOrPhraseMaterial = 'a hit-and-miss';
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("AEU H-PLS");
    });

    it('with hyphenated gibberish', () => {
      let wordOrPhraseMaterial = 'aaaa-aaaa';
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("A*/A*/A*/A* H-PB A*/A*/A*/A*");
    });

    it('with hyphenated letters with some fingerspelling strokes', () => {
      let wordOrPhraseMaterial = 'c-ç';
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("KR* H-PB xxx");
    });

    it('with hyphenated letters without fingerspelling strokes', () => {
      let wordOrPhraseMaterial = 'ç-ç';
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("xxx H-PB xxx");
    });

    // TODO
    xit('with a colon, space, opening quote, and capitalised word', () => {
      let wordOrPhraseMaterial = 'and said: "You';
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("SKP SAEUD STPH-FPLT KW-GS KPA*/U");
    });

    it('with full stop, closing double quote, and capitalised word', () => {
      let wordOrPhraseMaterial = '." Outside';
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("P-P KR-GS KPA/OUDZ");
    });

    // TODO:
    xit('with hyphenated phrase and trailing full stop', () => {
      let wordOrPhraseMaterial = 'a hit-and-miss.';
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("AEU H-PLS TP-PL");
    });

    it('with preceding double quote', () => {
      let wordOrPhraseMaterial = '"you';
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("KW-GS U");
    });

    it('with word, full stop, space, double quote, and capital letter', () => {
      let wordOrPhraseMaterial = 'cat. "You';
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("KAT P-P KW-GS KPA/U"); // ideally it would be KAT TP-PL KW-GS U
    });

    it('with word, full stop, double quote, space, and capital letter', () => {
      let wordOrPhraseMaterial = 'cat." You';
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("KAT P-P KR-GS KPA/U"); // ideally it would be KAT TP-PL KR-GS U
    });

    it('with trailing full stop', () => {
      let wordOrPhraseMaterial = 'her.';
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("HER TP-PL");
    });
  });

  describe('returns string showing text with punctuation', () => {
    it('common punctuation', () => {
      let wordOrPhraseMaterial = "! # $ % & , . : ; = ? @";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("SKHRAPL HAERB TK-PL P*ERS SKP* KW-BG P-P KHR-PB SKHR-PB KW-L H-F SKWRAT");
    });

    it('other punctuation', () => {
      let wordOrPhraseMaterial = "* ^ ` | ~ — – - ©";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("STA*R KR-RT KH-FG PAO*EUP T*LD EPL/TKA*RB EPB/TKA*RB H-PB KPR-T");
    });

    it('brackets', () => {
      let wordOrPhraseMaterial = "( ) [ ] { }";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("PREPB PR*EPB PWR-BGT PWR*BGT TPR-BGT TPR*BGT");
    });
  });

  describe('returns string showing text with numbers', () => {
    it('zero to ten', () => {
      let wordOrPhraseMaterial = "0 1 2 3 4 5 6 7 8 9 10";
      // FIXME: should probably show #O #S #T … #S/#O etc.
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("0 1 2 3 4 5 6 7 8 9 1/0");
    });

    it('returns strings with numbers containing zeroes and commas', () => {
      let wordOrPhraseMaterial = "100 900 1000 1,000 10000 10,000";
      // FIXME: should probably show #SZ #TZ #TPHOUZ #SO/W-B/THUZ 10/THUZ #SO/W-B/THUZ
      // expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("1/0/0 9/0/0 1/0/0/0 1 KW-BG 0/0/0 1/0/0/0/0 1/0 KW-BG 0/0/0");
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("1-Z -9Z 1/THOUZ TPHOUZ 1-Z/HUPB/HUPB #SO/W-B/THUZ");
    });

    it('returns string with double numbers', () => {
      let wordOrPhraseMaterial = "22 33";
      // FIXME: should probably show #T-D or 2-D and #P-D
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("2-D 3-D");
    });

    it('returns string with currency', () => {
      let wordOrPhraseMaterial = "$100 $900";
      // FIXME: should probably show #SDZ #-TDZ
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("1-DZ TK-PL -9Z");
    });

    it('returns string with clock time', () => {
      let wordOrPhraseMaterial = "1:00 9:00 10:00 19:00 20:00";
      // FIXME: should probably show #SK or #SBG, #KT or #BGT, #SKO or #SOBG, #SKT or #SBGT, and #TKO or #TOBG
      // expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("1 KHR-PB 0/0 9 KHR-PB 0/0 1/0 KHR-PB 0/0 1/9 KHR-PB 0/0 2/0 KHR-PB 0/0");
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("1-BG K-9 1/0 KHR-PB #-Z 1-9 KHR-PB #-Z 2/0 KHR-PB #-Z");
    });
  });
});

describe('choose outline for phrase', () => {
  describe('returns array of chosen outline and number of lookup attempts', () => {
    it('simple example returns 1 attempt for KP-PL', () => {
      let wordOrPhrase = "example";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

      expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts)).toEqual( [ "KP-PL", 1 ]);
    });

    it('P*ERS for {&%} percent', () => {
      let wordOrPhrase = "%";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

      expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts)).toEqual( [ "P*ERS", 1 ]);
    });

    // it('1-BGS for {^}{#F1}{^}', () => {
    //   let wordOrPhrase = "#F1";
    //   let chosenStroke = "";
    //   let strokeLookupAttempts = 0;

    //   expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts)).toEqual( [ "1-BGS", 1 ]);
    // });

    it('single closing curly quote ’ should match TP-L/TP-L', () => {
      let wordOrPhrase = "’";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

      expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts)).toEqual( [ "TP-L/TP-L", 1 ]);
    });

    it('{^}:{^} with "KHR-PB" for colon with suppressed spaces like clock time', () => {
      let wordOrPhrase = ":";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

      expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts)).toEqual( [ "KHR-PB", 1 ]);
    });

    it('{^}^{^} with "KR-RT" for caret with suppressed spaces', () => {
      let wordOrPhrase = "^";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

      expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts)).toEqual( [ "KR-RT", 1 ]);
    });

    it('{^}({^} with "PREPB" for opening parenthesis', () => {
      let wordOrPhrase = "(";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

      expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts)).toEqual( [ "PREPB", 1 ]);
    });

    // THIS is what it ought to do with the strokes above but we're brute forcing single-letter
    // … lookups to use a fixed dictionary
    // it('{^}({^} with "P*PB" for opening parenthesis', () => {
    //   let wordOrPhrase = "(";
    //   let chosenStroke = "";
    //   let strokeLookupAttempts = 0;

    //   expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts)).toEqual( [ "P*PB", 1 ]);
    // });

    // it('for trademark symbol', () => {
    //   let wordOrPhrase = "™";
    //   let chosenStroke = "";
    //   let strokeLookupAttempts = 0;

    //   expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts)).toEqual( [ "TR*PL", 1 ]);
    // });

    // it('for dollar with space, not suppressed should match "$"', () => {
    //   let wordOrPhrase = "$";
    //   let chosenStroke = "";
    //   let strokeLookupAttempts = 0;

    //   expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts)).toEqual( [ "TPHRORB", 1 ]);
    // });

    it('for dollar with suppressed trailing space should match ${^}', () => {
      let wordOrPhrase = "$";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

      expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts)).toEqual( [ "TK-PL", 1 ]);
    });

    it('for hash with suppressed trailing space', () => {
      let wordOrPhrase = "#";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

      expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts)).toEqual( [ "HAERB", 1 ]);
    });

    it('for left angle bracket with suppressed space', () => {
      let wordOrPhrase = "<";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

      expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts)).toEqual( [ "PWRABG", 1 ]);
    });

    // describe('for left angle bracket with space, not suppressed', () => {
    //   let wordOrPhrase = "< ";
    //   let chosenStroke = "";
    //   let strokeLookupAttempts = 0;

    //   expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts)).toEqual( [ "HR*PB", 1 ]);
    // });

    it('with OERBGS for oh,', () => {
      let wordOrPhrase = "oh,";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

      expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts)).toEqual( [ "OERBGS", 1 ]);
    });

    it('with HRAO*EUBG for , like,', () => {
      let wordOrPhrase = ", like,";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

      expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts)).toEqual( [ "HRAO*EUBG", 1 ]);
    });

    it('with a hyphenated phrase', () => {
      let wordOrPhrase = "hit-and-miss";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

      expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts)).toEqual( [ "H-PLS", 1 ]);
    });

    it('with a prefix', () => {
      let wordOrPhrase = "relent";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

      expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts)).toEqual( [ "RE/HREPBT", 1 ]);
    });

    it('with a prefix', () => {
      let wordOrPhrase = "autoscroll";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

      expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts)).toEqual( [ "A*UT/SKROL", 1 ]);
    });

    it('with long', () => {
      let wordOrPhrase = "long";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

      expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts)).toEqual( [ "HROPBG", 1 ]);
    });

    it('with longing', () => {
      let wordOrPhrase = "longing";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

      expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts)).toEqual( [ "HROPBG/-G", 1 ]);
    });

    // it('with multiple suffixes', () => {
    //   let wordOrPhrase = "buffetings";
    //   let chosenStroke = "";
    //   let strokeLookupAttempts = 0;

    //   expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts)).toEqual( [ "PWUF/ET/-G/-S", 1 ]);
    // });

    it('with WAPBGD/-S for wanderings', () => {
      let wordOrPhrase = "wanderings";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

      expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts)).toEqual( [ "WAPBGD/-S", 1 ]);
    });

    // it('with orthography rule to replace e with ing', () => {
    //   let wordOrPhrase = "seething";
    //   let chosenStroke = "";
    //   let strokeLookupAttempts = 0;

    //   expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts)).toEqual( [ "SAO*ET/-G", 1 ]);
    // });

    // it('with fingerspelling for a mistyped orthography rule to replace e with ing', () => {
    //   let wordOrPhrase = "seetheing";
    //   let chosenStroke = "";
    //   let strokeLookupAttempts = 0;

    //   expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts)).toEqual( [ "S*/*E/*E/T*/H*/*E/*EU/TPH*/TKPW*", 1 ]);
    // });

    // it('with orthography rule to replace e with ing', () => {
    //   let wordOrPhrase = "narrating";
    //   let chosenStroke = "";
    //   let strokeLookupAttempts = 0;

    //   expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts)).toEqual( [ "TPHAR/AEUT/-G", 1 ]);
    // });

    // it('with orthography rule to replace e with ing', () => {
    //   let wordOrPhrase = "lodging";
    //   let chosenStroke = "";
    //   let strokeLookupAttempts = 0;

    //   expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts)).toEqual( [ "HROPBLG/-G", 1 ]);
    // });

    // it('with orthography rule to replace e with ing and append an s', () => {
    //   let wordOrPhrase = "lodgings";
    //   let chosenStroke = "";
    //   let strokeLookupAttempts = 0;

    //   expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts)).toEqual( [ "HROPBLG/-G/-S", 1 ]);
    // });

    // TODO:
    // This one currently shows "PHAEUD/EPB" instead of "PHAEUD/*EPB" because "PHAEUD/*EPB" is
    // penalised 3 times: once for being "longer", once for having a star, once for having a slash,
    // while "PHAEUD/EPB" is penalised only for having a slash without being a suffix.

    it('shows the outline for the word "as"', () => {
      let wordOrPhrase = "as";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;
      let globalLookupDictionaryForAs = new Map([
        ["as", [
          ["A/AZ", "typey-type.json"],
          ["AS", "typey-type.json"],
          ["ASZ", "typey-type.json"]
          ["AZ", "typey-type.json"],
        ]],
      ]);

      // maybe it would be nice to prioritise AZ over AS here…
      // not of prioritising S over Z endings…
      // instead reserving AS for {^s}{a^} per old dict:
      expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionaryForAs, chosenStroke, strokeLookupAttempts)).toEqual( [ "AS", 1 ]);
    });

    it('shows the outline for the word "rest"', () => {
      let wordOrPhrase = "rest";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;
      let globalLookupDictionaryForRest = new Map([
        ["rest", [
          ["REFT", "typey-type.json"],
          ["R*ES", "typey-type.json"],
        ]],
        ["REST", [
          ["R*EFT", "typey-type.json"],
        ]],
      ]);

      expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionaryForRest, chosenStroke, strokeLookupAttempts)).toEqual( [ "REFT", 1 ]);
    });

    xit('shows actual suffix stroke for maiden', () => {
      let wordOrPhrase = "maiden";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

      expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts)).toEqual( [ "PHAEUD/*EPB", 1 ]);
    });

    // TODO: decide on showing numbers or letters with #
    xit('returns number strokes', () => {
      let wordOrPhrase = "0";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

      expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts)).toEqual( [ "#O", 1 ]);
    });
  });

  // FIXME: these probably shouldn't be so unstable
  describe('dictionaries in different orders', () => {
    it('returns outline for lovers, preferring O', () => {
      let wordOrPhrase = "lovers";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;
      let globalLookupDictionaryWithHROFRSfirst = new Map([
        ["lovers", [["HROFRS", "typey-type.json"], ["HRUFRS", "typey-type.json"]]],
      ]);

      expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionaryWithHROFRSfirst, chosenStroke, strokeLookupAttempts)).toEqual( [ "HROFRS", 1 ]);
    });

    it('returns outline for lovers, preferring U', () => {
      let wordOrPhrase = "lovers";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;
      let globalLookupDictionaryWithHRUFRSfirst = new Map([
        ["lovers", [["HRUFRS", "typey-type.json"], ["HROFRS", "typey-type.json"]]],
      ]);

      expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionaryWithHRUFRSfirst, chosenStroke, strokeLookupAttempts)).toEqual( [ "HRUFRS", 1 ]);
    });
  });
});

describe('generate dictionary entries', () => {
  it('returns array of phrases and strokes for words', () => {
    let wordList = ['a', 'A', 'i', 'I', ' ', '?', 'address', 'tom', 'Heather', 'TUESDAY', 'FIRST', '3D', 'bed,', 'man,', 'man!', 'man?', "'bed'", "'address'", "'Sinatra'", "'sinatra'", "'confuzzled'", 'and! and', 'andx and', 'andx andx and', 'and ', ' and', ' and ', 'and again', 'and man!', 'and man?', 'and again!', '!', '!!', '!man', '! man', 'media query', 'push origin master', 'diff -- cached', 'bed, man, and address' ];
    // let wordList = [' ', '?', 'tom', 'Heather', 'TUESDAY', 'FIRST', 'bed,', 'man!', 'man?', "'sinatra'", 'and ', 'and again', 'and man!', 'and man?', 'and again!', '!', '!!', '!man', '! man', 'media query', 'push origin master', 'diff --cached', 'diff -- cached', '<title>Learn!</title>' ];

    let globalLookupDictionary = new Map([
      ["a", [["AEU", "typey-type.json"]]],
      ["I", [["EU", "typey-type.json"]]],
      ["{^ ^}", [["S-P", "typey-type.json"]]],
      ["{?}", [["H-F", "typey-type.json"]]],
      ["{,}", [["KW-BG", "typey-type.json"]]],
      ["Tom", [["TOPL", "typey-type.json"]]],
      ["heather", [["H*ET/*ER", "typey-type.json"]]],
      ["Tuesday", [["TAOUZ", "typey-type.json"]]],
      ["first", [["TPEUFRT", "typey-type.json"]]],
      ["3D", [["30*EUD", "typey-type.json"]]],
      ["address", [["A/TKRES", "typey-type.json"]]],
      ["bed", [["PWED", "typey-type.json"]]],
      ["bed,", [["PWED KW-BG", "typey-type.json"]]],
      ["man", [["PHAPB", "typey-type.json"]]],
      ["{!}", [["SKHRAPL", "typey-type.json"]]],
      ["and again", [["STKPWEPBG", "typey-type.json"]]],
      ["and", [["SKP", "typey-type.json"], ["APBD", "plover.json"]]],
      ["again", [["TKPWEPB", "typey-type.json"]]],
      ["media", [["PHO*EUD", "typey-type.json"]]],
      ["query", [["KWAOER/REU", "typey-type.json"]]],
      ["Sinatra", [["STPHAT/RA", "typey-type.json"]]],
      ["{^'}", [["AE", "typey-type.json"]]],
      ["push", [["PURB", "typey-type.json"]]],
      ["origin", [["O*RPBLG", "typey-type.json"]]],
      ["master", [["PHAFRT", "typey-type.json"]]],
      ["diff", [["TKEUF", "typey-type.json"]]],
      ["{--}", [["TK*RB", "typey-type.json"]]],
      ["cached", [["KAERBD", "typey-type.json"]]],
      ["{^>^}", [["A*EPBG", "typey-type.json"]]],
      ["{^<^}", [["AEPBG", "typey-type.json"]]],
      ["{^/^}", [["OEU", "typey-type.json"]]],
      ["title", [["TAOEULT", "typey-type.json"]]],
      ["learn", [["HRERPB", "typey-type.json"]]]
    ]);

    expect(generateListOfWordsAndStrokes(wordList, globalLookupDictionary)).toEqual(
      [
        {phrase: "a", stroke: "AEU"},
        {phrase: "A", stroke: "KPA/AEU"},
        {phrase: "i", stroke: "*EU"},
        {phrase: "I", stroke: "EU"},
        {phrase: " ", stroke: "S-P"},
        {phrase: "?", stroke: "H-F"},
        {phrase: "address", stroke: "A/TKRES"},
        {phrase: "tom", stroke: "HRO*ER/TOPL"},
        {phrase: "Heather", stroke: "KPA/H*ET/*ER"},
        {phrase: "TUESDAY", stroke: "*URP/TAOUZ"},
        {phrase: "FIRST", stroke: "*URP/TPEUFRT"},
        {phrase: "3D", stroke: "30*EUD"},
        {phrase: "bed,", stroke: "PWED KW-BG"}, // has exact entry in this test file
        {phrase: "man,", stroke: "PHAPB KW-BG"}, // does not have exact entry
        {phrase: "man!", stroke: "PHAPB SKHRAPL"},
        {phrase: "man?", stroke: "PHAPB H-F"},
        {phrase: "'bed'", stroke: "AE PWED AE"},
        {phrase: "'address'", stroke: "AE A/TKRES AE"},
        {phrase: "'Sinatra'", stroke: "AE STPHAT/RA AE"},
        {phrase: "'sinatra'", stroke: "AE HRO*ER/STPHAT/RA AE"},
        {phrase: "'confuzzled'", stroke: "AE KR*/O*/TPH*/TP*/*U/STKPW*/STKPW*/HR*/*E/TK* AE"},
        {phrase: "and! and", stroke: "SKP SKHRAPL SKP"},
        {phrase: "andx and", stroke: "A*/TPH*/TK*/KP* SKP"},
        {phrase: "andx andx and", stroke: "A*/TPH*/TK*/KP* A*/TPH*/TK*/KP* SKP"}, // ideally this would include a space between fingerspelled words
        {phrase: "and ", stroke: "SKP"},
        {phrase: " and", stroke: "SKP"},
        {phrase: " and ", stroke: "SKP"},
        {phrase: "and again", stroke: "STKPWEPBG"},
        {phrase: "and man!", stroke: "SKP PHAPB SKHRAPL"},
        {phrase: "and man?", stroke: "SKP PHAPB H-F"},
        {phrase: "and again!", stroke: "SKP TKPWEPB SKHRAPL"}, // ideally this would produce "STKPWEPBG SKHRAPL"
        {phrase: "!", stroke: "SKHRAPL"},
        {phrase: "!!", stroke: "SKHRAPL SKHRAPL"},
        {phrase: "!man", stroke: "SKHRAPL PHAPB"}, // ideally this would produce "SKHRAPL TK-LS PHAPB"
        {phrase: "! man", stroke: "SKHRAPL PHAPB"},
        {phrase: "media query", stroke: "PHO*EUD KWAOER/REU"},
        {phrase: "push origin master", stroke: "PURB O*RPBLG PHAFRT"},
        {phrase: "diff -- cached", stroke: "TKEUF TK*RB KAERBD"},
        {phrase: "bed, man, and address", stroke: "PWED KW-BG PHAPB KW-BG SKP A/TKRES"},
        // {phrase: "ef eff ge", stroke: "*EF *E/TP*/TP* TKPW*/*E"},
        // {phrase: "ef eff eff ge", stroke: "*EF *E/TP*/TP*/S-P/*E/TP*/TP* TKPW*/*E"},
        // {phrase: "diff --cached", stroke: "TKEUF TK*RB TK-LS KAERBD"},
        // {phrase: "<title>Learn!</title>", stroke: "AEPBG/TAOEULT/A*EPBG/KPA*/HRERPB/SKHRAPL/AEPBG/OEU/TAOEULT/A*EPBG"}
      ]
    // expect(generateListOfWordsAndStrokes(wordList, globalLookupDictionary)).toEqual(
    //   [
    //     {phrase: " ", stroke: "S-P", lookups: 1},
    //     {phrase: "?", stroke: "H-F", lookups: 1},
    //     {phrase: "address", stroke: "A/TKRES", lookups: 1},
    //     {phrase: "tom", stroke: "HRO*ER/TOPL", lookups: 1},
    //     {phrase: "Heather", stroke: "KPA/H*ET/*ER", lookups: 1},
    //     {phrase: "TUESDAY", stroke: "*URP/TAOUZ", lookups: 1},
    //     {phrase: "FIRST", stroke: "*URP/TPEUFRT", lookups: 1},
    //     {phrase: "bed,", stroke: "PWED KW-BG", lookups: 1}, // has exact entry in this test file
    //     {phrase: "man,", stroke: "PHAPB KW-BG", lookups: 3}, // does not have exact entry
    //     {phrase: "man!", stroke: "PHAPB SKHRAPL", lookups: 3},
    //     {phrase: "man?", stroke: "PHAPB H-F", lookups: 3},
    //     {phrase: "'bed'", stroke: "AE PWED AE", lookups: 4},
    //     {phrase: "'address'", stroke: "AE A/TKRES AE", lookups: 4},
    //     {phrase: "'Sinatra'", stroke: "AE STPHAT/RA AE", lookups: 4},
    //     {phrase: "'sinatra'", stroke: "AE HRO*ER/STPHAT/RA AE", lookups: 4},
    //     {phrase: "'confuzzled'", stroke: "AE xxx AE", lookups: 4},
    //     {phrase: "and! and", stroke: "SKP SKHRAPL SKP", lookups: 5},
    //     {phrase: "andx and", stroke: "xxx SKP", lookups: 3},
    //     {phrase: "andx andx and", stroke: "xxx xxx SKP", lookups: 4},
    //     {phrase: "and ", stroke: "SKP", lookups: 2},
    //     {phrase: " and", stroke: "SKP", lookups: 2},
    //     {phrase: " and ", stroke: "SKP", lookups: 2},
    //     {phrase: "and again", stroke: "STKPWEPBG", lookups: 1},
    //     {phrase: "and man!", stroke: "SKP PHAPB SKHRAPL", lookups: 4},
    //     {phrase: "and man?", stroke: "SKP PHAPB H-F", lookups: 4},
    //     {phrase: "and again!", stroke: "SKP TKPWEPB SKHRAPL", lookups: 4}, // ideally this would produce "STKPWEPBG SKHRAPL"
    //     {phrase: "!", stroke: "SKHRAPL", lookups: 1},
    //     {phrase: "!!", stroke: "SKHRAPL SKHRAPL", lookups: 3},
    //     {phrase: "!man", stroke: "SKHRAPL PHAPB", lookups: 3}, // ideally this would produce "SKHRAPL TK-LS PHAPB"
    //     {phrase: "! man", stroke: "SKHRAPL PHAPB", lookups: 3},
    //     {phrase: "media query", stroke: "PHO*EUD KWAOER/REU", lookups: 3},
    //     {phrase: "push origin master", stroke: "PURB O*RPBLG PHAFRT", lookups: 4},
    //     {phrase: "diff -- cached", stroke: "TKEUF TK*RB KAERBD", lookups: 4},
    //     // {phrase: "diff --cached", stroke: "TKEUF TK*RB TK-LS KAERBD"},
    //     // {phrase: "<title>Learn!</title>", stroke: "AEPBG/TAOEULT/A*EPBG/KPA*/HRERPB/SKHRAPL/AEPBG/OEU/TAOEULT/A*EPBG"}
    //   ]
    );
  });
});

describe('rank outlines', () => {
  describe('with duplicate outlines across dictionaries', () => {
    it('returns sorted list of outlines for "GitHub", preserving dictionary order', () => {
      let arrayOfStrokesAndTheirSourceDictNames = [
        ["TKPWEUT/HUB", "code.json"],
        ["TKPWEUT/HUB", "typey-type.json"]
      ];

      expect(rankOutlines(arrayOfStrokesAndTheirSourceDictNames, "GitHub")).toEqual([
        ["TKPWEUT/HUB", "code.json"],
        ["TKPWEUT/HUB", "typey-type.json"]
      ]);
    });
  });

  describe('with duplicate outlines across dictionaries', () => {
    it('returns unsorted list of outlines for "GitHub", preserving dictionary order', () => {
      let arrayOfStrokesAndTheirSourceDictNames = [
        ["TKPWEUT/HUB", "typey-type.json"],
        ["TKPWEUT/HUB", "code.json"],
      ];

      expect(rankOutlines(arrayOfStrokesAndTheirSourceDictNames, "GitHub")).toEqual([
        ["TKPWEUT/HUB", "typey-type.json"],
        ["TKPWEUT/HUB", "code.json"]
      ]);
    });
  });

  describe('with different outlines across dictionaries', () => {
    it('returns shortest stroke', () => {
      let arrayOfStrokesAndTheirSourceDictNames = [
        ["TKPWEUT/HUB", "typey-type.json"],
        ["TKWEUT/HUB", "code.json"],
      ];

      expect(rankOutlines(arrayOfStrokesAndTheirSourceDictNames, "GitHub")).toEqual([
        ["TKWEUT/HUB", "code.json"],
        ["TKPWEUT/HUB", "typey-type.json"]
      ]);
    });
  });

  describe('with different outlines across dictionaries', () => {
    it('returns sorted list of outlines for "exercises", prioritising S endings over Z, already in order', () => {
      let arrayOfStrokesAndTheirSourceDictNames = [
        ["KPER/SAOEUZ/-Z", "plover.json"],
        ["KPERZ/-T", "briefs.json"],
        ["KPERZ/-S", "briefs.json"],
        ["KPERZ/-Z", "briefs.json"],
        ["ERBGS/SAOEUSZ", "plover.json"],
        ["KPERSZ", "typey-type.json"],
      ];

      expect(rankOutlines(arrayOfStrokesAndTheirSourceDictNames, "exercises")).toEqual([
        ["KPERSZ", "typey-type.json"],
        ["KPERZ/-T", "briefs.json"],
        ["KPERZ/-S", "briefs.json"],
        ["KPERZ/-Z", "briefs.json"],
        ["ERBGS/SAOEUSZ", "plover.json"],
        ["KPER/SAOEUZ/-Z", "plover.json"]
      ]);
    });

    it('returns sorted list of outlines for "exercises", prioritising S endings over Z, not in order', () => {
      let arrayOfStrokesAndTheirSourceDictNames = [
        ["KPER/SAOEUZ/-Z", "plover.json"],
        ["KPERZ/-T", "briefs.json"],
        ["KPERZ/-Z", "briefs.json"],
        ["KPERZ/-S", "briefs.json"],
        ["ERBGS/SAOEUSZ", "plover.json"],
        ["KPERSZ", "typey-type.json"],
      ];

      expect(rankOutlines(arrayOfStrokesAndTheirSourceDictNames, "exercises")).toEqual([
        ["KPERSZ", "typey-type.json"],
        ["KPERZ/-T", "briefs.json"],
        ["KPERZ/-S", "briefs.json"],
        ["KPERZ/-Z", "briefs.json"],
        ["ERBGS/SAOEUSZ", "plover.json"],
        ["KPER/SAOEUZ/-Z", "plover.json"]
      ]);
    });

    it('returns sorted list of outlines for "exercises", prioritising S endings over Z, not in order, with more than 10 elements', () => {
      let arrayOfStrokesAndTheirSourceDictNames = [
        ["KPER/SAOEUZ/-Z", "plover.json"],
        ["KPERZ/-T", "briefs.json"],
        ["KPERZ/-Z", "briefs.json"],
        ["KPERZ/-Z", "briefs.json"],
        ["KPERZ/-Z", "briefs.json"],
        ["KPERZ/-Z", "briefs.json"],
        ["KPERZ/-Z", "briefs.json"],
        ["KPERZ/-Z", "briefs.json"],
        ["KPERZ/-S", "briefs.json"],
        ["ERBGS/SAOEUSZ", "plover.json"],
        ["KPERSZ", "typey-type.json"],
      ];

      expect(rankOutlines(arrayOfStrokesAndTheirSourceDictNames, "exercises")).toEqual([
        ["KPERSZ", "typey-type.json"],
        ["KPERZ/-T", "briefs.json"],
        ["KPERZ/-S", "briefs.json"],
        ["KPERZ/-Z", "briefs.json"],
        ["KPERZ/-Z", "briefs.json"],
        ["KPERZ/-Z", "briefs.json"],
        ["KPERZ/-Z", "briefs.json"],
        ["KPERZ/-Z", "briefs.json"],
        ["KPERZ/-Z", "briefs.json"],
        ["ERBGS/SAOEUSZ", "plover.json"],
        ["KPER/SAOEUZ/-Z", "plover.json"]
      ]);
    });

    it('returns sorted list of outlines for "slept", prioritising T endings over D, already in order', () => {
      let arrayOfStrokesAndTheirSourceDictNames = [
        ["SHREPT", "plover.json"],
        ["SHREPD", "plover.json"],
        ["SHREPT", "plover.json"],
      ];

      expect(rankOutlines(arrayOfStrokesAndTheirSourceDictNames, "slept")).toEqual([
        ["SHREPT", "plover.json"],
        ["SHREPT", "plover.json"],
        ["SHREPD", "plover.json"]
      ]);
    });

    it('returns sorted list of outlines for "intermediate", prioritising T endings over D, not in order', () => {
      let arrayOfStrokesAndTheirSourceDictNames = [
        ["EUPBT/PHAOED", "plover.json"],
        ["EUPBT/PHAOET", "plover.json"]
      ];

      expect(rankOutlines(arrayOfStrokesAndTheirSourceDictNames, "intermediate")).toEqual([
        ["EUPBT/PHAOET", "plover.json"],
        ["EUPBT/PHAOED", "plover.json"]
      ]);
    });

    it('returns sorted list of outlines for "credit card", prioritising T endings over D, except when the word ends in "d"', () => {
      let arrayOfStrokesAndTheirSourceDictNames = [
        ["KRED/EUT/KART", "plover.json"],
        ["KRED/EUT/KARD", "plover.json"]
      ];

      expect(rankOutlines(arrayOfStrokesAndTheirSourceDictNames, "credit card")).toEqual([
        ["KRED/EUT/KARD", "plover.json"],
        ["KRED/EUT/KART", "plover.json"]
      ]);
    });
  });
// T-FPB: plover.json
// TEFL: plover.json

  describe('with outlines with and without dashes', () => {
    it('returns sorted list of outlines for "test", including dashes', () => {
      let arrayOfStrokesAndTheirSourceDictNames = [
        ["T-FPB", "plover.json"],
        ["TEFL", "plover.json"],
      ];

      expect(rankOutlines(arrayOfStrokesAndTheirSourceDictNames, "test")).toEqual([
        ["TEFL", "plover.json"],
        ["T-FPB", "plover.json"]
      ]);
    });
  });

  describe('with outlines with and without stars', () => {
    it('returns sorted list of outlines for "test", penalising stars', () => {
      let arrayOfStrokesAndTheirSourceDictNames = [
        ["T*EFT", "user.json"],
        ["TAEFT", "user.json"],
      ];

      expect(rankOutlines(arrayOfStrokesAndTheirSourceDictNames, "test")).toEqual([
        ["TAEFT", "user.json"],
        ["T*EFT", "user.json"]
      ]);
    });

    it('returns sorted list of outlines for "test", penalising stars', () => {
      let arrayOfStrokesAndTheirSourceDictNames = [
        ["T*EFT/T*EFT", "user.json"],
        ["TAEFT/TAEFTS", "user.json"],
      ];

      expect(rankOutlines(arrayOfStrokesAndTheirSourceDictNames, "test")).toEqual([
        ["TAEFT/TAEFTS", "user.json"],
        ["T*EFT/T*EFT", "user.json"],
      ]);
    });

    it('returns sorted list of outlines for "test", penalising stars', () => {
      let arrayOfStrokesAndTheirSourceDictNames = [
        ["T*EFT/T*EFT", "user.json"],
        ["TAEFTS/TAEFTS", "user.json"],
      ];

      expect(rankOutlines(arrayOfStrokesAndTheirSourceDictNames, "test")).toEqual([
        ["T*EFT/T*EFT", "user.json"],
        ["TAEFTS/TAEFTS", "user.json"],
      ]);
    });
  });

  describe('with outlines with and without slashes', () => {
    it('returns sorted list of outlines for "grasshopper", penalising slashes', () => {
      let arrayOfStrokesAndTheirSourceDictNames = [
        ["TKPWHRFRPBLG", "user.json"],
        ["TKPWHR*FRPBLG", "user.json"],
        ["TKPWRASZ/HOP", "user.json"],
        ["TKPWRASZ/HOP/ER", "user.json"],
        ["TKPWRASZ/HORP", "user.json"],
        ["TKPWRASZ/HOP/*ER", "user.json"],
      ];

      expect(rankOutlines(arrayOfStrokesAndTheirSourceDictNames, "grasshopper")).toEqual([
        ["TKPWHRFRPBLG", "user.json"],
        ["TKPWHR*FRPBLG", "user.json"],
        ["TKPWRASZ/HOP", "user.json"],
        ["TKPWRASZ/HORP", "user.json"],
        ["TKPWRASZ/HOP/ER", "user.json"],
        ["TKPWRASZ/HOP/*ER", "user.json"],
      ]);
    });
  });

  describe('with prefix and suffix strokes', () => {
    it('returns sorted list of outlines for "upstarted", penalising briefs without affix strokes', () => {
      let arrayOfStrokesAndTheirSourceDictNames = [
        ["UP/START/-D", "user.json"],
        ["UP/STARTD", "user.json"],
        ["AUP/START/*D", "user.json"],
        ["AUP/START/-D", "user.json"],
        ["AUP/STARTD", "user.json"],
      ];

      expect(rankOutlines(arrayOfStrokesAndTheirSourceDictNames, "upstarted")).toEqual([
        ["AUP/STARTD", "user.json"],
        ["UP/STARTD", "user.json"],
        ["AUP/START/-D", "user.json"],
        ["UP/START/-D", "user.json"],
        ["AUP/START/*D", "user.json"],
      ]);
    });
  });

  // describe('with different outlines across dictionaries', () => {
  //   it('returns sorted list of outlines for "upholstery", showing user dictionaries before typey-type.json', () => {
  //     let arrayOfStrokesAndTheirSourceDictNames = [
  //       ["AUP/HO*ELS/REU", "personal.json"],
  //       ["AUP/HO*LS/REU", "personal.json"],
  //       ["AUP/HOEFLT/*ER/KWREU", "personal.json"],
  //       ["AUP/HOEFLT/REU", "personal.json"],
  //       ["AUP/HOEL/STREU", "personal.json"],
  //       ["AUP/HOELT/REU", "personal.json"],
  //       ["AUP/HOFLT/REU", "personal.json"],
  //       ["AUP/HOL/STREU", "personal.json"],
  //       ["UP/HOLS/TREU", "dict.json"],
  //       ["UP/HOL/STREU", "dict.json"],
  //       ["UP/HOFLT/REU", "dict.json"],
  //       ["UP/HOELT/REU", "dict.json"],
  //       ["UP/HOELS/TREU", "dict.json"],
  //       ["UP/HOEL/STREU", "dict.json"],
  //       ["UP/HOEFLT/REU", "dict.json"],
  //       ["UP/HOEFLT/*ER/KWREU", "dict.json"],
  //       ["UP/HO*LS/REU", "dict.json"],
  //       ["UP/HO*ELS/REU", "dict.json"],
  //       ["AUP/HOFLT/REU", "dict.json"],
  //       ["AUP/HOELS/TREU", "condensed-strokes.json"],
  //     ];

  //     expect(rankOutlines(arrayOfStrokesAndTheirSourceDictNames, "upholstery")).toEqual([
  //       ["AUP/HOELT/REU", "personal.json"],
  //       ["AUP/HOFLT/REU", "personal.json"],
  //       ["AUP/HOL/STREU", "personal.json"],
  //       ["AUP/HOEFLT/REU", "personal.json"],
  //       ["AUP/HOEL/STREU", "personal.json"],
  //       ["AUP/HO*LS/REU", "personal.json"],
  //       ["AUP/HO*ELS/REU", "personal.json"],
  //       ["AUP/HOEFLT/*ER/KWREU", "personal.json"],
  //       ["AUP/HOELS/TREU", "typey-type.json"],
  //       ["AUP/HOFLT/REU", "dict.json"],
  //       ["UP/HOL/STREU", "dict.json"],
  //       ["UP/HOLS/TREU", "dict.json"],
  //       ["UP/HOELT/REU", "dict.json"],
  //       ["UP/HOFLT/REU", "dict.json"],
  //       ["UP/HOEFLT/REU", "dict.json"],
  //       ["UP/HOEL/STREU", "dict.json"],
  //       ["UP/HOELS/TREU", "dict.json"],
  //       ["UP/HO*LS/REU", "dict.json"],
  //       ["UP/HO*ELS/REU", "dict.json"],
  //       ["UP/HOEFLT/*ER/KWREU", "dict.json"],
  //     ]);
  //   });
  // });

  // describe('with different outlines across dictionaries', () => {
  //   it('returns sorted list of outlines for "satisfaction", showing user dictionaries before typey-type.json', () => {
  //     let arrayOfStrokesAndTheirSourceDictNames = [
  //       ["SAEFBGS", "dict.json"],
  //       ["SA*EF", "user.json"],
  //       ["SEF/SAEBGS", "dict.json"],
  //       ["STPA*BGS", "dict.json"],
  //       ["SAEBGS", "dict.json"],
  //       ["SAEBGS", "typey-type.json"],
  //     ];

  //     expect(rankOutlines(arrayOfStrokesAndTheirSourceDictNames, "upholstery")).toEqual([
  //       ["SA*EF", "user.json"],
  //       ["SAEBGS", "typey-type.json"],
  //       ["SAEBGS", "dict.json"],
  //       ["SAEFBGS", "dict.json"],
  //       ["STPA*BGS", "dict.json"],
  //       ["SEF/SAEBGS", "dict.json"]
  //     ]);
  //   });
  // });
});

