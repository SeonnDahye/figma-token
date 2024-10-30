const StyleDictionary = require("style-dictionary");
const fs = require("fs");

fs.readFile("token.json", "utf8", (err, data) => {
  if (err) throw err;
  const tokens = JSON.parse(data);

  // $metadata에 token key가 있음
  const tokenKeys = [...tokens.$metadata.tokenSetOrder];

  tokenKeys.forEach((key) => {
    const StyleDictionaryExtended = StyleDictionary.extend({
      source: [`./src/tokens/${key}.json`],
      platforms: {
        js: {
          transformGroup: "js",
          buildPath: `./src/style/${key}/`,
          files: [
            {
              destination: "variables.js",
              format: "javascript/es6",
            },
          ],
        },
      },
    });

    StyleDictionaryExtended.buildAllPlatforms();
  });
});
