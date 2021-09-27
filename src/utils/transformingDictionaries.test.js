import {
  addOutlinesToWordsInCombinedDict,
  chooseOutlineForPhrase,
  createAGlobalLookupDictionary,
  createStrokeHintForPhrase,
  generateListOfWordsAndStrokes,
  rankOutlines,
} from './transformingDictionaries';
import { AffixList } from './affixList';

let testTypeyTypeDict = {
  "TK-LS": "{^^}",
  "KP-PL": "example",
  "TR*PL": "{^}™",
  "SPWO*L/TRAEUD/PHARBG": "{^}™",
  "PWRABG": "<{^}",
  "HR*PB": "<",
  "HAERB": "#{^}",
  "TPHRORB": "$",
  "H-PBZ": "--{^}",
  "H-PBS": "-{^}",
  "H*B": "-",
  "H-PB": "{^-^}",
  "TPR-BGT": "\\{{^}",
  "HAOEPT": "{>}http://{^}",
  "P*ERS": "{&%}",
  "1-BGS": "{^}{#F1}{^}",
  "KHR-PB": "{^}:{^}",
  "KR-RT": "{^}^{^}",
  "P*PB": "{^}({^}",
  "TP-P/TP-P": "{~|‘^}",
  "TP-L/TP-L": "{^~|’}",
  "KW-GS/KW-GS": "{~|“^}",
  "KR-GS/KR-GS": "{^~|”}",
  "AEU": "a",
  "EU": "I",
  "S-P": "{^ ^}",
  "H-F": "{?}",
  "KWEZ": "?",
  "KW-BG": "{,}",
  "TP-PL": "{.}",
  "PR-D": ".",
  "TOPL": "Tom",
  "H*ET/*ER": "heather",
  "TAOUZ": "Tuesday",
  "TPEUFRT": "first",
  "30*EUD": "3D",
  "A/TKRES": "address",
  "PWED": "bed",
  "PWED KW-BG": "bed,",
  "PHAPB": "man",
  "SKHRAPL": "{!}",
  "STKPWEPBG": "and again",
  "SKP": "and",
  "TKPWEPB": "again",
  "PHO*EUD": "media",
  "KWAOER/REU": "query",
  "STPHAT/RA": "Sinatra",
  "AE": "{^'}",
  "PURB": "push",
  "O*RPBLG": "origin",
  "PHAFRT": "master",
  "TKEUF": "diff",
  "TK*RB": "{--}",
  "KAERBD": "cached",
  "A*EPBG": "{^>^}",
  "AEPBG": "{^<^}",
  "OEU": "{^/^}",
  "TAOEULT": "title",
  "HRERPB": "learn",
  "OERBGS": "oh{,}",
  "HRAO*EUBG": "{,}like{,}",
  "HREPBT": "lent",
  "SKROL": "scroll",
  "TPAR/PHER": "farmer",
  "KR-GS": "{^~|\"}",
  "KW-GS": "{~|\"^}",
  "T": "it",
  "-B": "be",
  "PWE": "{be^}",
  "KWAS/KWREU": "{quasi-^}",
  "KWA/SEU": "quasi",
  "SPAOERL": "experimental",
  "TKPWHRAOEU": "{gly-^}",
  "KPAOEUD": "oxide",
  "EBGT/PHEU": "{^ectomy}",
  "SAEUD": "said",
  "KPAOUR": "computer",
  "KAT": "cat",
  "KET/*L": "kettle",
  "K": "can",
  "K-PBT": "can't",
  "HO*UFS": "houses",
  "HER": "her",
  "HROPBG": "long",
  "TPHAR/AEUT": "narrate",
  "SAO*ET": "seethe",
  "PWEUPBG": "bing",
  "PWEUPB/-PBLG": "binge",
  "KUF": "cuff",
  "U": "you",
  "STOR": "store",
  "RAOPL": "room",
  "RAO*PL": "{^room}",
  "OUDZ": "outside",
  "HEUT": "hit",
  "PHEUS": "miss",
  "H-PLS": "hit-and-miss",
  "PWUF/ET": "buffet",
  "WAPBGD": "wandering", // currently pre-sorted to best stroke first
  "WAPB/TKER/-G": "wandering",
  "HROPBLG": "lodge",
  "S-PBT": "isn't",
  "PHAEUD/*EPB": "maiden",
  "PHAEUD/EPB": "maiden",
  "1-9DZ": "$100",
  "1-DZ": "$100",
  "2-DZ": "$200",
  "3-DZ": "$300",
  "4-DZ": "$400",
  "#45/TK-PL": "$45",
  "45/TK-PL": "$45",
  "5DZ": "$500",
  "-6DZ": "$600",
  "-7DZ": "$700",
  "0EU": "0",
  "#-Z": "00",
  "10*EU": "01",
  "10EU": "01",
  "20EU": "02",
  "30EU": "03",
  "40EU": "04",
  "50EU": "05",
  "1/TPW-S": "1 tablespoon",
  "#S/W-B/THUZ": "1,000",
  "1/THO*EUPB": "1,000",
  "1/THOEUB": "1,000",
  "TPHOUZ": "1,000",
  "HA*F": "1/2",
  "TPHA*F": "1/2",
  "130EU": "1/3",
  "TH*EURD": "1/3",
  "140EU": "1/4",
  "KWA*RT": "1/4",
  "10EU8": "1/8",
  "10/PERS/APBLG": "10 percentage",
  "1/0": "10",
  "10/P*ERS": "10%",
  "#SO/W-B/THUZ": "10,000",
  "1-Z": "100",
  "TPHUPBZ": "100",
  "1/THOUZ": "1000",
  "1-DZ/1": "1001",
  "10/1": "101",
  "10/*PBT": "10th",
  "10/*T": "10th",
  "1-D": "11",
  "1BGD": "11:00",
  "1-D/*T": "11th",
  "1/2": "12",
  "12/TPH/1": "12-in-1",
  "12/1": "121",
  "12R5": "125",
  "12-BG": "12:00",
  "12/*T": "12th",
  "1/3": "13",
  "14": "14",
  "14*": "14",
  "1/5": "15",
  "1/6": "16",
  "1/7": "17",
  "1/8": "18",
  "18/50/-S": "1850s",
  "1-9": "19",
  "1-9D": "19",
  "19/30/-S": "1930s",
  "1-9/50": "1950",
  "1-9D/50": "1950",
  "TPHEFPBT": "197",
  "19/OEUP": "1970",
  "TPHEFPBD": "1970",
  "TPHAEUPBT": "198",
  "TPHAEUPBD": "1980",
  "19/8/6": "1986",
  "TPHEUPBD": "1990",
  "1-BG": "1:00",
  "1/PW*": "1b",
  "1/S*/T*": "1st",
  "2/KP*/4": "2 x 4",
  "#T-/W-B/THUZ": "2,000",
  "230EU": "2/3",
  "2/0": "20",
  "2-Z": "200",
  "KWRAOUPB/1": "2001",
  "STWOUPB/1": "2001",
  "TWOUPB/-P": "2007",
  "TWOUPB/7": "2007",
  "TWOUPB/10": "2010",
  "20/-S": "20s",
  "12EU": "21",
  "2-D": "22",
  "2/3": "23",
  "2/4": "24",
  "#240": "240",
  "2/5": "25",
  "2/6": "26",
  "2/6/0": "260",
  "2/7": "27",
  "2/8": "28",
  "2/9": "29",
  "2-BG": "2:00",
  "2/TK*": "2d",
  "2/*PBD": "2nd",
  "2-S": "2s",
  "3/T-BS": "3 tablespoon",
  "3/T-BS/-S": "3 tablespoons",
  "3/KP*/6": "3 x 6",
  "#P-/W-B/THUZ": "3,000",
  "340EU": "3/4",
  "30EU8": "3/8",
  "3/0": "30",
  "3-Z": "300",
  "30*S": "30s",
  "30/-S": "30s",
  "13EU": "31",
  "23EU": "32",
  "3-D": "33",
  "3/4": "34",
  "3/5": "35",
  "PAO/TKEG": "350 degree",
  "3/6": "36",
  "36/0/TKEG/-S": "360 degrees",
  "3/7": "37",
  "3/8": "38",
  "3/9": "39",
  "3-BG": "3:00",
  "30*EUD": "3D",
  "3/R*D": "3rd",
  "4/T-BS/-S": "4 tablespoons",
  "#H/W-B/THUZ": "4,000",
  "40": "40",
  "40*": "40",
  "4-Z": "400",
  "40ES": "40s",
  "40S": "40s",
  "40RBGS": "40{,}",
  "14EU": "41",
  "24EU": "42",
  "34EU": "43",
  "4-D": "44",
  "4/5": "45",
  "4/6": "46",
  "4/7": "47",
  "4/8": "48",
  "4/9": "49",
  "4-BG": "4:00",
  "4-S": "4s",
  "4/*T": "4th",
  "R5": "5",
  "TPEUF/P*ERS": "5%",
  "#A/W-B/THUZ": "5,000",
  "5/-P/4": "5.4",
  "50EU8": "5/8",
  "50/KREPBT/-S": "50 cents",
  "5/0": "50",
  "5Z": "500",
  "50S": "50s",
  "15EU": "51",
  "25*EU": "52",
  "25EU": "52",
  "35EU": "53",
  "45EU": "54",
  "5D": "55",
  "56": "56",
  "57": "57",
  "58": "58",
  "59": "59",
  "5BG": "5:00",
  "5/*T": "5th",
  "#F/W-B/THUZ": "6,000",
  "0EU6": "60",
  "-6Z": "600",
  "1EU6": "61",
  "2EU6": "62",
  "3EU6": "63",
  "4EU6": "64",
  "5EU6": "65",
  "-6D": "66",
  "67": "67",
  "68": "68",
  "69": "69",
  "K-6": "6:00",
  "6/*T": "6th",
  "#-P/W-B/THUZ": "7,000",
  "0EU7": "70",
  "-7Z": "700",
  "0EU7S": "70s",
  "1EU7": "71",
  "2EU7": "72",
  "3EU7": "73",
  "4EU7": "74",
  "5EU7": "75",
  "EU67": "76",
  "-7D": "77",
  "78": "78",
  "79": "79",
  "K-7": "7:00",
  "7/*T": "7th",
  "#L/W-B/THUZ": "8,000",
  "0EU8/KREPBT/SKP-S": "80 cents and",
  "0EU8": "80",
  "-8Z": "800",
  "0EU8S": "80s",
  "1EU8": "81",
  "2EU8": "82",
  "3EU8": "83",
  "4EU8": "84",
  "8/5/KREPBT/-S": "85 cents",
  "5EU8": "85",
  "EU68": "86",
  "EU78": "87",
  "-8D": "88",
  "89": "89",
  "K-8": "8:00",
  "8/*T": "8th",
  "8/SR*/O*": "8vo",
  "#-T/W-B/THUZ": "9,000",
  "0EU9": "90",
  "0EU9/PERS": "90%",
  "-9Z": "900",
  "EU9": "900",
  "1EU9": "91",
  "2EU9": "92",
  "3EU9": "93",
  "4EU9": "94",
  "5EU9": "95",
  "EU69": "96",
  "EU79": "97",
  "EU89": "98",
  "-9D": "99",
  "K-9": "9:00",
  "9/*T": "9th",
  "1-R": "I",
  "2-R": "II",
  "3-R": "III",
  "4-R": "IV",
  "R-9": "IX",
  "R-6": "VI",
  "R-7": "VII",
  "R-8": "VIII",
  "10R": "X",
  "1-RD": "XI",
  "12-R": "XII",
  "0Z": "{&00}",
  "#O": "{&0}",
  "0RBGS": "{&0}",
  "#S": "{&1}",
  "1-RBGS": "{&1}",
  "#T-": "{&2}",
  "2-RBGS": "{&2}",
  "#P-": "{&3}",
  "3-RBGS": "{&3}",
  "#H": "{&4}",
  "4-RBGS": "{&4}",
  "#A": "{&5}",
  "5RBGS": "{&5}",
  "#F": "{&6}",
  "1KWR-6": "{&6}",
  "#-P": "{&7}",
  "1KWR-7": "{&7}",
  "#L": "{&8}",
  "1KWR-8": "{&8}",
  "#-T": "{&9}",
  "1KWR-9": "{&9}",
  "TWOUPB": "{200^}",
  "30*U": "{:}30",
  "40U": "{:}40",
  "45*U": "{:}45",
  "2*": "{>}{&t}",
  "0RZ": "{^0rz}",
  "50*EUBG": "{^:05}",
  "50EUBG": "{^:05}",
  "10*BG": "{^:10}",
  "10BG": "{^:10}",
  "15*BG": "{^:15}",
  "15BG": "{^:15}",
  "20*BG": "{^:20}",
  "20BG": "{^:20}",
  "25*BG": "{^:25}",
  "25BG": "{^:25}",
  "30*BG": "{^:30}",
  "30BG": "{^:30}",
  "35*BG": "{^:35}",
  "35BG": "{^:35}",
  "40*BG": "{^:40}",
  "40BG": "{^:40}",
  "45*BG": "{^:45}",
  "45BG": "{^:45}",
  "50*BG": "{^:50}",
  "50BG": "{^:50}",
  "5*BGD": "{^:55}",
  "5BGD": "{^:55}",
  "TWOUPB/9/TKHRAR/-S": "2009 dollars",
  "TWOUPBD": "2000",
  "TWOUZ": "2000",
  "KPR-T": "©",
  "TPH": "in",
  "KWROUR": "your",
  "KR-PGS": "cross-petition",
  "KROPL": "{^.com}",
  "TKR-FPLT": "Dr.",
  "TPHEL/KWREU": "nelly",
  "KOFR": "cover",
  "PHAS": "mass",
  "AUFR/-T": "{over-the-^}",
  "AEUPB/SKWREU": "{ani-^}",
  "A*EURBG": "{^-acre}",
  "*EUPB/HRAU": "{^-in-law}",
  "STOEUPB": "steno",
  "HRAOEUF": "life",
};

let testEmojiDict = {
  "PHOEPBLG/T*/PH*": "™",
};
let testRubyDict = {
  "TPHRARB/PWR-BGT": "flash[:{^}",
};
let testReactDict = {
  "O*B/P-P": "Object.{^}",
};
let testPloverDict = {
  "A/HREF": "<a href=\"{^}",
  "SKP": "and",
  "APBD": "and",
  "KR-PGS": "cross-petition",
  "TKR*FPLT": "Dr.{-|}",
  "PH-BGS": "Mx.{-|}",
  "PHRARPLS": "Mr. and Mrs.",
  "KHAPBT": "chant",
  "EL/TKREUPBLG": "Eldridge",
  "TWA*S": "{~|'^}twas",
  "SKWR*EPL": "gentlemen",
  "OP/TOPL/TREUFT": "optometrist",
  "POED/TREUFT": "podiatrist",
};

