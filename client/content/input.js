const userAgent = navigator.userAgent.toLowerCase();
const isMacintosh = userAgent.includes("macintosh");

document.addEventListener("keydown", async (e) => {
  e.stopPropagation();

  const isAltQ = e.altKey && (e.key === "q" || e.key === "Q");
  const isEscape =
    e.key === "Escape" && spotraHost.style.visibility == "visible";

  const isMacShortcut = e.metaKey && (e.key === "m" || e.key === "M");

  if (isAltQ || (isMacintosh && isMacShortcut)) toggleSpotra();

  if (isEscape) closeSpotra();
});

let applyTransparentEffect;
input.addEventListener("keydown", async (e) => {
  const isEnter = e.key === "Enter";
  const isAltQ = e.altKey && (e.key === "q" || e.key === "Q");
  const isEscape = e.key === "Escape";
  const isMacShortcut = e.metaKey && (e.key === "m" || e.key === "M");

  if (isEnter) {
    const text = input.value;
    if (!text) return (input.placeholder = "Please write anything");
    else input.placeholder = "Spotra";

    handleText(text);
  }

  if (isAltQ || isEscape || (isMacintosh && isMacShortcut)) toggleSpotra();

  // Apply a gradient transparent effect only when the user is not actively typing
  clearTimeout(applyTransparentEffect);
  transparentEffectDiv.classList.remove("apply-transparent-effect");

  applyTransparentEffect = setTimeout(() => {
    transparentEffectDiv.classList.add("apply-transparent-effect");
  }, 1000);
  //
});

// Prevent event bubbling
input.addEventListener(
  "keyup",
  function (e) {
    e.stopPropagation();
  },
  false
);

input.addEventListener(
  "keydown",
  function (e) {
    e.stopPropagation();
  },
  false
);
//

// Handle loading icon display
function showLoadingIcon() {
  if (spotraResult.classList.contains("open")) {
    loadingIcon.classList.add("show-loading-loop");
    translatedText.classList.add("blur-text");
  }
}

function hideLoadingIcon() {
  loadingIcon.classList.remove("show-loading-loop");
  translatedText.classList.remove("blur-text");
}
//

// Selected and entered text handlers
async function handleSelectedText(selectedText) {
  showLoadingIcon();
  input.value = selectedText;
  const result = await translate(selectedText);
  hideLoadingIcon();

  updateAndOpenResult(result);
}

async function handleText(text) {
  showLoadingIcon();
  const result = await translate(text);
  hideLoadingIcon();

  updateAndOpenResult(result);
}
//

// Result
function updateResult(result) {
  translatedText.innerText = result
    ? result
    : "ERROR! Translation could not be performed.";
}

function updateAndOpenResult(result) {
  updateResult(result);
  openResult();
}

function openResult() {
  spotraResult.classList.add("open");
}

function closeResult() {
  spotraResult.classList.remove("open");
}
//

// Spotra
function clearSpotra() {
  closeResult();
  closeLangSelector();

  translatedText.innerText = "";
  input.value = "";
  input.placeholder = "Spotra";
}

function toggleSpotra() {
  if (spotraHost.style.visibility != "visible") {
    clearSpotra();
    openSpotra();
  } else closeSpotra();
}

function openSpotra() {
  const { selectedText } = checkSelection();

  spotraHost.style.visibility = "visible";
  spotraHost.style.opacity = 1;

  input.focus();
  if (selectedText) handleSelectedText(selectedText);
}

function closeSpotra() {
  spotraHost.style.opacity = 0;

  removeSelection();

  setTimeout(() => {
    spotraHost.style.visibility = "hidden";
    clearSpotra();
  }, 100);
}
//
