// Some prefix and suffix entries are commented out because they are alternative strokes for prefix/suffix translations and the preferred stroke already exists.
// Keeping entries uncommented out improves the chances of finding a valid dictionary entry. To ensure "preferred" strokes are used where possible, sort the arrays.
const PREFIXES = [
  ["*EBGS/TRA/", "extra"],
  ["*EFR/", "every"],
  ["*ERBGS/", "extra"],
  ["*ERT/RO/", "erythro"],
  ["*ERTD/RO/", "erythro"],
  ["*EUG/", "Ig"],
  ["*EUL/KWRO/", "ileo"],
  ["*EUPBG/TKO/", "incudo"],
  ["*EUPL/", "im"],
  ["*FR/", "ever"],
  ["-T/TPHAEUS/KWRO/", "of the naso"],
  ["A/", "a"],
  ["A*ED/", "ad"],
  ["A*EPBT/", "ante"],
  ["A*ER/", "aero"],
  ["A*EUPBT/", "anti"],
  ["A*EUPBT/H-PB/", "anti-"],
  ["A*F/", "after"],
  ["A*LG/*L/", "alkyl"],
  ["A*PBT/RA/", "anthra"],
  ["A*PBT/RO/", "anthro"],
  ["A*RT/RO/", "arthro"],
  ["A*T/RO/", "athero"],
  ["A*T/ROE/", "athero"],
  ["A*UT/", "auto"],
  ["A/PHAOEB/", "ameb"],
  ["A/PHEUG/TKA/HRO/", "amygdalo"],
  ["A/PHO*EUPB/", "amino"],
  ["A/PO/", "apo"],
  ["A/SAOET/*L/", "acetyl"],
  ["A/SAOET/KWRO/", "aceto"],
  ["A/THAOER/SKWRO/", "athero"],
  ["A/TKAOEPB/SKWRO/", "adeno"],
  ["A/TKRAOEPB/SKWRO/", "adreno"],
  ["A/TPHA/", "ana"],
  ["A/TPHAFL/", "anaphylo"],
  ["AB/", "ab"],
  ["ABG/RO/", "acro"],
  ["ABG/RO/PHEU/KWRO/", "acromio"],
  ["ABGS/KWRO/", "axio"],
  ["ABGS/SKWRO/", "axo"],
  ["AD/PO/", "adipo"],
  ["AEPBT/", "ante"],
  ["AEPL/", "ambi"],
  ["AEU/HREUPBG/WO/", "a linguo"],
  ["AEU/KOS/", "eicosa"],
  ["AEU/KPAOEPB/KWRO/", "a xeno"],
  ["AEUR/KWRE/", "arye"],
  ["AFR/", "after"],
  ["AL/HRO/", "allo"],
  ["AO*EP/", "epi"],
  ["AO*UPB/", "uni"],
  ["AOE/", "e"],
  ["AOE/HREBG/TRO/", "electro"],
  ["AOE/HREUPT/KWRO/", "elipto"],
  ["AOE/PHET/SKWRO/", "emeto"],
  ["AOEBG/SKWRO/", "eco"],
  ["AOET/KWRO/", "etio"],
  ["AOET/KWROE/", "etio"],
  ["AOEUD/SKWRO/", "iodo"],
  ["AOEUS/KWRO/", "iso"],
  ["AOEUS/SKWRO/", "iso"],
  ["AOU/TREUBG/HRO/", "utriculo"],
  ["AOUB/*ER/", "uber"],
  ["AOUF/KWROE/", "uveo"],
  ["AOUPB/", "uni"],
  ["AOUPB/SKWREU/", "uni"],
  ["AOUT/", "out"],
  ["AOUT/RO/", "utero"],
  ["AP/KWRO/", "apo"],
  ["APB/AF/HRO/", "anaphylo"],
  ["APB/APBT/RO/", "an antero"],
  ["APB/SKWRA/", "ana"],
  ["APB/TE/", "ante"],
  ["APB/TER/KWRO/", "antero"],
  ["APB/THRA/", "anthra"],
  ["APB/THRO/PO/", "anthropo"],
  ["APBG/KWRO/", "angio"],
  ["APBG/KWROE/", "angio"],
  ["APBG/SKWRO/", "angio"],
  ["APBGS/KWRO/", "anxio"],
  ["APBT/RO/", "antero"],
  ["APBT/SKWR*E/", "ante"],
  ["APBT/SKWRE/", "ante"],
  ["APL/HRO/", "amelo"],
  ["AR/KWREU/", "ary"],
  ["AR/TAOER/KWRO/", "arterio"],
  ["AR/TAOER/KWROE/", "arterio"],
  ["AR/TAOER/SKWRO/", "arterio"],
  ["ARBG/KWROE/", "archeo"],
  ["ARPBD/SKWRO/", "andro"],
  ["ART/RO/", "arterio"],
  ["AS/TPHAOE/TOE/", "acineto"],
  ["AUF/", "off"],
  ["AUFR/", "over"],
  ["AUFT/RO/", "Austro"],
  ["AUP/", "up"],
  ["AUPB/", "on"],
  ["AUR/", "or"],
  ["AUR/EUBG/HRO/", "auriculo"],
  ["AURBG/HRO/", "auriculo"],
  ["EBG/KWRO/", "echo"],
  ["EBGS/AOEUT/SKWRO/", "excito"],
  ["EBGS/AOEUT/SKWRO*/", "excito"],
  ["EBGS/OE/", "exo"],
  ["EBGS/SKWRO/", "exo"],
  ["EBGT/SKWRO/", "ecto"],
  ["EP/", "epi"],
  ["EP/SKWREU/", "epi"],
  ["EPB/", "en"],
  ["EPB/SEF/HRO/", "encephalo"],
  ["EPB/SEFL/", "encephalo"],
  ["EPB/SEFL/HRO/", "encephalo"],
  ["EPB/TER/SKWRO/", "entero"],
  ["EPB/TKO/", "endo"],
  ["EPBD/SKWRO/", "endo"],
  ["EPBT/*ER/SKWRO/", "entero"],
  ["EPBT/RO/", "entero"],
  ["EPBT/SKWRO/", "ento"],
  ["EPL/", "em"],
  ["ER/", "er"],
  ["ERBGS/", "extra"],
  ["EUD/KWRO/", "idio"],
  ["EUD/KWROE/", "idio"],
  ["EUD/SKWRO/", "ideo"],
  ["EUFBG/KWRO/", "ischio"],
  ["EUFRPB/", "infra"],
  ["EUL/KWRO/", "ilio"],
  ["EUL/KWRO*E/", "ileo"],
  ["EUL/KWROE/", "ilio"],
  ["EUPB/", "in"],
  ["EUPB/PHAOUPB/SKWRO/", "immuno"],
  ["EUPB/PHAOUPB/TPHOE/", "immuno"],
  ["EUPB/TPRA/", "infra"],
  ["EUPB/TRA/", "intra"],
  ["EUPBS/HRO/", "insulo"],
  ["EUPBT/", "inter"],
  ["EUPL/", "im"],
  ["EUPL/PHAOUPB/KWRO/", "immuno"],
  ["EUPL/PHAOUPB/SKWRO/", "immuno"],
  ["EUPL/PHAOUPB/TPHO/", "immuno"],
  ["EUR/", "ir"],
  ["EURD/SKWRO/", "irido"],
  ["EURPBT/", "intro"],
  ["H*ERT/", "hetero"],
  ["HA*EPL/", "hemi"],
  ["HA*EPT/", "hepato"],
  ["HAEPT/SKWRO/", "hepato"],
  ["HAO*EUP/", "hypo"],
  ["HAO*EURD/", "hydro"],
  ["HAO*RD/", "hydro"],
  ["HAOEL/KWRO/", "helio"],
  ["HAOEPL/", "hemo"],
  ["HAOEPL/KWRA/", "hemia"],
  ["HAOEPL/SKWRO/", "hemo"],
  ["HAOEPLT/SKWRO/", "hemato"],
  ["HAOEPLT/TO/", "hemato"],
  ["HAOEU/POE/", "hypo"],
  ["HAOEU/SKWRO/", "hyo"],
  ["HAOEU/TKROBGS/KWREU/", "hydroxy"],
  ["HAOEU/TKROE/", "hydro"],
  ["HAOEUB/SKWRO/", "ribo"],
  ["HAOEUBG/SKWRO/", "myco"],
  ["HAOEUD/RO/", "hydro"],
  ["HAOEUD/ROBGS/KWREU/", "hydroxy"],
  ["HAOEUD/TKROE/", "hydro"],
  ["HAOEUG/ROE/", "hygro"],
  ["HAOEUP/KWRO/", "hypo"],
  ["HAOEUP/O*/", "hypo"],
  ["HAOEUP/OE/", "hypo"],
  ["HAOEUP/SKWRO/", "hypo"],
  ["HAOEURD/", "hydro"],
  ["HAOEURD/OBGS/KWREU/", "hydroxy"],
  ["HAOEURD/OBGS/SKWREU/", "hydroxy"],
  ["HAOEURD/RA/", "hydra"],
  ["HAOEURD/SKWRO/", "hydro"],
  ["HAOEURP/", "hyper"],
  ["HAPT/SKWRO/", "hapto"],
  ["HE/PA/TO/", "hepato"],
  ["HEL/KWREU/", "heli"],
  ["HEP/A*T/SKWRO/", "hepato"],
  ["HEPL/KWREU/", "hemi"],
  ["HEPL/SKWREU/", "hemi"],
  ["HEPT/", "hepato"],
  ["HEPT/KWRO/", "hepato"],
  ["HEPT/SKWRO/", "hepato"],
  ["HERT/", "hetero"],
  ["HET/RO/", "hetero"],
  ["HET/ROE/", "hetero"],
  ["HEUFT/RO/", "hystero"],
  ["HEUFT/SKWRO/", "histo"],
  ["HEUP/TPHO/", "hypno"],
  ["HO*EUP/", "hypo"],
  ["HO*EUPL/", "hemi"],
  ["HO*EUPT/", "hepato"],
  ["HO/HRO/", "holo"],
  ["HO/PHO/", "homo"],
  ["HOE/PHOE/", "homo"],
  ["HOEPL/KWROE/", "homeo"],
  ["HOEUP/", "hypo"],
  ["HOEURD/", "hydro"],
  ["HR*EUFPL/SKWRO/", "lympho"],
  ["HR*EUP/", "lipo"],
  ["HRA/PHEL/HRO/", "lamello"],
  ["HRABGT/SKWRO/", "lacto"],
  ["HRAEURPBG/KWRO/", "laryngo"],
  ["HRAEURPBG/SKWRO/", "laryngo"],
  ["HRAOUBG/SKWRO/", "leuko"],
  ["HREBG/SKWRO/", "electro"],
  ["HREBG/TRO/", "electro"],
  ["HREPT/KWRO/", "lepto"],
  ["HREPT/SKWRO/", "lepto"],
  ["HRERBGT/", "electro"],
  ["HRERBGT/SKWRO/", "electro"],
  ["HRES/EPB/", "lessen"],
  ["HREUP/SKWRO/", "lipo"],
  ["HREUPBG/WO/", "linguo"],
  ["HRO*BGS/", "hydroxy"],
  ["HRO*EUFPL/", "lympho"],
  ["HRO*EUFPL/SKWRO/", "lympho"],
  ["HRO*EUP/", "lipo"],
  ["HRUPL/PWO/", "lumbo"],
  ["HRUPL/PWRO/", "lumbo"],
  ["K*EUL/", "kilo"],
  ["KA/", "ka"],
  ["KA*LG/TPHAEU/KWROE/", "calcaneo"],
  ["KA*LG/TPHO*EU/", "calcaneo"],
  ["KAEUR/KWRO/", "karyo"],
  ["KAEUR/KWROE/", "karyo"],
  ["KAL/KAPB/KWRO/", "calcaneo"],
  ["KAL/KAPB/KWROE/", "calcaneo"],
  ["KAL/SEU/", "calci"],
  ["KAOEPL/", "chemo"],
  ["KAOEUL/SKWRO/", "chylo"],
  ["KAOUPB/KWRO/", "cuneo"],
  ["KAPS/HRO/", "capsulo"],
  ["KARB/A/PHO*EUPB/", "carbamino"],
  ["KARD/KWRO/", "cardio"],
  ["KAUPB/", "con"],
  ["KAURPBT/", "contra"],
  ["KER/TO/", "kerato"],
  ["KERT/KWRO/", "kerato"],
  ["KERT/SKWRO/", "kerato"],
  ["KET/KWRO/", "keto"],
  ["KHAO*EPL/", "chemo"],
  ["KHAOEPL/", "chemo"],
  ["KHAOEPL/KWRO/", "chemo"],
  ["KHAOEPL/SKWRO/", "chemo"],
  ["KHAOEU/HRO/", "chylo"],
  ["KHAOEUL/KWRO/", "chylo"],
  ["KHAOEUL/SKWRO/", "chylo"],
  ["KHAOEUPL/KWRO/", "chymo"],
  ["KHAOEUPL/SKWRO/", "chymo"],
  ["KHAOEUR/SKWRO/", "chiro"],
  ["KHEPL/SKWRO/", "chemo"],
  ["KHO*EUPL/", "chemo"],
  ["KHOL/KREUFT/", "cholecyst"],
  ["KHOPBD/RO/", "chondro"],
  ["KHOR/KWROE/", "choreo"],
  ["KHORPBD/", "chondro"],
  ["KHR*EURT/RO/", "clarithro"],
  ["KHRAEUD/KWRO/", "cleido"],
  ["KHRAOED/KWRO/", "cleido"],
  ["KHREFT/RO/", "cholestero"],
  ["KHRO*R/SKWRO/", "chloro"],
  ["KHROR/SKWRO/", "chloro"],
  ["KOBG/SKWRO/", "cocco"],
  ["KOEL/KWROE/", "choleo"],
  ["KOEL/SKWRO/", "colo"],
  ["KOEPL/A/", "comba"],
  ["KOEURD/", "cardio"],
  ["KOL/SKWRO/", "colo"],
  ["KOPB/SKWRO/", "cono"],
  ["KOPB/TKRO/", "chondro"],
  ["KOPBD/RO/", "chondro"],
  ["KORPB/KWRO/", "corneo"],
  ["KORPB/SKWRE/", "coryne"],
  ["KORPBT/", "contra"],
  ["KORT/KO/", "cortico"],
  ["KORT/KOE/", "cortico"],
  ["KOUFRPBT/", "counter"],
  ["KOURPBT/", "counter"],
  ["KPAOE/TPHO/", "xeno"],
  ["KPAOE/TPHOE/", "xeno"],
  ["KPAOEPB/SKWRO/", "xeno"],
  ["KPAOEUL/SKWRO/", "xylo"],
  ["KPAOEUT/KWRO/", "excito"],
  ["KPAOEUT/SKWRO/", "excito"],
  ["KPWHROES/", "meso"],
  ["KPWHROS/SO/", "glosso"],
  ["KR*EF/", "cef"],
  ["KRAEUPB/KWRO/", "cranio"],
  ["KRAEUPB/KWROE/", "cranio"],
  ["KRAEUPB/SKWRO/", "cranio"],
  ["KRAO*EUT/KWRO/", "cyto"],
  ["KRAO*EUT/SKWRO/", "cyto"],
  ["KRAOEU/KWROE/", "cryo"],
  ["KRAOEU/SKWRO/", "cryo"],
  ["KRAOEUT/KWRO/", "cyto"],
  ["KRAOEUT/SKWRO/", "cyto"],
  ["KRAPB/", "cran"],
  ["KREF/", "cef"],
  ["KREUBG/KWRO/", "crico"],
  ["KREUBG/SKWRO/", "crico"],
  ["KREUFT/KWRO/", "cysto"],
  ["KREUFT/SKWRO/", "cysto"],
  ["KREUPT/SKWRO/", "crypto"],
  ["KRO*EUT/", "cyto"],
  ["KRO/PHO/", "chromo"],
  ["KROEUT/", "cyto"],
  ["KWAD/REU/", "quadri"],
  ["KWARD/", "quadri"],
  ["KWR*EU/", "i"],
  ["KWRAO*E/", "e"],
  ["KWRAT/RO/", "iatro"],
  ["KWRES/TER/", "yester"],
  ["KWREUBG/KWRO/", "syringo"],
  ["KWROEPBD/", "endo"],
  ["KWROUPB/", "down"],
  ["O*EUBGS/", "extra"],
  ["O*EUPBD/", "endo"],
  ["O*EUPBG/SKWRO/", "onycho"],
  ["O*EUR/", "uro"],
  ["O*EURBGS/", "extra"],
  ["O*EURT/", "erythro"],
  ["O*EUT/", "auto"],
  ["O*PBG/", "onco"],
  ["O*PBG/HRO/", "onycho"],
  ["O*PBG/SKWRO/", "onco"],
  ["O*RT/", "ortho"],
  ["O*RT/SKWRO/", "ortho"],
  ["OBG/HRO/", "oculo"],
  ["OBG/SKWRU/", "Ocu"],
  ["OBGS/HRO/", "oxalo"],
  ["OBGS/KWREU/", "oxy"],
  ["OBGS/KWREU/TKO/", "oxido"],
  ["OE/HREU/TKPWO/", "oligo"],
  ["OE/TKOPBT/SKWRO/", "odonto"],
  ["OEL/SRO/", "olivo"],
  ["OEL/TKPWO/", "oligo"],
  ["OEL/TKPWOE/", "oligo"],
  ["OEP/KWROE/", "opio"],
  ["OERBGS/SKWR-RBGS/", "oh"],
  ["OET/KWRO/", "oto"],
  ["OEUPBG/SKWRO/", "onycho"],
  ["OEUR/", "uro"],
  ["OFPL/HRO/", "omphalo"],
  ["OFT/KWRO/", "osteo"],
  ["OFT/KWROE/", "osteo"],
  ["OFT/SKWRO/", "osteo"],
  ["OP/THAL/PHO/", "ophthalmo"],
  ["OPB/*EUBG/", "onycho"],
  ["OPB/KWREU/KO/", "onycho"],
  ["OPBG/SKWRO*/", "onco"],
  ["OPL/TPHEU/", "omni"],
  ["OR/SKWRO/", "oro"],
  ["ORT/SKWRO/", "ortho"],
  ["OS/PHO/", "osmo"],
  ["OS/TAOE/KWROE/", "osteo"],
  ["OT/KWRO/", "oto"],
  ["OT/SKWRO/", "oto"],
  ["P*ER/", "peri"],
  ["PA*R/", "para"],
  ["PA*T/SKWRO/", "patho"],
  ["PABG/KWREU/", "pachy"],
  ["PABG/SKWREU/", "pachy"],
  ["PAEUL/KWRO/", "paleo"],
  ["PAEUL/KWROE/", "paleo"],
  ["PAL/TO/", "palato"],
  ["PAOEU/HRO/", "pyelo"],
  ["PAOEU/KWRO/", "pyo"],
  ["PAOEUL/KWRO/", "pyelo"],
  ["PAOEUL/SKPWRO/", "pyelo"],
  ["PAOEUL/SKWRO/", "pyelo"],
  ["PAOEUR/KWRO/", "pyro"],
  ["PAOEUR/SKWRO/", "pyro"],
  ["PAOUB/KWRO/", "pubo"],
  ["PAOUB/SKWRO/", "pubo"],
  ["PE/TKEUBG/HRO/", "pediculi"],
  ["PEBG/TAOR/KWROE/", "bacterio"],
  ["PEPT/SKWRO/", "pepto"],
  ["PER/KWRO/", "perio"],
  ["PER/OBGS/", "perox"],
  ["PER/SKWREU/", "peri"],
  ["PET/RO/", "petro"],
  ["PEUBG/SKWRO/", "pico"],
  ["PEUBGT/SKWRO/", "picto"],
  ["PEUL/KWRO/", "pilo"],
  ["PEUL/SKWRO/", "pilo"],
  ["PH*EL/TPHO/", "melano"],
  ["PH*ELT/HRO/", "metallo"],
  ["PH*ELT/SKWRO/", "metallo"],
  ["PH*ERT/", "metro"],
  ["PH*ET/*L/", "methyl"],
  ["PH*EUL/", "milli"],
  ["PH*UFL/HRO/", "musculo"],
  ["PH-BG/", "Mc"],
  ["PHABG/HRO/", "maculo"],
  ["PHABGS/HRO/", "maxillo"],
  ["PHAERBG/", "macro"],
  ["PHAL/", "mal"],
  ["PHAO*UPB/", "immuno"],
  ["PHAOED/KWRO/", "medio"],
  ["PHAOES/KWRO/", "mesio"],
  ["PHAOEU/HRO/", "myelo"],
  ["PHAOEU/KROE/", "micro"],
  ["PHAOEU/KWRO/", "myo"],
  ["PHAOEU/SKWRO/", "myo"],
  ["PHAOEUBG/KWRO/", "myco"],
  ["PHAOEUBG/SKPWRO/", "myco"],
  ["PHAOEUBG/SKWRO/", "myco"],
  ["PHAOEUL/KWRO/", "myelo"],
  ["PHAOEUL/SKWRO/", "myelo"],
  ["PHAOEURBG/", "micro"],
  ["PHAOU/KOE/", "muco"],
  ["PHAOUBG/", "muco"],
  ["PHAOUBG/KO/", "muco"],
  ["PHAOUBG/SKWRO/", "muco"],
  ["PHAPL/HRO/", "mammillo"],
  ["PHE/TAL/HRO/", "metallo"],
  ["PHE/TPHEUPBG/", "meningo"],
  ["PHEBG/TPHO/", "mechano"],
  ["PHEG/HRO/", "megalo"],
  ["PHEG/KWRA/", "mega"],
  ["PHEG/TKPWA/", "mega"],
  ["PHEL/TPHO/", "melano"],
  ["PHEPB/EUPB/SKWRO/", "meningo"],
  ["PHEPB/EUS/KO/", "menisco"],
  ["PHEPBG/SKWRO/", "meningo"],
  ["PHES/KWRO/", "meso"],
  ["PHES/SKWRO/", "meso"],
  ["PHET/HRO/", "metallo"],
  ["PHET/KWRA/", "meta"],
  ["PHEUD/", "mid"],
  ["PHEUPB/SKWRO/", "mino"],
  ["PHEURPBG/", "myringo"],
  ["PHEUZ/", "mis"],
  ["PHO*EU/", "myo"],
  ["PHO*EUPB/KRAOEUT/KWRO/", "immunocyto"],
  ["PHO*EUT/", "meta"],
  ["PHO*FR/KWRO/", "morpho"],
  ["PHO*PB/", "mono"],
  ["PHO/TO/", "moto"],
  ["PHOPB/OE/", "mono"],
  ["PHOPB/SKWRO/", "mono"],
  ["PHRAEU/KWRO/", "pleo"],
  ["PHRAOE/KWRO/", "pleio"],
  ["PHRAS/", "plas"],
  ["PHRAT/KWREU/", "platy"],
  ["PHRE/KWRO/", "pleo"],
  ["PHRE/SKWRO/", "pleo"],
  ["PHRO*EUPB/", "immuno"],
  ["PHRUR/SKWREU/", "pluri"],
  ["PHUFBG/HRO/", "musculo"],
  ["PO*EFT/RO/", "postero"],
  ["PO*EUBG/", "pico"],
  ["PO*EUT/", "patho"],
  ["PO*L/", "poly"],
  ["POEFT/RO/", "postero"],
  ["POFT/RO/", "postero"],
  ["POL/KWREU/", "poly"],
  ["POPBT/SKWRO/", "ponto"],
  ["PRAOEUT/SKWRO/", "parieto"],
  ["PRO/", "pro"],
  ["PROBGT/SKWRO/", "procto"],
  ["PROEP/RO/", "proprio"],
  ["PROERP/RO/", "proprio"],
  ["PROET/KWRO/", "proteo"],
  ["PROET/KWROE/", "proteo"],
  ["PW*EU/", "bi"],
  ["PWA*EBG/", "back"],
  ["PWABG/TAOER/KWRO/", "bacterio"],
  ["PWAEBG/", "back"],
  ["PWAEU/TKPWA/", "bayga"],
  ["PWAEUR/SKWRO/", "baro"],
  ["PWAEUS/SKWRO/", "baso"],
  ["PWAO*E/", "bio"],
  ["PWAOEBGT/RO/", "bacterio"],
  ["PWAOERBGT/KWRO/", "bacterio"],
  ["PWAOERBGT/SKWRO/", "bacterio"],
  ["PWAOEU/KWROE/", "bio"],
  ["PWAOUBG/KWRO/", "bucco"],
  ["PWAOUT/RO/", "butyro"],
  ["PWAR/SKWRO/", "baro"],
  ["PWE/", "be"],
  ["PWEPB/SO*/", "benzo"],
  ["PWHRAFT/SKWRO/", "blasto"],
  ["PWHREF/RO/", "blepharo"],
  ["PWHREFR/SKWRO/", "blepharo"],
  ["PWO*E/", "bio"],
  ["PWO*EU/", "bio"],
  ["PWRA*EUD/KWREU/", "brady"],
  ["PWRA*PBG/KWRO/", "branchio"],
  ["PWRABG/KWREU/", "brachy"],
  ["PWRAD/KWREU/", "brady"],
  ["PWRAEUBG/KWRO/", "brachio"],
  ["PWRAPBG/KWRO/", "branchio"],
  ["PWRO*PBG/", "broncho"],
  ["PWRO*PBG/KWRO/", "bronchio"],
  ["PWRO*PBG/SKWRO/", "broncho"],
  ["PWROPB/KO/", "broncho"],
  ["PWROPBG/KWRO/", "broncho"],
  ["PWROPBG/SKWRO/", "broncho"],
  ["PWUBG/KO/", "bucco"],
  ["PWUBG/KWRO/", "bucco"],
  ["PWUBG/SKWRO/", "bucco"],
  ["PWUBL/KWRO/", "bulbo"],
  ["PWUBL/SKWRO/", "bulbo"],
  ["PWUT/OBG/SKWRU/", "but Ocu"],
  ["R*ERT/", "erythro"],
  ["RAOEPB/", "reen"],
  ["RAOEU/PWO/", "ribo"],
  ["RAOEUB/SKWRO/", "ribo"],
  ["RAOEUB/TPHAOU/KHRAEU/SKWRO/", "ribonucleo"],
  ["RAOEUPB/SKWRO/", "rhino"],
  ["RAOUB/RO/", "rubro"],
  ["RAOUPL/TO/", "rheumato"],
  ["RAOUPLT/", "rheumato"],
  ["RAOUPLT/SKWRO/", "rheumato"],
  ["RE/", "re"],
  ["RE/TEUBG/HRO/", "reticulo"],
  ["REBGT/KWRO/", "recto"],
  ["REBGT/SKWRO/", "recto"],
  ["RERT/", "retro"],
  ["RET/TPHO/", "retino"],
  ["REUB/SKWRO/", "ribo"],
  ["REUPB/SKWRO/", "rhino"],
  ["RO/PWO/", "robo"],
  ["ROEPBT/", "entero"],
  ["S*EUPB/", "syn"],
  ["S*EUPL/A*T/SKWRO/", "sympatho"],
  ["S*EUPL/THO/", "sympatho"],
  ["S*EUPLT/SKWRO/", "sympatho"],
  ["SABG/RO/", "sacro"],
  ["SAL/PEUPB/TKPWO/", "salpingo"],
  ["SAO*EU/TKPWO/", "zygo"],
  ["SAO*EUG/", "zyg"],
  ["SAO*EUG/KWRO/PHAT/K-L/", "zygomatico"],
  ["SAO*EUG/PHAT/KO/", "zygomatico"],
  ["SAO*UD/", "pseudo"],
  ["SAOEUB/*ER/", "cyber"],
  ["SAOEUBG/HRO/", "cyclo"],
  ["SAOEUD/RO/", "sidero"],
  ["SAOEUG/KWRO/", "zygo"],
  ["SAOEUG/SKWRO/", "zygo"],
  ["SAOEUG/SKWRO/PHAT/K-L/", "zygomatico"],
  ["SAOEULG/", "cyclo"],
  ["SAOEUPB/KWRO/", "cyano"],
  ["SAOEUPB/SKWRO/", "cyano"],
  ["SAOEURB/", "cyber"],
  ["SAOEUS/SKWRO/", "iso"],
  ["SAOEUT/O*/", "cyto"],
  ["SAOEUT/SKWRO/", "cyto"],
  ["SAOUD/KWRO/", "pseudo"],
  ["SAOUD/SKWRO/", "pseudo"],
  ["SAOUD/TKOE/", "pseudo"],
  ["SAOUP/", "super"],
  ["SAOUP/RA/", "supra"],
  ["SAOUP/RO/", "supero"],
  ["SAR/KO/", "sarco"],
  ["SARBG/", "sarco"],
  ["SARBG/SKWRO/", "sarco"],
  ["SAUB/", "sub"],
  ["SE/RAOE/PWROE/", "cerebro"],
  ["SEF/", "self-"],
  ["SEF/HRO/", "cephalo"],
  ["SEFL/SKWRO/", "cephalo"],
  ["SEFRBG/SKWRO/", "cervico"],
  ["SEPB/TRO/", "centro"],
  ["SEPLT/SKWRO/", "cemento"],
  ["SER/HRO/", "cerulo"],
  ["SER/PWEL/HRO/", "cerebello"],
  ["SER/PWEL/SKWRO/", "cerebello"],
  ["SER/SKWRO/", "sero"],
  ["SEUPB/KROE/", "synchro"],
  ["SEUPL/PA*T/SKWRO/", "sympatho"],
  ["SEUPL/PA/THO/", "sympatho"],
  ["SEUPL/PO*EUT/", "sympatho"],
  ["SEURBG/UPL/", "circum"],
  ["SEUT/RO/", "citro"],
  ["SHO*E/", "show"],
  ["SKHRER/SKWRO/", "sclero"],
  ["SKRAOEB/RO/", "cerebro"],
  ["SKWAEUPL/SKWRO/", "squamo"],
  ["SKWRAOE/KWROE/", "geo"],
  ["SKWRAOE/OE/", "geo"],
  ["SKWRAOEPB/KWRO/", "genio"],
  ["SKWRAOU/TKAEU/KWROE/", "Judeo"],
  ["SKWRAOUP/*ER/", "juper"],
  ["SKWREPBT/KWRO/", "genito"],
  ["SKWREPBT/SKWRO/", "genito"],
  ["SKWRO*EU/", "geo"],
  ["SKWROEPBD/", "endo"],
  ["SKWRUG/HRO/", "jugulo"],
  ["SKWRUGT/", "juxta"],
  ["SKWRUGT/HRO/", "juxtallo"],
  ["SKWRUGT/KWRA/", "juxta"],
  ["SO*EUBG/", "psycho"],
  ["SO/PHA/TO/", "somato"],
  ["SOE/PHAT/SKWRO/", "somato"],
  ["SOEPL/TO/", "somato"],
  ["SOEPLT/", "somato"],
  ["SOEPLT/KWRO/", "somato"],
  ["SOEPLT/SKWRO/", "somato"],
  ["SOEPLTS/SKWRO/", "somato"],
  ["SOERB/KWROE/", "socio"],
  ["SOES/KWROE/", "socio"],
  ["SPAOEUPB/KWRO/", "spino"],
  ["SPAOEUPB/SKWRO/", "spino"],
  ["SPAS/PHO/", "spasmo"],
  ["SPERBGT/", "spectro"],
  ["SPEUPB/SKWRO/", "spino"],
  ["SPHEU/", "semi"],
  ["SPOPBD/HRO/", "spondylo"],
  ["SPOPBG/KWROE/", "spongio"],
  ["SPOR/SKWRO/", "sporo"],
  ["SPWRA/", "intra"],
  ["SRAEUG/SKWRO/", "vago"],
  ["SRAEUS/KWRO/", "vaso"],
  ["SRAEUS/SKWRO/", "vaso"],
  ["SRAEUT/SKWRO/", "vaso"],
  ["SRAFBG/HRO/", "vasculo"],
  ["SRAFL/SKWRO/", "valvulo"],
  ["SRAOEB/ROE/", "cerebro"],
  ["SRAOEPB/KWRO/", "veno"],
  ["SRAOEPB/SKWRO/", "veno"],
  ["SRAOEUB/RA/", "vibra"],
  ["SRAS/SKWRO/", "vaso"],
  ["SREFT/PWHRO/", "vestibulo"],
  ["SREL/SRO/", "vulvo"],
  ["SREPB/KWRO/", "veno"],
  ["SREPB/SKWRO/", "veno"],
  ["SREPB/TRO/", "ventro"],
  ["SREPBT/RO/", "ventro"],
  ["SRES/KO/", "vesico"],
  ["SREUFBG/SKWRO/", "visco"],
  ["SREUPBG/KWRO/", "syringo"],
  ["SREURT/KWRO/", "vitreo"],
  ["SREURT/RO/", "vitreo"],
  ["SREURT/SKWRO/", "vitreo"],
  ["SREUS/KWRO/", "visio"],
  ["SREUS/RO/", "viscero"],
  ["SREUS/SKWRO/", "visuo"],
  ["SRO*EUS/", "vaso"],
  ["STAF/HRO/", "staphylo"],
  ["STAOET/SKWRO/", "steato"],
  ["STAOEU/HRO/", "stylo"],
  ["STAOEUL/KWRO/", "stylo"],
  ["STAOEUL/SKWRO/", "stylo"],
  ["STEPT/", "strepto"],
  ["STER/KWRO/", "stereo"],
  ["STERBG/KWRO/", "sterco"],
  ["STERPB/SKWRO/", "sterno"],
  ["STKPWAOEU/TKPWO/", "zygo"],
  ["STKPWAOEUG/SKWRO/", "zygo"],
  ["STO*EUL/", "stylo"],
  ["STOEPL/TO/", "stomato"],
  ["STPAOEPB/KWRO/", "spheno"],
  ["STPAOEPB/SKWRO/", "spheno"],
  ["STPAOER/SKWRO/", "sphero"],
  ["STPEUPBG/KWRO/", "sphingo"],
  ["STPEUPBG/SKWRO/", "sphingo"],
  ["STPHAPT/SKWRO/", "synapto"],
  ["STPO*EUPB/", "spheno"],
  ["STREPT/SKWRO/", "strepto"],
  ["STREPT/SKWRO*/", "strepto"],
  ["SUP/RA/", "supra"],
  ["T*EL/", "tele"],
  ["T*EPL/RO/", "temporo"],
  ["T*ERT/", "tetra"],
  ["TA*BG/KWREU/", "tachy"],
  ["TA*BG/SKWREU/", "tachy"],
  ["TABG/SKWREU/", "tachy"],
  ["TAER/TKPWO/", "pterygo"],
  ["TAL/KAPB/KAPB/KWRAL/", "talocancaneal"],
  ["TAL/KWRO/", "talo"],
  ["TAL/SKWRO/", "talo"],
  ["TAOUB/HRO/", "tubulo"],
  ["TAOUB/RO/", "tubero"],
  ["TAUR/", "tor"],
  ["TER/EUPBLG/KWRO/", "pterygo"],
  ["TER/TKPWO/", "pterygo"],
  ["TER/TO/", "terato"],
  ["TERPBLG/KWRO/", "pterygo"],
  ["TERT/KWRO/", "terato"],
  ["TERT/SKWRO/", "terato"],
  ["TET/RA/", "tetra"],
  ["TET/TRA/", "tetra"],
  ["TEUB/KWRO/", "tibio"],
  ["THAL/PHO/", "thalamo"],
  ["THAOEU/RO/", "thyro"],
  ["THAOEUR/SKWRO/", "thyro"],
  ["THERPL/KWRA/", "therma"],
  ["THO*EU/", "theo"],
  ["THOEU/", "thio"],
  ["THOR/KO/", "thoraco"],
  ["THRO*PL/SKWRO/", "thrombo"],
  ["THROPL/", "thrombo"],
  ["THROPL/PWO/", "thrombo"],
  ["THROPL/SKWRO/", "thrombo"],
  ["TK*EPL/", "demi"],
  ["TK*ERPL/TO/", "dermato"],
  ["TKAERBG/KWRO/", "dacryo"],
  ["TKAOEU/KWRA/", "dia"],
  ["TKARBG/KWRO/", "dacryo"],
  ["TKARBG/KWROE/", "dacryo"],
  ["TKARBG/RO/", "dacryo"],
  ["TKE/", "de"],
  ["TKEBGS/TRO/", "dextro"],
  ["TKEG/SKWRA/", "deca"],
  ["TKEPB/TKO/", "dendro"],
  ["TKEPB/TKRO/", "dendro"],
  ["TKERPL/AT/SKWRO/", "dermato"],
  ["TKERPL/SKWRO/", "dermo"],
  ["TKERPLT/KWRO/", "dermato"],
  ["TKERPLT/SKWRO/", "dermato"],
  ["TKEUBGS/", "diction"],
  ["TKEUFT/KWRO/", "disto"],
  ["TKEUFT/SKWRO/", "disto"],
  ["TKEUS/", "dis"],
  ["TKEUS/TKAOEU/TKO/", "dysdiado"],
  ["TKOR/SO/", "dorso"],
  ["TKORS/KWRO/", "dorso"],
  ["TKORS/SKWREU/", "dorsi"],
  ["TKORS/SKWRO/", "dorso"],
  ["TKPWA/HRABGT/", "galacto"],
  ["TKPWAFT/RO/", "gastro"],
  ["TKPWAPL/AOET/SKWRO/", "gameto"],
  ["TKPWAS/TRO/", "gastro"],
  ["TKPWEUG/KWRA/", "giga"],
  ["TKPWHR*/HR*/*U/KR*/O*/", "gluco"],
  ["TKPWHRABG/TO/", "galacto"],
  ["TKPWHRABGT/", "galacto"],
  ["TKPWHRABGT/SKWRO/", "galacto"],
  ["TKPWHRAOEU/KO/", "glyco"],
  ["TKPWHRAOEUBG/", "glyco"],
  ["TKPWHRAOEUBG/KO/", "glyco"],
  ["TKPWHRAOEUBG/SKWRO/", "glyco"],
  ["TKPWHRAOU/KOE/", "gluco"],
  ["TKPWHRAOUBG/", "gluco"],
  ["TKPWHRAOUBG/SKWRO/", "gluco"],
  ["TKPWHRAOUBG/TPHO/", "glucono"],
  ["TKPWHRO/PHER/HRO/", "glomerulo"],
  ["TKPWHROPL/*ER/HRO/", "glomerulo"],
  ["TKPWHROPL/HRO/", "glomerulo"],
  ["TKPWHROPL/RU/", "glomerulo"],
  ["TKPWHROS/SKWRO/", "glosso"],
  ["TKPWO*EU/", "geo"],
  ["TKPWOLD/", "gold"],
  ["TKPWRAPB/HRO/", "granulo"],
  ["TKWOD/TPHO/", "duodeno"],
  ["TO*P/SKWRO/", "topo"],
  ["TO/A*EUPBLT/", "to anti"],
  ["TO/PO/", "topo"],
  ["TOBGS/KO/", "toxico"],
  ["TPAEUG/KWRO/", "phago"],
  ["TPAEUG/SKWRO/", "phago"],
  ["TPAEUPBLG/SKWRO/", "phago"],
  ["TPAEURB/KWRO/", "facio"],
  ["TPAEURPBG/KWRO/", "pharyngo"],
  ["TPAEURPBG/SKWRO/", "pharyngo"],
  ["TPAEUS/KWRO/", "facio"],
  ["TPAL/SKWRO/", "phallo"],
  ["TPAOEPB/*L/", "phenyl"],
  ["TPAOEPBL/", "phenyl"],
  ["TPAOET/KWRO/", "feto"],
  ["TPAOET/SKWRO/", "feto"],
  ["TPAOEUB/RO/", "fibro"],
  ["TPAOEUB/ROE/", "fibro"],
  ["TPAOEURB/RO/", "fibro"],
  ["TPAOEUT/KWRO/", "phyto"],
  ["TPAOEUT/SKWRO/", "phyto"],
  ["TPAOUS/KWRO/", "fuso"],
  ["TPARBG/KO/", "pharmaco"],
  ["TPARPL/KO/", "pharmaco"],
  ["TPARPL/KOE/", "pharmaco"],
  ["TPAUR/", "for"],
  ["TPEPLT/SKWRO/", "femto"],
  ["TPER/ROE/", "ferro"],
  ["TPER/SKWRO/", "fero"],
  ["TPEUB/HRO/", "fibulo"],
  ["TPEUS/KWRO/", "physio"],
  ["TPEUS/KWROE/", "physio"],
  ["TPEUS/SKWRO/", "physio"],
  ["TPH*UR/", "neuro"],
  ["TPHAEUS/SKWRO/", "naso"],
  ["TPHAO*UR/", "neuro"],
  ["TPHAOEUG/RO/", "nigro"],
  ["TPHAOEURT/SKWRO/", "nitro"],
  ["TPHAOEUT/RO/", "nitro"],
  ["TPHAOU/ROE/", "neuro"],
  ["TPHAOUBG/HRO/", "nucleo"],
  ["TPHAOUBG/HROE/", "nucleo"],
  ["TPHAOUBG/SKWRO/", "nucho"],
  ["TPHAOUPL/", "pneumo"],
  ["TPHAOUPL/PHOE/", "pneumo"],
  ["TPHAOUPL/SKWRO/", "pneumo"],
  ["TPHAOUR/SKWRO/", "neuro"],
  ["TPHAOURT/SKWRO/", "neutro"],
  ["TPHAPB/KWRO/", "nano"],
  ["TPHAPB/SKWRO/", "nano"],
  ["TPHAUPB/", "non"],
  ["TPHEBG/RO/", "necro"],
  ["TPHEF/RO/", "nephro"],
  ["TPHOD/HRO/", "nodulo"],
  ["TPHORPL/SKWRO/", "normo"],
  ["TPHRAO*UR/", "fluoro"],
  ["TPHRAOUBG/HRO/", "nucleo"],
  ["TPHRAOUD/RO/", "fludro"],
  ["TPHRAOUR/", "fluoro"],
  ["TPHROR/SKWRO/", "fluoro"],
  ["TPHUR/SKWRO/", "neuro"],
  ["TPO/TO/", "photo"],
  ["TPO/TPHO/", "phono"],
  ["TPOER/", "fore"],
  ["TPOEURB/", "fibro"],
  ["TPORPL/*L/", "formyl"],
  ["TPOS/TO/", "phospho"],
  ["TPOS/TPA/", "phospha"],
  ["TPOS/TPO/", "phospho"],
  ["TPOS/TPOE/", "phospho"],
  ["TPRAEUPB/", "infra"],
  ["TPRAOEPB/KWRO/", "phreno"],
  ["TPRAOUBGT/", "fructo"],
  ["TPRUBG/TO/", "fructo"],
  ["TR*EU/", "tri"],
  ["TR*EU/AOEU/TKO/", "triiodo"],
  ["TR*EU/SKWREPL/TPHO/", "trigemino"],
  ["TR*EU/SKWRO/", "trio"],
  ["TR*EUP/TPHO/", "trypano"],
  ["TRAEUBG/KWRO/", "tracheo"],
  ["TRAO*EU/", "tri"],
  ["TRAPBS/SRERS/SKWRO/", "transverso"],
  ["TRAPBZ/", "trans"],
  ["TRERT/", "tetra"],
  ["TRO/PO/", "tropo"],
  ["TRO/TO/", "tropo"],
  ["TROEF/SKWRO/", "tropho"],
  ["TROF/SKWRO/", "tropho"],
  ["TWOUPB/", "200"],
  ["UL/TRA/", "ultra"],
  ["UPB/", "un"],
  ["UPBD/", "under"],
  ["UPL/PHAOUPB/TPHO/", "immuno"],
  ["UPL/PWEUL/KO/", "umbilico"],
  ["UR/KWRO/", "uro"],
  ["UR/SKWRO/", "uro"],
  ["URLT/", "ultra"],
  ["WA*UR/", "water"],
  ["A*UF/", "off-"],
  ["AEUPB/SKWREU/", "ani-"],
  ["AFR/ROE/", "Afro-"],
  ["AOE/KOE/", "eco-"],
  ["AOEBG/WEU/HRAT/RAL/", "equilateral-"],
  ["EUPBD/SKWRO/", "Indo-"],
  ["HA*EPBD/", "hand-"],
  ["HAEPBD/", "handi-"],
  ["HAOEU/PWERPB/TPHOE/", "Hiberno-"],
  ["HER/SEF/", "herself-"],
  ["HREUS/", "Lys-"],
  ["KAU/", "co"],
  ["KOE/", "co-"],
  ["KWAS/KWREU/", "quasi-"],
  ["KWAS/SKWREU/", "quasi-"],
  ["KWAT/SKWREU/", "quasi-"],
  ["KWR*EUPB/", "in-"],
  ["KWRO*PB/", "on-"],
  ["KWRO*UT/", "out-"],
  ["PH*UFP/", "much-"],
  ["PHAO*EURBG/", "micro-"],
  ["PHAOEU/SEF/", "myself-"],
  ["PHAUPB/", "non-"],
  ["PRE/", "pre"],
  ["PR*E/", "pre-"],
  ["PRO/TO/", "proto-"],
  ["PROE/TOE/", "proto-"],
  ["R*E/", "re-"],
  ["S*EPL/", "semi-"],
  ["SA*UB/", "sub-"],
  ["SAO*URP/", "super-"],
  ["SEF/", "self-"],
  ["SKWR*EL/", "well-"],
  ["TKPWHRAOEU/", "gly-"],
  ["TKPWRA*ET/", "great-"],
  ["TKPWREBG/SKWRO/", "Greco-"],
  ["TPHA*UPB/", "non-"],
  ["TPHAOE/KWROE/", "neo-"],
  ["TPHO*/", "no-"],
  ["W*EL/", "well-"],
  ["A*D/TPHO/", "adeno"],
  ["A*UT/SKWRO/", "auto"],
  ["A/SAO*ET/*L/", "acetyl"],
  ["A/SAOE/TO/", "aceto"],
  ["A/SAOES/*L/", "acetyl"],
  ["A/TKAOE/TPHO/", "adeno"],
  ["A/TKAOE/TPHOE/", "adeno"],
  ["A/TKAOEPB/KWRO/", "adeno"],
  ["A/TKRAOE/TPHO/", "adreno"],
  ["A/TKRAOE/TPHROE/", "adreno"],
  ["A/TKRAOEPB/", "adreno"],
  ["A/TKRO*EUPB/", "adreno"],
  ["AER/SKWRO/", "aero"],
  ["AEUR/SKWRO/", "aero"],
  ["KWRA*D/", "ad"],
  ["RAOE/", "re"],
  ["TPWOUPB/", "200"],
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
];
const PREFIXES_LENGTH = PREFIXES.length;