// Some prefix and suffix entries are commented out because they are alternative strokes for prefix/suffix translations and the preferred stroke already exists.
// Keeping entries uncommented out improves the chances of finding a valid dictionary entry. Previously, we would sort the affix arrays to ensure "preferred" strokes were used where possible, but we won't have that control with personal dictionaries.
let testPrefixesDict = {
  "*EBGS/TRA": "{extra^}",
  "*EFR": "{every^}",
  "*ERBGS": "{extra^}",
  "*ERT/RO": "{erythro^}",
  "*ERTD/RO": "{erythro^}",
  "*EUG": "{Ig^}",
  "*EUL/KWRO": "{ileo^}",
  "*EUPBG/TKO": "{incudo^}",
  "*EUPL": "{im^}",
  "*FR": "{ever^}",
  "-T/TPHAEUS/KWRO": "{of the naso^}",
  "A": "{a^}",
  "A*ED": "{ad^}",
  "A*EPBT": "{ante^}",
  "A*ER": "{aero^}",
  "A*EUPBT": "{anti^}",
  "A*EUPBT/H-PB": "{anti-^}",
  "A*F": "{after^}",
  "A*LG/*L": "{alkyl^}",
  "A*PBT/RA": "{anthra^}",
  "A*PBT/RO": "{anthro^}",
  "A*RT/RO": "{arthro^}",
  "A*T/RO": "{athero^}",
  "A*T/ROE": "{athero^}",
  "A*UT": "{auto^}",
  "A/PHAOEB": "{ameb^}",
  "A/PHEUG/TKA/HRO": "{amygdalo^}",
  "A/PHO*EUPB": "{amino^}",
  "A/PO": "{apo^}",
  "A/SAOET/*L": "{acetyl^}",
  "A/SAOET/KWRO": "{aceto^}",
  "A/THAOER/SKWRO": "{athero^}",
  "A/TKAOEPB/SKWRO": "{adeno^}",
  "A/TKRAOEPB/SKWRO": "{adreno^}",
  "A/TPHA": "{ana^}",
  "A/TPHAFL": "{anaphylo^}",
  "AB": "{ab^}",
  "ABG/RO": "{acro^}",
  "ABG/RO/PHEU/KWRO": "{acromio^}",
  "ABGS/KWRO": "{axio^}",
  "ABGS/SKWRO": "{axo^}",
  "AD/PO": "{adipo^}",
  "AEPBT": "{ante^}",
  "AEPL": "{ambi^}",
  "AEU/HREUPBG/WO": "{a linguo^}",
  "AEU/KOS": "{eicosa^}",
  "AEU/KPAOEPB/KWRO": "{a xeno^}",
  "AEUR/KWRE": "{arye^}",
  "AFR": "{after^}",
  "AL/HRO": "{allo^}",
  "AO*EP": "{epi^}",
  "AO*UPB": "{uni^}",
  "AOE": "{e^}",
  "AOE/HREBG/TRO": "{electro^}",
  "AOE/HREUPT/KWRO": "{elipto^}",
  "AOE/PHET/SKWRO": "{emeto^}",
  "AOEBG/SKWRO": "{eco^}",
  "AOET/KWRO": "{etio^}",
  "AOET/KWROE": "{etio^}",
  "AOEUD/SKWRO": "{iodo^}",
  "AOEUS/KWRO": "{iso^}",
  "AOEUS/SKWRO": "{iso^}",
  "AOU/TREUBG/HRO": "{utriculo^}",
  "AOUB/*ER": "{uber^}",
  "AOUF/KWROE": "{uveo^}",
  "AOUPB": "{uni^}",
  "AOUPB/SKWREU": "{uni^}",
  "AOUT": "{out^}",
  "AOUT/RO": "{utero^}",
  "AP/KWRO": "{apo^}",
  "APB/AF/HRO": "{anaphylo^}",
  "APB/APBT/RO": "{an antero^}",
  "APB/SKWRA": "{ana^}",
  "APB/TE": "{ante^}",
  "APB/TER/KWRO": "{antero^}",
  "APB/THRA": "{anthra^}",
  "APB/THRO/PO": "{anthropo^}",
  "APBG/KWRO": "{angio^}",
  "APBG/KWROE": "{angio^}",
  "APBG/SKWRO": "{angio^}",
  "APBGS/KWRO": "{anxio^}",
  "APBT/RO": "{antero^}",
  "APBT/SKWR*E": "{ante^}",
  "APBT/SKWRE": "{ante^}",
  "APL/HRO": "{amelo^}",
  "AR/KWREU": "{ary^}",
  "AR/TAOER/KWRO": "{arterio^}",
  "AR/TAOER/KWROE": "{arterio^}",
  "AR/TAOER/SKWRO": "{arterio^}",
  "ARBG/KWROE": "{archeo^}",
  "ARPBD/SKWRO": "{andro^}",
  "ART/RO": "{arterio^}",
  "AS/TPHAOE/TOE": "{acineto^}",
  "AUF": "{off^}",
  "AUFR": "{over^}",
  "AUFT/RO": "{Austro^}",
  "AUP": "{up^}",
  "AUPB": "{on^}",
  "AUR": "{or^}",
  "AUR/EUBG/HRO": "{auriculo^}",
  "AURBG/HRO": "{auriculo^}",
  "EBG/KWRO": "{echo^}",
  "EBGS/AOEUT/SKWRO": "{excito^}",
  "EBGS/AOEUT/SKWRO*": "{excito^}",
  "EBGS/OE": "{exo^}",
  "EBGS/SKWRO": "{exo^}",
  "EBGT/SKWRO": "{ecto^}",
  "EP": "{epi^}",
  "EP/SKWREU": "{epi^}",
  "EPB": "{en^}",
  "EPB/SEF/HRO": "{encephalo^}",
  "EPB/SEFL": "{encephalo^}",
  "EPB/SEFL/HRO": "{encephalo^}",
  "EPB/TER/SKWRO": "{entero^}",
  "EPB/TKO": "{endo^}",
  "EPBD/SKWRO": "{endo^}",
  "EPBT/*ER/SKWRO": "{entero^}",
  "EPBT/RO": "{entero^}",
  "EPBT/SKWRO": "{ento^}",
  "EPL": "{em^}",
  "ER": "{er^}",
  "ERBGS": "{extra^}",
  "EUD/KWRO": "{idio^}",
  "EUD/KWROE": "{idio^}",
  "EUD/SKWRO": "{ideo^}",
  "EUFBG/KWRO": "{ischio^}",
  "EUFRPB": "{infra^}",
  "EUL/KWRO": "{ilio^}",
  "EUL/KWRO*E": "{ileo^}",
  "EUL/KWROE": "{ilio^}",
  "EUPB": "{in^}",
  "EUPB/PHAOUPB/SKWRO": "{immuno^}",
  "EUPB/PHAOUPB/TPHOE": "{immuno^}",
  "EUPB/TPRA": "{infra^}",
  "EUPB/TRA": "{intra^}",
  "EUPBS/HRO": "{insulo^}",
  "EUPBT": "{inter^}",
  "EUPL": "{im^}",
  "EUPL/PHAOUPB/KWRO": "{immuno^}",
  "EUPL/PHAOUPB/SKWRO": "{immuno^}",
  "EUPL/PHAOUPB/TPHO": "{immuno^}",
  "EUR": "{ir^}",
  "EURD/SKWRO": "{irido^}",
  "EURPBT": "{intro^}",
  "H*ERT": "{hetero^}",
  "HA*EPL": "{hemi^}",
  "HA*EPT": "{hepato^}",
  "HAEPT/SKWRO": "{hepato^}",
  "HAO*EUP": "{hypo^}",
  "HAO*EURD": "{hydro^}",
  "HAO*RD": "{hydro^}",
  "HAOEL/KWRO": "{helio^}",
  "HAOEPL": "{hemo^}",
  "HAOEPL/KWRA": "{hemia^}",
  "HAOEPL/SKWRO": "{hemo^}",
  "HAOEPLT/SKWRO": "{hemato^}",
  "HAOEPLT/TO": "{hemato^}",
  "HAOEU/POE": "{hypo^}",
  "HAOEU/SKWRO": "{hyo^}",
  "HAOEU/TKROBGS/KWREU": "{hydroxy^}",
  "HAOEU/TKROE": "{hydro^}",
  "HAOEUB/SKWRO": "{ribo^}",
  "HAOEUBG/SKWRO": "{myco^}",
  "HAOEUD/RO": "{hydro^}",
  "HAOEUD/ROBGS/KWREU": "{hydroxy^}",
  "HAOEUD/TKROE": "{hydro^}",
  "HAOEUG/ROE": "{hygro^}",
  "HAOEUP/KWRO": "{hypo^}",
  "HAOEUP/O*": "{hypo^}",
  "HAOEUP/OE": "{hypo^}",
  "HAOEUP/SKWRO": "{hypo^}",
  "HAOEURD": "{hydro^}",
  "HAOEURD/OBGS/KWREU": "{hydroxy^}",
  "HAOEURD/OBGS/SKWREU": "{hydroxy^}",
  "HAOEURD/RA": "{hydra^}",
  "HAOEURD/SKWRO": "{hydro^}",
  "HAOEURP": "{hyper^}",
  "HAPT/SKWRO": "{hapto^}",
  "HE/PA/TO": "{hepato^}",
  "HEL/KWREU": "{heli^}",
  "HEP/A*T/SKWRO": "{hepato^}",
  "HEPL/KWREU": "{hemi^}",
  "HEPL/SKWREU": "{hemi^}",
  "HEPT": "{hepato^}",
  "HEPT/KWRO": "{hepato^}",
  "HEPT/SKWRO": "{hepato^}",
  "HERT": "{hetero^}",
  "HET/RO": "{hetero^}",
  "HET/ROE": "{hetero^}",
  "HEUFT/RO": "{hystero^}",
  "HEUFT/SKWRO": "{histo^}",
  "HEUP/TPHO": "{hypno^}",
  "HO*EUP": "{hypo^}",
  "HO*EUPL": "{hemi^}",
  "HO*EUPT": "{hepato^}",
  "HO/HRO": "{holo^}",
  "HO/PHO": "{homo^}",
  "HOE/PHOE": "{homo^}",
  "HOEPL/KWROE": "{homeo^}",
  "HOEUP": "{hypo^}",
  "HOEURD": "{hydro^}",
  "HR*EUFPL/SKWRO": "{lympho^}",
  "HR*EUP": "{lipo^}",
  "HRA/PHEL/HRO": "{lamello^}",
  "HRABGT/SKWRO": "{lacto^}",
  "HRAEURPBG/KWRO": "{laryngo^}",
  "HRAEURPBG/SKWRO": "{laryngo^}",
  "HRAOUBG/SKWRO": "{leuko^}",
  "HREBG/SKWRO": "{electro^}",
  "HREBG/TRO": "{electro^}",
  "HREPT/KWRO": "{lepto^}",
  "HREPT/SKWRO": "{lepto^}",
  "HRERBGT": "{electro^}",
  "HRERBGT/SKWRO": "{electro^}",
  "HRES/EPB": "{lessen^}",
  "HREUP/SKWRO": "{lipo^}",
  "HREUPBG/WO": "{linguo^}",
  "HRO*BGS": "{hydroxy^}",
  "HRO*EUFPL": "{lympho^}",
  "HRO*EUFPL/SKWRO": "{lympho^}",
  "HRO*EUP": "{lipo^}",
  "HRUPL/PWO": "{lumbo^}",
  "HRUPL/PWRO": "{lumbo^}",
  "K*EUL": "{kilo^}",
  "KA": "{ka^}",
  "KA*LG/TPHAEU/KWROE": "{calcaneo^}",
  "KA*LG/TPHO*EU": "{calcaneo^}",
  "KAEUR/KWRO": "{karyo^}",
  "KAEUR/KWROE": "{karyo^}",
  "KAL/KAPB/KWRO": "{calcaneo^}",
  "KAL/KAPB/KWROE": "{calcaneo^}",
  "KAL/SEU": "{calci^}",
  "KAOEPL": "{chemo^}",
  "KAOEUL/SKWRO": "{chylo^}",
  "KAOUPB/KWRO": "{cuneo^}",
  "KAPS/HRO": "{capsulo^}",
  "KARB/A/PHO*EUPB": "{carbamino^}",
  "KARD/KWRO": "{cardio^}",
  "KAUPB": "{con^}",
  "KAURPBT": "{contra^}",
  "KER/TO": "{kerato^}",
  "KERT/KWRO": "{kerato^}",
  "KERT/SKWRO": "{kerato^}",
  "KET/KWRO": "{keto^}",
  "KHAO*EPL": "{chemo^}",
  "KHAOEPL": "{chemo^}",
  "KHAOEPL/KWRO": "{chemo^}",
  "KHAOEPL/SKWRO": "{chemo^}",
  "KHAOEU/HRO": "{chylo^}",
  "KHAOEUL/KWRO": "{chylo^}",
  "KHAOEUL/SKWRO": "{chylo^}",
  "KHAOEUPL/KWRO": "{chymo^}",
  "KHAOEUPL/SKWRO": "{chymo^}",
  "KHAOEUR/SKWRO": "{chiro^}",
  "KHEPL/SKWRO": "{chemo^}",
  "KHO*EUPL": "{chemo^}",
  "KHOL/KREUFT": "{cholecyst^}",
  "KHOPBD/RO": "{chondro^}",
  "KHOR/KWROE": "{choreo^}",
  "KHORPBD": "{chondro^}",
  "KHR*EURT/RO": "{clarithro^}",
  "KHRAEUD/KWRO": "{cleido^}",
  "KHRAOED/KWRO": "{cleido^}",
  "KHREFT/RO": "{cholestero^}",
  "KHRO*R/SKWRO": "{chloro^}",
  "KHROR/SKWRO": "{chloro^}",
  "KOBG/SKWRO": "{cocco^}",
  "KOEL/KWROE": "{choleo^}",
  "KOEL/SKWRO": "{colo^}",
  "KOEPL/A": "{comba^}",
  "KOEURD": "{cardio^}",
  "KOL/SKWRO": "{colo^}",
  "KOPB/SKWRO": "{cono^}",
  "KOPB/TKRO": "{chondro^}",
  "KOPBD/RO": "{chondro^}",
  "KORPB/KWRO": "{corneo^}",
  "KORPB/SKWRE": "{coryne^}",
  "KORPBT": "{contra^}",
  "KORT/KO": "{cortico^}",
  "KORT/KOE": "{cortico^}",
  "KOUFRPBT": "{counter^}",
  "KOURPBT": "{counter^}",
  "KPAOE/TPHO": "{xeno^}",
  "KPAOE/TPHOE": "{xeno^}",
  "KPAOEPB/SKWRO": "{xeno^}",
  "KPAOEUL/SKWRO": "{xylo^}",
  "KPAOEUT/KWRO": "{excito^}",
  "KPAOEUT/SKWRO": "{excito^}",
  "KPWHROES": "{meso^}",
  "KPWHROS/SO": "{glosso^}",
  "KR*EF": "{cef^}",
  "KRAEUPB/KWRO": "{cranio^}",
  "KRAEUPB/KWROE": "{cranio^}",
  "KRAEUPB/SKWRO": "{cranio^}",
  "KRAO*EUT/KWRO": "{cyto^}",
  "KRAO*EUT/SKWRO": "{cyto^}",
  "KRAOEU/KWROE": "{cryo^}",
  "KRAOEU/SKWRO": "{cryo^}",
  "KRAOEUT/KWRO": "{cyto^}",
  "KRAOEUT/SKWRO": "{cyto^}",
  "KRAPB": "{cran^}",
  "KREF": "{cef^}",
  "KREUBG/KWRO": "{crico^}",
  "KREUBG/SKWRO": "{crico^}",
  "KREUFT/KWRO": "{cysto^}",
  "KREUFT/SKWRO": "{cysto^}",
  "KREUPT/SKWRO": "{crypto^}",
  "KRO*EUT": "{cyto^}",
  "KRO/PHO": "{chromo^}",
  "KROEUT": "{cyto^}",
  "KWAD/REU": "{quadri^}",
  "KWARD": "{quadri^}",
  "KWR*EU": "{i^}",
  "KWRAO*E": "{e^}",
  "KWRAT/RO": "{iatro^}",
  "KWRES/TER": "{yester^}",
  "KWREUBG/KWRO": "{syringo^}",
  "KWROEPBD": "{endo^}",
  "KWROUPB": "{down^}",
  "O*EUBGS": "{extra^}",
  "O*EUPBD": "{endo^}",
  "O*EUPBG/SKWRO": "{onycho^}",
  "O*EUR": "{uro^}",
  "O*EURBGS": "{extra^}",
  "O*EURT": "{erythro^}",
  "O*EUT": "{auto^}",
  "O*PBG": "{onco^}",
  "O*PBG/HRO": "{onycho^}",
  "O*PBG/SKWRO": "{onco^}",
  "O*RT": "{ortho^}",
  "O*RT/SKWRO": "{ortho^}",
  "OBG/HRO": "{oculo^}",
  "OBG/SKWRU": "{Ocu^}",
  "OBGS/HRO": "{oxalo^}",
  "OBGS/KWREU": "{oxy^}",
  "OBGS/KWREU/TKO": "{oxido^}",
  "OE/HREU/TKPWO": "{oligo^}",
  "OE/TKOPBT/SKWRO": "{odonto^}",
  "OEL/SRO": "{olivo^}",
  "OEL/TKPWO": "{oligo^}",
  "OEL/TKPWOE": "{oligo^}",
  "OEP/KWROE": "{opio^}",
  "OERBGS/SKWR-RBGS": "{oh^}",
  "OET/KWRO": "{oto^}",
  "OEUPBG/SKWRO": "{onycho^}",
  "OEUR": "{uro^}",
  "OFPL/HRO": "{omphalo^}",
  "OFT/KWRO": "{osteo^}",
  "OFT/KWROE": "{osteo^}",
  "OFT/SKWRO": "{osteo^}",
  "OP/THAL/PHO": "{ophthalmo^}",
  "OPB/*EUBG": "{onycho^}",
  "OPB/KWREU/KO": "{onycho^}",
  "OPBG/SKWRO*": "{onco^}",
  "OPL/TPHEU": "{omni^}",
  "OR/SKWRO": "{oro^}",
  "ORT/SKWRO": "{ortho^}",
  "OS/PHO": "{osmo^}",
  "OS/TAOE/KWROE": "{osteo^}",
  "OT/KWRO": "{oto^}",
  "OT/SKWRO": "{oto^}",
  "P*ER": "{peri^}",
  "PA*R": "{para^}",
  "PA*T/SKWRO": "{patho^}",
  "PABG/KWREU": "{pachy^}",
  "PABG/SKWREU": "{pachy^}",
  "PAEUL/KWRO": "{paleo^}",
  "PAEUL/KWROE": "{paleo^}",
  "PAL/TO": "{palato^}",
  "PAOEU/HRO": "{pyelo^}",
  "PAOEU/KWRO": "{pyo^}",
  "PAOEUL/KWRO": "{pyelo^}",
  "PAOEUL/SKPWRO": "{pyelo^}",
  "PAOEUL/SKWRO": "{pyelo^}",
  "PAOEUR/KWRO": "{pyro^}",
  "PAOEUR/SKWRO": "{pyro^}",
  "PAOUB/KWRO": "{pubo^}",
  "PAOUB/SKWRO": "{pubo^}",
  "PE/TKEUBG/HRO": "{pediculi^}",
  "PEBG/TAOR/KWROE": "{bacterio^}",
  "PEPT/SKWRO": "{pepto^}",
  "PER/KWRO": "{perio^}",
  "PER/OBGS": "{perox^}",
  "PER/SKWREU": "{peri^}",
  "PET/RO": "{petro^}",
  "PEUBG/SKWRO": "{pico^}",
  "PEUBGT/SKWRO": "{picto^}",
  "PEUL/KWRO": "{pilo^}",
  "PEUL/SKWRO": "{pilo^}",
  "PH*EL/TPHO": "{melano^}",
  "PH*ELT/HRO": "{metallo^}",
  "PH*ELT/SKWRO": "{metallo^}",
  "PH*ERT": "{metro^}",
  "PH*ET/*L": "{methyl^}",
  "PH*EUL": "{milli^}",
  "PH*UFL/HRO": "{musculo^}",
  "PH-BG": "{Mc^}",
  "PHABG/HRO": "{maculo^}",
  "PHABGS/HRO": "{maxillo^}",
  "PHAERBG": "{macro^}",
  "PHAL": "{mal^}",
  "PHAO*UPB": "{immuno^}",
  "PHAOED/KWRO": "{medio^}",
  "PHAOES/KWRO": "{mesio^}",
  "PHAOEU/HRO": "{myelo^}",
  "PHAOEU/KROE": "{micro^}",
  "PHAOEU/KWRO": "{myo^}",
  "PHAOEU/SKWRO": "{myo^}",
  "PHAOEUBG/KWRO": "{myco^}",
  "PHAOEUBG/SKPWRO": "{myco^}",
  "PHAOEUBG/SKWRO": "{myco^}",
  "PHAOEUL/KWRO": "{myelo^}",
  "PHAOEUL/SKWRO": "{myelo^}",
  "PHAOEURBG": "{micro^}",
  "PHAOU/KOE": "{muco^}",
  "PHAOUBG": "{muco^}",
  "PHAOUBG/KO": "{muco^}",
  "PHAOUBG/SKWRO": "{muco^}",
  "PHAPL/HRO": "{mammillo^}",
  "PHE/TAL/HRO": "{metallo^}",
  "PHE/TPHEUPBG": "{meningo^}",
  "PHEBG/TPHO": "{mechano^}",
  "PHEG/HRO": "{megalo^}",
  "PHEG/KWRA": "{mega^}",
  "PHEG/TKPWA": "{mega^}",
  "PHEL/TPHO": "{melano^}",
  "PHEPB/EUPB/SKWRO": "{meningo^}",
  "PHEPB/EUS/KO": "{menisco^}",
  "PHEPBG/SKWRO": "{meningo^}",
  "PHES/KWRO": "{meso^}",
  "PHES/SKWRO": "{meso^}",
  "PHET/HRO": "{metallo^}",
  "PHET/KWRA": "{meta^}",
  "PHEUD": "{mid^}",
  "PHEUPB/SKWRO": "{mino^}",
  "PHEURPBG": "{myringo^}",
  "PHEUZ": "{mis^}",
  "PHO*EU": "{myo^}",
  "PHO*EUPB/KRAOEUT/KWRO": "{immunocyto^}",
  "PHO*EUT": "{meta^}",
  "PHO*FR/KWRO": "{morpho^}",
  "PHO*PB": "{mono^}",
  "PHO/TO": "{moto^}",
  "PHOPB/OE": "{mono^}",
  "PHOPB/SKWRO": "{mono^}",
  "PHRAEU/KWRO": "{pleo^}",
  "PHRAOE/KWRO": "{pleio^}",
  "PHRAS": "{plas^}",
  "PHRAT/KWREU": "{platy^}",
  "PHRE/KWRO": "{pleo^}",
  "PHRE/SKWRO": "{pleo^}",
  "PHRO*EUPB": "{immuno^}",
  "PHRUR/SKWREU": "{pluri^}",
  "PHUFBG/HRO": "{musculo^}",
  "PO*EFT/RO": "{postero^}",
  "PO*EUBG": "{pico^}",
  "PO*EUT": "{patho^}",
  "PO*L": "{poly^}",
  "POEFT/RO": "{postero^}",
  "POFT/RO": "{postero^}",
  "POL/KWREU": "{poly^}",
  "POPBT/SKWRO": "{ponto^}",
  "PRAOEUT/SKWRO": "{parieto^}",
  "PRO": "{pro^}",
  "PROBGT/SKWRO": "{procto^}",
  "PROEP/RO": "{proprio^}",
  "PROERP/RO": "{proprio^}",
  "PROET/KWRO": "{proteo^}",
  "PROET/KWROE": "{proteo^}",
  "PW*EU": "{bi^}",
  "PWA*EBG": "{back^}",
  "PWABG/TAOER/KWRO": "{bacterio^}",
  "PWAEBG": "{back^}",
  "PWAEU/TKPWA": "{bayga^}",
  "PWAEUR/SKWRO": "{baro^}",
  "PWAEUS/SKWRO": "{baso^}",
  "PWAO*E": "{bio^}",
  "PWAOEBGT/RO": "{bacterio^}",
  "PWAOERBGT/KWRO": "{bacterio^}",
  "PWAOERBGT/SKWRO": "{bacterio^}",
  "PWAOEU/KWROE": "{bio^}",
  "PWAOUBG/KWRO": "{bucco^}",
  "PWAOUT/RO": "{butyro^}",
  "PWAR/SKWRO": "{baro^}",
  "PWE": "{be^}",
  "PWEPB/SO*": "{benzo^}",
  "PWHRAFT/SKWRO": "{blasto^}",
  "PWHREF/RO": "{blepharo^}",
  "PWHREFR/SKWRO": "{blepharo^}",
  "PWO*E": "{bio^}",
  "PWO*EU": "{bio^}",
  "PWRA*EUD/KWREU": "{brady^}",
  "PWRA*PBG/KWRO": "{branchio^}",
  "PWRABG/KWREU": "{brachy^}",
  "PWRAD/KWREU": "{brady^}",
  "PWRAEUBG/KWRO": "{brachio^}",
  "PWRAPBG/KWRO": "{branchio^}",
  "PWRO*PBG": "{broncho^}",
  "PWRO*PBG/KWRO": "{bronchio^}",
  "PWRO*PBG/SKWRO": "{broncho^}",
  "PWROPB/KO": "{broncho^}",
  "PWROPBG/KWRO": "{broncho^}",
  "PWROPBG/SKWRO": "{broncho^}",
  "PWUBG/KO": "{bucco^}",
  "PWUBG/KWRO": "{bucco^}",
  "PWUBG/SKWRO": "{bucco^}",
  "PWUBL/KWRO": "{bulbo^}",
  "PWUBL/SKWRO": "{bulbo^}",
  "PWUT/OBG/SKWRU": "{but Ocu^}",
  "R*ERT": "{erythro^}",
  "RAOEPB": "{reen^}",
  "RAOEU/PWO": "{ribo^}",
  "RAOEUB/SKWRO": "{ribo^}",
  "RAOEUB/TPHAOU/KHRAEU/SKWRO": "{ribonucleo^}",
  "RAOEUPB/SKWRO": "{rhino^}",
  "RAOUB/RO": "{rubro^}",
  "RAOUPL/TO": "{rheumato^}",
  "RAOUPLT": "{rheumato^}",
  "RAOUPLT/SKWRO": "{rheumato^}",
  "RE": "{re^}",
  "RE/TEUBG/HRO": "{reticulo^}",
  "REBGT/KWRO": "{recto^}",
  "REBGT/SKWRO": "{recto^}",
  "RERT": "{retro^}",
  "RET/TPHO": "{retino^}",
  "REUB/SKWRO": "{ribo^}",
  "REUPB/SKWRO": "{rhino^}",
  "RO/PWO": "{robo^}",
  "ROEPBT": "{entero^}",
  "S*EUPB": "{syn^}",
  "S*EUPL/A*T/SKWRO": "{sympatho^}",
  "S*EUPL/THO": "{sympatho^}",
  "S*EUPLT/SKWRO": "{sympatho^}",
  "SABG/RO": "{sacro^}",
  "SAL/PEUPB/TKPWO": "{salpingo^}",
  "SAO*EU/TKPWO": "{zygo^}",
  "SAO*EUG": "{zyg^}",
  "SAO*EUG/KWRO/PHAT/K-L": "{zygomatico^}",
  "SAO*EUG/PHAT/KO": "{zygomatico^}",
  "SAO*UD": "{pseudo^}",
  "SAOEUB/*ER": "{cyber^}",
  "SAOEUBG/HRO": "{cyclo^}",
  "SAOEUD/RO": "{sidero^}",
  "SAOEUG/KWRO": "{zygo^}",
  "SAOEUG/SKWRO": "{zygo^}",
  "SAOEUG/SKWRO/PHAT/K-L": "{zygomatico^}",
  "SAOEULG": "{cyclo^}",
  "SAOEUPB/KWRO": "{cyano^}",
  "SAOEUPB/SKWRO": "{cyano^}",
  "SAOEURB": "{cyber^}",
  "SAOEUS/SKWRO": "{iso^}",
  "SAOEUT/O*": "{cyto^}",
  "SAOEUT/SKWRO": "{cyto^}",
  "SAOUD/KWRO": "{pseudo^}",
  "SAOUD/SKWRO": "{pseudo^}",
  "SAOUD/TKOE": "{pseudo^}",
  "SAOUP": "{super^}",
  "SAOUP/RA": "{supra^}",
  "SAOUP/RO": "{supero^}",
  "SAR/KO": "{sarco^}",
  "SARBG": "{sarco^}",
  "SARBG/SKWRO": "{sarco^}",
  "SAUB": "{sub^}",
  "SE/RAOE/PWROE": "{cerebro^}",
  "SEF": "{self-^}",
  "SEF/HRO": "{cephalo^}",
  "SEFL/SKWRO": "{cephalo^}",
  "SEFRBG/SKWRO": "{cervico^}",
  "SEPB/TRO": "{centro^}",
  "SEPLT/SKWRO": "{cemento^}",
  "SER/HRO": "{cerulo^}",
  "SER/PWEL/HRO": "{cerebello^}",
  "SER/PWEL/SKWRO": "{cerebello^}",
  "SER/SKWRO": "{sero^}",
  "SEUPB/KROE": "{synchro^}",
  "SEUPL/PA*T/SKWRO": "{sympatho^}",
  "SEUPL/PA/THO": "{sympatho^}",
  "SEUPL/PO*EUT": "{sympatho^}",
  "SEURBG/UPL": "{circum^}",
  "SEUT/RO": "{citro^}",
  "SHO*E": "{show^}",
  "SKHRER/SKWRO": "{sclero^}",
  "SKRAOEB/RO": "{cerebro^}",
  "SKWAEUPL/SKWRO": "{squamo^}",
  "SKWRAOE/KWROE": "{geo^}",
  "SKWRAOE/OE": "{geo^}",
  "SKWRAOEPB/KWRO": "{genio^}",
  "SKWRAOU/TKAEU/KWROE": "{Judeo^}",
  "SKWRAOUP/*ER": "{juper^}",
  "SKWREPBT/KWRO": "{genito^}",
  "SKWREPBT/SKWRO": "{genito^}",
  "SKWRO*EU": "{geo^}",
  "SKWROEPBD": "{endo^}",
  "SKWRUG/HRO": "{jugulo^}",
  "SKWRUGT": "{juxta^}",
  "SKWRUGT/HRO": "{juxtallo^}",
  "SKWRUGT/KWRA": "{juxta^}",
  "SO*EUBG": "{psycho^}",
  "SO/PHA/TO": "{somato^}",
  "SOE/PHAT/SKWRO": "{somato^}",
  "SOEPL/TO": "{somato^}",
  "SOEPLT": "{somato^}",
  "SOEPLT/KWRO": "{somato^}",
  "SOEPLT/SKWRO": "{somato^}",
  "SOEPLTS/SKWRO": "{somato^}",
  "SOERB/KWROE": "{socio^}",
  "SOES/KWROE": "{socio^}",
  "SPAOEUPB/KWRO": "{spino^}",
  "SPAOEUPB/SKWRO": "{spino^}",
  "SPAS/PHO": "{spasmo^}",
  "SPERBGT": "{spectro^}",
  "SPEUPB/SKWRO": "{spino^}",
  "SPHEU": "{semi^}",
  "SPOPBD/HRO": "{spondylo^}",
  "SPOPBG/KWROE": "{spongio^}",
  "SPOR/SKWRO": "{sporo^}",
  "SPWRA": "{intra^}",
  "SRAEUG/SKWRO": "{vago^}",
  "SRAEUS/KWRO": "{vaso^}",
  "SRAEUS/SKWRO": "{vaso^}",
  "SRAEUT/SKWRO": "{vaso^}",
  "SRAFBG/HRO": "{vasculo^}",
  "SRAFL/SKWRO": "{valvulo^}",
  "SRAOEB/ROE": "{cerebro^}",
  "SRAOEPB/KWRO": "{veno^}",
  "SRAOEPB/SKWRO": "{veno^}",
  "SRAOEUB/RA": "{vibra^}",
  "SRAS/SKWRO": "{vaso^}",
  "SREFT/PWHRO": "{vestibulo^}",
  "SREL/SRO": "{vulvo^}",
  "SREPB/KWRO": "{veno^}",
  "SREPB/SKWRO": "{veno^}",
  "SREPB/TRO": "{ventro^}",
  "SREPBT/RO": "{ventro^}",
  "SRES/KO": "{vesico^}",
  "SREUFBG/SKWRO": "{visco^}",
  "SREUPBG/KWRO": "{syringo^}",
  "SREURT/KWRO": "{vitreo^}",
  "SREURT/RO": "{vitreo^}",
  "SREURT/SKWRO": "{vitreo^}",
  "SREUS/KWRO": "{visio^}",
  "SREUS/RO": "{viscero^}",
  "SREUS/SKWRO": "{visuo^}",
  "SRO*EUS": "{vaso^}",
  "STAF/HRO": "{staphylo^}",
  "STAOET/SKWRO": "{steato^}",
  "STAOEU/HRO": "{stylo^}",
  "STAOEUL/KWRO": "{stylo^}",
  "STAOEUL/SKWRO": "{stylo^}",
  "STEPT": "{strepto^}",
  "STER/KWRO": "{stereo^}",
  "STERBG/KWRO": "{sterco^}",
  "STERPB/SKWRO": "{sterno^}",
  "STKPWAOEU/TKPWO": "{zygo^}",
  "STKPWAOEUG/SKWRO": "{zygo^}",
  "STO*EUL": "{stylo^}",
  "STOEPL/TO": "{stomato^}",
  "STPAOEPB/KWRO": "{spheno^}",
  "STPAOEPB/SKWRO": "{spheno^}",
  "STPAOER/SKWRO": "{sphero^}",
  "STPEUPBG/KWRO": "{sphingo^}",
  "STPEUPBG/SKWRO": "{sphingo^}",
  "STPHAPT/SKWRO": "{synapto^}",
  "STPO*EUPB": "{spheno^}",
  "STREPT/SKWRO": "{strepto^}",
  "STREPT/SKWRO*": "{strepto^}",
  "SUP/RA": "{supra^}",
  "T*EL": "{tele^}",
  "T*EPL/RO": "{temporo^}",
  "T*ERT": "{tetra^}",
  "TA*BG/KWREU": "{tachy^}",
  "TA*BG/SKWREU": "{tachy^}",
  "TABG/SKWREU": "{tachy^}",
  "TAER/TKPWO": "{pterygo^}",
  "TAL/KAPB/KAPB/KWRAL": "{talocancaneal^}",
  "TAL/KWRO": "{talo^}",
  "TAL/SKWRO": "{talo^}",
  "TAOUB/HRO": "{tubulo^}",
  "TAOUB/RO": "{tubero^}",
  "TAUR": "{tor^}",
  "TER/EUPBLG/KWRO": "{pterygo^}",
  "TER/TKPWO": "{pterygo^}",
  "TER/TO": "{terato^}",
  "TERPBLG/KWRO": "{pterygo^}",
  "TERT/KWRO": "{terato^}",
  "TERT/SKWRO": "{terato^}",
  "TET/RA": "{tetra^}",
  "TET/TRA": "{tetra^}",
  "TEUB/KWRO": "{tibio^}",
  "THAL/PHO": "{thalamo^}",
  "THAOEU/RO": "{thyro^}",
  "THAOEUR/SKWRO": "{thyro^}",
  "THERPL/KWRA": "{therma^}",
  "THO*EU": "{theo^}",
  "THOEU": "{thio^}",
  "THOR/KO": "{thoraco^}",
  "THRO*PL/SKWRO": "{thrombo^}",
  "THROPL": "{thrombo^}",
  "THROPL/PWO": "{thrombo^}",
  "THROPL/SKWRO": "{thrombo^}",
  "TK*EPL": "{demi^}",
  "TK*ERPL/TO": "{dermato^}",
  "TKAERBG/KWRO": "{dacryo^}",
  "TKAOEU/KWRA": "{dia^}",
  "TKARBG/KWRO": "{dacryo^}",
  "TKARBG/KWROE": "{dacryo^}",
  "TKARBG/RO": "{dacryo^}",
  "TKE": "{de^}",
  "TKEBGS/TRO": "{dextro^}",
  "TKEG/SKWRA": "{deca^}",
  "TKEPB/TKO": "{dendro^}",
  "TKEPB/TKRO": "{dendro^}",
  "TKERPL/AT/SKWRO": "{dermato^}",
  "TKERPL/SKWRO": "{dermo^}",
  "TKERPLT/KWRO": "{dermato^}",
  "TKERPLT/SKWRO": "{dermato^}",
  "TKEUBGS": "{diction^}",
  "TKEUFT/KWRO": "{disto^}",
  "TKEUFT/SKWRO": "{disto^}",
  "TKEUS": "{dis^}",
  "TKEUS/TKAOEU/TKO": "{dysdiado^}",
  "TKOR/SO": "{dorso^}",
  "TKORS/KWRO": "{dorso^}",
  "TKORS/SKWREU": "{dorsi^}",
  "TKORS/SKWRO": "{dorso^}",
  "TKPWA/HRABGT": "{galacto^}",
  "TKPWAFT/RO": "{gastro^}",
  "TKPWAPL/AOET/SKWRO": "{gameto^}",
  "TKPWAS/TRO": "{gastro^}",
  "TKPWEUG/KWRA": "{giga^}",
  "TKPWHR*/HR*/*U/KR*/O*": "{gluco^}",
  "TKPWHRABG/TO": "{galacto^}",
  "TKPWHRABGT": "{galacto^}",
  "TKPWHRABGT/SKWRO": "{galacto^}",
  "TKPWHRAOEU/KO": "{glyco^}",
  "TKPWHRAOEUBG": "{glyco^}",
  "TKPWHRAOEUBG/KO": "{glyco^}",
  "TKPWHRAOEUBG/SKWRO": "{glyco^}",
  "TKPWHRAOU/KOE": "{gluco^}",
  "TKPWHRAOUBG": "{gluco^}",
  "TKPWHRAOUBG/SKWRO": "{gluco^}",
  "TKPWHRAOUBG/TPHO": "{glucono^}",
  "TKPWHRO/PHER/HRO": "{glomerulo^}",
  "TKPWHROPL/*ER/HRO": "{glomerulo^}",
  "TKPWHROPL/HRO": "{glomerulo^}",
  "TKPWHROPL/RU": "{glomerulo^}",
  "TKPWHROS/SKWRO": "{glosso^}",
  "TKPWO*EU": "{geo^}",
  "TKPWOLD": "{gold^}",
  "TKPWRAPB/HRO": "{granulo^}",
  "TKWOD/TPHO": "{duodeno^}",
  "TO*P/SKWRO": "{topo^}",
  "TO/A*EUPBLT": "{to anti^}",
  "TO/PO": "{topo^}",
  "TOBGS/KO": "{toxico^}",
  "TPAEUG/KWRO": "{phago^}",
  "TPAEUG/SKWRO": "{phago^}",
  "TPAEUPBLG/SKWRO": "{phago^}",
  "TPAEURB/KWRO": "{facio^}",
  "TPAEURPBG/KWRO": "{pharyngo^}",
  "TPAEURPBG/SKWRO": "{pharyngo^}",
  "TPAEUS/KWRO": "{facio^}",
  "TPAL/SKWRO": "{phallo^}",
  "TPAOEPB/*L": "{phenyl^}",
  "TPAOEPBL": "{phenyl^}",
  "TPAOET/KWRO": "{feto^}",
  "TPAOET/SKWRO": "{feto^}",
  "TPAOEUB/RO": "{fibro^}",
  "TPAOEUB/ROE": "{fibro^}",
  "TPAOEURB/RO": "{fibro^}",
  "TPAOEUT/KWRO": "{phyto^}",
  "TPAOEUT/SKWRO": "{phyto^}",
  "TPAOUS/KWRO": "{fuso^}",
  "TPARBG/KO": "{pharmaco^}",
  "TPARPL/KO": "{pharmaco^}",
  "TPARPL/KOE": "{pharmaco^}",
  "TPAUR": "{for^}",
  "TPEPLT/SKWRO": "{femto^}",
  "TPER/ROE": "{ferro^}",
  "TPER/SKWRO": "{fero^}",
  "TPEUB/HRO": "{fibulo^}",
  "TPEUS/KWRO": "{physio^}",
  "TPEUS/KWROE": "{physio^}",
  "TPEUS/SKWRO": "{physio^}",
  "TPH*UR": "{neuro^}",
  "TPHAEUS/SKWRO": "{naso^}",
  "TPHAO*UR": "{neuro^}",
  "TPHAOEUG/RO": "{nigro^}",
  "TPHAOEURT/SKWRO": "{nitro^}",
  "TPHAOEUT/RO": "{nitro^}",
  "TPHAOU/ROE": "{neuro^}",
  "TPHAOUBG/HRO": "{nucleo^}",
  "TPHAOUBG/HROE": "{nucleo^}",
  "TPHAOUBG/SKWRO": "{nucho^}",
  "TPHAOUPL": "{pneumo^}",
  "TPHAOUPL/PHOE": "{pneumo^}",
  "TPHAOUPL/SKWRO": "{pneumo^}",
  "TPHAOUR/SKWRO": "{neuro^}",
  "TPHAOURT/SKWRO": "{neutro^}",
  "TPHAPB/KWRO": "{nano^}",
  "TPHAPB/SKWRO": "{nano^}",
  "TPHAUPB": "{non^}",
  "TPHEBG/RO": "{necro^}",
  "TPHEF/RO": "{nephro^}",
  "TPHOD/HRO": "{nodulo^}",
  "TPHORPL/SKWRO": "{normo^}",
  "TPHRAO*UR": "{fluoro^}",
  "TPHRAOUBG/HRO": "{nucleo^}",
  "TPHRAOUD/RO": "{fludro^}",
  "TPHRAOUR": "{fluoro^}",
  "TPHROR/SKWRO": "{fluoro^}",
  "TPHUR/SKWRO": "{neuro^}",
  "TPO/TO": "{photo^}",
  "TPO/TPHO": "{phono^}",
  "TPOER": "{fore^}",
  "TPOEURB": "{fibro^}",
  "TPORPL/*L": "{formyl^}",
  "TPOS/TO": "{phospho^}",
  "TPOS/TPA": "{phospha^}",
  "TPOS/TPO": "{phospho^}",
  "TPOS/TPOE": "{phospho^}",
  "TPRAEUPB": "{infra^}",
  "TPRAOEPB/KWRO": "{phreno^}",
  "TPRAOUBGT": "{fructo^}",
  "TPRUBG/TO": "{fructo^}",
  "TR*EU": "{tri^}",
  "TR*EU/AOEU/TKO": "{triiodo^}",
  "TR*EU/SKWREPL/TPHO": "{trigemino^}",
  "TR*EU/SKWRO": "{trio^}",
  "TR*EUP/TPHO": "{trypano^}",
  "TRAEUBG/KWRO": "{tracheo^}",
  "TRAO*EU": "{tri^}",
  "TRAPBS/SRERS/SKWRO": "{transverso^}",
  "TRAPBZ": "{trans^}",
  "TRERT": "{tetra^}",
  "TRO/PO": "{tropo^}",
  "TRO/TO": "{tropo^}",
  "TROEF/SKWRO": "{tropho^}",
  "TROF/SKWRO": "{tropho^}",
  "TWOUPB": "{200^}",
  "UL/TRA": "{ultra^}",
  "UPB": "{un^}",
  "UPBD": "{under^}",
  "UPL/PHAOUPB/TPHO": "{immuno^}",
  "UPL/PWEUL/KO": "{umbilico^}",
  "UR/KWRO": "{uro^}",
  "UR/SKWRO": "{uro^}",
  "URLT": "{ultra^}",
  "WA*UR": "{water^}",
  "A*UF": "{off-^}",
  "AEUPB/SKWREU": "{ani-^}",
  "AFR/ROE": "{Afro-^}",
  "AOE/KOE": "{eco-^}",
  "AOEBG/WEU/HRAT/RAL": "{equilateral-^}",
  "EUPBD/SKWRO": "{Indo-^}",
  "HA*EPBD": "{hand-^}",
  "HAEPBD": "{handi-^}",
  "HAOEU/PWERPB/TPHOE": "{Hiberno-^}",
  "HER/SEF": "{herself-^}",
  "HREUS": "{Lys-^}",
  "KAU": "{co^}",
  "KOE": "{co-^}",
  "KWAS/KWREU": "{quasi-^}",
  "KWAS/SKWREU": "{quasi-^}",
  "KWAT/SKWREU": "{quasi-^}",
  "KWR*EUPB": "{in-^}",
  "KWRO*PB": "{on-^}",
  "KWRO*UT": "{out-^}",
  "PH*UFP": "{much-^}",
  "PHAO*EURBG": "{micro-^}",
  "PHAOEU/SEF": "{myself-^}",
  "PHAUPB": "{non-^}",
  "PRE": "{pre^}",
  "PR*E": "{pre-^}",
  "PRO/TO": "{proto-^}",
  "PROE/TOE": "{proto-^}",
  "R*E": "{re-^}",
  "S*EPL": "{semi-^}",
  "SA*UB": "{sub-^}",
  "SAO*URP": "{super-^}",
  "SEF": "{self-^}",
  "SKWR*EL": "{well-^}",
  "TKPWHRAOEU": "{gly-^}",
  "TKPWRA*ET": "{great-^}",
  "TKPWREBG/SKWRO": "{Greco-^}",
  "TPHA*UPB": "{non-^}",
  "TPHAOE/KWROE": "{neo-^}",
  "TPHO*": "{no-^}",
  "W*EL": "{well-^}",
  "A*D/TPHO": "{adeno^}",
  "A*UT/SKWRO": "{auto^}",
  "A/SAO*ET/*L": "{acetyl^}",
  "A/SAOE/TO": "{aceto^}",
  "A/SAOES/*L": "{acetyl^}",
  "A/TKAOE/TPHO": "{adeno^}",
  "A/TKAOE/TPHOE": "{adeno^}",
  "A/TKAOEPB/KWRO": "{adeno^}",
  "A/TKRAOE/TPHO": "{adreno^}",
  "A/TKRAOE/TPHROE": "{adreno^}",
  "A/TKRAOEPB": "{adreno^}",
  "A/TKRO*EUPB": "{adreno^}",
  "AER/SKWRO": "{aero^}",
  "AEUR/SKWRO": "{aero^}",
  "KWRA*D": "{ad^}",
  "RAOE": "{re^}",
  "TPWOUPB": "{200^}",
  // ["AO*UT/", "out"],
  // ["AOPB/", "on"],
  // ["APB/TAOEU/", "anti"],
  // ["APB/TEU/", "anti"],
  // ["KWROUT/", "out"],
  // ["KWRUP/", "up"],
  // ["KWRUPBD/", "under"],
  // ["SAOUPS/", "super"],
  // ["SPR/", "super"],
  // ["SPWR/", "inter"],
  // ["TKEUZ/", "dis"],
  // ["UPBDZ/", "under"],
  // ["KRO/", "co-"]
};
let testAussieDict = {
  "AOEUZ/A*U": "{^ise}",
  "AO*EUFD/A*U": "{^ised}",
  "AO*EUFG/A*U": "{^ising}",
  // "*LG": "{^ling}",
  // "*LD": "{^led}",
  "*LD/A*U": "{^led}",
  "*LG/A*U": "{^ling}",
  // "*EG": "{^eing}",
  "*EG/A*U": "{^eing}",
  "KWROR/A*U": "{^iour}",
  "KWRO*R/A*U": "{^iour}",
  "O*UR/A*U": "{^our}",
}
let testSuffixesDict = {
  "*D": "{^'d}",
  "AES": "{^'s}",
  "AO*EUFG": "{^izing}",
  "AO*EUFD": "{^ized}",
  "*EPLT": "{^ement}",
  "*BG": "{^k}",
  "*EFBG": "{^esque}",
  "*EPB": "{^en}",
  "*EPB/TPELD": "{^enfeld}",
  "*ER": "{^er}",
  "*ERS": "{^ers}",
  "*ES": "{^ess}",
  "*ET": "{^eth}",
  "*EUFPL": "{^ism}",
  "*EUFT": "{^ivity}",
  "*EUGS": "{^ician}",
  "*EUL/EUBG": "{^ilic}",
  "*EUPB": "{^in}",
  "*EUPB/*EUPB": "{^inin}",
  "*EUPBS": "{^iness}",
  "*EUPBZ": "{^ins}",
  "*EUS": "{^ice}",
  "*EZ": "{^ez}",
  "*FP": "{^ch}",
  "*FPL": "{^sm}",
  "*L": "{^le}",
  "*P": "{^p}",
  "*PB": "{^n}",
  "*PBD": "{^nd}",
  "*PBLG": "{^ge}",
  "*PLT": "{^ment}",
  "*RB": "{^sh}",
  "*RDZ": "{^rds}",
  "*T": "{^th}",
  "*UPL": "{^um}",
  "-BL": "{^able}",
  "-BLT": "{^ability}",
  "-D": "{^ed}",
  "-FL": "{^ful}",
  "-FPD": "{^ed}{.}",
  "-FPS": "{^s}{.}",
  "-G": "{^ing}",
  "-LS": "{^less}",
  "-PBS": "{^ness}",
  "-PLTS": "{^ments}",
  "-S": "{^s}",
  "A*EL": "{^ally}",
  "A*EUBG": "{^ache}",
  "A*L": "{^al}",
  "A*L/EUFPL": "{^alism}",
  "A*L/EUS": "{^alis}",
  "A*PB": "{^an}",
  "A*PB/SKWREU": "{^ani}",
  "A*PBL": "{^allian}",
  "A*R": "{^ar}",
  "A*R/A*ET": "{^arate}",
  "A*RPL": "{^arum}",
  "A*RS": "{^ars}",
  "A*T": "{^ate}",
  "A*T/-D": "{^ated}",
  "A*T/EUBG": "{^atic}",
  "A*T/EUF": "{^ative}",
  "A*T/K-L": "{^atical}",
  "A*TD": "{^ated}",
  "A/HOL/EUBG": "{^aholic}",
  "A/TA": "{^ata}",
  "A/TOR/KWRUPL": "{^atorium}",
  "AER": "{^ary}",
  "AEUGS": "{^ation}",
  "AEURBS": "{^aceous}",
  "AEURL": "{^arial}",
  "AEURPB": "{^arian}",
  "AEURPL": "{^arium}",
  "AEURT": "{^arity}",
  "AEUT/-D": "{^ated}",
  "AEUT/-G": "{^ating}",
  "AEUT/O*R": "{^ator}",
  "AEUZ": "{^ase}",
  "ALG/KWRA": "{^algia}",
  "ALT": "{^ality}",
  "ALT/EUBG": "{^atic}",
  "AO*E": "{^ie}",
  "AO*EL": "{^elle}",
  "AO*EPB": "{^ean}",
  "AO*ER": "{^eer}",
  "AO*ET": "{^ette}",
  "AO*EUFD": "{^ized}",
  "AO*EUFG": "{^izing}",
  "AO*EUTS": "{^itis}",
  "AO*EZ": "{^ese}",
  "AO*UL/A*T/-D": "{^ulated}",
  "AO*UR/KWRA": "{^uria}",
  "AOE/TOE": "{^ito}",
  "AOEPL/EUBG": "{^emic}",
  "AOEPL/KWRA": "{^emia}",
  "AOEPL/KWRARBGS": "{^emia}{,}",
  "AOES/EUS": "{^esis}",
  "AOES/KWRA": "{^esia}",
  "AOEU/KWRA/SEUS": "{^iasis}",
  "AOEU/SEUS": "{^iasis}",
  "AOEUBL": "{^izable}",
  "AOEUPB": "{^ine}",
  "AOEUT": "{^ite}",
  "AOEUT/EUS": "{^itis}",
  "AOEUTS": "{^itis}",
  "AOEUZ": "{^ize}",
  "AOEZ": "{^ese}",
  "AOF/ROPB": "{^oophoron}",
  "AOUD/AEUGS": "{^udation}",
  "AOUL": "{^ule}",
  "AOUL/A*T": "{^ulate}",
  "AOULS": "{^ules}",
  "AOUPBLG": "{^uge}",
  "AOUR": "{^ure}",
  "APBLG": "{^age}",
  "APBS": "{^ance}",
  "APBT": "{^ant}",
  "AR/HREU": "{^arily}",
  "AS/TAFP": "{^s} attach", // FIXME: might not match affixList regex
  "AT/AOEUZ/-D": "{^atized}",
  "AT/EUBG": "{^atic}",
  "AT/KHREU": "{^atically}",
  "AZ/PAPL": "{^orazepam}",
  "EBGT/PHEU": "{^ectomy}",
  "EF/RAOEPB": "{^ephrine}",
  "EF/REUPB": "{^ephrine}",
  "EFT": "{^est}",
  "EL/HRA": "{^ella}",
  "EPBL": "{^ential}",
  "EPBS": "{^ence}",
  "EPBT": "{^ent}",
  "EPBT/-D": "{^ented}",
  "EPBZ/PAOEUPB": "{^enzepine}",
  "ERPBLG/EUBG": "{^ergic}",
  "ERS": "{^ers}",
  "ES/EPBT": "{^escent}",
  "ES/KEU": "{^eski}",
  "ET": "{^et}",
  "EUBG": "{^ic}",
  "EUBG/HRAT": "{^iculate}",
  "EUBGS": "{^ix}",
  "EUBL": "{^ible}",
  "EUBLT": "{^ibility}",
  "EUD/AEUZ": "{^idase}",
  "EUF": "{^ive}",
  "EUFBG": "{^iffic}",
  "EUFL": "{^ively}",
  "EUFPBS": "{^iveness}",
  "EUFPL": "{^ism}",
  "EUFT": "{^ist}",
  "EUGS": "{^ition}",
  "EULT": "{^ility}",
  "EUPB/*EU": "{^ini}",
  "EUPB/KWRAPB": "{^inian}",
  "EUPB/SKWREU": "{^ini}",
  "EUPBG/*ER": "{^inger}",
  "EUPL/TREU": "{^imetry}",
  "EURB": "{^ish}",
  "EURBS": "{^itious}",
  "EUS": "{^is}",
  "EUS/TEU": "{^icity}",
  "EUS/TEUS": "{^icities}",
  "EUT/KWRA": "{^ita}",
  "EUT/KWREU": "{^ity}",
  "H-FS": "{^s?}",
  "HA*PBD": "{^hand}",
  "HA*PL": "{^ham}",
  "HAO*D": "{^hood}",
  "HAOED/RAL": "{^hedral}",
  "HO*ELD": "{^hold}",
  "HO*ERLD": "{^holder}",
  "HO*LD": "{^hold}",
  "HR*EPBT": "{^ulent}",
  "HR*ET": "{^let}",
  "HR*EUPBS": "{^liness}",
  "HR-L": "{^logical}",
  "HR-LG": "{^ological}",
  "HRA*EBG": "{^like}",
  "HRA*EURT": "{^ularity}",
  "HRA*PBD": "{^land}",
  "HRA/TOER": "{^ulatory}",
  "HRAER": "{^ulary}",
  "HRAEUGS": "{^ulation}",
  "HRAEUL/KWRA": "{^lalia}",
  "HRAEUT/-D": "{^lated}",
  "HRAEUT/-G": "{^ulating}",
  "HRAO*EUF": "{^life}",
  "HRAOEUT/EUBG": "{^lytic}",
  "HRAOEUZ": "{^alize}",
  "HRAOEUZ/-D": "{^alized}",
  "HRAPBT": "{^lant}",
  "HRAR": "{^ular}",
  "HRARL": "{^ularly}",
  "HRER": "{^ler}",
  "HREU": "{^ly}",
  "HREUPBG": "{^ling}",
  "HREURBS": "{^licious}",
  "HREUT/EUBG": "{^lytic}",
  "HRO*": "{^ol}",
  "HRO*PB": "{^ulon}",
  "HROP/THEU": "{^ulopathy}",
  "HROP/THEUS": "{^ulopathies}",
  "HRUS": "{^ulus}",
  "HUFRT": "{^hurst}",
  "HUPB/HUPB": "{^00}",
  "HUPBZ": "{^00}",
  "K*EUPB": "{^kin}",
  "K*L": "{^ical}",
  "K-L": "{^cal}",
  "K-LS": "{^icals}",
  "KA*EUR": "{^care}",
  "KA*EUS": "{^case}",
  "KA/PAEUD": "{^capade}",
  "KAE": "{^key}",
  "KAEUGS": "{^ication}",
  "KAEUT": "{^cate}",
  "KAO*E/-P": "{^keep}",
  "KAO*EP/*ER": "{^keeper}",
  "KAO*EP/-G": "{^keeping}",
  "KAOEUPB": "{^kine}",
  "KHAOEZ/KWRA": "{^chezia}",
  "KHEU/TPHEU": "{^cini}",
  "KHRAFT": "{^clast}",
  "KHREU": "{^ically}",
  "KHREURBGS": "{^ically}{,}",
  "KHROR/AOEPL/EUBG": "{^chloremic}",
  "KO*BGS": "{^cox}",
  "KOBG/A*L": "{^coccal}",
  "KOBG/KWRUS": "{^coccus}",
  "KOBG/US": "{^coccus}",
  "KRA*T": "{^crat}",
  "KRAES": "{^cracy}",
  "KRAO*EUD": "{^icide}",
  "KRAO*EUT/OES": "{^cytose}",
  "KRAOEUT/-S": "{^cytes}",
  "KRAOEUT/EUBG": "{^cytic}",
  "KRAOEUT/OES": "{^cytose}",
  "KRAOEUT/OT/EUBG": "{^cytotic}",
  "KRAOEUT/PAOEPB/KWRA": "{^cytopenia}",
  "KRAOEUT/PAOEPB/KWRARBGS": "{^cytopenia}",
  "KRAT": "{^ocrat}",
  "KWAOEUPB": "{^quine}",
  "KWR*US": "{^eus}",
  "KWRA": "{^a}",
  "KWRA*": "{^ia}",
  "KWRA*E": "{^ay}",
  "KWRA*PB": "{^ean}",
  "KWRA/HOL/EUBG": "{^aholic}",
  "KWRAE": "{^ee}",
  "KWRAER": "{^iary}",
  "KWRAEUGS": "{^iation}",
  "KWRAEUT": "{^iate}",
  "KWRAFP": "{^ia}{,}",
  "KWRAL": "{^ial}",
  "KWRALT": "{^iality}",
  "KWRAOE": "{^ey}",
  "KWRAOEUL": "{^ile}",
  "KWRAPB": "{^ian}",
  "KWRARBG": "{^iarch}",
  "KWRARBGS": "{^ia}{,}",
  "KWRAS": "{^ias}",
  "KWRAT/EUBG": "{^iatic}",
  "KWRAT/EUF": "{^iative}",
  "KWREBGT/AT/EUBG": "{^iectatic}",
  "KWREBGT/EUBG": "{^iectic}",
  "KWREFT": "{^iest}",
  "KWREL/HRA": "{^iella}",
  "KWRER": "{^ier}",
  "KWREU": "{^y}",
  "KWREU/-S": "{^ies}",
  "KWREUD": "{^ied}",
  "KWREUFP": "{^y}{.}",
  "KWREUFPL": "{^y}{.}",
  "KWREUFPLT": "{^y}",
  "KWREUS": "{^ies}",
  "KWRO": "{^o}",
  "KWRO*/TKPWRAPL": "{^iogram}",
  "KWRO*E": "{^io}",
  "KWRO*PBD": "{^ioned}",
  "KWRO*US": "{^eous}",
  "KWROE/PHA": "{^ioma}",
  "KWROEL": "{^iole}",
  "KWROEPB/KWREU": "{^ioni}",
  "KWROG/TPEU": "{^iography}",
  "KWROP/THEU": "{^eopathy}",
  "KWROPB": "{^ion}",
  "KWROPL": "{^iom}",
  "KWROR": "{^ior}",
  "KWRORL": "{^iorly}",
  "KWRORT": "{^iority}",
  "KWROT/PHEU": "{^iotomy}",
  "KWROUS": "{^ious}",
  "O*EFR": "{^over}",
  "O*EFRS": "{^overs}",
  "O*EPB": "{^one}",
  "O*EPL": "{^onomy}",
  "O*EPT": "{^opathy}",
  "O*ES": "{^ose}",
  "O*EUL": "{^ile}",
  "O*EUS": "{^osis}",
  "O*L": "{^ol}",
  "O*PB": "{^on}",
  "O*PBS": "{^ons}",
  "O*R": "{^or}",
  "O*RS": "{^ors}",
  "O*T": "{^otte}",
  "O*ULS": "{^ously}",
  "OBG/A*L": "{^occal}",
  "OBGS/*EUPB": "{^oxin}",
  "OBGS/KWRA": "{^oxia}",
  "OE/PHA": "{^oma}",
  "OE/RA/PHA": "{^orama}",
  "OE/SA": "{^osa}",
  "OEL/SA*EUGS": "{^olization}",
  "OEP/EUBG": "{^opic}",
  "OEP/KWRA": "{^opia}",
  "OEPB/KWRUPL": "{^onium}",
  "OEPL/KWRA": "{^oma}",
  "OES": "{^ose}",
  "OES/EUS": "{^osis}",
  "OES/KWRUPL": "{^osum}",
  "OES/SKWRUS": "{^osus}",
  "OES/US": "{^osus}",
  "OEUBG": "{^oic}",
  "OEUD": "{^oid}",
  "OFBG/PEU": "{^oscopy}",
  "OFT/PHEU": "{^ostomy}",
  "OG/TPEU": "{^ography}",
  "OL/SEUS": "{^olysis}",
  "OLG": "{^ology}",
  "OLG/EUFT": "{^ologist}",
  "OP/HREUS": "{^opolis}",
  "OP/THEU": "{^opathy}",
  "OPB/EUBG": "{^onic}",
  "OPBLG/K-L": "{^ogical}",
  "OPL/EUBG": "{^omic}",
  "OPL/TREU": "{^ometry}",
  "OPLT/*ER": "{^ometer}",
  "OPS/EUS": "{^opsis}",
  "OR/KWROUS": "{^orious}",
  "ORPL": "{^orium}",
  "OS": "{^os}",
  "OS/KO/PEU": "{^oscopy}",
  "OS/SKWRUS": "{^osus}",
  "OT/EUBG": "{^otic}",
  "OT/PHEU": "{^otomy}",
  "OUS": "{^ous}",
  "P*EU/TPH*EU": "{^pini}",
  "P-D": "{^ped}",
  "PA*EBGT": "{^pathic}",
  "PA*ET": "{^pathy}",
  "PA*ET/-S": "{^pathies}",
  "PA*S": "{^pass}",
  "PAOED/EUBG": "{^pedic}",
  "PAOED/KWRA": "{^pedia}",
  "PAOEPB/EUBG": "{^penic}",
  "PAOEPB/KWRA": "{^penia}",
  "PAOEPB/KWRAFPLT": "{^penia}{.}",
  "PAOEPB/KWRARBGS": "{^penia}{,}",
  "PEPB/EPL": "{^penem}",
  "PEPBT/TPHOEUBG": "{^pentaenoic}",
  "PH*/*EU/TK*E": "{^mide}",
  "PH*EPB": "{^men}",
  "PHA*ED": "{^made}",
  "PHA*EUBG": "{^make}",
  "PHA*EUG": "{^making}",
  "PHA*EURBG": "{^maker}",
  "PHA*PB": "{^man}",
  "PHAB": "{^mab}",
  "PHAEUGS": "{^mation}",
  "PHAO*EPB": "{^amine}",
  "PHAO*ERT": "{^meter}",
  "PHAO*EUD": "{^mide}",
  "PHAO*EUPB": "{^amine}",
  "PHAOES/KWRUPL": "{^mysium}",
  "PHAOEUFG": "{^imizing}",
  "PHAOEUFPB": "{^mycin}",
  "PHAOEUS/*EUPB": "{^mycin}",
  "PHAPB/SH-P": "{^manship}",
  "PHAT/EUBG": "{^matic}",
  "PHEG/HREU": "{^megaly}",
  "PHER/-S": "{^mers}",
  "PHET/REU": "{^metry}",
  "PHO*EFT": "{^most}",
  "PHO*PBD": "{^mond}",
  "PHOEPBL": "{^monal}",
  "PHOPBG/*ER": "{^monger}",
  "PHOPBT": "{^mont}",
  "PHRAEFT": "{^plasty}",
  "PHRAEU/PHRA*EU/SHA": "{^plasia}",
  "PHRAEU/SHA": "{^plasia}",
  "PHRAEURB/KWRA": "{^plasia}",
  "PHRAEUS/EUBG": "{^plasic}",
  "PHRAEUS/KWRA": "{^plasia}",
  "PHRAFT": "{^plast}",
  "PHRAFT/KWREU": "{^plasty}",
  "PHRAOEPBLG/EUBG": "{^plegic}",
  "PHRAOEPBLG/KWRA": "{^plegia}",
  "PHROEUFT": "{^oplasty}",
  "PO*RT": "{^port}",
  "POEUS/EUS": "{^poiesis}",
  "PRABGS/KWRA": "{^praxia}",
  "PRO*EUPB": "{^protein}",
  "PROES/EUS": "{^porosis}",
  "PW*UR/KWREU": "{^bury}",
  "PW*URG": "{^burg}",
  "PWA*BG": "{^back}",
  "PWA*PBD": "{^band}",
  "PWA*RBGS": "{^back}{,}",
  "PWAO*BG": "{^book}",
  "PWAO*RD": "{^board}",
  "PWAOEUT/EUBG": "{^biotic}",
  "PWERG": "{^berg}",
  "PWEUGS": "{^ibition}",
  "PWEUL/*EUPB": "{^bilin}",
  "PWHRAOUPL": "{^blume}",
  "PWHRER": "{^bler}",
  "PWHREU": "{^ably}",
  "PWO*LG": "{^bolic}",
  "PWO*UPBD": "{^bound}",
  "PWO/RO": "{^boro}",
  "PWRO*": "{^boro}",
  "PWURG": "{^burg}",
  "R*D": "{^rd}",
  "R*EUBG": "{^ric}",
  "R-D": "{^red}",
  "RA*EUGS": "{^ration}",
  "RAEBL": "{^rably}",
  "RAL": "{^ural}",
  "RAO*EUFD": "{^arized}",
  "RAO*PL": "{^room}",
  "RAOUB/SEUPB": "{^rubicin}",
  "RAPBS": "{^erance}",
  "RAT/EUF": "{^arative}",
  "RES": "{^ress}",
  "REU": "{^ry}",
  "REUS": "{^aries}",
  "RO/PHAOEUD": "{^romide}",
  "ROES/ES": "{^roses}",
  "ROUS": "{^rous}",
  "S*E": "{^es}",
  "S*EPT": "{^sept}",
  "S*ER": "{^zer}",
  "S*EU/TPH*EU": "{^zini}",
  "S*EUPBL": "{^icillin}",
  "SA*EFT": "{^icist}",
  "SA*EUGS": "{^ization}",
  "SABG/RAOEUD": "{^saccharide}",
  "SAEUGS": "{^sation}",
  "SAO*EUD": "{^icide}",
  "SAOEPL/KWRA": "{^cemia}",
  "SAOEUBG/HRAO*EUPB": "{^cyline}",
  "SAOEUD/A*L": "{^cidal}",
  "SEFL": "{^self}",
  "SEFLS": "{^selves}",
  "SEPT/O*R": "{^ceptor}",
  "SEU": "{^cy}",
  "SEU/TO*": "{^cito}",
  "SEUL/*EUPB": "{^cillin}",
  "SEUT/EUBG": "{^cytic}",
  "SH*UPB": "{^tion}",
  "SH-P": "{^ship}",
  "SH-PS": "{^ships}",
  "SHA*U": "{^shaw}",
  "SHAO*EUPB": "{^shine}",
  "SHEUR": "{^shire}",
  "SHUPL": "{^tium}",
  "SK*EU": "{^ski}",
  "SKAEUP": "{^scape}",
  "SKO*EP": "{^oscopy}",
  "SKO*EUP": "{^oscope}",
  "SKOP/EUBG": "{^scopic}",
  "SKOP/KHREU": "{^scopically}",
  "SKWR*E": "{^e}",
  "SKWRUS": "{^us}",
  "SKWRA": "{^a}",
  "SKWRAO": "{^oo}",
  "SKWRAOEU": "{^ae}",
  "SKWRAOEUL": "{^ile}",
  "SKWRE": "{^e}",
  "SKWREFR": "{^ever}",
  "SKWREPB/*EUFT": "{^genicity}",
  "SKWREPB/EUBG": "{^genic}",
  "SKWREPB/SEUS/TEU": "{^genicity}",
  "SKWREU": "{^i}",
  "SKWREUS": "{^ies}",
  "SKWRO": "{^o}",
  "SKWRO*/KRAOEUT": "{^ocyte}",
  "SKWRO/KRAOEUT": "{^ocyte}",
  "SKWRO/RA/PHA": "{^orama}",
  "SKWRO/SA": "{^osa}",
  "SKWRO/TKPWOG": "{^ogogue}",
  "SKWROF": "{^off}",
  "SKWROUPB": "{^down}",
  "SKWROUT": "{^out}",
  "SKWRU": "{^u}",
  "SKWRUP": "{^up}",
  "SKWRUPBD": "{^under}",
  "SKWRUPL": "{^um}",
  "SO*EPL": "{^some}",
  "SO*EUD": "{^azoid}",
  "SO*EUT": "{^zoite}",
  "SO*PB": "{^son}",
  "SO*PL": "{^some}",
  "SPOR/*EUPB": "{^sporin}",
  "SREUFP": "{^ovich}",
  "SREUL": "{^ville}",
  "SROR": "{^vore}",
  "ST-BG": "{^istic}",
  "STA*PBD": "{^stand}",
  "STAO*EPB": "{^stein}",
  "STAO*EUPB": "{^stein}",
  "STER": "{^ster}",
  "STH-S": "{^s}{?}",
  "STO*EPB": "{^stone}",
  "STO*PB": "{^ston}",
  "STOPB": "{^ston}",
  "STP-S": "{^s}{?}",
  "STPA": "{^a}",
  "STPE": "{^e}",
  "STPEU": "{^i}",
  "STPH-D": "{^ed}{?}",
  "STPH-S": "{^s}{?}",
  "STPO": "{^o}",
  "STPU": "{^u}",
  "STR/EUBG": "{^centric}",
  "T*EUF": "{^tive}",
  "T*EUFT": "{^tivity}",
  "TA*BGT": "{^tatic}",
  "TA*EURBG": "{^taker}",
  "TAEUGS": "{^tation}",
  "TAEURPB": "{^itarian}",
  "TAFT/EUBG": "{^tastic}",
  "TAO*EUPL": "{^time}",
  "TAO*EUT": "{^tight}",
  "TAO*EUZ": "{^atize}",
  "TAOEUT/EUS": "{^titis}",
  "TAOEUZ/AEUGS": "{^tization}",
  "TAOUD": "{^itude}",
  "TAOUR": "{^ture}",
  "TAOUZ/PHAB": "{^tuzumab}",
  "TAPBLG": "{^itage}",
  "TAS/TEUBG": "{^tastic}",
  "TEU": "{^ity}",
  "TEU/TPHEU": "{^tini}",
  "TEUF": "{^tive}",
  "TEUFL": "{^itively}",
  "TEUGS": "{^etition}",
  "TEURBS": "{^ticious}",
  "TEUS/TEU": "{^ticity}",
  "THAL/*ER": "{^thaler}",
  "THAL/PHEU/KWRA": "{^ophthalmia}",
  "THO*EUPB": "{^000}",
  "THR*U": "{^through}",
  "TK*EPB": "{^den}",
  "TK-D": "{^ded}",
  "TK-RBS": "{^s} --", // FIXME: might not match affixList regex
  "TKA*EL": "{^dale}",
  "TKAEUGS": "{^dation}",
  "TKEU/TOE": "{^dito}",
  "TKEU/TPHEU": "{^dini}",
  "TKEUGS": "{^dition}",
  "TKPWAFPL": "{^gasm}",
  "TKPWHRO*EPB": "{^globin}",
  "TKPWRAF/KWREU": "{^graphy}",
  "TKPWRAO*UP": "{^group}",
  "TKPWRO*UPBD": "{^ground}",
  "TKRA*UPB": "{^drawn}",
  "TKROEPL": "{^drome}",
  "TO*P": "{^top}",
  "TO*PB": "{^ton}",
  "TO*UPB": "{^town}",
  "TOEP": "{^tope}",
  "TOER": "{^tory}",
  "TOES/EUS": "{^tosis}",
  "TOG/TPEU": "{^tography}",
  "TOLG": "{^otology}",
  "TOS/KO/PEU": "{^toscopy}",
  "TOT/PHEU": "{^totomy}",
  "TOUS": "{^tous}",
  "TP*EUL/EUBG": "{^philic}",
  "TP*EULG": "{^philic}",
  "TP*EUPB": "{^fin}",
  "TP-PLD": "{^ed}{.}",
  "TP-PLS": "{^s}{.}",
  "TPAEUBGS": "{^ification}",
  "TPAEUPBLG/KWRA": "{^phagia}",
  "TPAO*D": "{^food}",
  "TPAO*ELD": "{^field}",
  "TPAO*EUL": "{^phile}",
  "TPAO*EUR": "{^ifier}",
  "TPAOEL/KWRA": "{^philia}",
  "TPAOEU": "{^ify}",
  "TPAOEU/-D": "{^ified}",
  "TPAOEU/-S": "{^ifies}",
  "TPAOEUD": "{^ified}",
  "TPAOEUDZ": "{^ifieds}",
  "TPAOEUG": "{^ifying}",
  "TPEUBG/A*EUGS": "{^fication}",
  "TPEUL/EUBG": "{^philic}",
  "TPEUL/EUS/TEU": "{^philicity}",
  "TPEUL/KWRA": "{^philia}",
  "TPEUL/KWRAS": "{^philias}",
  "TPEULS/TEU": "{^philicity}",
  "TPHA*EUT": "{^inate}",
  "TPHAEL": "{^inally}",
  "TPHAEUGS": "{^ination}",
  "TPHAEUT/O*R": "{^inator}",
  "TPHAL": "{^inal}",
  "TPHAO*E": "{^ni}",
  "TPHAO*ES": "{^nese}",
  "TPHAO*EUPB": "{^inine}",
  "TPHAOEUZ": "{^nize}",
  "TPHAOEUZ/-G": "{^nizing}",
  "TPHER": "{^ener}",
  "TPHERPBLG/EUBG": "{^nergic}",
  "TPHEUFT": "{^ist}",
  "TPHEUPBG": "{^ening}",
  "TPHO*US": "{^inous}",
  "TPHOFT/PHEU": "{^anostomy}",
  "TPHOS/KO/PEU": "{^noscopy}",
  "TPHOUS": "{^inous}",
  "TPHR*EBGS": "{^flection}",
  "TPHRABGS/EUS": "{^phylaxis}",
  "TPHREU": "{^fully}",
  "TPHREUFT": "{^philicity}",
  "TPHROBGS/SEUPB": "{^floxacin}",
  "TPHROPBGS/SEUPB": "{^floxacin}",
  "TPO*ELD": "{^fold}",
  "TPO*RPL": "{^form}",
  "TPO*UPBD": "{^found}",
  "TPOEB/EUS/TEU": "{^phobicity}",
  "TPOR/AOES/EUS/TKOS": "{^pheresis}",
  "TPOR/EUBG": "{^phoric}",
  "TPR-Z": "{^s} from", // FIXME: might not match affixList regex
  "TPRAOES/EUS": "{^pheresis}",
  "TPRO*PBT": "{^front}",
  "TR*EU/TPHOEUBG": "{^trienoic}",
  "TRAOUS/EUF": "{^trusive}",
  "TRO*EF": "{^trophy}",
  "TRO*EP": "{^tropy}",
  "TROEF/EUBG": "{^trophic}",
  "TROEP/*EUBG": "{^tropic}",
  "TROEP/*EUPB": "{^tropin}",
  "TROEP/EUBG": "{^tropic}",
  "TROEP/KWREU": "{^tropy}",
  "TROEP/KWRUPL": "{^tropium}",
  "TROEPG": "{^otropic}",
  "TROEUPG": "{^otropic}",
  "TROF/EUBG": "{^trophic}",
  "TRUPL": "{^trum}",
  "WA*E": "{^way}",
  "WA*ER": "{^wear}",
  "WA*ES": "{^ways}",
  "WA*EUR": "{^ware}",
  "WA*EUT": "{^uate}",
  "WA*RD": "{^ward}",
  "WAEL": "{^ually}",
  "WAEUGS": "{^uation}",
  "WAL": "{^ual}",
  "WAPBS": "{^uance}",
  "WO*PL": "{^woman}",
  "WO*RBG": "{^work}",
  "WO*RD": "{^word}",
  "WO*RLD": "{^world}",
  "WO*RPL": "{^worm}",
  "WOS/TEU": "{^uosity}",
  "WOUS": "{^uous}",
  "WUPL": "{^uum}",
  "*EPBLG": "{^-edge}",
  "A*EURBG": "{^-acre}",
  "A*UR/KWREPBT/-D": "{^-oriented}",
  "A/KWAO*EURD": "{^-acquired}",
  "A/PRO*FD": "{^-approved}",
  "ARBGZ": "{^-A}",
  "ERBGZ": "{^-E}",
  "EUPB/TKAO*UFD": "{^-induced}",
  "EURBGZ": "{^-I}",
  "H*ED": "{^-head}",
  "H-PB/KA/TPHAEUD/KWRAPB": "{^-Canadian}",
  "H-PB/KAPB/TKA": "{^-Canada}",
  "H-PB/PHERPB": "{^-American}",
  "H-RBGZ": "{^-H}",
  "HO*UR": "{^-hour}",
  "HR-RBGZ": "{^-L}",
  "HRA*EPB": "{^-lane}",
  "HRAO*BG": "{^-look}",
  "HRO*PBG": "{^-long}",
  "K*UP": "{^-cup}",
  "K-RBGZ": "{^-K}",
  "KA*EURT": "{^-carat}",
  "KAO*BGD": "{^-cooked}",
  "KHRO*PLT": "{^-kilometer}",
  "KHRO*R": "{^-color}",
  "KP-RBGZ": "{^-X}",
  "KPHRAO*ET": "{^-complete}",
  "KR-RBGZ": "{^-C}",
  "KRO*ELD": "{^-controlled}",
  "KW-RBGZ": "{^-Q}",
  "KWA*ERT": "{^-quart}",
  "KWA*LT": "{^-quality}",
  "KWR-RBGZ": "{^-Y}",
  "KWRA*RD": "{^-yard}",
  "KWRAO*ER": "{^-year}",
  "KWRAUR/KWREPBT": "{^-orient}",
  "O*D": "{^-odd}",
  "O*ELD": "{^-old}",
  "O*EPBD": "{^-owned}",
  "O*F": "{^-off}",
  "O*UPBS": "{^-ounce}",
  "O*UT": "{^-out}",
  "ORBGZ": "{^-O}",
  "P*ERPB": "{^-person}",
  "P*URP": "{^-purpose}",
  "P-RBGZ": "{^-P}",
  "PA*EUPBLG": "{^-page}",
  "PA*EURBT": "{^-patient}",
  "PA*RT": "{^-part}",
  "PAO*ES": "{^-piece}",
  "PH*EUPBT": "{^-minute}",
  "PH-RBGZ": "{^-M}",
  "PHAO*ED/KWRAEUT/-D": "{^-mediated}",
  "PHAO*ED/KWRAEUTD": "{^-mediated}",
  "PHAO*EUL": "{^-mile}",
  "PHO*EPBT": "{^-month}",
  "PHO*UPBT/-D": "{^-mounted}",
  "PHRAO*EU": "{^-ply}",
  "PO*UPBD": "{^-pound}",
  "PRAO*EUS": "{^-price}",
  "PRAO*F": "{^-proof}",
  "PRO*EPT": "{^-appropriate}",
  "PRO*ET": "{^-appropriate}",
  "PW*ED": "{^-bed}",
  "PW*EULT": "{^-built}",
  "PW*EUT": "{^-bit}",
  "PW*PL": "{^-bedroom}",
  "PW*URPBG": "{^-burning}",
  "PW-RBGZ": "{^-B}",
  "PWA*ERPBG": "{^-bearing}",
  "PWA*EUFD": "{^-based}",
  "PWA*EUS": "{^-base}",
  "PWR*PL": "{^-bathroom}",
  "R*EPLTD": "{^-related}",
  "R*EUFPBT": "{^-resistant}",
  "R*EUPBT": "{^-resistant}",
  "R-RBGZ": "{^-R}",
  "RA*ELT/-D": "{^-related}",
  "RA*ELTD": "{^-related}",
  "RO*EFT/-D": "{^-roasted}",
  "S*EBGD": "{^-second}",
  "S*ERD": "{^-certified}",
  "S*G": "{^-something}",
  "S-RBGZ": "{^-S}",
  "SA*EUF": "{^-safe}",
  "SA*F": "{^-sav}",
  "SA*FG": "{^-saving}",
  "SAO*EUD/-D": "{^-sided}",
  "SAO*EUFD": "{^-sized}",
  "SAO*EUZ": "{^-size}",
  "SHA*EUP": "{^-shape}",
  "SHA*EUPD": "{^-shaped}",
  "SK*EBL": "{^-susceptible}",
  "SKA*PB": "{^-scan}",
  "SKWR*EPBD": "{^-end}",
  "SKWR*EUPB": "{^-in}",
  "SKWR*EUPB/SPAOEUR/-D": "{^-inspired}",
  "SKWR*EUPB/SPAOEUR/-G": "{^-inspiring}",
  "SKWR*UP": "{^-up}",
  "SKWR*UP/*ER": "{^-upper}",
  "SKWR*UPS": "{^-ups}",
  "SKWR-RBGZ": "{^-J}",
  "SKWRA*S": "{^-ass}",
  "SKWRAO*BG": "{^-look}",
  "SKWRAO*EUBG": "{^-like}",
  "SKWRAOBG": "{^-look}",
  "SKWRAOEUBG": "{^-like}",
  "SKWRAOG": "{^-looking}",
  "SKWRAUL": "{^-all}",
  "SKWREUPB/SPAOEUR/-D": "{^-inspired}",
  "SKWRO*F": "{^-off}",
  "SKWRO*FS": "{^-offs}",
  "SKWRO*PB": "{^-on}",
  "SKWRO*UPB": "{^-down}",
  "SKWRO*UPBS": "{^-downs}",
  "SKWRO*UT": "{^-out}",
  "SO*ERBT/-D": "{^-associated}",
  "SO*ERBTD": "{^-associated}",
  "SP*EFBG": "{^-specific}",
  "SP*EUFBG": "{^-specific}",
  "SPAO*ED": "{^-speed}",
  "SPAO*EG": "{^-speaking}",
  "SPAO*ERPBS/-D": "{^-experienced}",
  "SR-RBGZ": "{^-V}",
  "SRO*ELT": "{^-volt}",
  "ST*EP": "{^-step}",
  "STA*EUPBLG": "{^-stage}",
  "STAO*EUL": "{^-style}",
  "STK-RBGZ": "{^-Z}",
  "STO*ER": "{^-story}",
  "STR*D": "{^-centered}",
  "STR*EPBG": "{^-strength}",
  "T*ERPL": "{^-term}",
  "T-RBGZ": "{^-T}",
  "TA*EPL": "{^-time}",
  "TA*EUFT": "{^-taste}",
  "TA*UL": "{^-tall}",
  "TAO*ER": "{^-tier}",
  "TAO*EUP": "{^-type}",
  "TAO*EUPL/*ER": "{^-timer}",
  "TH*EUBG": "{^-thick}",
  "THR*EFPBG": "{^-threatening}",
  "TK*EG": "{^-degree}",
  "TK-RBGZ": "{^-D}",
  "TKA*EU": "{^-day}",
  "TKAO*EPBT": "{^-dependent}",
  "TKAO*R": "{^-door}",
  "TKHRA*R": "{^-dollar}",
  "TKO*UPB": "{^-down}",
  "TKPHEPBL": "{^-dimensional}",
  "TKPW-RBGZ": "{^-G}",
  "TKPWA*EUPBLG": "{^-gauge}",
  "TKPWHRO*PB": "{^-gallon}",
  "TKPWR*EUT": "{^-grit}",
  "TP*EURBT": "{^-efficient}",
  "TP-RBGZ": "{^-F}",
  "TPA*EUPL": "{^-fame}",
  "TPA*EUPL/OUS": "{^-famous}",
  "TPA*EUS/-G": "{^-facing}",
  "TPAO*T": "{^-foot}",
  "TPH*EBGT/-D": "{^-infected}",
  "TPH*EBGTD": "{^-infected}",
  "TPH*FP": "{^-inch}",
  "TPH-RBGZ": "{^-N}",
  "TPHAO*EF": "{^-naive}",
  "TPHO*EPB": "{^-known}",
  "TPHRA*EUFR": "{^-flavor}",
  "TPO*EUBGS/-D": "{^-focused}",
  "TPR*EPBD/HREU": "{^-friendly}",
  "TPRAO*E": "{^-free}",
  "TPRAO*EUD": "{^-fried}",
  "TRAO*ETD": "{^-treated}",
  "URBGZ": "{^-U}",
  "W*EPBS": "{^-influence}",
  "W-RBGZ": "{^-W}",
  "WAO*EBG": "{^-week}",
  "WAO*EUD": "{^-wide}",
  "WAO*EUS": "{^-wise}",
  "ES": "{^es}",
  // ["/*PBS", "iness"],
  // ["/*S", "s"],
  // ["/-SZ", "s"],
  // ["/-Z", "s"],
  // ["/AEUR/TEU", "arity"],
  // ["/AL/TEU", "ality"],
  // ["/EBG/HREU", "ically"],
  // ["/EUL/TEU", "ility"],
  // ["/HREUPBS", "liness"],
  // ["/KAO*ERP", "keeper"],
  // ["/KWRA*U", "ier"],
  // ["/KWRUS", "us"],
  // ["/O*US", "us"],
  // ["/OPL/TER", "ometer"],
  // ["/PHA*EUBG/-G", "making"],
  // ["/PHAO*EUFG", "imizing"],
  // ["/PHO*PBG/*ER", "monger"],
  // ["/SAO*EUD/A*L", "cidal"],
  // ["/SKWR*US", "us"],
  // ["/SKWRAOED", "ed"],
  // ["/TEUFT", "ticity"],
  // ["/TPHAER", "ary"],
  // ["/TPHALT", "ality"],
};

