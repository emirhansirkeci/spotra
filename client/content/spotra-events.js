// Keydown event listeners for inside and outside of the input
document.addEventListener("keydown", async (e) => {
  if ((e.altKey && e.key === "q") || (e.altKey && e.key === "Q")) {
    if (spotraHost.style.visibility == "hidden") clearSpotra();
    toggleSpotra();
  }

  if (e.key === "Escape" && spotraHost.style.visibility == "visible")
    closeSpotra();
});

input.addEventListener("keydown", async (e) => {
  if (e.key == "Enter") {
    const text = input.value;
    if (!text) return (input.placeholder = "Please write anything");

    handleText(text);
  } else if (
    (e.altKey && e.key === "q") ||
    (e.altKey && e.key === "Q") ||
    e.key === "Escape"
  )
    toggleSpotra();
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

// Selected and entered text handlers
async function handleSelectedText(selectedText) {
  const text = selectedText;
  input.value = text;
  const result = await translate(text);

  updateAndOpenResult(result);
}

async function handleText(text) {
  const result = await translate(text);

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
  if (spotraHost.style.visibility != "visible") openSpotra();
  else closeSpotra();
}

function openSpotra() {
  const { selectedText } = checkSelection();

  spotraHost.style.visibility = "visible";
  spotraHost.style.opacity = 0.9;

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
