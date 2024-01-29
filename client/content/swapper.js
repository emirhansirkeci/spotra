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

const openLangSelector = () => {
  langSelector.classList.add("open");
  input.classList.add("blur");
};

const closeLangSelector = () => {
  langSelector.classList.remove("open");
  input.classList.remove("blur");
};

const handleSwapper = (target) => {
  closeResult();
  removeSelection();
  openLangSelector();

  clickedElement = target;
};

langs.addEventListener("click", (e) => handleSwapper(e.target));

langSelector.onclick = (e) => {
  if (e.target.className != "language") return;
  if (!clickedElement == fromElement || !clickedElement == toElement) return;

  let language = e.target.getAttribute("data-value");

  clickedElement.innerText = language;
  clickedElement.setAttribute("data-value", language);

  if (clickedElement == fromElement)
    chrome.storage.local.set({ translateFrom: language });
  else if (clickedElement == toElement)
    chrome.storage.local.set({ translateTo: language });

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
  const isMacShortcut = e.metaKey && (e.key === "j" || e.key === "J");
  const isShortcutQ = e.altKey && (e.key === "j" || e.key === "J");

  if (isMacintosh && !isMacShortcut) {
    return;
  }

  if (!isMacintosh && !isShortcutQ) {
    return;
  }

  let currentFromLanguage = fromElement.getAttribute("data-value");
  let currentToLanguage = toElement.getAttribute("data-value");

  fromElement.setAttribute("data-value", currentToLanguage);
  toElement.setAttribute("data-value", currentFromLanguage);

  fromElement.innerText = currentToLanguage;
  toElement.innerText = currentFromLanguage;

  chrome.storage.local.set({ translateFrom: currentToLanguage });
  chrome.storage.local.set({ translateTo: currentFromLanguage });

  closeResult();
  removeSelection();
}

input.addEventListener("keydown", (e) => handleLanguageSwap(e));
document.addEventListener("keydown", (e) => handleLanguageSwap(e));
//