let personalDictionaries = [
  [ "test-typey-type.json", testTypeyTypeDict],
  [ "test-emoji.json", testEmojiDict],
  [ "test-ruby.json", testRubyDict],
  [ "test-react.json", testReactDict],
  [ "test-plover.json", testPloverDict],
  [ "test-prefixes.json", testPrefixesDict],
  [ "test-suffixes.json", testSuffixesDict],
  [ "test-aussie.json", testAussieDict],
];
let dictAndMisstrokes = [
  testTypeyTypeDict,
  {"E": "he"}
];

let sortedAndCombinedLookupDictionary = createAGlobalLookupDictionary(personalDictionaries, dictAndMisstrokes);

const affixList = new AffixList(sortedAndCombinedLookupDictionary);
AffixList.setSharedInstance(affixList);
let sharedAffixes = AffixList.getSharedInstance();

let globalLookupDictionary = sortedAndCombinedLookupDictionary;
// let globalLookupDictionary = new Map([
//   ["{^^}", [["TK-LS", "typey-type.json"]]],
//   ["example", [["KP-PL", "typey-type.json"]]],
//   ["{^}™", [["TR*PL", "typey-type.json"], ["SPWO*L/TRAEUD/PHARBG", "typey-type.json"]]],
//   ["™", [["PHOEPBLG/T*/PH*", "emoji.json"]]],
//   ["<{^}", [["PWRABG", "typey-type.json"]]],
//   ["<", [["HR*PB", "typey-type.json"]]],
//   ["#{^}", [["HAERB", "typey-type.json"]]],
//   // ["${^}", [["TK-PL", "typey-type.json"]]],
//   ["$", [["TPHRORB", "typey-type.json"]]],
//   ["--{^}", [["H-PBZ", "typey-type.json"]]],
//   ["-{^}", [["H-PBS", "typey-type.json"]]],
//   ["-", [["H*B", "typey-type.json"]]],
//   ["{^-^}", [["H-PB", "typey-type.json"]]],
//   ["<a href=\"{^}", [["A/HREF", "plover.json"]]],
//   ["Object.{^}", [["O*B/P-P", "react.json"]]],
//   ["\\{{^}", [["TPR-BGT", "typey-type.json"]]],
//   ["flash[:{^}", [["TPHRARB/PWR-BGT", "ruby.json"]]],
//   ["{>}http://{^}", [["HAOEPT", "typey-type.json"]]],
//   ["{&%}", [["P*ERS", "typey-type.json"]]],
//   ["{^}{#F1}{^}", [["1-BGS", "typey-type.json"]]],
//   ["{^}:{^}", [["KHR-PB", "typey-type.json"]]],
//   ["{^}^{^}", [["KR-RT", "typey-type.json"]]],
//   ["{^}({^}", [["P*PB", "typey-type.json"]]],
//   ["{~|‘^}", [["TP-P/TP-P", "typey-type.json"]]],
//   ["{^~|’}", [["TP-L/TP-L", "typey-type.json"]]],
//   ["{~|“^}", [["KW-GS/KW-GS", "typey-type.json"]]],
//   ["{^~|”}", [["KR-GS/KR-GS", "typey-type.json"]]],
//   ["a", [["AEU", "typey-type.json"]]],
//   ["I", [["EU", "typey-type.json"]]],
//   ["{^ ^}", [["S-P", "typey-type.json"]]],
//   ["{?}", [["H-F", "typey-type.json"]]],
//   ["?", [["KWEZ", "typey-type.json"]]],
//   ["{,}", [["KW-BG", "typey-type.json"]]],
//   ["{.}", [["TP-PL", "typey-type.json"]]],
//   [".", [["PR-D", "typey-type.json"]]],
//   ["Tom", [["TOPL", "typey-type.json"]]],
//   ["heather", [["H*ET/*ER", "typey-type.json"]]],
//   ["Tuesday", [["TAOUZ", "typey-type.json"]]],
//   ["first", [["TPEUFRT", "typey-type.json"]]],
//   ["3D", [["30*EUD", "typey-type.json"]]],
//   ["address", [["A/TKRES", "typey-type.json"]]],
//   ["bed", [["PWED", "typey-type.json"]]],
//   ["bed,", [["PWED KW-BG", "typey-type.json"]]],
//   ["man", [["PHAPB", "typey-type.json"]]],
//   ["{!}", [["SKHRAPL", "typey-type.json"]]],
//   ["and again", [["STKPWEPBG", "typey-type.json"]]],
//   ["and", [["SKP", "typey-type.json"], ["APBD", "plover.json"]]],
//   ["again", [["TKPWEPB", "typey-type.json"]]],
//   ["media", [["PHO*EUD", "typey-type.json"]]],
//   ["query", [["KWAOER/REU", "typey-type.json"]]],
//   ["Sinatra", [["STPHAT/RA", "typey-type.json"]]],
//   ["{^'}", [["AE", "typey-type.json"]]],
//   ["push", [["PURB", "typey-type.json"]]],
//   ["origin", [["O*RPBLG", "typey-type.json"]]],
//   ["master", [["PHAFRT", "typey-type.json"]]],
//   ["diff", [["TKEUF", "typey-type.json"]]],
//   ["{--}", [["TK*RB", "typey-type.json"]]],
//   ["cached", [["KAERBD", "typey-type.json"]]],
//   ["{^>^}", [["A*EPBG", "typey-type.json"]]],
//   ["{^<^}", [["AEPBG", "typey-type.json"]]],
//   ["{^/^}", [["OEU", "typey-type.json"]]],
//   ["title", [["TAOEULT", "typey-type.json"]]],
//   ["learn", [["HRERPB", "typey-type.json"]]],
//   ["oh{,}", [["OERBGS", "typey-type.json"]]],
//   ["{,}like{,}", [["HRAO*EUBG", "typey-type.json"]]],
//   ["lent", [["HREPBT", "typey-type.json"]]],
//   ["scroll", [["SKROL", "typey-type.json"]]],
//   ["farmer", [["TPAR/PHER", "typey-type.json"]]],
//   ["{^~|\"}", [["KR-GS", "typey-type.json"]]],
//   ["{~|\"^}", [["KW-GS", "typey-type.json"]]],
//   ["it", [["T", "typey-type.json"]]],
//   ["be", [["-B", "typey-type.json"]]],
//   ["{be^}", [["PWE", "typey-type.json"]]],
//   ["{quasi-^}", [["KWAS/KWREU", "typey-type.json"]]],
//   ["quasi", [["KWA/SEU", "typey-type.json"]]],
//   ["experimental", [["SPAOERL", "typey-type.json"]]],
//   ["{gly-^}", [["TKPWHRAOEU", "typey-type.json"]]],
//   ["oxide", [["KPAOEUD", "typey-type.json"]]],
//   ["{^ectomy}", [["EBGT/PHEU", "typey-type.json"]]],
//   ["said", [["SAEUD", "typey-type.json"]]],
//   ["computer", [["KPAOUR", "typey-type.json"]]],
//   ["cat", [["KAT", "typey-type.json"]]],
//   ["kettle", [["KET/*L", "typey-type.json"]]],
//   ["can", [["K", "typey-type.json"]]],
//   ["can't", [["K-PBT", "typey-type.json"]]],
//   ["houses", [["HO*UFS", "typey-type.json"]]],
//   ["her", [["HER", "typey-type.json"]]],
//   ["long", [["HROPBG", "typey-type.json"]]],
//   ["narrate", [["TPHAR/AEUT", "typey-type.json"]]],
//   ["seethe", [["SAO*ET", "typey-type.json"]]],
//   ["bing", [["PWEUPBG", "typey-type.json"]]],
//   ["binge", [["PWEUPB/-PBLG", "typey-type.json"]]],
//   ["cuff", [["KUF", "typey-type.json"]]],
//   ["you", [["U", "typey-type.json"]]],
//   ["store", [["STOR", "typey-type.json"]]],
//   ["room", [["RAOPL", "typey-type.json"]]],
//   ["{^room}", [["RAO*PL", "typey-type.json"]]],
//   ["outside", [["OUDZ", "typey-type.json"]]],
//   ["hit", [["HEUT", "typey-type.json"]]],
//   ["miss", [["PHEUS", "typey-type.json"]]],
//   ["hit-and-miss", [["H-PLS", "typey-type.json"]]],
//   ["buffet", [["PWUF/ET", "typey-type.json"]]],
//   ["wandering", [["WAPBGD", "typey-type.json"],["WAPB/TKER/-G", "typey-type.json"]]], // currently pre-sorted to best stroke first
//   ["lodge", [["HROPBLG", "typey-type.json"]]],
//   ["isn't", [["S-PBT", "typey-type.json"]]],
//   ["maiden", [["PHAEUD/*EPB", "typey-type.json"], ["PHAEUD/EPB", "typey-type.json"]]],

