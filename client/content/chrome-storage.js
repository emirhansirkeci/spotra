const DEFAULT_TRANSLATE_FROM = "en";
const DEFAULT_TRANSLATE_TO = "tr";

function getLanguages() {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(["translateFrom", "translateTo"], (result) => {
      const sourceLanguage = result.translateFrom
        ? result.translateFrom
        : DEFAULT_TRANSLATE_FROM;

      const targetLanguage = result.translateTo
        ? result.translateTo
        : DEFAULT_TRANSLATE_TO;

      if (chrome.runtime.lastError) {
        console.error(
          "An error occurred as the stored languages could not be retrieved from Chrome local storage, and default languages were loaded."
        );
      }

      resolve([sourceLanguage, targetLanguage]);
    });
  });
}
