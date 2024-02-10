chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  // IMPORTANT! Return true if you want to send a response asynchronously

  if (request.action === "getLanguages") {
    (async () => {
      const result = await getLanguages();
      sendResponse(result);
    })();

    return true;
  }

  if (request.action === "getTranslatedText") {
    (async () => {
      const result = await getTranslatedText(request.text);
      sendResponse(result);
    })();

    return true;
  }
});

function getLanguages() {
  const DEFAULT_TRANSLATE_FROM = "au";
  const DEFAULT_TRANSLATE_TO = "en";

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
        reject(chrome.runtime.lastError);
      }

      resolve([sourceLanguage, targetLanguage]);
    });
  });
}

async function getTranslatedText(text) {
  console.log(text);
  const apiUrl = "https://spotra-server.vercel.app/translate";
  // const apiUrl = "http://localhost:3000/translate";

  const headers = {
    "Content-Type": "application/json",
  };

  let [translateFrom, translateTo] = await getLanguages();
  translateFrom = translateFrom ? translateFrom : "au";
  translateTo = translateTo ? translateTo : "en";

  const translatedText = fetch(apiUrl, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ text, translateFrom, translateTo }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("HTTP Error " + response.status);
      }
      return response.json();
    })
    .then((data) => {
      console.log({
        src: data.source,
        target: data.target,
        text: data.text,
        result: data.result,
      });
      return data.result;
    })
    .catch((error) => {
      console.error(error);
    });

  return translatedText;
}