//   ["$100", [["1-9DZ", "typey-type.json"], ["1-DZ", "typey-type.json"]]],
//   ["$200", [["2-DZ", "typey-type.json"]]],
//   ["$300", [["3-DZ", "typey-type.json"]]],
//   ["$400", [["4-DZ", "typey-type.json"]]],
//   ["$45", [["#45/TK-PL", "typey-type.json"], ["45/TK-PL", "typey-type.json"]]],
//   ["$500", [["5DZ", "typey-type.json"]]],
//   ["$600", [["-6DZ", "typey-type.json"]]],
//   ["$700", [["-7DZ", "typey-type.json"]]],
//   ["0", [["0EU", "typey-type.json"]]],
//   ["00", [["#-Z", "typey-type.json"]]],
//   ["01", [["10*EU", "typey-type.json"], ["10EU", "typey-type.json"]]],
//   ["02", [["20EU", "typey-type.json"]]],
//   ["03", [["30EU", "typey-type.json"]]],
//   ["04", [["40EU", "typey-type.json"]]],
//   ["05", [["50EU", "typey-type.json"]]],
//   ["1 tablespoon", [["1/TPW-S", "typey-type.json"]]],
//   ["1,000", [["#S/W-B/THUZ", "typey-type.json"], ["1/THO*EUPB", "typey-type.json"], ["1/THOEUB", "typey-type.json"], ["TPHOUZ", "typey-type.json"]]],
//   ["1/2", [["HA*F", "typey-type.json"], ["TPHA*F", "typey-type.json"]]],
//   ["1/3", [["130EU", "typey-type.json"], ["TH*EURD", "typey-type.json"]]],
//   ["1/4", [["140EU", "typey-type.json"], ["KWA*RT", "typey-type.json"]]],
//   ["1/8", [["10EU8", "typey-type.json"]]],
//   ["10 percentage", [["10/PERS/APBLG", "typey-type.json"]]],
//   ["10", [["1/0", "typey-type.json"]]],
//   ["10%", [["10/P*ERS", "typey-type.json"]]],
//   ["10,000", [["#SO/W-B/THUZ", "typey-type.json"]]],
//   ["100", [["1-Z", "typey-type.json"], ["TPHUPBZ", "typey-type.json"]]],
//   ["1000", [["1/THOUZ", "typey-type.json"]]],
//   ["1001", [["1-DZ/1", "typey-type.json"]]],
//   ["101", [["10/1", "typey-type.json"]]],
//   ["10th", [["10/*PBT", "typey-type.json"], ["10/*T", "typey-type.json"]]],
//   ["11", [["1-D", "typey-type.json"]]],
//   ["11:00", [["1BGD", "typey-type.json"]]],
//   ["11th", [["1-D/*T", "typey-type.json"]]],
//   ["12", [["1/2", "typey-type.json"]]],
//   ["12-in-1", [["12/TPH/1", "typey-type.json"]]],
//   ["121", [["12/1", "typey-type.json"]]],
//   ["125", [["12R5", "typey-type.json"]]],
//   ["12:00", [["12-BG", "typey-type.json"]]],
//   ["12th", [["12/*T", "typey-type.json"]]],
//   ["13", [["1/3", "typey-type.json"]]],
//   ["14", [["14", "typey-type.json"], ["14*", "typey-type.json"]]],
//   ["15", [["1/5", "typey-type.json"]]],
//   ["16", [["1/6", "typey-type.json"]]],
//   ["17", [["1/7", "typey-type.json"]]],
//   ["18", [["1/8", "typey-type.json"]]],
//   ["1850s", [["18/50/-S", "typey-type.json"]]],
//   ["19", [["1-9", "typey-type.json"], ["1-9D", "typey-type.json"]]],
//   ["1930s", [["19/30/-S", "typey-type.json"]]],
//   ["1950", [["1-9/50", "typey-type.json"], ["1-9D/50", "typey-type.json"]]],
//   ["197", [["TPHEFPBT", "typey-type.json"]]],
//   ["1970", [["19/OEUP", "typey-type.json"], ["TPHEFPBD", "typey-type.json"]]],
//   ["198", [["TPHAEUPBT", "typey-type.json"]]],
//   ["1980", [["TPHAEUPBD", "typey-type.json"]]],
//   ["1986", [["19/8/6", "typey-type.json"]]],
//   ["1990", [["TPHEUPBD", "typey-type.json"]]],
//   ["1:00", [["1-BG", "typey-type.json"]]],
//   ["1b", [["1/PW*", "typey-type.json"]]],
//   ["1st", [["1/S*/T*", "typey-type.json"]]],
//   ["2 x 4", [["2/KP*/4", "typey-type.json"]]],
//   ["2,000", [["#T-/W-B/THUZ", "typey-type.json"]]],
//   ["2/3", [["230EU", "typey-type.json"]]],
//   ["20", [["2/0", "typey-type.json"]]],
//   ["200", [["2-Z", "typey-type.json"]]],
//   ["2001", [["KWRAOUPB/1", "typey-type.json"], ["STWOUPB/1", "typey-type.json"]]],
//   ["2007", [["TWOUPB/-P", "typey-type.json"],["TWOUPB/7", "typey-type.json"]]],
//   ["2010", [["TWOUPB/10", "typey-type.json"]]],
//   ["20s", [["20/-S", "typey-type.json"]]],
//   ["21", [["12EU", "typey-type.json"]]],
//   ["22", [["2-D", "typey-type.json"]]],
//   ["23", [["2/3", "typey-type.json"]]],
//   ["24", [["2/4", "typey-type.json"]]],
//   ["240", [["#240", "typey-type.json"]]],
//   ["25", [["2/5", "typey-type.json"]]],
//   ["26", [["2/6", "typey-type.json"]]],
//   ["260", [["2/6/0", "typey-type.json"]]],
//   ["27", [["2/7", "typey-type.json"]]],
//   ["28", [["2/8", "typey-type.json"]]],
//   ["29", [["2/9", "typey-type.json"]]],
//   ["2:00", [["2-BG", "typey-type.json"]]],
//   ["2d", [["2/TK*", "typey-type.json"]]],
//   ["2nd", [["2/*PBD", "typey-type.json"]]],
//   ["2s", [["2-S", "typey-type.json"]]],
//   ["3 tablespoon", [["3/T-BS", "typey-type.json"]]],
//   ["3 tablespoons", [["3/T-BS/-S", "typey-type.json"]]],
//   ["3 x 6", [["3/KP*/6", "typey-type.json"]]],
//   ["3,000", [["#P-/W-B/THUZ", "typey-type.json"]]],
//   ["3/4", [["340EU", "typey-type.json"]]],
//   ["3/8", [["30EU8", "typey-type.json"]]],
//   ["30", [["3/0", "typey-type.json"]]],
//   ["300", [["3-Z", "typey-type.json"]]],
//   ["30s", [["30*S", "typey-type.json"], ["30/-S", "typey-type.json"]]],
//   ["31", [["13EU", "typey-type.json"]]],
//   ["32", [["23EU", "typey-type.json"]]],
//   ["33", [["3-D", "typey-type.json"]]],
//   ["34", [["3/4", "typey-type.json"]]],
//   ["35", [["3/5", "typey-type.json"]]],
//   ["350 degree", [["PAO/TKEG", "typey-type.json"]]],
//   ["36", [["3/6", "typey-type.json"]]],
//   ["360 degrees", [["36/0/TKEG/-S", "typey-type.json"]]],
//   ["37", [["3/7", "typey-type.json"]]],
//   ["38", [["3/8", "typey-type.json"]]],
//   ["39", [["3/9", "typey-type.json"]]],
//   ["3:00", [["3-BG", "typey-type.json"]]],
//   ["3D", [["30*EUD", "typey-type.json"]]],
//   ["3rd", [["3/R*D", "typey-type.json"]]],
//   ["4 tablespoons", [["4/T-BS/-S", "typey-type.json"]]],
//   ["4,000", [["#H/W-B/THUZ", "typey-type.json"]]],
//   ["40", [["40", "typey-type.json"], ["40*", "typey-type.json"]]],
//   ["400", [["4-Z", "typey-type.json"]]],
//   ["40s", [["40ES", "typey-type.json"], ["40S", "typey-type.json"]]],
//   ["40{,}", [["40RBGS", "typey-type.json"]]],
//   ["41", [["14EU", "typey-type.json"]]],
//   ["42", [["24EU", "typey-type.json"]]],
//   ["43", [["34EU", "typey-type.json"]]],
//   ["44", [["4-D", "typey-type.json"]]],
//   ["45", [["4/5", "typey-type.json"]]],
//   ["46", [["4/6", "typey-type.json"]]],
//   ["47", [["4/7", "typey-type.json"]]],
//   ["48", [["4/8", "typey-type.json"]]],
//   ["49", [["4/9", "typey-type.json"]]],
//   ["4:00", [["4-BG", "typey-type.json"]]],
//   ["4s", [["4-S", "typey-type.json"]]],
//   ["4th", [["4/*T", "typey-type.json"]]],
//   ["5", [["R5", "typey-type.json"]]],
//   ["5%", [["TPEUF/P*ERS", "typey-type.json"]]],
//   ["5,000", [["#A/W-B/THUZ", "typey-type.json"]]],
//   ["5.4", [["5/-P/4", "typey-type.json"]]],
//   ["5/8", [["50EU8", "typey-type.json"]]],
//   ["50 cents", [["50/KREPBT/-S", "typey-type.json"]]],
//   ["50", [["5/0", "typey-type.json"]]],
//   ["500", [["5Z", "typey-type.json"]]],
//   ["50s", [["50S", "typey-type.json"]]],
//   ["51", [["15EU", "typey-type.json"]]],
//   ["52", [["25*EU", "typey-type.json"], ["25EU", "typey-type.json"]]],
//   ["53", [["35EU", "typey-type.json"]]],
//   ["54", [["45EU", "typey-type.json"]]],
//   ["55", [["5D", "typey-type.json"]]],
//   ["56", [["56", "typey-type.json"]]],
//   ["57", [["57", "typey-type.json"]]],
//   ["58", [["58", "typey-type.json"]]],
//   ["59", [["59", "typey-type.json"]]],
//   ["5:00", [["5BG", "typey-type.json"]]],
//   ["5th", [["5/*T", "typey-type.json"]]],
//   ["6,000", [["#F/W-B/THUZ", "typey-type.json"]]],
//   ["60", [["0EU6", "typey-type.json"]]],
//   ["600", [["-6Z", "typey-type.json"]]],
//   ["61", [["1EU6", "typey-type.json"]]],
//   ["62", [["2EU6", "typey-type.json"]]],
//   ["63", [["3EU6", "typey-type.json"]]],
//   ["64", [["4EU6", "typey-type.json"]]],
//   ["65", [["5EU6", "typey-type.json"]]],
//   ["66", [["-6D", "typey-type.json"]]],
//   ["67", [["67", "typey-type.json"]]],
//   ["68", [["68", "typey-type.json"]]],
//   ["69", [["69", "typey-type.json"]]],
//   ["6:00", [["K-6", "typey-type.json"]]],
//   ["6th", [["6/*T", "typey-type.json"]]],
//   ["7,000", [["#-P/W-B/THUZ", "typey-type.json"]]],
//   ["70", [["0EU7", "typey-type.json"]]],
//   ["700", [["-7Z", "typey-type.json"]]],
//   ["70s", [["0EU7S", "typey-type.json"]]],
//   ["71", [["1EU7", "typey-type.json"]]],
//   ["72", [["2EU7", "typey-type.json"]]],
//   ["73", [["3EU7", "typey-type.json"]]],
//   ["74", [["4EU7", "typey-type.json"]]],
//   ["75", [["5EU7", "typey-type.json"]]],
//   ["76", [["EU67", "typey-type.json"]]],
//   ["77", [["-7D", "typey-type.json"]]],
//   ["78", [["78", "typey-type.json"]]],
//   ["79", [["79", "typey-type.json"]]],
//   ["7:00", [["K-7", "typey-type.json"]]],
//   ["7th", [["7/*T", "typey-type.json"]]],
//   ["8,000", [["#L/W-B/THUZ", "typey-type.json"]]],
//   ["80 cents and", [["0EU8/KREPBT/SKP-S", "typey-type.json"]]],
//   ["80", [["0EU8", "typey-type.json"]]],
//   ["800", [["-8Z", "typey-type.json"]]],
//   ["80s", [["0EU8S", "typey-type.json"]]],
//   ["81", [["1EU8", "typey-type.json"]]],
//   ["82", [["2EU8", "typey-type.json"]]],
//   ["83", [["3EU8", "typey-type.json"]]],
//   ["84", [["4EU8", "typey-type.json"]]],
//   ["85 cents", [["8/5/KREPBT/-S", "typey-type.json"]]],
//   ["85", [["5EU8", "typey-type.json"]]],
//   ["86", [["EU68", "typey-type.json"]]],
//   ["87", [["EU78", "typey-type.json"]]],
//   ["88", [["-8D", "typey-type.json"]]],
//   ["89", [["89", "typey-type.json"]]],
//   ["8:00", [["K-8", "typey-type.json"]]],
//   ["8th", [["8/*T", "typey-type.json"]]],
//   ["8vo", [["8/SR*/O*", "typey-type.json"]]],
//   ["9,000", [["#-T/W-B/THUZ", "typey-type.json"]]],
//   ["90", [["0EU9", "typey-type.json"]]],
//   ["90%", [["0EU9/PERS", "typey-type.json"]]],
//   ["900", [["-9Z", "typey-type.json"], ["EU9", "typey-type.json"]]],
//   ["91", [["1EU9", "typey-type.json"]]],
//   ["92", [["2EU9", "typey-type.json"]]],
//   ["93", [["3EU9", "typey-type.json"]]],
//   ["94", [["4EU9", "typey-type.json"]]],
//   ["95", [["5EU9", "typey-type.json"]]],
//   ["96", [["EU69", "typey-type.json"]]],
//   ["97", [["EU79", "typey-type.json"]]],
//   ["98", [["EU89", "typey-type.json"]]],
//   ["99", [["-9D", "typey-type.json"]]],
//   ["9:00", [["K-9", "typey-type.json"]]],
//   ["9th", [["9/*T", "typey-type.json"]]],
//   ["I", [["1-R", "typey-type.json"]]],
//   ["II", [["2-R", "typey-type.json"]]],
//   ["III", [["3-R", "typey-type.json"]]],
//   ["IV", [["4-R", "typey-type.json"]]],
//   ["IX", [["R-9", "typey-type.json"]]],
//   ["VI", [["R-6", "typey-type.json"]]],
//   ["VII", [["R-7", "typey-type.json"]]],
//   ["VIII", [["R-8", "typey-type.json"]]],
//   ["X", [["10R", "typey-type.json"]]],
//   ["XI", [["1-RD", "typey-type.json"]]],
//   ["XII", [["12-R", "typey-type.json"]]],
//   ["{&00}", [["0Z", "typey-type.json"]]],
//   ["{&0}", [["#O", "typey-type.json"], ["0RBGS", "typey-type.json"]]],
//   ["{&1}", [["#S", "typey-type.json"], ["1-RBGS", "typey-type.json"]]],
//   ["{&2}", [["#T-", "typey-type.json"], ["2-RBGS", "typey-type.json"]]],
//   ["{&3}", [["#P-", "typey-type.json"], ["3-RBGS", "typey-type.json"]]],
//   ["{&4}", [["#H", "typey-type.json"], ["4-RBGS", "typey-type.json"]]],
//   ["{&5}", [["#A", "typey-type.json"], ["5RBGS", "typey-type.json"]]],
//   ["{&6}", [["#F", "typey-type.json"], ["1KWR-6", "typey-type.json"]]],
//   ["{&7}", [["#-P", "typey-type.json"], ["1KWR-7", "typey-type.json"]]],
//   ["{&8}", [["#L", "typey-type.json"], ["1KWR-8", "typey-type.json"]]],
//   ["{&9}", [["#-T", "typey-type.json"], ["1KWR-9", "typey-type.json"]]],
//   ["{200^}", [["TWOUPB", "typey-type.json"]]],
//   ["{:}30", [["30*U", "typey-type.json"]]],
//   ["{:}40", [["40U", "typey-type.json"]]],
//   ["{:}45", [["45*U", "typey-type.json"]]],
//   ["{>}{&t}", [["2*", "typey-type.json"]]],
//   ["{^0rz}", [["0RZ", "typey-type.json"]]],
//   ["{^:05}", [["50*EUBG", "typey-type.json"], ["50EUBG", "typey-type.json"]]],
//   ["{^:10}", [["10*BG", "typey-type.json"], ["10BG", "typey-type.json"]]],
//   ["{^:15}", [["15*BG", "typey-type.json"], ["15BG", "typey-type.json"]]],
//   ["{^:20}", [["20*BG", "typey-type.json"], ["20BG", "typey-type.json"]]],
//   ["{^:25}", [["25*BG", "typey-type.json"], ["25BG", "typey-type.json"]]],
//   ["{^:30}", [["30*BG", "typey-type.json"], ["30BG", "typey-type.json"]]],
//   ["{^:35}", [["35*BG", "typey-type.json"], ["35BG", "typey-type.json"]]],
//   ["{^:40}", [["40*BG", "typey-type.json"], ["40BG", "typey-type.json"]]],
//   ["{^:45}", [["45*BG", "typey-type.json"], ["45BG", "typey-type.json"]]],
//   ["{^:50}", [["50*BG", "typey-type.json"], ["50BG", "typey-type.json"]]],
//   ["{^:55}", [["5*BGD", "typey-type.json"], ["5BGD", "typey-type.json"]]],
//   ["2009 dollars", [["TWOUPB/9/TKHRAR/-S", "typey-type.json"]]],
//   ["2000", [["TWOUPBD", "typey-type.json"], ["TWOUZ", "typey-type.json"]]],
//   ["©", [["KPR-T", "typey-type.json"]]],
//   ["in", [["TPH", "typey-type.json"]]],
//   ["your", [["KWROUR", "typey-type.json"]]],
//   ["cross-petition", [["KR-PGS", "typey-type.json"], ["KR-PGS", "plover.json"]]],
//   ["{^.com}", [["KROPL", "typey-type.json"]]],
//   ["Dr.", [["TKR-FPLT", "typey-type.json"]]],
//   ["Dr.{-|}", [["TKR*FPLT", "plover.json"]]],
//   ["Mx.{-|}", [["PH-BGS", "plover.json"]]],
//   ["Mr. and Mrs.", [["PHRARPLS", "plover.json"]]],
//   ["chant", [["KHAPBT", "plover.json"]]],
//   ["Eldridge", [["EL/TKREUPBLG", "plover.json"]]],
//   ["nelly", [["TPHEL/KWREU", "typey-type.json"]]],
//   ["cover", [["KOFR", "typey-type.json"]]],
//   ["mass", [["PHAS", "typey-type.json"]]],
//   ["{~|'^}twas", [["TWA*S", "plover.json"]]],
//   ["gentlemen", [["SKWR*EPL", "plover.json"]]],
// ]);
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
    let dictName = "typey:typey-type.json";
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
      ["to", [["TO", "typey:typey-type.json"]]],
      ["said", [["SED", "typey:typey-type.json"], ["SAEUD", "typey:typey-type.json"]]],
      ["sounds", [["SOUPBD/-Z", "typey:typey-type.json"], ["SOUPBDZ", "typey:typey-type.json"]]]
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

    it('showing hint word starting with apostrophe using dictionary formatting symbols', () => {
      let wordOrPhraseMaterial = "'twas";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("TWA*S");
    });

    it('show full word hints for a phrase ending with apostrophe and ess when the exact condensed stroke entry exists', () => {
      let wordOrPhraseMaterial = "gentlemen's";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("SKWR*EPL/AES");
    });

    it('show full word hints for a phrase ending with apostrophe and ess when there is no condensed stroke entry', () => {
      let wordOrPhraseMaterial = "optometrist's";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("OP/TOPL/TREUFT/AES");
    });

    it('show full word hints for a phrase containing two words ending with apostrophe and ess when there are no condensed stroke entries', () => {
      let wordOrPhraseMaterial = "podiatrist's optometrist's";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("POED/TREUFT/AES OP/TOPL/TREUFT/AES");
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

    it('with prefix that includes a hyphen and a word', () => {
      let wordOrPhraseMaterial = "re-cover";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("R*E/KOFR");
    });

    it('with prefix that includes a hyphen and a gibberish word', () => {
      let wordOrPhraseMaterial = "self-dckx";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("SEF/TK*/KR*/K*/KP*");
    });

    it('with prefix that is also a word that has trailing hyphen and a fake word', () => {
      let wordOrPhraseMaterial = "quasi-confuzzled";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("KWAS/KWREU/KR*/O*/TPH*/TP*/*U/STKPW*/STKPW*/HR*/*E/TK*");
    });

    it('with prefix that is not a word that has trailing hyphen and a word', () => {
      let wordOrPhraseMaterial = "gly-oxide";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("TKPWHRAOEU/KPAOEUD");
    });

    it('with prefix that is not a word that has trailing hyphen and a fake word', () => {
      let wordOrPhraseMaterial = "gly-confuzzled";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("TKPWHRAOEU/KR*/O*/TPH*/TP*/*U/STKPW*/STKPW*/HR*/*E/TK*");
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

    it('with "cross-petition"', () => {
      let wordOrPhraseMaterial = 'In your cross-petition';

      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("KPA/TPH KWROUR KR-PGS");
    });

    xit('with "cross-petition" and a comma', () => {
      let wordOrPhraseMaterial = 'In your cross-petition, you';

      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("KPA/TPH KWROUR KR-PGS KW-BG U");
    });
  });

  describe('returns outline string with standard affixes', () => {
    xit('showing "TRAFL/HREUPBG" for "travelling" given "/HREUPBG": "ling"', () => {
      let wordOrPhrase = "travelling";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;
      // let globalLookupDictionary = new Map([
      //   ["{^ling}", [["HREUPBG", "typey-type.json"]]],
      //   ["travel", [["TRAFL", "typey-type.json"]]],
      // ]);
      // let affixes = {
      //   suffixes: [
      //     ["/HREUPBG", "ling"],
      //   ]
      // };

      expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts)).toEqual( [ "TRAFL/HREUPBG", 1 ]);
    });
  });

  describe('returns outlines for words with apostrophes', () => {
    it('showing "OP/TOPL/TREUFT/AES" for "optometrist\'s"', () => {
      let wordOrPhrase = "optometrist's";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

      expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts)).toEqual( [ "OP/TOPL/TREUFT/AES", 1 ]);
    });
  });

  describe('returns outline string with custom affixes', () => {
    xit('showing "TRAFL/*LG" for "travelling" given "/*LG": "ling"', () => {
      let wordOrPhrase = "travelling";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;
      // let globalLookupDictionary = new Map([
      //   ["{^ling}", [["*LG", "dict-en-AU-vocab.json"]]],
      //   ["travel", [["TRAFL", "typey-type.json"]]],
      // ]);
      // let affixes = {
      //   suffixes: [
      //     ["/*LG", "ling"],
      //   ]
      // };

      expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts)).toEqual( [ "TRAFL/*LG", 1 ]);
    });
  });

  describe('returns outline string with words using orthography rules', () => {
    // it('showing outline for "nellies"', () => {
    //   let wordOrPhraseMaterial = "nellies";
    //   expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("TPHEL/KWREU/-S");
    // });

    it('with orthography rule to replace "e" with "ing"', () => {
      let wordOrPhrase = "narrating";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

      expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts)).toEqual( [ "TPHAR/AEUT/-G", 1 ]);
    });

    it('with orthography rule to find stroke after replacing "e" with "ing"', () => {
      let wordOrPhrase = "seething";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

      expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts)).toEqual( [ "SAO*ET/-G", 1 ]);
    });

    it('with a mistyped orthography rule to find stroke by appending "ing" to word otherwise ending in "e"', () => {
      let wordOrPhrase = "seetheing";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

      expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts)).toEqual( [ "SAO*ET/TK-LS/-G", 1 ]);
    });

    it('with orthography rule to replace "e" with "ing" where "eing" ending is also a word', () => {
      let wordOrPhrase = "binging";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

      expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts)).toEqual( [ "PWEUPBG/-G", 1 ]);
    });

    it('with orthography rule to append "eing" where replacing "e" with "ing" is also a word', () => {
      let wordOrPhrase = "bingeing";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

      expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts)).toEqual( [ "PWEUPB/-PBLG/TK-LS/-G", 1 ]);
    });

    it('with orthography rule to replace "e" with "ing"', () => {
      let wordOrPhrase = "lodging";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

      expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts)).toEqual( [ "HROPBLG/-G", 1 ]);
    });

    xit('with orthography rule to replace "e" with "ing" and append an "s" using multiple suffixes', () => {
      let wordOrPhrase = "lodgings";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

      expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts)).toEqual( [ "HROPBLG/-G/-S", 1 ]);
    });
  });


  describe('returns fingerspelling results for single letters except for single-letter words', () => {
    it('first third lowercase alphabet', () => {
      let wordOrPhraseMaterial = "a b c d e f g h i";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("AEU PW* KR* TK* *E TP* TKPW* H* *EU");
    });

    it('second third lowercase alphabet', () => {
      let wordOrPhraseMaterial = "j k l m n o p q r";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("SKWR* K* HR* PH* TPH* O* P* KW* R*");
    });

    it('final third lowercase alphabet', () => {
      let wordOrPhraseMaterial = "s t u v w x y z";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("S* T* *U SR* W* KP* KWR* STKPW*");
    });

    it('first third uppercase alphabet', () => {
      let wordOrPhraseMaterial = "A B C D E F G H I";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("KPA/AEU PW*P KR*P TK*P *EP TP*P TKPW*P H*P EU");
    });

    it('second third uppercase alphabet', () => {
      let wordOrPhraseMaterial = "J K L M N O P Q R";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("SKWR*P K*P HR*P PH*P TPH*P O*P P*P KW*P R*P");
    });

    it('final third uppercase alphabet', () => {
      let wordOrPhraseMaterial = "S T U V W X Y Z";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("S*P T*P *UP 5R W*P 10R KWR*P STKPW*P");
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

  describe('returns string containing top-level domain', () => {
    it('shows outline for ".com"', () => {
      let wordOrPhraseMaterial = ".com";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("KROPL");
    });

    xit('shows outline for "didoesdigital.com"', () => {
      let wordOrPhraseMaterial = "didoesdigital.com";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("TK*/*EU/TK*/O*/*E/S*/TK*/*EU/TKPW*/*EU/T*/A*/HR* KROPL");
    });
  });

  describe('returns outlines for capitalised word with trailing full stop', () => {
    it('shows outline for "Mass."', () => {
      let wordOrPhraseMaterial = "Mass.";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("KPA/PHAS TP-PL");
    });
  });

  describe('returns outline for string containing formal titles', () => {
    it('shows outline for "Dr."', () => {
      let wordOrPhraseMaterial = "Dr.";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("TKR-FPLT");
    });

    it('shows outline for "Dr. Chant"', () => {
      let wordOrPhraseMaterial = "Dr. Chant";
      // Note: It would be amazing if it didn't choose KPA/ here but that seems really hard
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("TKR-FPLT KPA/KHAPBT");
    });

    it('shows outline for "Mx."', () => {
      let wordOrPhraseMaterial = "Mx.";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("PH-BGS");
    });

    it('shows outline for "Mx. Eldridge"', () => {
      let wordOrPhraseMaterial = "Mx. Eldridge";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("PH-BGS EL/TKREUPBLG");
    });

    it('shows outline for "Mr. and Mrs."', () => {
      let wordOrPhraseMaterial = "Mr. and Mrs.";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("PHRARPLS");
    });

    xit('shows outline for "Mr. and Mrs. Long"', () => {
      let wordOrPhraseMaterial = "Mr. and Mrs. Long";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("PHRARPLS KPA/HROPBG");
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

    it('showing good stroke hint for known word and suffix with one hyphen', () => {
      let wordOrPhraseMaterial = "kettle-acre";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("KET/*L/A*EURBG");
    });

    it('showing good stroke hint for known word and suffix with two hyphens', () => {
      let wordOrPhraseMaterial = "kettle-in-law";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("KET/*L/*EUPB/HRAU");
    });

    it('showing good stroke hint for known word and prefix with one hyphen', () => {
      let wordOrPhraseMaterial = "ani-kettle";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("AEUPB/SKWREU/KET/*L");
    });

    it('showing good stroke hint for known word and prefix with two hyphens', () => {
      let wordOrPhraseMaterial = "over-the-kettle";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("AUFR/-T/KET/*L");
    });

    it('showing good stroke hint for known word and suffix containing a colon and numbers', () => {
      let wordOrPhraseMaterial = "kettle:10";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("KET/*L/10*BG");
    });

    xit('showing good stroke hint for gibberish word and suffix with one hyphen', () => {
      let wordOrPhraseMaterial = "dckx-acre";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("TK*/KR*/K*/KP*/A*EURBG");
    });

    xit('showing good stroke hint for gibberish word and suffix with two hyphens', () => {
      let wordOrPhraseMaterial = "dckx-in-law";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("TK*/KR*/K*/KP*/*EUPB/HRAU");
    });

    xit('showing good stroke hint for gibberish word and prefix with one hyphen', () => {
      let wordOrPhraseMaterial = "ani-dckx";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("AEUPB/SKWREU/TK*/KR*/K*/KP*");
    });

    xit('showing good stroke hint for gibberish word and prefix with two hyphens', () => {
      let wordOrPhraseMaterial = "over-the-dckx";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("AUFR/-T/TK*/KR*/K*/KP*");
    });

    xit('showing good stroke hint for gibberish word and suffix containing a colon and numbers', () => {
      let wordOrPhraseMaterial = "dckx:10";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("TK*/KR*/K*/KP*/10*BG");
    });

    it('showing good stroke hint for one lowercase word hash tag', () => {
      let wordOrPhraseMaterial = "#steno";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("HAERB STOEUPB");
    });

    xit('showing good stroke hint for one capitalised word hash tag', () => {
      let wordOrPhraseMaterial = "#Steno";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("HAERB KPA*/STOEUPB");
    });

    xit('showing good stroke hint for camel case hash tags', () => {
      let wordOrPhraseMaterial = "#StenoLife";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("HAERB KPA*/STOEUPB KPA*/HRAOEUF");
    });

    xit('showing good stroke hint for camel case hash tags in a sentence', () => {
      let wordOrPhraseMaterial = "This is #StenoLife";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("KPA*/TH S HAERB KPA*/STOEUPB KPA*/HRAOEUF");
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

    xit('with multiple suffixes', () => {
      let wordOrPhrase = "cuffings";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

      expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts)).toEqual( [ "KUF/-G/-S", 1 ]);
    });

    xit('with multi-syllable word with multiple suffixes', () => {
      let wordOrPhrase = "buffetings";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

      expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts)).toEqual( [ "PWUF/ET/-G/-S", 1 ]);
    });

    it('with WAPBGD/-S for wanderings', () => {
      let wordOrPhrase = "wanderings";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

      expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts)).toEqual( [ "WAPBGD/-S", 1 ]);
    });

    it('shows the outline for the word "as"', () => {
      let wordOrPhrase = "as";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;
      let globalLookupDictionaryForAs = new Map([
        ["as", [
          ["A/AZ", "typey:typey-type.json"],
          ["AS", "typey:typey-type.json"],
          ["ASZ", "typey:typey-type.json"],
          ["AZ", "typey:typey-type.json"],
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
          ["REFT", "typey:typey-type.json"],
          ["R*ES", "typey:typey-type.json"],
        ]],
        ["REST", [
          ["R*EFT", "typey:typey-type.json"],
        ]],
      ]);

      expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionaryForRest, chosenStroke, strokeLookupAttempts)).toEqual( [ "REFT", 1 ]);
    });

    it('shows the outline for the word "into"', () => {
      let wordOrPhrase = "into";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;
      let globalLookupDictionaryForInto = new Map([
        ["into", [
          ["TPHAO", "typey:typey-type.json"],
          ["SPWAO", "typey:typey-type.json"],
          ["EUPB/TO", "typey:typey-type.json"],
          ["TPHAO*", "typey:typey-type.json"],
          ["TPHRAO", "typey:typey-type.json"],
        ]],
      ]);

      expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionaryForInto, chosenStroke, strokeLookupAttempts)).toEqual( [ "TPHAO", 1 ]);
    });

    it('shows the outline for the word "get"', () => {
      let wordOrPhrase = "get";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;
      let globalLookupDictionaryForGet = new Map([
        ["get", [
          ["TKPW-T", "typey:typey-type.json"],
          ["TKPWET", "typey:top-10000-project-gutenberg-words.json"],
        ]],
      ]);

      expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionaryForGet, chosenStroke, strokeLookupAttempts)).toEqual( [ "TKPWET", 1 ]);
    });

    it('shows the outline for the word "a"', () => {
      let wordOrPhrase = "a";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

      expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts)).toEqual( [ "AEU", 1 ]);
    });

    it('shows the outline for the word "A"', () => {
      let wordOrPhrase = "A";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

      expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts)).toEqual( [ "KPA/AEU", 1 ]);
    });

    it('shows the outline for the word "i"', () => {
      let wordOrPhrase = "i";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

      expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts)).toEqual( [ "*EU", 1 ]);
    });

    it('shows the outline for the word "I"', () => {
      let wordOrPhrase = "I";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

      expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts)).toEqual( [ "EU", 1 ]);
    });

    it('shows the outline for the word "trust"', () => {
      let wordOrPhrase = "trust";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;
      let globalLookupDictionaryForSituation = new Map([
        ["trust", [
          ["TRUFT", "typey:typey-type.json"],
          ["TRUFT", "typey:top-10000-project-gutenberg-words.json"],
          ["TR*US", "plover:plover.json"],
          ["TRUF", "plover:plover.json"],
        ]],
        ["Trust", [
          ["TR*UFT", "plover:plover.json"],
        ]],
      ]);

      expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionaryForSituation, chosenStroke, strokeLookupAttempts)).toEqual( [ "TRUFT", 1 ]);
    });


    // TODO:
    // This one currently shows "PHAEUD/EPB" instead of "PHAEUD/*EPB" because "PHAEUD/*EPB" is
    // penalised 3 times: once for being "longer", once for having a star, once for having a slash,
    // while "PHAEUD/EPB" is penalised only for having a slash without being a suffix.
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
        ["lovers", [["HROFRS", "typey:typey-type.json"], ["HRUFRS", "typey:typey-type.json"]]],
      ]);

      expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionaryWithHROFRSfirst, chosenStroke, strokeLookupAttempts)).toEqual( [ "HROFRS", 1 ]);
    });

    it('returns outline for lovers, preferring U', () => {
      let wordOrPhrase = "lovers";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;
      let globalLookupDictionaryWithHRUFRSfirst = new Map([
        ["lovers", [["HRUFRS", "typey:typey-type.json"], ["HROFRS", "typey:typey-type.json"]]],
      ]);

      expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionaryWithHRUFRSfirst, chosenStroke, strokeLookupAttempts)).toEqual( [ "HRUFRS", 1 ]);
    });
  });
});

