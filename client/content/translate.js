function getLanguages() {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(["translateFrom", "translateTo"], (result) => {
      if (chrome.runtime.lastError) reject(chrome.runtime.lastError);
      else resolve([result.translateFrom, result.translateTo]);
    });
  });
}

async function translate(text) {
  const apiUrl = "https://spotra-server.vercel.app/translate";
  // const apiUrl = "http://localhost:3000/translate";

  const headers = {
    "Content-Type": "application/json",
  };

  let [translateFrom, translateTo] = await getLanguages();
  translateFrom = translateFrom ? translateFrom : "auto";
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
