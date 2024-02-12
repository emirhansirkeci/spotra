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

// Loading Icon
function showLoadingIcon() {
  logo.classList.add("show-loading-loop");
  translatedText.classList.add("blur-text");
}

function hideLoadingIcon() {
  logo.classList.remove("show-loading-loop");
  translatedText.classList.remove("blur-text");
}
//

// Success Icon
function showSuccessIcon() {
  logo.classList.add("show-success-icon");
}

function hideSuccessIcon() {
  logo.classList.remove("show-success-icon");
}

function animateSuccessIcon() {
  showSuccessIcon();

  setTimeout(() => {
    hideSuccessIcon();
  }, 500);
}
//

// Error Icon
function showErrorIcon() {
  logo.classList.add("show-error-icon");
}

function hideErrorIcon() {
  logo.classList.remove("show-error-icon");
}

function animateErrorIcon() {
  showErrorIcon();

  setTimeout(() => {
    hideErrorIcon();
  }, 1000);
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
function updateAndOpenResult(result) {
  if (!result) {
    return animateErrorIcon();
  }

  translatedText.innerText = result;

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

  animateSuccessIcon();
  navigator.clipboard.writeText(translatedText.innerText);
}

spotraResult.addEventListener("click", instantCopy);

// Vertical dragging of Spotra
const windowHeight = window.innerHeight;
const spotraHostHeight = spotraHost.offsetHeight;

const minTop = 20;
const maxTop = windowHeight - spotraHostHeight - 100;

let isMouseDown = false;

logo.addEventListener("mousedown", (e) => {
  isMouseDown = true;
});

document.addEventListener("mouseup", () => {
  isMouseDown = false;
  document.body.style.userSelect = "auto";
  input.focus();
});

document.addEventListener("mousemove", (e) => {
  if (!isMouseDown) return;

  let top = e.clientY - spotraHostHeight / 2;
  const clampedTop = Math.min(Math.max(minTop, top), maxTop);

  spotraHost.style.top = clampedTop + "px";
  document.body.style.userSelect = "none";
});
//