describe('generate dictionary entries', () => {
  it('returns array of phrases and strokes for words', () => {
    let wordList = ['a', 'A', 'i', 'I', ' ', '?', 'address', 'tom', 'Heather', 'TUESDAY', 'FIRST', '3D', 'bed,', 'man,', 'man!', 'man?', "'bed'", "'address'", "'Sinatra'", "'sinatra'", "'confuzzled'", 'and! and', 'andx and', 'andx andx and', 'and ', ' and', ' and ', 'and again', 'and man!', 'and man?', 'and again!', '!', '!!', '!man', '! man', 'media query', 'push origin master', 'diff -- cached', 'bed, man, and address' ];
    // let wordList = [' ', '?', 'tom', 'Heather', 'TUESDAY', 'FIRST', 'bed,', 'man!', 'man?', "'sinatra'", 'and ', 'and again', 'and man!', 'and man?', 'and again!', '!', '!!', '!man', '! man', 'media query', 'push origin master', 'diff --cached', 'diff -- cached', '<title>Learn!</title>' ];

    let globalLookupDictionaryForMatchingCapitalisationAndPunctuation = new Map([
      ["a", [["AEU", "typey:typey-type.json"]]],
      ["I", [["EU", "typey:typey-type.json"]]],
      ["{^ ^}", [["S-P", "typey:typey-type.json"]]],
      ["{?}", [["H-F", "typey:typey-type.json"]]],
      ["{,}", [["KW-BG", "typey:typey-type.json"]]],
      ["Tom", [["TOPL", "typey:typey-type.json"]]],
      ["heather", [["H*ET/*ER", "typey:typey-type.json"]]],
      ["Tuesday", [["TAOUZ", "typey:typey-type.json"]]],
      ["first", [["TPEUFRT", "typey:typey-type.json"]]],
      ["3D", [["30*EUD", "typey:typey-type.json"]]],
      ["address", [["A/TKRES", "typey:typey-type.json"]]],
      ["bed", [["PWED", "typey:typey-type.json"]]],
      ["bed,", [["PWED KW-BG", "typey:typey-type.json"]]],
      ["man", [["PHAPB", "typey:typey-type.json"]]],
      ["{!}", [["SKHRAPL", "typey:typey-type.json"]]],
      ["and again", [["STKPWEPBG", "typey:typey-type.json"]]],
      ["and", [["SKP", "typey:typey-type.json"], ["APBD", "plover:plover.json"]]],
      ["again", [["TKPWEPB", "typey:typey-type.json"]]],
      ["media", [["PHO*EUD", "typey:typey-type.json"]]],
      ["query", [["KWAOER/REU", "typey:typey-type.json"]]],
      ["Sinatra", [["STPHAT/RA", "typey:typey-type.json"]]],
      ["{^'}", [["AE", "typey:typey-type.json"]]],
      ["push", [["PURB", "typey:typey-type.json"]]],
      ["origin", [["O*RPBLG", "typey:typey-type.json"]]],
      ["master", [["PHAFRT", "typey:typey-type.json"]]],
      ["diff", [["TKEUF", "typey:typey-type.json"]]],
      ["{--}", [["TK*RB", "typey:typey-type.json"]]],
      ["cached", [["KAERBD", "typey:typey-type.json"]]],
      ["{^>^}", [["A*EPBG", "typey:typey-type.json"]]],
      ["{^<^}", [["AEPBG", "typey:typey-type.json"]]],
      ["{^/^}", [["OEU", "typey:typey-type.json"]]],
      ["title", [["TAOEULT", "typey:typey-type.json"]]],
      ["learn", [["HRERPB", "typey:typey-type.json"]]]
    ]);

    expect(generateListOfWordsAndStrokes(wordList, globalLookupDictionaryForMatchingCapitalisationAndPunctuation)).toEqual(
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
    // expect(generateListOfWordsAndStrokes(wordList, globalLookupDictionaryForMatchingCapitalisationAndPunctuation)).toEqual(
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
        ["TKPWEUT/HUB", "typey:code.json"],
        ["TKPWEUT/HUB", "typey:typey-type.json"]
      ];

      expect(rankOutlines(arrayOfStrokesAndTheirSourceDictNames, "GitHub", sharedAffixes)).toEqual([
        ["TKPWEUT/HUB", "typey:code.json"],
        ["TKPWEUT/HUB", "typey:typey-type.json"]
      ]);
    });
  });

  describe('with duplicate outlines across dictionaries', () => {
    it('returns unsorted list of outlines for "GitHub", preserving dictionary order', () => {
      let arrayOfStrokesAndTheirSourceDictNames = [
        ["TKPWEUT/HUB", "typey:typey-type.json"],
        ["TKPWEUT/HUB", "typey:code.json"],
      ];

      expect(rankOutlines(arrayOfStrokesAndTheirSourceDictNames, "GitHub", sharedAffixes)).toEqual([
        ["TKPWEUT/HUB", "typey:typey-type.json"],
        ["TKPWEUT/HUB", "typey:code.json"]
      ]);
    });
  });

  describe('with different outlines across dictionaries', () => {
    it('returns shortest stroke', () => {
      let arrayOfStrokesAndTheirSourceDictNames = [
        ["TKPWEUT/HUB", "typey:typey-type.json"],
        ["TKWEUT/HUB", "typey:code.json"],
      ];

      expect(rankOutlines(arrayOfStrokesAndTheirSourceDictNames, "GitHub", sharedAffixes)).toEqual([
        ["TKWEUT/HUB", "typey:code.json"],
        ["TKPWEUT/HUB", "typey:typey-type.json"]
      ]);
    });
  });

  describe('with different outlines across dictionaries', () => {
    it('returns sorted list of outlines for "exercises", prioritising S endings over Z, already in order', () => {
      let arrayOfStrokesAndTheirSourceDictNames = [
        ["KPER/SAOEUZ/-Z", "plover:plover.json"],
        ["KPERZ/-T", "typey:briefs.json"],
        ["KPERZ/-S", "typey:briefs.json"],
        ["KPERZ/-Z", "typey:briefs.json"],
        ["ERBGS/SAOEUSZ", "plover:plover.json"],
        ["KPERSZ", "typey:typey-type.json"],
      ];

      expect(rankOutlines(arrayOfStrokesAndTheirSourceDictNames, "exercises", sharedAffixes)).toEqual([
        ["KPERSZ", "typey:typey-type.json"],
        ["KPERZ/-T", "typey:briefs.json"],
        ["KPERZ/-S", "typey:briefs.json"],
        ["KPERZ/-Z", "typey:briefs.json"],
        ["ERBGS/SAOEUSZ", "plover:plover.json"],
        ["KPER/SAOEUZ/-Z", "plover:plover.json"]
      ]);
    });

    it('returns sorted list of outlines for "exercises", prioritising S endings over Z, not in order', () => {
      let arrayOfStrokesAndTheirSourceDictNames = [
        ["KPER/SAOEUZ/-Z", "plover:plover.json"],
        ["KPERZ/-T", "typey:briefs.json"],
        ["KPERZ/-Z", "typey:briefs.json"],
        ["KPERZ/-S", "typey:briefs.json"],
        ["ERBGS/SAOEUSZ", "plover:plover.json"],
        ["KPERSZ", "typey:typey-type.json"],
      ];

      expect(rankOutlines(arrayOfStrokesAndTheirSourceDictNames, "exercises", sharedAffixes)).toEqual([
        ["KPERSZ", "typey:typey-type.json"],
        ["KPERZ/-T", "typey:briefs.json"],
        ["KPERZ/-S", "typey:briefs.json"],
        ["KPERZ/-Z", "typey:briefs.json"],
        ["ERBGS/SAOEUSZ", "plover:plover.json"],
        ["KPER/SAOEUZ/-Z", "plover:plover.json"]
      ]);
    });

    // Note: this test will fail with node v10
    it('returns sorted list of outlines for "exercises", prioritising S endings over Z, not in order, with more than 10 elements', () => {
      let arrayOfStrokesAndTheirSourceDictNames = [
        ["KPER/SAOEUZ/-Z", "plover:plover.json"],
        ["KPERZ/-T", "typey:briefs.json"],
        ["KPERZ/-Z", "typey:briefs.json"],
        ["KPERZ/-Z", "typey:briefs.json"],
        ["KPERZ/-Z", "typey:briefs.json"],
        ["KPERZ/-Z", "typey:briefs.json"],
        ["KPERZ/-Z", "typey:briefs.json"],
        ["KPERZ/-Z", "typey:briefs.json"],
        ["KPERZ/-S", "typey:briefs.json"],
        ["ERBGS/SAOEUSZ", "plover:plover.json"],
        ["KPERSZ", "typey:typey-type.json"],
      ];

      expect(rankOutlines(arrayOfStrokesAndTheirSourceDictNames, "exercises", sharedAffixes)).toEqual([
        ["KPERSZ", "typey:typey-type.json"],
        ["KPERZ/-T", "typey:briefs.json"],
        ["KPERZ/-S", "typey:briefs.json"],
        ["KPERZ/-Z", "typey:briefs.json"],
        ["KPERZ/-Z", "typey:briefs.json"],
        ["KPERZ/-Z", "typey:briefs.json"],
        ["KPERZ/-Z", "typey:briefs.json"],
        ["KPERZ/-Z", "typey:briefs.json"],
        ["KPERZ/-Z", "typey:briefs.json"],
        ["ERBGS/SAOEUSZ", "plover:plover.json"],
        ["KPER/SAOEUZ/-Z", "plover:plover.json"]
      ]);
    });

    it('returns sorted list of outlines for "slept", prioritising T endings over D, already in order', () => {
      let arrayOfStrokesAndTheirSourceDictNames = [
        ["SHREPT", "plover:plover.json"],
        ["SHREPD", "plover:plover.json"],
        ["SHREPT", "plover:plover.json"],
      ];

      expect(rankOutlines(arrayOfStrokesAndTheirSourceDictNames, "slept", sharedAffixes)).toEqual([
        ["SHREPT", "plover:plover.json"],
        ["SHREPT", "plover:plover.json"],
        ["SHREPD", "plover:plover.json"]
      ]);
    });

    it('returns sorted list of outlines for "intermediate", prioritising T endings over D, not in order', () => {
      let arrayOfStrokesAndTheirSourceDictNames = [
        ["EUPBT/PHAOED", "plover:plover.json"],
        ["EUPBT/PHAOET", "plover:plover.json"]
      ];

      expect(rankOutlines(arrayOfStrokesAndTheirSourceDictNames, "intermediate", sharedAffixes)).toEqual([
        ["EUPBT/PHAOET", "plover:plover.json"],
        ["EUPBT/PHAOED", "plover:plover.json"]
      ]);
    });

    it('returns sorted list of outlines for "credit card", prioritising T endings over D, except when the word ends in "d"', () => {
      let arrayOfStrokesAndTheirSourceDictNames = [
        ["KRED/EUT/KART", "plover:plover.json"],
        ["KRED/EUT/KARD", "plover:plover.json"]
      ];

      expect(rankOutlines(arrayOfStrokesAndTheirSourceDictNames, "credit card", sharedAffixes)).toEqual([
        ["KRED/EUT/KARD", "plover:plover.json"],
        ["KRED/EUT/KART", "plover:plover.json"]
      ]);
    });
  });
