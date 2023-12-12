const DEFAULT_TRANSLATE_FROM = "en";
const DEFAULT_TRANSLATE_TO = "tr";

function getLanguages() {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(["translateFrom", "translateTo"], (result) => {
      if (chrome.runtime.lastError) {
        console.error(
          "An error occurred as the stored languages could not be retrieved from Chrome local storage, and default languages were loaded."
        );
        resolve([DEFAULT_TRANSLATE_FROM, DEFAULT_TRANSLATE_TO]);
      } else resolve([result.translateFrom, result.translateTo]);
    });
  });
}
