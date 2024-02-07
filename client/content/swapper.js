/** Global varialbes */
let clickedElement;

// Fetches the languages stored in Chrome local storage and updates the Swapper UI
async function updateSwapper() {
  const [translateFrom, translateTo] = await getLanguages();

  fromElement.innerText = translateFrom;
  fromElement.setAttribute("data-value", translateFrom);

  toElement.innerText = translateTo;
  toElement.setAttribute("data-value", translateTo);
}

updateSwapper();
//

// Append supported languages to the langSelector element
Object.keys(supportedLanguages).forEach((languageName) => {
  const language = document.createElement("div");
  const languageCode = supportedLanguages[languageName];

  language.innerText = languageName;
  language.setAttribute("data-value", languageCode);
  language.className = "language";

  langSelector.appendChild(language);
});
//

// Generate and remove auto language detector element
function generateAutoElement() {
  if (langSelector.firstChild.getAttribute("data-value") == "au") return;

  const language = document.createElement("div");

  language.innerText = "Auto";
  language.setAttribute("data-value", "au");
  language.className = "language";

  langSelector.insertBefore(language, langSelector.firstChild);
}

function removeAutoElement() {
  const autoLanguage = langSelector.querySelector('.language[data-value="au"]');

  if (autoLanguage) langSelector.removeChild(autoLanguage);
}
//

const openLangSelector = () => {
  langSelector.classList.add("open");
  input.classList.add("blur");
};

const closeLangSelector = () => {
  langSelector.classList.remove("open");
  input.classList.remove("blur");
};

const handleSwapper = (target) => {
  clickedElement = target;

  if (clickedElement == fromElement) generateAutoElement();
  else removeAutoElement();

  closeResult();
  removeSelection();
  openLangSelector();
};

langs.addEventListener("click", (e) => handleSwapper(e.target));

langSelector.onclick = (e) => {
  if (e.target.className != "language") return;
  if (!clickedElement == fromElement || !clickedElement == toElement) return;

  let clickedElementLanguage = e.target.getAttribute("data-value");
  let fromElementLanguage = fromElement.getAttribute("data-value");
  let toElementLanguage = toElement.getAttribute("data-value");

  // If the selected language is the same as the opposite language, perform a language swap
  if (
    (clickedElement == fromElement &&
      toElementLanguage == clickedElementLanguage) ||
    (clickedElement == toElement &&
      fromElementLanguage == clickedElementLanguage)
  ) {
    swapLanguages();
    closeLangSelector();
    return;
  }
  //

  clickedElement.innerText = clickedElementLanguage;
  clickedElement.setAttribute("data-value", clickedElementLanguage);

  if (clickedElement == fromElement)
    chrome.storage.local.set({ translateFrom: clickedElementLanguage });
  else if (clickedElement == toElement)
    chrome.storage.local.set({ translateTo: clickedElementLanguage });

  closeLangSelector();
};

// Close the element if user clicks elsewhere
document.addEventListener("click", (e) => {
  if (e.target != spotraHost) closeLangSelector();
});

input.addEventListener("click", () => closeLangSelector());
spotraResult.addEventListener("click", () => closeLangSelector());
//

// Language swap shortcut
function handleLanguageSwap(e) {
  const keyStatus = handleEvents(e);
  if (!keyStatus.swap) return;

  swapLanguages();

  closeResult();
  removeSelection();
}

function swapLanguages() {
  let currentFromLanguage = fromElement.getAttribute("data-value");
  let currentToLanguage = toElement.getAttribute("data-value");

  fromElement.setAttribute("data-value", currentToLanguage);
  toElement.setAttribute("data-value", currentFromLanguage);

  fromElement.innerText = currentToLanguage;
  toElement.innerText = currentFromLanguage;

  chrome.storage.local.set({ translateFrom: currentToLanguage });
  chrome.storage.local.set({ translateTo: currentFromLanguage });
}

input.addEventListener("keydown", (e) => handleLanguageSwap(e));
document.addEventListener("keydown", (e) => handleLanguageSwap(e));
//
