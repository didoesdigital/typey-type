let SHARED_INSTANCE = {suffixes: [], prefixes: []};

export class AffixList {
  static getSharedInstance() {
    return SHARED_INSTANCE;
  }

  static setSharedInstance(inst) {
    SHARED_INSTANCE = inst;
  }

  constructor(dict) {
    let suffixes = [];
    for (const [phrase, outlinesAndSourceDicts] of dict) {
      if (phrase.match(/^\{\^([A-Za-z0-9=<>\\:'"#-])+\}$/)) {
        suffixes.push(['/' + outlinesAndSourceDicts[0][0], phrase.replace('{^','').replace('}','')])
      }
    }
    let prefixes = [];
    for (const [phrase, outlinesAndSourceDicts] of dict) {
      if (phrase.match(/^\{([A-Za-z0-9=<>\\:'"#-])+\^\}$/)) {
        prefixes.push([outlinesAndSourceDicts[0][0] + '/', phrase.replace('{','').replace('^}','')])
      }
    }
    this.suffixes = suffixes;
    this.prefixes = prefixes;
  }
}