const SUFFIXES = [
  ["/*D", "'d"],
  ["/-EG", "eing"],
  ["/*LG", "ling"],
  ["/*LD", "led"],
  ["/O*UR", "our"],
  ["/KWRO*R", "iour"],
  ["/AES", "'s"],
  ["/AOEUZ/A*U", "ise"],
  ["/AO*EUFG", "ising"],
  ["/AO*EUFD", "ised"],
  ["/*EPLT", "ement"],
  ["/*BG", "k"],
  ["/*EFBG", "esque"],
  ["/*EPB", "en"],
  ["/*EPB/TPELD", "enfeld"],
  ["/*ER", "er"],
  ["/*ERS", "ers"],
  ["/*ES", "ess"],
  ["/*ET", "eth"],
  ["/*EUFPL", "ism"],
  ["/*EUFT", "ivity"],
  ["/*EUGS", "ician"],
  ["/*EUL/EUBG", "ilic"],
  ["/*EUPB", "in"],
  ["/*EUPB/*EUPB", "inin"],
  ["/*EUPBS", "iness"],
  ["/*EUPBZ", "ins"],
  ["/*EUS", "ice"],
  ["/*EZ", "ez"],
  ["/*FP", "ch"],
  ["/*FPL", "sm"],
  ["/*L", "le"],
  ["/*P", "p"],
  ["/*PB", "n"],
  ["/*PBD", "nd"],
  ["/*PBLG", "ge"],
  ["/*PLT", "ment"],
  ["/*RB", "sh"],
  ["/*RDZ", "rds"],
  ["/*T", "th"],
  ["/*UPL", "um"],
  ["/-BL", "able"],
  ["/-BLT", "ability"],
  ["/-D", "ed"],
  ["/-FL", "ful"],
  ["/-FPD", "ed}{."],
  ["/-FPS", "s}{."],
  ["/-G", "ing"],
  ["/-LS", "less"],
  ["/-PBS", "ness"],
  ["/-PLTS", "ments"],
  ["/-S", "s"],
  ["/A*EL", "ally"],
  ["/A*EUBG", "ache"],
  ["/A*L", "al"],
  ["/A*L/EUFPL", "alism"],
  ["/A*L/EUS", "alis"],
  ["/A*PB", "an"],
  ["/A*PB/SKWREU", "ani"],
  ["/A*PBL", "allian"],
  ["/A*R", "ar"],
  ["/A*R/A*ET", "arate"],
  ["/A*RPL", "arum"],
  ["/A*RS", "ars"],
  ["/A*T", "ate"],
  ["/A*T/-D", "ated"],
  ["/A*T/EUBG", "atic"],
  ["/A*T/EUF", "ative"],
  ["/A*T/K-L", "atical"],
  ["/A*TD", "ated"],
  ["/A/HOL/EUBG", "aholic"],
  ["/A/TA", "ata"],
  ["/A/TOR/KWRUPL", "atorium"],
  ["/AER", "ary"],
  ["/AEUGS", "ation"],
  ["/AEURBS", "aceous"],
  ["/AEURL", "arial"],
  ["/AEURPB", "arian"],
  ["/AEURPL", "arium"],
  ["/AEURT", "arity"],
  ["/AEUT/-D", "ated"],
  ["/AEUT/-G", "ating"],
  ["/AEUT/O*R", "ator"],
  ["/AEUZ", "ase"],
  ["/ALG/KWRA", "algia"],
  ["/ALT", "ality"],
  ["/ALT/EUBG", "atic"],
  ["/AO*E", "ie"],
  ["/AO*EL", "elle"],
  ["/AO*EPB", "ean"],
  ["/AO*ER", "eer"],
  ["/AO*ET", "ette"],
  ["/AO*EUFD", "ized"],
  ["/AO*EUFG", "izing"],
  ["/AO*EUTS", "itis"],
  ["/AO*EZ", "ese"],
  ["/AO*UL/A*T/-D", "ulated"],
  ["/AO*UR/KWRA", "uria"],
  ["/AOE/TOE", "ito"],
  ["/AOEPL/EUBG", "emic"],
  ["/AOEPL/KWRA", "emia"],
  ["/AOEPL/KWRARBGS", "emia}{,"],
  ["/AOES/EUS", "esis"],
  ["/AOES/KWRA", "esia"],
  ["/AOEU/KWRA/SEUS", "iasis"],
  ["/AOEU/SEUS", "iasis"],
  ["/AOEUBL", "izable"],
  ["/AOEUPB", "ine"],
  ["/AOEUT", "ite"],
  ["/AOEUT/EUS", "itis"],
  ["/AOEUTS", "itis"],
  ["/AOEUZ", "ize"],
  ["/AOEZ", "ese"],
  ["/AOF/ROPB", "oophoron"],
  ["/AOUD/AEUGS", "udation"],
  ["/AOUL", "ule"],
  ["/AOUL/A*T", "ulate"],
  ["/AOULS", "ules"],
  ["/AOUPBLG", "uge"],
  ["/AOUR", "ure"],
  ["/APBLG", "age"],
  ["/APBS", "ance"],
  ["/APBT", "ant"],
  ["/AR/HREU", "arily"],
  ["/AS/TAFP", "s} attach"],
  ["/AT/AOEUZ/-D", "atized"],
  ["/AT/EUBG", "atic"],
  ["/AT/KHREU", "atically"],
  ["/AZ/PAPL", "orazepam"],
  ["/EBGT/PHEU", "ectomy"],
  ["/EF/RAOEPB", "ephrine"],
  ["/EF/REUPB", "ephrine"],
  ["/EFT", "est"],
  ["/EL/HRA", "ella"],
  ["/EPBL", "ential"],
  ["/EPBS", "ence"],
  ["/EPBT", "ent"],
  ["/EPBT/-D", "ented"],
  ["/EPBZ/PAOEUPB", "enzepine"],
  ["/ERPBLG/EUBG", "ergic"],
  ["/ERS", "ers"],
  ["/ES/EPBT", "escent"],
  ["/ES/KEU", "eski"],
  ["/ET", "et"],
  ["/EUBG", "ic"],
  ["/EUBG/HRAT", "iculate"],
  ["/EUBGS", "ix"],
  ["/EUBL", "ible"],
  ["/EUBLT", "ibility"],
  ["/EUD/AEUZ", "idase"],
  ["/EUF", "ive"],
  ["/EUFBG", "iffic"],
  ["/EUFL", "ively"],
  ["/EUFPBS", "iveness"],
  ["/EUFPL", "ism"],
  ["/EUFT", "ist"],
  ["/EUGS", "ition"],
  ["/EULT", "ility"],
  ["/EUPB/*EU", "ini"],
  ["/EUPB/KWRAPB", "inian"],
  ["/EUPB/SKWREU", "ini"],
  ["/EUPBG/*ER", "inger"],
  ["/EUPL/TREU", "imetry"],
  ["/EURB", "ish"],
  ["/EURBS", "itious"],
  ["/EUS", "is"],
  ["/EUS/TEU", "icity"],
  ["/EUS/TEUS", "icities"],
  ["/EUT/KWRA", "ita"],
  ["/EUT/KWREU", "ity"],
  ["/H-FS", "s?"],
  ["/HA*PBD", "hand"],
  ["/HA*PL", "ham"],
  ["/HAO*D", "hood"],
  ["/HAOED/RAL", "hedral"],
  ["/HO*ELD", "hold"],
  ["/HO*ERLD", "holder"],
  ["/HO*LD", "hold"],
  ["/HR*EPBT", "ulent"],
  ["/HR*ET", "let"],
  ["/HR*EUPBS", "liness"],
  ["/HR-L", "logical"],
  ["/HR-LG", "ological"],
  ["/HRA*EBG", "like"],
  ["/HRA*EURT", "ularity"],
  ["/HRA*PBD", "land"],
  ["/HRA/TOER", "ulatory"],
  ["/HRAER", "ulary"],
  ["/HRAEUGS", "ulation"],
  ["/HRAEUL/KWRA", "lalia"],
  ["/HRAEUT/-D", "lated"],
  ["/HRAEUT/-G", "ulating"],
  ["/HRAO*EUF", "life"],
  ["/HRAOEUT/EUBG", "lytic"],
  ["/HRAOEUZ", "alize"],
  ["/HRAOEUZ/-D", "alized"],
  ["/HRAPBT", "lant"],
  ["/HRAR", "ular"],
  ["/HRARL", "ularly"],
  ["/HRER", "ler"],
  ["/HREU", "ly"],
  ["/HREUPBG", "ling"],
  ["/HREURBS", "licious"],
  ["/HREUT/EUBG", "lytic"],
  ["/HRO*", "ol"],
  ["/HRO*PB", "ulon"],
  ["/HROP/THEU", "ulopathy"],
  ["/HROP/THEUS", "ulopathies"],
  ["/HRUS", "ulus"],
  ["/HUFRT", "hurst"],
  ["/HUPB/HUPB", "00"],
  ["/HUPBZ", "00"],
  ["/K*EUPB", "kin"],
  ["/K*L", "ical"],
  ["/K-L", "cal"],
  ["/K-LS", "icals"],
  ["/KA*EUR", "care"],
  ["/KA*EUS", "case"],
  ["/KA/PAEUD", "capade"],
  ["/KAE", "key"],
  ["/KAEUGS", "ication"],
  ["/KAEUT", "cate"],
  ["/KAO*E/-P", "keep"],
  ["/KAO*EP/*ER", "keeper"],
  ["/KAO*EP/-G", "keeping"],
  ["/KAOEUPB", "kine"],
  ["/KHAOEZ/KWRA", "chezia"],
  ["/KHEU/TPHEU", "cini"],
  ["/KHRAFT", "clast"],
  ["/KHREU", "ically"],
  ["/KHREURBGS", "ically}{,"],
  ["/KHROR/AOEPL/EUBG", "chloremic"],
  ["/KO*BGS", "cox"],
  ["/KOBG/A*L", "coccal"],
  ["/KOBG/KWRUS", "coccus"],
  ["/KOBG/US", "coccus"],
  ["/KRA*T", "crat"],
  ["/KRAES", "cracy"],
  ["/KRAO*EUD", "icide"],
  ["/KRAO*EUT/OES", "cytose"],
  ["/KRAOEUT/-S", "cytes"],
  ["/KRAOEUT/EUBG", "cytic"],
  ["/KRAOEUT/OES", "cytose"],
  ["/KRAOEUT/OT/EUBG", "cytotic"],
  ["/KRAOEUT/PAOEPB/KWRA", "cytopenia"],
  ["/KRAOEUT/PAOEPB/KWRARBGS", "cytopenia"],
  ["/KRAT", "ocrat"],
  ["/KWAOEUPB", "quine"],
  ["/KWR*US", "eus"],
  ["/KWRA", "a"],
  ["/KWRA*", "ia"],
  ["/KWRA*E", "ay"],
  ["/KWRA*PB", "ean"],
  ["/KWRA/HOL/EUBG", "aholic"],
  ["/KWRAE", "ee"],
  ["/KWRAER", "iary"],
  ["/KWRAEUGS", "iation"],
  ["/KWRAEUT", "iate"],
  ["/KWRAFP", "ia}{,"],
  ["/KWRAL", "ial"],
  ["/KWRALT", "iality"],
  ["/KWRAOE", "ey"],
  ["/KWRAOEUL", "ile"],
  ["/KWRAPB", "ian"],
  ["/KWRARBG", "iarch"],
  ["/KWRARBGS", "ia}{,"],
  ["/KWRAS", "ias"],
  ["/KWRAT/EUBG", "iatic"],
  ["/KWRAT/EUF", "iative"],
  ["/KWREBGT/AT/EUBG", "iectatic"],
  ["/KWREBGT/EUBG", "iectic"],
  ["/KWREFT", "iest"],
  ["/KWREL/HRA", "iella"],
  ["/KWRER", "ier"],
  ["/KWREU", "y"],
  ["/KWREU/-S", "ies"],
  ["/KWREUD", "ied"],
  ["/KWREUFP", "y}{."],
  ["/KWREUFPL", "y}{."],
  ["/KWREUFPLT", "y"],
  ["/KWREUS", "ies"],
  ["/KWRO", "o"],
  ["/KWRO*/TKPWRAPL", "iogram"],
  ["/KWRO*E", "io"],
  ["/KWRO*PBD", "ioned"],
  ["/KWRO*US", "eous"],
  ["/KWROE/PHA", "ioma"],
  ["/KWROEL", "iole"],
  ["/KWROEPB/KWREU", "ioni"],
  ["/KWROG/TPEU", "iography"],
  ["/KWROP/THEU", "eopathy"],
  ["/KWROPB", "ion"],
  ["/KWROPL", "iom"],
  ["/KWROR", "ior"],
  ["/KWRORL", "iorly"],
  ["/KWRORT", "iority"],
  ["/KWROT/PHEU", "iotomy"],
  ["/KWROUS", "ious"],
  ["/O*EFR", "over"],
  ["/O*EFRS", "overs"],
  ["/O*EPB", "one"],
  ["/O*EPL", "onomy"],
  ["/O*EPT", "opathy"],
  ["/O*ES", "ose"],
  ["/O*EUL", "ile"],
  ["/O*EUS", "osis"],
  ["/O*L", "ol"],
  ["/O*PB", "on"],
  ["/O*PBS", "ons"],
  ["/O*R", "or"],
  ["/O*RS", "ors"],
  ["/O*T", "otte"],
  ["/O*ULS", "ously"],
  ["/OBG/A*L", "occal"],
  ["/OBGS/*EUPB", "oxin"],
  ["/OBGS/KWRA", "oxia"],
  ["/OE/PHA", "oma"],
  ["/OE/RA/PHA", "orama"],
  ["/OE/SA", "osa"],
  ["/OEL/SA*EUGS", "olization"],
  ["/OEP/EUBG", "opic"],
  ["/OEP/KWRA", "opia"],
  ["/OEPB/KWRUPL", "onium"],
  ["/OEPL/KWRA", "oma"],
  ["/OES", "ose"],
  ["/OES/EUS", "osis"],
  ["/OES/KWRUPL", "osum"],
  ["/OES/SKWRUS", "osus"],
  ["/OES/US", "osus"],
  ["/OEUBG", "oic"],
  ["/OEUD", "oid"],
  ["/OFBG/PEU", "oscopy"],
  ["/OFT/PHEU", "ostomy"],
  ["/OG/TPEU", "ography"],
  ["/OL/SEUS", "olysis"],
  ["/OLG", "ology"],
  ["/OLG/EUFT", "ologist"],
  ["/OP/HREUS", "opolis"],
  ["/OP/THEU", "opathy"],
  ["/OPB/EUBG", "onic"],
  ["/OPBLG/K-L", "ogical"],
  ["/OPL/EUBG", "omic"],
  ["/OPL/TREU", "ometry"],
  ["/OPLT/*ER", "ometer"],
  ["/OPS/EUS", "opsis"],
  ["/OR/KWROUS", "orious"],
  ["/ORPL", "orium"],
  ["/OS", "os"],
  ["/OS/KO/PEU", "oscopy"],
  ["/OS/SKWRUS", "osus"],
  ["/OT/EUBG", "otic"],
  ["/OT/PHEU", "otomy"],
  ["/OUS", "ous"],
  ["/P*EU/TPH*EU", "pini"],
  ["/P-D", "ped"],
  ["/PA*EBGT", "pathic"],
  ["/PA*ET", "pathy"],
  ["/PA*ET/-S", "pathies"],
  ["/PA*S", "pass"],
  ["/PAOED/EUBG", "pedic"],
  ["/PAOED/KWRA", "pedia"],
  ["/PAOEPB/EUBG", "penic"],
  ["/PAOEPB/KWRA", "penia"],
  ["/PAOEPB/KWRAFPLT", "penia}{."],
  ["/PAOEPB/KWRARBGS", "penia}{,"],
  ["/PEPB/EPL", "penem"],
  ["/PEPBT/TPHOEUBG", "pentaenoic"],
  ["/PH*/*EU/TK*E", "mide"],
  ["/PH*EPB", "men"],
  ["/PHA*ED", "made"],
  ["/PHA*EUBG", "make"],
  ["/PHA*EUG", "making"],
  ["/PHA*EURBG", "maker"],
  ["/PHA*PB", "man"],
  ["/PHAB", "mab"],
  ["/PHAEUGS", "mation"],
  ["/PHAO*EPB", "amine"],
  ["/PHAO*ERT", "meter"],
  ["/PHAO*EUD", "mide"],
  ["/PHAO*EUPB", "amine"],
  ["/PHAOES/KWRUPL", "mysium"],
  ["/PHAOEUFG", "imizing"],
  ["/PHAOEUFPB", "mycin"],
  ["/PHAOEUS/*EUPB", "mycin"],
  ["/PHAPB/SH-P", "manship"],
  ["/PHAT/EUBG", "matic"],
  ["/PHEG/HREU", "megaly"],
  ["/PHER/-S", "mers"],
  ["/PHET/REU", "metry"],
  ["/PHO*EFT", "most"],
  ["/PHO*PBD", "mond"],
  ["/PHOEPBL", "monal"],
  ["/PHOPBG/*ER", "monger"],
  ["/PHOPBT", "mont"],
  ["/PHRAEFT", "plasty"],
  ["/PHRAEU/PHRA*EU/SHA", "plasia"],
  ["/PHRAEU/SHA", "plasia"],
  ["/PHRAEURB/KWRA", "plasia"],
  ["/PHRAEUS/EUBG", "plasic"],
  ["/PHRAEUS/KWRA", "plasia"],
  ["/PHRAFT", "plast"],
  ["/PHRAFT/KWREU", "plasty"],
  ["/PHRAOEPBLG/EUBG", "plegic"],
  ["/PHRAOEPBLG/KWRA", "plegia"],
  ["/PHROEUFT", "oplasty"],
  ["/PO*RT", "port"],
  ["/POEUS/EUS", "poiesis"],
  ["/PRABGS/KWRA", "praxia"],
  ["/PRO*EUPB", "protein"],
  ["/PROES/EUS", "porosis"],
  ["/PW*UR/KWREU", "bury"],
  ["/PW*URG", "burg"],
  ["/PWA*BG", "back"],
  ["/PWA*PBD", "band"],
  ["/PWA*RBGS", "back}{,"],
  ["/PWAO*BG", "book"],
  ["/PWAO*RD", "board"],
  ["/PWAOEUT/EUBG", "biotic"],
  ["/PWERG", "berg"],
  ["/PWEUGS", "ibition"],
  ["/PWEUL/*EUPB", "bilin"],
  ["/PWHRAOUPL", "blume"],
  ["/PWHRER", "bler"],
  ["/PWHREU", "ably"],
  ["/PWO*LG", "bolic"],
  ["/PWO*UPBD", "bound"],
  ["/PWO/RO", "boro"],
  ["/PWRO*", "boro"],
  ["/PWURG", "burg"],
  ["/R*D", "rd"],
  ["/R*EUBG", "ric"],
  ["/R-D", "red"],
  ["/RA*EUGS", "ration"],
  ["/RAEBL", "rably"],
  ["/RAL", "ural"],
  ["/RAO*EUFD", "arized"],
  ["/RAO*PL", "room"],
  ["/RAOUB/SEUPB", "rubicin"],
  ["/RAPBS", "erance"],
  ["/RAT/EUF", "arative"],
  ["/RES", "ress"],
  ["/REU", "ry"],
  ["/REUS", "aries"],
  ["/RO/PHAOEUD", "romide"],
  ["/ROES/ES", "roses"],
  ["/ROUS", "rous"],
  ["/S*E", "es"],
  ["/S*EPT", "sept"],
  ["/S*ER", "zer"],
  ["/S*EU/TPH*EU", "zini"],
  ["/S*EUPBL", "icillin"],
  ["/SA*EFT", "icist"],
  ["/SA*EUGS", "ization"],
  ["/SABG/RAOEUD", "saccharide"],
  ["/SAEUGS", "sation"],
  ["/SAO*EUD", "icide"],
  ["/SAOEPL/KWRA", "cemia"],
  ["/SAOEUBG/HRAO*EUPB", "cyline"],
  ["/SAOEUD/A*L", "cidal"],
  ["/SEFL", "self"],
  ["/SEFLS", "selves"],
  ["/SEPT/O*R", "ceptor"],
  ["/SEU", "cy"],
  ["/SEU/TO*", "cito"],
  ["/SEUL/*EUPB", "cillin"],
  ["/SEUT/EUBG", "cytic"],
  ["/SH*UPB", "tion"],
  ["/SH-P", "ship"],
  ["/SH-PS", "ships"],
  ["/SHA*U", "shaw"],
  ["/SHAO*EUPB", "shine"],
  ["/SHEUR", "shire"],
  ["/SHUPL", "tium"],
  ["/SK*EU", "ski"],
  ["/SKAEUP", "scape"],
  ["/SKO*EP", "oscopy"],
  ["/SKO*EUP", "oscope"],
  ["/SKOP/EUBG", "scopic"],
  ["/SKOP/KHREU", "scopically"],
  ["/SKWR*E", "e"],
  ["/SKWRUS", "us"],
  ["/SKWRA", "a"],
  ["/SKWRAO", "oo"],
  ["/SKWRAOEU", "ae"],
  ["/SKWRAOEUL", "ile"],
  ["/SKWRE", "e"],
  ["/SKWREFR", "ever"],
  ["/SKWREPB/*EUFT", "genicity"],
  ["/SKWREPB/EUBG", "genic"],
  ["/SKWREPB/SEUS/TEU", "genicity"],
  ["/SKWREU", "i"],
  ["/SKWREUS", "ies"],
  ["/SKWRO", "o"],
  ["/SKWRO*/KRAOEUT", "ocyte"],
  ["/SKWRO/KRAOEUT", "ocyte"],
  ["/SKWRO/RA/PHA", "orama"],
  ["/SKWRO/SA", "osa"],
  ["/SKWRO/TKPWOG", "ogogue"],
  ["/SKWROF", "off"],
  ["/SKWROUPB", "down"],
  ["/SKWROUT", "out"],
  ["/SKWRU", "u"],
  ["/SKWRUP", "up"],
  ["/SKWRUPBD", "under"],
  ["/SKWRUPL", "um"],
  ["/SO*EPL", "some"],
  ["/SO*EUD", "azoid"],
  ["/SO*EUT", "zoite"],
  ["/SO*PB", "son"],
  ["/SO*PL", "some"],
  ["/SPOR/*EUPB", "sporin"],
  ["/SREUFP", "ovich"],
  ["/SREUL", "ville"],
  ["/SROR", "vore"],
  ["/ST-BG", "istic"],
  ["/STA*PBD", "stand"],
  ["/STAO*EPB", "stein"],
  ["/STAO*EUPB", "stein"],
  ["/STER", "ster"],
  ["/STH-S", "s}{?"],
  ["/STO*EPB", "stone"],
  ["/STO*PB", "ston"],
  ["/STOPB", "ston"],
  ["/STP-S", "s}{?"],
  ["/STPA", "a"],
  ["/STPE", "e"],
  ["/STPEU", "i"],
  ["/STPH-D", "ed}{?"],
  ["/STPH-S", "s}{?"],
  ["/STPO", "o"],
  ["/STPU", "u"],
  ["/STR/EUBG", "centric"],
  ["/T*EUF", "tive"],
  ["/T*EUFT", "tivity"],
  ["/TA*BGT", "tatic"],
  ["/TA*EURBG", "taker"],
  ["/TAEUGS", "tation"],
  ["/TAEURPB", "itarian"],
  ["/TAFT/EUBG", "tastic"],
  ["/TAO*EUPL", "time"],
  ["/TAO*EUT", "tight"],
  ["/TAO*EUZ", "atize"],
  ["/TAOEUT/EUS", "titis"],
  ["/TAOEUZ/AEUGS", "tization"],
  ["/TAOUD", "itude"],
  ["/TAOUR", "ture"],
  ["/TAOUZ/PHAB", "tuzumab"],
  ["/TAPBLG", "itage"],
  ["/TAS/TEUBG", "tastic"],
  ["/TEU", "ity"],
  ["/TEU/TPHEU", "tini"],
  ["/TEUF", "tive"],
  ["/TEUFL", "itively"],
  ["/TEUGS", "etition"],
  ["/TEURBS", "ticious"],
  ["/TEUS/TEU", "ticity"],
  ["/THAL/*ER", "thaler"],
  ["/THAL/PHEU/KWRA", "ophthalmia"],
  ["/THO*EUPB", "000"],
  ["/THR*U", "through"],
  ["/TK*EPB", "den"],
  ["/TK-D", "ded"],
  ["/TK-RBS", "s} --"],
  ["/TKA*EL", "dale"],
  ["/TKAEUGS", "dation"],
  ["/TKEU/TOE", "dito"],
  ["/TKEU/TPHEU", "dini"],
  ["/TKEUGS", "dition"],
  ["/TKPWAFPL", "gasm"],
  ["/TKPWHRO*EPB", "globin"],
  ["/TKPWRAF/KWREU", "graphy"],
  ["/TKPWRAO*UP", "group"],
  ["/TKPWRO*UPBD", "ground"],
  ["/TKRA*UPB", "drawn"],
  ["/TKROEPL", "drome"],
  ["/TO*P", "top"],
  ["/TO*PB", "ton"],
  ["/TO*UPB", "town"],
  ["/TOEP", "tope"],
  ["/TOER", "tory"],
  ["/TOES/EUS", "tosis"],
  ["/TOG/TPEU", "tography"],
  ["/TOLG", "otology"],
  ["/TOS/KO/PEU", "toscopy"],
  ["/TOT/PHEU", "totomy"],
  ["/TOUS", "tous"],
  ["/TP*EUL/EUBG", "philic"],
  ["/TP*EULG", "philic"],
  ["/TP*EUPB", "fin"],
  ["/TP-PLD", "ed}{."],
  ["/TP-PLS", "s}{."],
  ["/TPAEUBGS", "ification"],
  ["/TPAEUPBLG/KWRA", "phagia"],
  ["/TPAO*D", "food"],
  ["/TPAO*ELD", "field"],
  ["/TPAO*EUL", "phile"],
  ["/TPAO*EUR", "ifier"],
  ["/TPAOEL/KWRA", "philia"],
  ["/TPAOEU", "ify"],
  ["/TPAOEU/-D", "ified"],
  ["/TPAOEU/-S", "ifies"],
  ["/TPAOEUD", "ified"],
  ["/TPAOEUDZ", "ifieds"],
  ["/TPAOEUG", "ifying"],
  ["/TPEUBG/A*EUGS", "fication"],
  ["/TPEUL/EUBG", "philic"],
  ["/TPEUL/EUS/TEU", "philicity"],
  ["/TPEUL/KWRA", "philia"],
  ["/TPEUL/KWRAS", "philias"],
  ["/TPEULS/TEU", "philicity"],
  ["/TPHA*EUT", "inate"],
  ["/TPHAEL", "inally"],
  ["/TPHAEUGS", "ination"],
  ["/TPHAEUT/O*R", "inator"],
  ["/TPHAL", "inal"],
  ["/TPHAO*E", "ni"],
  ["/TPHAO*ES", "nese"],
  ["/TPHAO*EUPB", "inine"],
  ["/TPHAOEUZ", "nize"],
  ["/TPHAOEUZ/-G", "nizing"],
  ["/TPHER", "ener"],
  ["/TPHERPBLG/EUBG", "nergic"],
  ["/TPHEUFT", "ist"],
  ["/TPHEUPBG", "ening"],
  ["/TPHO*US", "inous"],
  ["/TPHOFT/PHEU", "anostomy"],
  ["/TPHOS/KO/PEU", "noscopy"],
  ["/TPHOUS", "inous"],
  ["/TPHR*EBGS", "flection"],
  ["/TPHRABGS/EUS", "phylaxis"],
  ["/TPHREU", "fully"],
  ["/TPHREUFT", "philicity"],
  ["/TPHROBGS/SEUPB", "floxacin"],
  ["/TPHROPBGS/SEUPB", "floxacin"],
  ["/TPO*ELD", "fold"],
  ["/TPO*RPL", "form"],
  ["/TPO*UPBD", "found"],
  ["/TPOEB/EUS/TEU", "phobicity"],
  ["/TPOR/AOES/EUS/TKOS", "pheresis"],
  ["/TPOR/EUBG", "phoric"],
  ["/TPR-Z", "s} from"],
  ["/TPRAOES/EUS", "pheresis"],
  ["/TPRO*PBT", "front"],
  ["/TR*EU/TPHOEUBG", "trienoic"],
  ["/TRAOUS/EUF", "trusive"],
  ["/TRO*EF", "trophy"],
  ["/TRO*EP", "tropy"],
  ["/TROEF/EUBG", "trophic"],
  ["/TROEP/*EUBG", "tropic"],
  ["/TROEP/*EUPB", "tropin"],
  ["/TROEP/EUBG", "tropic"],
  ["/TROEP/KWREU", "tropy"],
  ["/TROEP/KWRUPL", "tropium"],
  ["/TROEPG", "otropic"],
  ["/TROEUPG", "otropic"],
  ["/TROF/EUBG", "trophic"],
  ["/TRUPL", "trum"],
  ["/WA*E", "way"],
  ["/WA*ER", "wear"],
  ["/WA*ES", "ways"],
  ["/WA*EUR", "ware"],
  ["/WA*EUT", "uate"],
  ["/WA*RD", "ward"],
  ["/WAEL", "ually"],
  ["/WAEUGS", "uation"],
  ["/WAL", "ual"],
  ["/WAPBS", "uance"],
  ["/WO*PL", "woman"],
  ["/WO*RBG", "work"],
  ["/WO*RD", "word"],
  ["/WO*RLD", "world"],
  ["/WO*RPL", "worm"],
  ["/WOS/TEU", "uosity"],
  ["/WOUS", "uous"],
  ["/WUPL", "uum"],
  ["/*EPBLG", "-edge"],
  ["/A*EURBG", "-acre"],
  ["/A*UR/KWREPBT/-D", "-oriented"],
  ["/A/KWAO*EURD", "-acquired"],
  ["/A/PRO*FD", "-approved"],
  ["/ARBGZ", "-A"],
  ["/ERBGZ", "-E"],
  ["/EUPB/TKAO*UFD", "-induced"],
  ["/EURBGZ", "-I"],
  ["/H*ED", "-head"],
  ["/H-PB/KA/TPHAEUD/KWRAPB", "-Canadian"],
  ["/H-PB/KAPB/TKA", "-Canada"],
  ["/H-PB/PHERPB", "-American"],
  ["/H-RBGZ", "-H"],
  ["/HO*UR", "-hour"],
  ["/HR-RBGZ", "-L"],
  ["/HRA*EPB", "-lane"],
  ["/HRAO*BG", "-look"],
  ["/HRO*PBG", "-long"],
  ["/K*UP", "-cup"],
  ["/K-RBGZ", "-K"],
  ["/KA*EURT", "-carat"],
  ["/KAO*BGD", "-cooked"],
  ["/KHRO*PLT", "-kilometer"],
  ["/KHRO*R", "-color"],
  ["/KP-RBGZ", "-X"],
  ["/KPHRAO*ET", "-complete"],
  ["/KR-RBGZ", "-C"],
  ["/KRO*ELD", "-controlled"],
  ["/KW-RBGZ", "-Q"],
  ["/KWA*ERT", "-quart"],
  ["/KWA*LT", "-quality"],
  ["/KWR-RBGZ", "-Y"],
  ["/KWRA*RD", "-yard"],
  ["/KWRAO*ER", "-year"],
  ["/KWRAUR/KWREPBT", "-orient"],
  ["/O*D", "-odd"],
  ["/O*ELD", "-old"],
  ["/O*EPBD", "-owned"],
  ["/O*F", "-off"],
  ["/O*UPBS", "-ounce"],
  ["/O*UT", "-out"],
  ["/ORBGZ", "-O"],
  ["/P*ERPB", "-person"],
  ["/P*URP", "-purpose"],
  ["/P-RBGZ", "-P"],
  ["/PA*EUPBLG", "-page"],
  ["/PA*EURBT", "-patient"],
  ["/PA*RT", "-part"],
  ["/PAO*ES", "-piece"],
  ["/PH*EUPBT", "-minute"],
  ["/PH-RBGZ", "-M"],
  ["/PHAO*ED/KWRAEUT/-D", "-mediated"],
  ["/PHAO*ED/KWRAEUTD", "-mediated"],
  ["/PHAO*EUL", "-mile"],
  ["/PHO*EPBT", "-month"],
  ["/PHO*UPBT/-D", "-mounted"],
  ["/PHRAO*EU", "-ply"],
  ["/PO*UPBD", "-pound"],
  ["/PRAO*EUS", "-price"],
  ["/PRAO*F", "-proof"],
  ["/PRO*EPT", "-appropriate"],
  ["/PRO*ET", "-appropriate"],
  ["/PW*ED", "-bed"],
  ["/PW*EULT", "-built"],
  ["/PW*EUT", "-bit"],
  ["/PW*PL", "-bedroom"],
  ["/PW*URPBG", "-burning"],
  ["/PW-RBGZ", "-B"],
  ["/PWA*ERPBG", "-bearing"],
  ["/PWA*EUFD", "-based"],
  ["/PWA*EUS", "-base"],
  ["/PWR*PL", "-bathroom"],
  ["/R*EPLTD", "-related"],
  ["/R*EUFPBT", "-resistant"],
  ["/R*EUPBT", "-resistant"],
  ["/R-RBGZ", "-R"],
  ["/RA*ELT/-D", "-related"],
  ["/RA*ELTD", "-related"],
  ["/RO*EFT/-D", "-roasted"],
  ["/S*EBGD", "-second"],
  ["/S*ERD", "-certified"],
  ["/S*G", "-something"],
  ["/S-RBGZ", "-S"],
  ["/SA*EUF", "-safe"],
  ["/SA*F", "-sav"],
  ["/SA*FG", "-saving"],
  ["/SAO*EUD/-D", "-sided"],
  ["/SAO*EUFD", "-sized"],
  ["/SAO*EUZ", "-size"],
  ["/SHA*EUP", "-shape"],
  ["/SHA*EUPD", "-shaped"],
  ["/SK*EBL", "-susceptible"],
  ["/SKA*PB", "-scan"],
  ["/SKWR*EPBD", "-end"],
  ["/SKWR*EUPB", "-in"],
  ["/SKWR*EUPB/SPAOEUR/-D", "-inspired"],
  ["/SKWR*EUPB/SPAOEUR/-G", "-inspiring"],
  ["/SKWR*UP", "-up"],
  ["/SKWR*UP/*ER", "-upper"],
  ["/SKWR*UPS", "-ups"],
  ["/SKWR-RBGZ", "-J"],
  ["/SKWRA*S", "-ass"],
  ["/SKWRAO*BG", "-look"],
  ["/SKWRAO*EUBG", "-like"],
  ["/SKWRAOBG", "-look"],
  ["/SKWRAOEUBG", "-like"],
  ["/SKWRAOG", "-looking"],
  ["/SKWRAUL", "-all"],
  ["/SKWREUPB/SPAOEUR/-D", "-inspired"],
  ["/SKWRO*F", "-off"],
  ["/SKWRO*FS", "-offs"],
  ["/SKWRO*PB", "-on"],
  ["/SKWRO*UPB", "-down"],
  ["/SKWRO*UPBS", "-downs"],
  ["/SKWRO*UT", "-out"],
  ["/SO*ERBT/-D", "-associated"],
  ["/SO*ERBTD", "-associated"],
  ["/SP*EFBG", "-specific"],
  ["/SP*EUFBG", "-specific"],
  ["/SPAO*ED", "-speed"],
  ["/SPAO*EG", "-speaking"],
  ["/SPAO*ERPBS/-D", "-experienced"],
  ["/SR-RBGZ", "-V"],
  ["/SRO*ELT", "-volt"],
  ["/ST*EP", "-step"],
  ["/STA*EUPBLG", "-stage"],
  ["/STAO*EUL", "-style"],
  ["/STK-RBGZ", "-Z"],
  ["/STO*ER", "-story"],
  ["/STR*D", "-centered"],
  ["/STR*EPBG", "-strength"],
  ["/T*ERPL", "-term"],
  ["/T-RBGZ", "-T"],
  ["/TA*EPL", "-time"],
  ["/TA*EUFT", "-taste"],
  ["/TA*UL", "-tall"],
  ["/TAO*ER", "-tier"],
  ["/TAO*EUP", "-type"],
  ["/TAO*EUPL/*ER", "-timer"],
  ["/TH*EUBG", "-thick"],
  ["/THR*EFPBG", "-threatening"],
  ["/TK*EG", "-degree"],
  ["/TK-RBGZ", "-D"],
  ["/TKA*EU", "-day"],
  ["/TKAO*EPBT", "-dependent"],
  ["/TKAO*R", "-door"],
  ["/TKHRA*R", "-dollar"],
  ["/TKO*UPB", "-down"],
  ["/TKPHEPBL", "-dimensional"],
  ["/TKPW-RBGZ", "-G"],
  ["/TKPWA*EUPBLG", "-gauge"],
  ["/TKPWHRO*PB", "-gallon"],
  ["/TKPWR*EUT", "-grit"],
  ["/TP*EURBT", "-efficient"],
  ["/TP-RBGZ", "-F"],
  ["/TPA*EUPL", "-fame"],
  ["/TPA*EUPL/OUS", "-famous"],
  ["/TPA*EUS/-G", "-facing"],
  ["/TPAO*T", "-foot"],
  ["/TPH*EBGT/-D", "-infected"],
  ["/TPH*EBGTD", "-infected"],
  ["/TPH*FP", "-inch"],
  ["/TPH-RBGZ", "-N"],
  ["/TPHAO*EF", "-naive"],
  ["/TPHO*EPB", "-known"],
  ["/TPHRA*EUFR", "-flavor"],
  ["/TPO*EUBGS/-D", "-focused"],
  ["/TPR*EPBD/HREU", "-friendly"],
  ["/TPRAO*E", "-free"],
  ["/TPRAO*EUD", "-fried"],
  ["/TRAO*ETD", "-treated"],
  ["/URBGZ", "-U"],
  ["/W*EPBS", "-influence"],
  ["/W-RBGZ", "-W"],
  ["/WAO*EBG", "-week"],
  ["/WAO*EUD", "-wide"],
  ["/WAO*EUS", "-wise"],
  ["/ES", "es"]
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
];
const SUFFIXES_LENGTH = SUFFIXES.length;