// T-FPB: plover.json
// TEFL: plover.json

  describe('with outlines with and without dashes', () => {
    it('returns sorted list of outlines for "test", including dashes', () => {
      let arrayOfStrokesAndTheirSourceDictNames = [
        ["T-FPB", "plover:plover.json"],
        ["TEFL", "plover:plover.json"],
      ];

      expect(rankOutlines(arrayOfStrokesAndTheirSourceDictNames, "test", sharedAffixes)).toEqual([
        ["TEFL", "plover:plover.json"],
        ["T-FPB", "plover:plover.json"]
      ]);
    });
  });

  describe('with outlines with and without stars', () => {
    it('returns sorted list of outlines for "test", penalising stars', () => {
      let arrayOfStrokesAndTheirSourceDictNames = [
        ["T*EFT", "user.json"],
        ["TAEFT", "user.json"],
      ];

      expect(rankOutlines(arrayOfStrokesAndTheirSourceDictNames, "test", sharedAffixes)).toEqual([
        ["TAEFT", "user.json"],
        ["T*EFT", "user.json"]
      ]);
    });

    it('returns sorted list of outlines for "test", penalising stars', () => {
      let arrayOfStrokesAndTheirSourceDictNames = [
        ["T*EFT/T*EFT", "user.json"],
        ["TAEFT/TAEFTS", "user.json"],
      ];

      expect(rankOutlines(arrayOfStrokesAndTheirSourceDictNames, "test", sharedAffixes)).toEqual([
        ["TAEFT/TAEFTS", "user.json"],
        ["T*EFT/T*EFT", "user.json"],
      ]);
    });

    it('returns sorted list of outlines for "test", penalising stars', () => {
      let arrayOfStrokesAndTheirSourceDictNames = [
        ["T*EFT/T*EFT", "user.json"],
        ["TAEFTS/TAEFTS", "user.json"],
      ];

      expect(rankOutlines(arrayOfStrokesAndTheirSourceDictNames, "test", sharedAffixes)).toEqual([
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

      expect(rankOutlines(arrayOfStrokesAndTheirSourceDictNames, "grasshopper", sharedAffixes)).toEqual([
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

      expect(rankOutlines(arrayOfStrokesAndTheirSourceDictNames, "upstarted", sharedAffixes)).toEqual([
        ["AUP/STARTD", "user.json"],
        ["UP/STARTD", "user.json"],
        ["AUP/START/-D", "user.json"],
        ["UP/START/-D", "user.json"],
        ["AUP/START/*D", "user.json"],
      ]);
    });
  });

  describe('with gutenberg entries', () => {
    it('returns sorted list of outlines for "get" where the gutenberg entry comes first', () => {
      let arrayOfStrokesAndTheirSourceDictNames = [
        // ["TKWET", "misstrokes.json"],
        // ["TPWET", "misstrokes.json"],
        // ["TKPWHET", "misstrokes.json"],
        // ["TKPWETD", "misstrokes.json"],
        ["TKPWET", "typey:top-10000-project-gutenberg-words.json"],
        ["TKPW-T", "typey:typey-type.json"],
        // ["TKPWELT", "misstrokes.json"],
        // ["TKPET", "misstrokes.json"],
      ];

      expect(rankOutlines(arrayOfStrokesAndTheirSourceDictNames, "upstarted", sharedAffixes)).toEqual([
        ["TKPWET", "typey:top-10000-project-gutenberg-words.json"],
        ["TKPW-T", "typey:typey-type.json"],
        // ["TKWET", "misstrokes.json"],
        // ["TPWET", "misstrokes.json"],
        // ["TKPET", "misstrokes.json"],
        // ["TKPWETD", "misstrokes.json"],
        // ["TKPWHET", "misstrokes.json"],
        // ["TKPWELT", "misstrokes.json"],
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

  //     expect(rankOutlines(arrayOfStrokesAndTheirSourceDictNames, "upholstery", sharedAffixes)).toEqual([
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

  //     expect(rankOutlines(arrayOfStrokesAndTheirSourceDictNames, "upholstery", sharedAffixes)).toEqual([
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

