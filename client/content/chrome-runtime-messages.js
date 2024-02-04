async function getLanguages() {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage({ action: "getLanguages" }, (response) => {
      resolve(response);
    });
  });
}

async function translate(text) {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage(
      { action: "getTranslatedText", text },
      (response) => {
        resolve(response);
      }
    );
  });
}