const FINGERSPELLED_LETTERS = {
  "a": "A*",
  "b": "PW*",
  "c": "KR*",
  "d": "TK*",
  "e": "*E",
  "f": "TP*",
  "g": "TKPW*",
  "h": "H*",
  "i": "*EU",
  "j": "SKWR*",
  "k": "K*",
  "l": "HR*",
  "m": "PH*",
  "n": "TPH*",
  "o": "O*",
  "p": "P*",
  "q": "KW*",
  "r": "R*",
  "s": "S*",
  "t": "T*",
  "u": "*U",
  "v": "SR*",
  "w": "W*",
  "x": "KP*",
  "y": "KWR*",
  "z": "STKPW*",
  "A": "A*P",
  "B": "PW*P",
  "C": "KR*P",
  "D": "TK*P",
  "E": "*EP",
  "F": "TP*P",
  "G": "TKPW*P",
  "H": "H*P",
  "I": "*EUP",
  "J": "SKWR*P",
  "K": "K*P",
  "L": "HR*P",
  "M": "PH*P",
  "N": "TPH*P",
  "O": "O*P",
  "P": "P*P",
  "Q": "KW*P",
  "R": "R*P",
  "S": "S*P",
  "T": "T*P",
  "U": "*UP",
  "V": "SR*P",
  "W": "W*P",
  "X": "KP*P",
  "Y": "KWR*P",
  "Z": "STKPW*P",
  "@": "SKWRAT",
  "(": "PREPB",
  ")": "PR*EPB",
  "“": "KW-GS/KW-GS",
  "”": "KR-GS/KR-GS",
  ",": "KW-BG",
  "?": "H-F",
  "!": "SKHRAPL",
  "–": "EPB/TKA*RB",
  "—": "EPL/TKA*RB",
  "`": "KH-FG",
  "^": "KR-RT",
  "~": "T*LD",
  "<": "PWRABG",
  ">": "PWRA*BG",
  "=": "KW-L",
  "|": "PAO*EUP",
  "_": "RUPBD",
  "-": "H-PB",
  ":": "KHR-PB",
  ";": "SKHR-PB",
  "/": "OEU",
  ".": "P-P",
  "]": "PWR*BGT",
  "[": "PWR-BGT",
  "{": "TPR-BGT",
  "}": "TPR*BGT",
  "$": "TK-PL",
  "*": "STA*R",
  "&": "SKP*",
  "#": "HAERB",
  "%": "P*ERS",
  "+": "PHR*US",
  "\\": "SPWHRAERB",
  "\"": "KR-GS",
  // "\"": "KWR-GS",
  // "{^\"}": "KR-GS",
  // "{\"^}": "KW-GS",
  // "{^~|\"}": "KR-GS",
  // "{~|\"^}": "KW-GS",
  " ": "S-P",
  "1": "1",
  "2": "2",
  "3": "3",
  "4": "4",
  "5": "5",
  "0": "0",
  "6": "6",
  "7": "7",
  "8": "8",
  "9": "9"
}
// TODO: don't hardcode this
// Maybe show numbers as letters?
  // "1": "#S",
  // "2": "#T-",
  // "3": "#P-",
  // "4": "#H",
  // "5": "#A",
  // "0": "#O",
  // "6": "#F",
  // "7": "#-P",
  // "8": "#L",
  // "9": "#-T"

