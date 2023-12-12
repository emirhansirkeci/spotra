/**
 * @description Prevents text selection if the selected text is within a textarea, input, or the spotraHost element.
 * @returns {boolean}
 */
function isSelectedTextValid() {
  const selection = window.getSelection();

  if (selection.toString().trim() !== "") {
    const selectedElement = document.activeElement;

    if (
      selectedElement instanceof HTMLInputElement ||
      selectedElement instanceof HTMLTextAreaElement ||
      selectedElement === spotraHost
    )
      return false;
  }

  return true;
}

function checkSelection() {
  let selection = window.getSelection();
  let isTextSelected = selection && selection.type === "Range";
  let isValid = isSelectedTextValid();

  selectedText = isValid ? selection.toString().trim() : null;

  return { selection, isTextSelected, selectedText };
}

function removeSelection() {
  const { selection, isTextSelected } = checkSelection();
  if (isTextSelected) selection.removeAllRanges();
}

function updateSpotra() {
  const { selectedText } = checkSelection();

  if (selectedText && spotraHost.style.visibility == "visible")
    handleSelectedText(selectedText);
}

document.addEventListener("mouseup", (e) => {
  if (e.target == spotraHost) return;

  setTimeout(updateSpotra, 0);
});
