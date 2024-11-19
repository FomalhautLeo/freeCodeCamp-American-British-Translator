"use strict";

const Translator = require("../components/translator.js");

module.exports = function (app) {
  const translator = new Translator();

  app.route("/api/translate").post((req, res) => {
    console.log("== Get request: ", req.body);
    const text = req.body.text;
    const locale = req.body.locale;
    let resJson = {};
    if (text === "") {
      resJson = { error: "No text to translate" };
    } else if (!text || !locale) {
      resJson = { error: "Required field(s) missing" };
    } else if (locale === "american-to-british") {
      let translation = translator.sentenceAmericanToBritish(text, true);
      if (translation === text) {
        translation = "Everything looks good to me!";
      }
      resJson = {
        text,
        translation,
      };
    } else if (locale === "british-to-american") {
      let translation = translator.sentenceBrtishToAmerican(text, true);
      if (translation === text) {
        translation = "Everything looks good to me!";
      }
      resJson = {
        text,
        translation,
      };
    } else {
      resJson = { error: "Invalid value for locale field" };
    }
    console.log("-- Send: ", resJson);
    res.json(resJson);
  });
};