const SINGLE_LETTER_WORDS = {
  "a": "AEU",
  "A": "KPA/AEU",
  "I": "EU",
  "X": "10R",
  "V": "5R"
}

const punctuationSplittingRegex = /([!"“”#$%&'‘’()*,.:;<=>?@[\\\]^`{|}~—–-])/; // includes en and em dashes, curly quotes
// const punctuationSplittingWholeMatchRegex = /^[!"“”#$%&'‘’()*,./:;<=>?@[\\\]^`{|}~—–-]?$/; // includes en and em dashes, curly quotes
const strokeLookupAttemptsLimit = 12;

function getRankedOutlineFromLookupEntry(lookupEntry, translation) {
  rankOutlines(lookupEntry, translation);
  return lookupEntry[0][0];
}

function chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts, precedingChar) {
  let lookupEntry = globalLookupDictionary.get(wordOrPhrase); // "example": [["KP-PL", "plover.json"],["KP-P", "plover.json"]]
  if (lookupEntry && lookupEntry.length > 0) {
    // Instead of discarding non-Typey entries, let's assume the first entry is Best.
    // This could be achieved removing misstrokes before we get here.
    // for (let i = 0; i < lookupEntry.length; i++) {
    //   if (lookupEntry[i][1] === "typey-type.json") {
    //     chosenStroke = lookupEntry[i][0];
    //   }
    // }
    chosenStroke = getRankedOutlineFromLookupEntry(lookupEntry, wordOrPhrase);
  }
  else { chosenStroke = undefined; }

  // elsewhere, there is a relevant "FIXME: this is a brute force…"
  let strokeForOneCharacterWord = SINGLE_LETTER_WORDS[wordOrPhrase];
  if (wordOrPhrase.length === 1 && strokeForOneCharacterWord) {
    return [strokeForOneCharacterWord, strokeLookupAttempts + 1];
  }

  let strokeForOneCharacterWordPart = FINGERSPELLED_LETTERS[wordOrPhrase];
  if (wordOrPhrase.length === 1 && strokeForOneCharacterWordPart) {
    if (precedingChar === ' ' && wordOrPhrase === '"') {
      strokeForOneCharacterWordPart = 'KW-GS';
    }
    return [strokeForOneCharacterWordPart, strokeLookupAttempts + 1];
  }

  // FIRST => first
  if (!chosenStroke) {
    let modifiedWordOrPhrase = wordOrPhrase.toLowerCase();
    let lookupEntry = globalLookupDictionary.get(modifiedWordOrPhrase);
    if (lookupEntry) { lookupEntry = getRankedOutlineFromLookupEntry(lookupEntry, modifiedWordOrPhrase); }
    let uppercasedStroke = lookupEntry;

    if (wordOrPhrase.toUpperCase() === wordOrPhrase && uppercasedStroke) {
      chosenStroke = '*URP/' + uppercasedStroke;
    }
  }

  // TUESDAY => Tuesday
  if (!chosenStroke) {
    let modifiedWordOrPhrase = wordOrPhrase.toLowerCase().replace(/(^|\s)\S/g, l => l.toUpperCase());
    let lookupEntry = globalLookupDictionary.get(modifiedWordOrPhrase);
    if (lookupEntry) { lookupEntry = getRankedOutlineFromLookupEntry(lookupEntry, modifiedWordOrPhrase); }
    let uppercasedStroke = lookupEntry;

    if (wordOrPhrase.toUpperCase() === wordOrPhrase && uppercasedStroke) {
      chosenStroke = '*URP/' + uppercasedStroke;
    }
  }

  // tom => Tom
  if (!chosenStroke) {
    let modifiedWordOrPhrase = wordOrPhrase.replace(/(^|\s)\S/g, l => l.toUpperCase());
    let lookupEntry = globalLookupDictionary.get(modifiedWordOrPhrase);
    if (lookupEntry) { lookupEntry = getRankedOutlineFromLookupEntry(lookupEntry, modifiedWordOrPhrase); }
    let capitalisedStroke = lookupEntry;

    if (capitalisedStroke) {
      chosenStroke = 'HRO*ER/' + capitalisedStroke;
    }
  }

  // Heather => heather
  if (!chosenStroke) {
    let modifiedWordOrPhrase = wordOrPhrase.toLowerCase();
    let lookupEntry = globalLookupDictionary.get(modifiedWordOrPhrase);
    if (lookupEntry) { lookupEntry = getRankedOutlineFromLookupEntry(lookupEntry, modifiedWordOrPhrase); }
    let lowercasedStroke = lookupEntry;

    if (lowercasedStroke) {
      chosenStroke = 'KPA/' + lowercasedStroke;
    }
  }

  if (wordOrPhrase.includes(",")) {
    // , xxx, => {,}xxx{,}
    if (!chosenStroke) {
      let modifiedWordOrPhrase = wordOrPhrase.replace(/, (.+),/, "{,}$1{,}");
      let lookupEntry = globalLookupDictionary.get(modifiedWordOrPhrase);
      if (lookupEntry) { chosenStroke = getRankedOutlineFromLookupEntry(lookupEntry, modifiedWordOrPhrase); }
    }

    // xxx, => xxx{,}
    if (!chosenStroke) {
      let modifiedWordOrPhrase = wordOrPhrase.replace(',', '{,}');
      let lookupEntry = globalLookupDictionary.get(modifiedWordOrPhrase);
      if (lookupEntry) { chosenStroke = getRankedOutlineFromLookupEntry(lookupEntry, modifiedWordOrPhrase); }
    }
  }

  // xxx => {^}xxx{^}
  if (!chosenStroke) {
    let modifiedWordOrPhrase = "{^}" + wordOrPhrase + "{^}";
    let lookupEntry = globalLookupDictionary.get(modifiedWordOrPhrase);
    if (lookupEntry) { chosenStroke = getRankedOutlineFromLookupEntry(lookupEntry, modifiedWordOrPhrase); }
  }

  // xxx => {^}xxx
  if (!chosenStroke) {
    let modifiedWordOrPhrase = "{^}" + wordOrPhrase;
    let lookupEntry = globalLookupDictionary.get(modifiedWordOrPhrase);
    if (lookupEntry) { chosenStroke = getRankedOutlineFromLookupEntry(lookupEntry, modifiedWordOrPhrase); }
  }

  // xxx => xxx{^}
  if (!chosenStroke) {
    let modifiedWordOrPhrase = wordOrPhrase + "{^}";
    let lookupEntry = globalLookupDictionary.get(modifiedWordOrPhrase);
    if (lookupEntry) { chosenStroke = getRankedOutlineFromLookupEntry(lookupEntry, modifiedWordOrPhrase); }
  }

  // xxx => {^xxx^}
  if (!chosenStroke) {
    let modifiedWordOrPhrase = "{^" + wordOrPhrase + "^}";
    let lookupEntry = globalLookupDictionary.get(modifiedWordOrPhrase);
    if (lookupEntry) { chosenStroke = getRankedOutlineFromLookupEntry(lookupEntry, modifiedWordOrPhrase); }
  }

  // ' => {^'}
  if (!chosenStroke) {
    let modifiedWordOrPhrase = "{^" + wordOrPhrase + "}";
    let lookupEntry = globalLookupDictionary.get(modifiedWordOrPhrase);
    if (lookupEntry) { chosenStroke = getRankedOutlineFromLookupEntry(lookupEntry, modifiedWordOrPhrase); }
  }

  // xxx => {xxx^}
  if (!chosenStroke) {
    let modifiedWordOrPhrase = "{" + wordOrPhrase + "^}";
    let lookupEntry = globalLookupDictionary.get(modifiedWordOrPhrase);
    if (lookupEntry) { chosenStroke = getRankedOutlineFromLookupEntry(lookupEntry, modifiedWordOrPhrase); }
  }

  // xxx => {^~|xxx^}
  if (!chosenStroke) {
    let modifiedWordOrPhrase = "{^~|" + wordOrPhrase + "^}";
    let lookupEntry = globalLookupDictionary.get(modifiedWordOrPhrase);
    if (lookupEntry) { chosenStroke = getRankedOutlineFromLookupEntry(lookupEntry, modifiedWordOrPhrase); }
  }

  // xxx => {^~|xxx}
  if (!chosenStroke) {
    let modifiedWordOrPhrase = "{^~|" + wordOrPhrase + "}";
    let lookupEntry = globalLookupDictionary.get(modifiedWordOrPhrase);
    if (lookupEntry) { chosenStroke = getRankedOutlineFromLookupEntry(lookupEntry, modifiedWordOrPhrase); }
  }

  // xxx => {~|xxx^}
  if (!chosenStroke) {
    let modifiedWordOrPhrase = "{~|" + wordOrPhrase + "^}";
    let lookupEntry = globalLookupDictionary.get(modifiedWordOrPhrase);
    if (lookupEntry) { chosenStroke = getRankedOutlineFromLookupEntry(lookupEntry, modifiedWordOrPhrase); }
  }

  // xxx => {~|xxx}
  if (!chosenStroke) {
    let modifiedWordOrPhrase = "{~|" + wordOrPhrase + "}";
    let lookupEntry = globalLookupDictionary.get(modifiedWordOrPhrase);
    if (lookupEntry) { chosenStroke = getRankedOutlineFromLookupEntry(lookupEntry, modifiedWordOrPhrase); }
  }

  // xxx => {xxx}
  if (!chosenStroke) {
    let modifiedWordOrPhrase = "{" + wordOrPhrase + "}";
    let lookupEntry = globalLookupDictionary.get(modifiedWordOrPhrase);
    if (lookupEntry) { chosenStroke = getRankedOutlineFromLookupEntry(lookupEntry, modifiedWordOrPhrase); }
  }


  if (!chosenStroke) {
    // rexxx => RE/xxx
    let prefixTranslation = '';
    let i = 0;
    while (i < PREFIXES_LENGTH && !chosenStroke) {
      if (wordOrPhrase.startsWith(PREFIXES[i][1])) {
        prefixTranslation = PREFIXES[i][1];
        let regex = new RegExp('^' + prefixTranslation + '');
        let modifiedWordOrPhrase = wordOrPhrase.replace(regex, '');
        let lookupEntry = globalLookupDictionary.get(modifiedWordOrPhrase);
        let hardCodedFixForQuestionMark = !(wordOrPhrase.replace(regex, '') === "?");
        if (lookupEntry && hardCodedFixForQuestionMark) { chosenStroke = PREFIXES[i][0] + getRankedOutlineFromLookupEntry(lookupEntry, modifiedWordOrPhrase); }
      }
      i++;
    }

    // xxxing => xxx/-G
    let suffixTranslation = '';
    let j = 0;
    while (j < SUFFIXES_LENGTH && !chosenStroke) {
      if (wordOrPhrase.endsWith(SUFFIXES[j][1])) {
        suffixTranslation = SUFFIXES[j][1];
        let regex = new RegExp('' + suffixTranslation + '$');
        let modifiedWordOrPhrase = wordOrPhrase.replace(regex, '');
        let lookupEntry = globalLookupDictionary.get(modifiedWordOrPhrase);
        if (lookupEntry) { chosenStroke = getRankedOutlineFromLookupEntry(lookupEntry, modifiedWordOrPhrase) + SUFFIXES[j][0]; }
      }
      j++;
    }
  }

  if (!chosenStroke) {
    chosenStroke = "xxx";
  }

  strokeLookupAttempts = strokeLookupAttempts + 1;

  return [chosenStroke, strokeLookupAttempts];
}

function tryMatchingCompoundWords(compoundWordParts, globalLookupDictionary, strokes, stroke, strokeLookupAttempts) {
  let compoundWordFirstWord = compoundWordParts[0];
  let compoundWordSecondWord = compoundWordParts[1];

  [stroke, strokeLookupAttempts] = chooseOutlineForPhrase(compoundWordFirstWord, globalLookupDictionary, stroke, strokeLookupAttempts); // "store" => ["STOR", 3]

  if (stroke && stroke.length > 0 && stroke !== "xxx") {
    strokes = strokes === "" ? stroke + " H-PB" : strokes + " " + stroke + " H-PB";
    [stroke, strokeLookupAttempts] = chooseOutlineForPhrase(compoundWordSecondWord, globalLookupDictionary, stroke, strokeLookupAttempts); // "room"

    if (stroke && stroke.length > 0) {
      strokes = strokes + " " + stroke;
      stroke = "xxx";
    }
  }
  else if (stroke === "xxx") {
    stroke = createFingerspellingStroke(compoundWordFirstWord);
    strokes = strokes === "" ? stroke + " H-PB" : strokes + " " + stroke + " H-PB";
    stroke = createFingerspellingStroke(compoundWordSecondWord);
    strokes = strokes + " " + stroke;
    stroke = "xxx";
  }

  return [strokes, stroke, strokeLookupAttempts];
}

function createFingerspellingStroke(inputText) {
  return [...inputText].map(char => {
    let fingerspelledStroke = '';
    fingerspelledStroke = FINGERSPELLED_LETTERS[char];
    if (!fingerspelledStroke) {
      fingerspelledStroke = "xxx";
    }
    return fingerspelledStroke;
  }).join('/');
}

function createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary) {
  let stroke = "";
  let strokes = "";
  let strokeLookupAttempts = 0;
  let precedingChar = '';
  let overLimit = false;
  [stroke, strokeLookupAttempts] = chooseOutlineForPhrase(wordOrPhraseMaterial, globalLookupDictionary, stroke, strokeLookupAttempts, precedingChar); // given "off went the man!" return "xxx"

  if (stroke && stroke.length > 0 && !(stroke === "xxx")) {
    return strokes = stroke;
  }

  let listOfWords = wordOrPhraseMaterial.split(" ").filter(nonEmptyItem => nonEmptyItem);
  let listOfWordsLength = listOfWords.length;

  // Arbitrary limit to prevent making Typey Type slow from excess look ups
  if (listOfWordsLength > strokeLookupAttemptsLimit) {
    listOfWords.length = strokeLookupAttemptsLimit;
    listOfWordsLength = strokeLookupAttemptsLimit;
    overLimit = true;
  }

  for (let i = 0; i < listOfWordsLength; i++) {
    let wordToLookUp = listOfWords[i];
    // 1. Try exact match
    precedingChar = i === 0 ? '' : ' ';

    [stroke, strokeLookupAttempts] = chooseOutlineForPhrase(wordToLookUp, globalLookupDictionary, stroke, strokeLookupAttempts, precedingChar);

    if (stroke && stroke.length > 0 && !(stroke === "xxx")) {
      strokes = strokes === "" ? stroke : strokes + " " + stroke;
      stroke = "xxx";
    }
    // 2. Try punctuation matching
    else {
      let compoundWordParts = wordToLookUp.split("-");
      if (wordToLookUp.match(punctuationSplittingRegex) !== null) { // "man!"
        // 2.1 compound words
        // if there is exactly 1 hyphen in the middle of a word, it's probably a compound word e.g. "store-room"
        if (compoundWordParts && compoundWordParts.length === 2 && compoundWordParts[0] !== "" && compoundWordParts[1] !== "") {
          [strokes, stroke, strokeLookupAttempts] = tryMatchingCompoundWords(compoundWordParts, globalLookupDictionary, strokes, stroke, strokeLookupAttempts); // "store-room"
          stroke = "xxx";
        }
        // 2.2 any punctuation, noting preceding char
        else {
          let listOfPunctuationSeparatedWords = wordToLookUp.split(punctuationSplittingRegex).filter(nonEmptyItem => nonEmptyItem);
          let len = listOfPunctuationSeparatedWords.length;

          // Arbitrary limit to prevent making Typey Type slow from excess look ups
          if (len > strokeLookupAttemptsLimit) {
            listOfPunctuationSeparatedWords.length = strokeLookupAttemptsLimit;
            len = strokeLookupAttemptsLimit;
          }

          for (let j = 0; j < len; j++) {

            // If it's the first char of a word and it's punctuation, pretend the preceding character was a space so that we recommend the right opening or closing punctuation
            if (j === 0) { precedingChar = ' '; } else { precedingChar = ''; }

            [stroke, strokeLookupAttempts] = chooseOutlineForPhrase(listOfPunctuationSeparatedWords[j], globalLookupDictionary, stroke, strokeLookupAttempts, precedingChar);
            if (stroke && stroke.length > 0 && !(stroke === "xxx")) {
              strokes = strokes === "" ? stroke : strokes + " " + stroke;
              stroke = "xxx";
            }
            else {
              // 2.3 resort to fingerspelling
              stroke = createFingerspellingStroke(listOfPunctuationSeparatedWords[j]);
              strokes = strokes === "" ? stroke : strokes + " " + stroke;
            }
          }
        }
      }
      // 3. Resort to fingerspelling
      else {
        stroke = createFingerspellingStroke(wordToLookUp);
        strokes = strokes === "" ? stroke : strokes + " " + stroke;
      }
    }
  }
  precedingChar = '';

  // FIXME: this is a brute force approach that will have unintended consequences and fail to catch scenarios it should e.g. if you use personal dictionaries without H-F this will be confusing
  if (strokes.startsWith("KR-GS KPA/")) {
    strokes = strokes.replace("KR-GS KPA/", "KW-GS KPA*/");
  }
  if (strokes.startsWith("KW-GS KPA/")) {
    strokes = strokes.replace("KW-GS KPA/", "KW-GS KPA*/");
  }
  if (strokes.endsWith("KWEZ")) {
    strokes = strokes.replace("KWEZ", "H-F");
  }
  if (strokes.includes(" PR-D")) {
    strokes = strokes.replace(" PR-D", " TP-PL");
  }
  if (strokes.endsWith(" P-P")) {
    strokes = strokes.replace(" P-P", " TP-PL");
  }

  if (overLimit) { strokes = strokes + " xxx"; }

  return strokes;
}

