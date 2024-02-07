document.addEventListener("keydown", async (e) => {
  e.stopPropagation();

  const keyStatus = handleEvents(e);

  if (keyStatus.mainShortcut) toggleSpotra();
  if (keyStatus.close) closeSpotra();
});

let applyTransparentEffect;
input.addEventListener("keydown", async (e) => {
  const keyStatus = handleEvents(e);

  if (keyStatus.close || keyStatus.mainShortcut) {
    return toggleSpotra();
  }

  if (keyStatus.instantCopy) {
    return instantCopy();
  }

  if (keyStatus.enter) {
    if (!input.value) return (input.placeholder = "Please write anything");
    else input.placeholder = "Spotra";

    return handleText(input.value);
  }

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
  logo.classList.add("show-loading-loop");
  translatedText.classList.add("blur-text");
}

function hideLoadingIcon() {
  logo.classList.remove("show-loading-loop");
  translatedText.classList.remove("blur-text");
}
//

//
function showSuccessIcon() {
  logo.classList.add("show-success-icon");
}

function hideSuccessIcon() {
  logo.classList.remove("show-success-icon");
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

// Instantly copy translated text
function instantCopy() {
  if (!spotraResult.classList.contains("open")) return;

  navigator.clipboard.writeText(translatedText.innerText);
  showSuccessIcon();
  setTimeout(() => {
    hideSuccessIcon();
  }, 500);
}

spotraResult.addEventListener("click", instantCopy);
//
