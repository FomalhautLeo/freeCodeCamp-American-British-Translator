const chai = require("chai");
const chaiHttp = require("chai-http");
const assert = chai.assert;
const server = require("../server.js");

chai.use(chaiHttp);

let Translator = require("../components/translator.js");

suite("Functional Tests", () => {
  const url = "/api/translate";
  test("Translation with text and locale fields: POST request to /api/translate", function (done) {
    chai
      .request(server)
      .post(url)
      .send({
        text: "Mangoes are my favorite fruit.",
        locale: "american-to-british",
      })
      .end(function (err, res) {
        if (err) return done(err);
        assert.strictEqual(res.status, 200);
        assert.strictEqual(res.type, "application/json");
        assert.deepStrictEqual(res.body, {
          text: "Mangoes are my favorite fruit.",
          translation:
            'Mangoes are my <span class="highlight">favourite</span> fruit.',
        });
        done();
      });
  });
  test("Translation with text and invalid locale field: POST request to /api/translate", function (done) {
    chai
      .request(server)
      .post(url)
      .send({
        text: "Mangoes are my favorite fruit.",
        locale: "american-too-british",
      })
      .end(function (err, res) {
        if (err) return done(err);
        assert.strictEqual(res.status, 200);
        assert.strictEqual(res.type, "application/json");
        assert.deepStrictEqual(res.body, {
          error: "Invalid value for locale field",
        });
        done();
      });
  });
  test("Translation with missing text field: POST request to /api/translate", function (done) {
    chai
      .request(server)
      .post(url)
      .send({
        locale: "american-to-british",
      })
      .end(function (err, res) {
        if (err) return done(err);
        assert.strictEqual(res.status, 200);
        assert.strictEqual(res.type, "application/json");
        assert.deepStrictEqual(res.body, {
          error: "Required field(s) missing",
        });
        done();
      });
  });
  test("Translation with missing locale field: POST request to /api/translate", function (done) {
    chai
      .request(server)
      .post(url)
      .send({
        text: "Mangoes are my favorite fruit.",
      })
      .end(function (err, res) {
        if (err) return done(err);
        assert.strictEqual(res.status, 200);
        assert.strictEqual(res.type, "application/json");
        assert.deepStrictEqual(res.body, {
          error: "Required field(s) missing",
        });
        done();
      });
  });
  test("Translation with empty text: POST request to /api/translate", function (done) {
    chai
      .request(server)
      .post(url)
      .send({
        text: "",
        locale: "american-to-british",
      })
      .end(function (err, res) {
        if (err) return done(err);
        assert.strictEqual(res.status, 200);
        assert.strictEqual(res.type, "application/json");
        assert.deepStrictEqual(res.body, { error: "No text to translate" });
        done();
      });
  });
  test("Translation with text that needs no translation: POST request to /api/translate", function (done) {
    chai
      .request(server)
      .post(url)
      .send({
        text: "Are you OK?",
        locale: "american-to-british",
      })
      .end(function (err, res) {
        if (err) return done(err);
        assert.strictEqual(res.status, 200);
        assert.strictEqual(res.type, "application/json");
        assert.deepStrictEqual(res.body, {
          text: "Are you OK?",
          translation: "Everything looks good to me!",
        });
        done();
      });
  });
});