function generateListOfWordsAndStrokes(wordList, globalLookupDictionary) {
  // wordList = [ 'bed,', 'man!', "'sinatra'", 'and again', 'media query', 'push origin master', 'diff --cached', 'diff -- cached' ]
  let sourceAndPresentedMaterial = [];

  for (let i = 0; i < wordList.length; i++) {
    // if (wordOrPhraseMaterial === "and! and") { debugger; }
    let wordOrPhraseMaterial = wordList[i];

    let strokes = createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary);

    sourceAndPresentedMaterial.push({phrase: wordOrPhraseMaterial, stroke: strokes});
  }

  return sourceAndPresentedMaterial;
}

function chooseTEndingOverDEnding(outlineALastLetter, outlineBLastLetter, translation) {
  if (outlineALastLetter === outlineBLastLetter) {
    return 0;
  }
  else if (outlineALastLetter === "D" && translation[translation.length - 1] === "d") {
    return -1;
  }
  else if (outlineALastLetter === "D" && translation[translation.length - 1] !== "d") {
    return 1;
  }
  else if (outlineALastLetter === "T" && translation[translation.length - 1] === "d") {
    return 1;
  }
  else if (outlineALastLetter === "T" && translation[translation.length - 1] !== "d") {
    return -1;
  }
  else {
    return 0;
  }
}

