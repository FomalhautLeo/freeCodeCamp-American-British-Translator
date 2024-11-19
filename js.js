const Translator = require("./components/translator.js");
const translator = new Translator();
const ret = translator.sentenceAmericanToBritish(
  "Lunch is at 12:15 today.",
  // "Have you met Mrs Kalyani?",
  true
);
console.log(ret);
