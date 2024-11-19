const chai = require("chai");
const assert = chai.assert;

const Translator = require("../components/translator.js");

suite("Unit Tests", () => {
  const translator = new Translator();
  test(`Translate "Mangoes are my favorite fruit." to British English`, function () {
    assert.strictEqual(
      translator.sentenceAmericanToBritish(
        "Mangoes are my favorite fruit.",
        false
      ),
      "Mangoes are my favourite fruit."
    );
  });
  test(`Translate "I ate yogurt for breakfast." to British English`, function () {
    assert.strictEqual(
      translator.sentenceAmericanToBritish(
        "I ate yogurt for breakfast.",
        false
      ),
      "I ate yoghurt for breakfast."
    );
  });
  test(`Translate "We had a party at my friend's condo." to British English`, function () {
    assert.strictEqual(
      translator.sentenceAmericanToBritish(
        "We had a party at my friend's condo.",
        false
      ),
      "We had a party at my friend's flat."
    );
  });
  test(`Translate "Can you toss this in the trashcan for me?" to British English`, function () {
    assert.strictEqual(
      translator.sentenceAmericanToBritish(
        "Can you toss this in the trashcan for me?",
        false
      ),
      "Can you toss this in the bin for me?"
    );
  });
  test(`Translate "The parking lot was full." to British English`, function () {
    assert.strictEqual(
      translator.sentenceAmericanToBritish("The parking lot was full.", false),
      "The car park was full."
    );
  });
  test(`Translate "Like a high tech Rube Goldberg machine." to British English`, function () {
    assert.strictEqual(
      translator.sentenceAmericanToBritish(
        "Like a high tech Rube Goldberg machine.",
        false
      ),
      "Like a high tech Heath Robinson device."
    );
  });
  test(`Translate "To play hooky means to skip class or work." to British English`, function () {
    assert.strictEqual(
      translator.sentenceAmericanToBritish(
        "To play hooky means to skip class or work.",
        false
      ),
      "To bunk off means to skip class or work."
    );
  });
  test(`Translate "No Mr. Bond, I expect you to die." to British English`, function () {
    assert.strictEqual(
      translator.sentenceAmericanToBritish(
        "No Mr. Bond, I expect you to die.",
        false
      ),
      "No Mr Bond, I expect you to die."
    );
  });
  test(`Translate "Dr. Grosh will see you now." to British English`, function () {
    assert.strictEqual(
      translator.sentenceAmericanToBritish(
        "Dr. Grosh will see you now.",
        false
      ),
      "Dr Grosh will see you now."
    );
  });
  test(`Translate "Lunch is at 12:15 today." to British English`, function () {
    assert.strictEqual(
      translator.sentenceAmericanToBritish("Lunch is at 12:15 today.", false),
      "Lunch is at 12.15 today."
    );
  });
  test(`Translate "We watched the footie match for a while." to American English`, function () {
    assert.strictEqual(
      translator.sentenceBrtishToAmerican(
        "We watched the footie match for a while.",
        false
      ),
      "We watched the soccer match for a while."
    );
  });
  test(`Translate "Paracetamol takes up to an hour to work." to American English`, function () {
    assert.strictEqual(
      translator.sentenceBrtishToAmerican(
        "Paracetamol takes up to an hour to work.",
        false
      ),
      "Tylenol takes up to an hour to work."
    );
  });
  test(`Translate "First, caramelise the onions." to American English`, function () {
    assert.strictEqual(
      translator.sentenceBrtishToAmerican(
        "First, caramelise the onions.",
        false
      ),
      "First, caramelize the onions."
    );
  });
  test(`Translate "I spent the bank holiday at the funfair." to American English`, function () {
    assert.strictEqual(
      translator.sentenceBrtishToAmerican(
        "I spent the bank holiday at the funfair.",
        false
      ),
      "I spent the public holiday at the carnival."
    );
  });
  test(`Translate "I had a bicky then went to the chippy." to American English`, function () {
    assert.strictEqual(
      translator.sentenceBrtishToAmerican(
        "I had a bicky then went to the chippy.",
        false
      ),
      "I had a cookie then went to the fish-and-chip shop."
    );
  });
  test(`Translate "I've just got bits and bobs in my bum bag." to American English`, function () {
    assert.strictEqual(
      translator.sentenceBrtishToAmerican(
        "I've just got bits and bobs in my bum bag.",
        false
      ),
      "I've just got odds and ends in my fanny pack."
    );
  });
  test(`Translate "The car boot sale at Boxted Airfield was called off." to American English`, function () {
    assert.strictEqual(
      translator.sentenceBrtishToAmerican(
        "The car boot sale at Boxted Airfield was called off.",
        false
      ),
      "The swap meet at Boxted Airfield was called off."
    );
  });
  test(`Translate "Have you met Mrs Kalyani?" to American English`, function () {
    assert.strictEqual(
      translator.sentenceBrtishToAmerican("Have you met Mrs Kalyani?", false),
      "Have you met Mrs. Kalyani?"
    );
  });
  test(`Translate "Prof Joyner of King's College, London." to American English`, function () {
    assert.strictEqual(
      translator.sentenceBrtishToAmerican(
        "Prof Joyner of King's College, London.",
        false
      ),
      "Prof. Joyner of King's College, London."
    );
  });
  test(`Translate "Tea time is usually around 4 or 4.30." to American English`, function () {
    assert.strictEqual(
      translator.sentenceBrtishToAmerican(
        "Tea time is usually around 4 or 4.30.",
        false
      ),
      "Tea time is usually around 4 or 4:30."
    );
  });
  test(`Highlight translation in "Mangoes are my favorite fruit."`, function () {
    assert.strictEqual(
      translator.sentenceAmericanToBritish(
        "Mangoes are my favorite fruit.",
        true
      ),
      'Mangoes are my <span class="highlight">favourite</span> fruit.'
    );
  });
    test(`Highlight translation in "I ate yogurt for breakfast."`, function () {
      assert.strictEqual(
        translator.sentenceAmericanToBritish("I ate yogurt for breakfast.", true),
        'I ate <span class="highlight">yoghurt</span> for breakfast.'
      );
    });
    test(`Highlight translation in "We watched the footie match for a while."`, function () {
      assert.strictEqual(
        translator.sentenceBrtishToAmerican(
          "We watched the footie match for a while.",
          true
        ),
        'We watched the <span class="highlight">soccer</span> match for a while.'
      );
    });
    test(`Highlight translation in "Paracetamol takes up to an hour to work."`, function () {
      assert.strictEqual(
        translator.sentenceBrtishToAmerican(
          "Paracetamol takes up to an hour to work.",
          true
        ),
        '<span class="highlight">Tylenol</span> takes up to an hour to work.'
      );
    });
});