function chooseSEndingOverZEnding(outlineALastLetter, outlineBLastLetter) {
  if (outlineALastLetter === outlineBLastLetter) {
    return 0;
  }
  else if (outlineALastLetter === "Z") {
    return 1;
  }
  else if (outlineALastLetter === "S") {
    return -1;
  }
  else {
    return 0;
  }
}

function penaliseStars(outline, translation) {
  let penaltyForStars = 0;
  let numberOfStars = outline.match(/\*/g);

  if (numberOfStars !== null) { penaltyForStars += numberOfStars.length; }

  return penaltyForStars;
}

function penaliseSlashes(outline, translation) {
  let penaltyForSlashes = 0;
  let numberOfSlashes = outline.match(/\//g);

  if (numberOfSlashes !== null) { penaltyForSlashes += numberOfSlashes.length * 2; }

  return penaltyForSlashes;
}

function hasPrefix (outline, translation) {
  let hasPrefix = false;

  for (let i = 0; i < PREFIXES_LENGTH; i++) {
    if (outline.startsWith(PREFIXES[i][0]) && translation.startsWith(PREFIXES[i][1])) {
      return true;
    }
  }

  return hasPrefix;
}

function hasSuffix (outline, translation) {
  let hasSuffix = false;

  for (let i = 0; i < SUFFIXES_LENGTH; i++) {
    if (outline.startsWith(SUFFIXES[i][0]) && translation.startsWith(SUFFIXES[i][1])) {
      return true;
    }
  }

  return hasSuffix;
}

function penaliseSlashesWithoutPrefixesOrSuffixes(outline, translation) {
  let penaltyForSlashesWithoutPrefixesOrSuffixes = 0;
  let numberOfSlashes = outline.match(/\//g);

  if (numberOfSlashes !== null) {
    if (hasPrefix(outline, translation)) {
      return 0;
    }
    else if (hasSuffix(outline, translation)) {
      return 0;
    }
    else {
      penaltyForSlashesWithoutPrefixesOrSuffixes = 2;
    }
  }

  return penaltyForSlashesWithoutPrefixesOrSuffixes;
}

function rankOutlines(arrayOfStrokesAndTheirSourceDictNames, translation) {
  arrayOfStrokesAndTheirSourceDictNames.sort((a, b) => {
    let outlineA = a[0];
    let outlineB = b[0];
    let outlineALengthWithAllPenalties = outlineA.length;
    let outlineBLengthWithAllPenalties = outlineB.length;

    outlineALengthWithAllPenalties += penaliseStars(outlineA, translation);
    outlineBLengthWithAllPenalties += penaliseStars(outlineB, translation);

    outlineALengthWithAllPenalties += penaliseSlashes(outlineA, translation);
    outlineBLengthWithAllPenalties += penaliseSlashes(outlineB, translation);

    outlineALengthWithAllPenalties += penaliseSlashesWithoutPrefixesOrSuffixes(outlineA, translation);
    outlineBLengthWithAllPenalties += penaliseSlashesWithoutPrefixesOrSuffixes(outlineB, translation);

    if (outlineALengthWithAllPenalties === outlineBLengthWithAllPenalties) {
      let outlineALastLetter = outlineA[outlineA.length - 1];
      let outlineBLastLetter = outlineB[outlineB.length - 1];

      if ("SZ".indexOf(outlineALastLetter) !== -1 && "SZ".indexOf(outlineBLastLetter) !== -1)
      {
        return chooseSEndingOverZEnding(outlineALastLetter, outlineBLastLetter);
      }

      if ("TD".indexOf(outlineALastLetter) !== -1 && "TD".indexOf(outlineBLastLetter) !== -1)
      {
        return chooseTEndingOverDEnding(outlineALastLetter, outlineBLastLetter, translation);
      }
    }

    return outlineALengthWithAllPenalties - outlineBLengthWithAllPenalties;
  });
  return arrayOfStrokesAndTheirSourceDictNames;
}

function rankAllOutlinesInCombinedLookupDictionary(combinedLookupDictionary) {
  // This code causes the browser to hang
  // for (let [translation, outlinesAndSourceDicts] of combinedLookupDictionary) {
  //   let rankedOutlinesAndSourceDicts = rankOutlines(outlinesAndSourceDicts, translation);
  //   combinedLookupDictionary.set(translation, rankedOutlinesAndSourceDicts);
  // }
  return combinedLookupDictionary;
}

function addOutlinesToWordsInCombinedDict(dictContent, combinedLookupDictionary, dictName, misstrokes, outlinesWeHaveSeen) {
  let misstrokesMap = new Map(Object.entries(misstrokes));

  for (let [outline, translation] of Object.entries(dictContent)) {
    let misstroke = misstrokesMap.get(outline);

    let seen = outlinesWeHaveSeen.has(outline);
    if (!seen) {
      if (!misstroke || (misstroke !== translation)) {
        if (combinedLookupDictionary.get(translation)) {
          // current = [[PWAZ: dict.json], [PWA*Z: typey.json]];
          let current = combinedLookupDictionary.get(translation);
          current.push([outline, dictName]);
          combinedLookupDictionary.set(translation, current);
          outlinesWeHaveSeen.add(outline);
        }
        else {
          combinedLookupDictionary.set(translation, [[outline, dictName]]);
          outlinesWeHaveSeen.add(outline);
        }
      }
    }
  }
  return [combinedLookupDictionary, outlinesWeHaveSeen];
}

function combineValidDictionaries(listOfValidDictionariesImportedAndInConfig, validDictionaries, dictAndMisstrokes) {
  let combinedLookupDictionary = new Map();
  let listOfValidDictionariesImportedAndInConfigLength = listOfValidDictionariesImportedAndInConfig.length;
  let validDictionariesLength = validDictionaries.length;
  let outlinesWeHaveSeen = new Set();

  for (let i = 0; i < listOfValidDictionariesImportedAndInConfigLength; i++) {
    let dictContent = {};
    let dictName = listOfValidDictionariesImportedAndInConfig[i];
    let [dictTypeyType, misstrokes] = dictAndMisstrokes;
    if (dictName === "typey-type.json") {
      dictContent = dictTypeyType;
      // eslint-disable-next-line
      let _;
      [combinedLookupDictionary, _] = addOutlinesToWordsInCombinedDict(dictContent, combinedLookupDictionary, dictName, {}, new Set());
    }
    else {
      for (let j = 0; j < validDictionariesLength; j++) {
        if (validDictionaries[j][0] === dictName) {
          dictContent = validDictionaries[j][1];
          if (dictName === "plover-main-3-jun-2018.json") {
            // eslint-disable-next-line
            let _;
            [combinedLookupDictionary, _] = addOutlinesToWordsInCombinedDict(dictContent, combinedLookupDictionary, dictName, misstrokes, new Set());
          }
          else {
            [combinedLookupDictionary, outlinesWeHaveSeen] = addOutlinesToWordsInCombinedDict(dictContent, combinedLookupDictionary, dictName, misstrokes, outlinesWeHaveSeen);
          }
        }
      }
    }
  }
  outlinesWeHaveSeen = new Set();

  return combinedLookupDictionary;
}

function createAGlobalLookupDictionary(validDictionariesListedInConfig, validDictionaries, namesOfValidImportedDictionaries, dictAndMisstrokes) {
  let listOfValidDictionariesImportedAndInConfig = getListOfValidDictionariesImportedAndInConfig(validDictionariesListedInConfig, validDictionaries, namesOfValidImportedDictionaries);
  let combinedLookupDictionary = combineValidDictionaries(listOfValidDictionariesImportedAndInConfig, validDictionaries, dictAndMisstrokes);
  // let sortedAndCombinedLookupDictionary = rankAllOutlinesInCombinedLookupDictionary(combinedLookupDictionary); // has a bug; instead of sorted entire dict, we sort per entry used within chooseOutlineForPhrase function
  let sortedAndCombinedLookupDictionary = combinedLookupDictionary;
  sortedAndCombinedLookupDictionary['configuration'] = listOfValidDictionariesImportedAndInConfig;

  return sortedAndCombinedLookupDictionary;
}

function getListOfValidDictionariesImportedAndInConfig(validDictionariesListedInConfig, validDictionaries, namesOfValidImportedDictionaries) {
  let listOfValidDictionariesImportedAndInConfig = [];
  let validDictionariesListedInConfigLength = validDictionariesListedInConfig.length;

  for (let i = 0; i < validDictionariesListedInConfigLength; i++) {
    if (namesOfValidImportedDictionaries.indexOf(validDictionariesListedInConfig[i]) > -1) {
      listOfValidDictionariesImportedAndInConfig.push(validDictionariesListedInConfig[i]);
    }
  }
  listOfValidDictionariesImportedAndInConfig.unshift("typey-type.json");

  return listOfValidDictionariesImportedAndInConfig;
}

export {
  addOutlinesToWordsInCombinedDict,
  chooseOutlineForPhrase,
  combineValidDictionaries,
  createStrokeHintForPhrase,
  createAGlobalLookupDictionary,
  generateListOfWordsAndStrokes,
  getListOfValidDictionariesImportedAndInConfig,
  rankAllOutlinesInCombinedLookupDictionary,
  rankOutlines
};
