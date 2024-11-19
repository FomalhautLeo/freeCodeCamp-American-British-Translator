const americanOnly = require("./american-only.js");
const americanToBritishSpelling = require("./american-to-british-spelling.js");
const americanToBritishTitles = require("./american-to-british-titles.js");
const britishOnly = require("./british-only.js");

class Translator {
  sentenceBrtishToAmerican(british, highlight) {
    const str = british.toLowerCase();
    let replaceMap = {};
    for (const [key, value] of Object.entries(britishOnly)) {
      if (this.checkReplace(str, key)) {
        replaceMap[key] = this.wrapHighlight(value, highlight);
      }
    }
    for (const [value, key] of Object.entries(americanToBritishSpelling)) {
      if (this.checkReplace(str, key)) {
        replaceMap[key] = this.wrapHighlight(value, highlight);
      }
    }
    for (const [value, key] of Object.entries(americanToBritishTitles)) {
      if (this.checkReplace(str, key)) {
        replaceMap[key] = this.wrapHighlight(value, highlight);
      }
    }
    // update
    let ret = str;
    let upperWords = this.getUpperWords(british);
    for (const [source, target] of Object.entries(replaceMap)) {
      ret = this.replaceWord(ret, source, target);
      for (const key of Object.keys(upperWords)) {
        upperWords[key] = this.replaceWord(upperWords[key], source, target);
      }
    }
    ret = ret.replace(/(\d\.\d\d)/, (match) =>
      this.wrapHighlight(match.replace(".", ":"), highlight)
    );
    ret = this.recoverUppers(ret, upperWords);
    return this.upperCaseFirstChar(ret);
  }

  sentenceAmericanToBritish(american, highlight) {
    const str = american.toLowerCase();
    let replaceMap = {};
    for (const [key, value] of Object.entries(americanOnly)) {
      if (this.checkReplace(str, key)) {
        replaceMap[key] = this.wrapHighlight(value, highlight);
      }
    }
    for (const [key, value] of Object.entries(americanToBritishSpelling)) {
      if (this.checkReplace(str, key)) {
        replaceMap[key] = this.wrapHighlight(value, highlight);
      }
    }
    for (const [key, value] of Object.entries(americanToBritishTitles)) {
      if (this.checkReplace(str, key)) {
        replaceMap[key] = this.wrapHighlight(value, highlight);
      }
    }
    // update
    let ret = str;
    let upperWords = this.getUpperWords(american);
    for (const [source, target] of Object.entries(replaceMap)) {
      ret = this.replaceWord(ret, source, target);
      for (const key of Object.keys(upperWords)) {
        upperWords[key] = this.replaceWord(upperWords[key], source, target);
      }
    }
    console.log(ret);
    ret = ret.replace(/\d?(\d:\d\d)/, (match) =>
      this.wrapHighlight(match.replace(":", "."), highlight)
    );
    console.log(ret);
    ret = this.recoverUppers(ret, upperWords);
    return this.upperCaseFirstChar(ret);
  }

  checkReplace(str, source) {
    const regex = new RegExp(`${source}([^a-z]|$)`);
    return regex.test(str);
  }

  replaceWord(str, source, target) {
    const regex = new RegExp(`${source}([^a-z]|$)`);
    const s = str.replace(regex, target + "$1");
    return str.replace(regex, target + "$1");
  }

  wrapHighlight(str, highlight) {
    return highlight ? `<span class="highlight">${str}</span>` : str;
  }

  upperCaseFirstChar(str) {
    const tag = '<span class="highlight">';
    const length = tag.length;
    if (str.startsWith(tag)) {
      return tag + str[length].toUpperCase() + str.slice(length + 1);
    } else {
      return str[0].toUpperCase() + str.slice(1);
    }
  }

  getUpperWords(str) {
    const words = str.split(" ");
    let ret = {};
    for (const word of words) {
      const cur = word.replace(".", "");
      if (/^[A-Z]/.test(cur)) {
        ret[cur.toLowerCase()] = cur;
      }
    }
    return ret;
  }

  recoverUppers(str, upperWords) {
    let ret = str;
    for (const [lower, upper] of Object.entries(upperWords)) {
      ret = ret.replace(lower, upper);
    }
    return ret;
  }
}

module.exports = Translator;
