const handleEvents = (e) => {
  const keyPressed = e.key.toLowerCase();

  const isSpotraOpen = spotraHost.style.visibility == "visible";
  const isEscape = keyPressed === "escape" && isSpotraOpen;

  const keyStatus = {
    enter: !e.shiftKey && keyPressed === "enter",
    close: isEscape,
    mainShortcut: !e.shiftKey && (e.altKey || e.metaKey) && keyPressed === '"',
    instantCopy: e.shiftKey && keyPressed === "enter",
    swap:
      e.shiftKey &&
      (e.altKey || e.metaKey) &&
      (keyPressed === '"' || keyPressed === "é"),
  };

  return keyStatus;
};
