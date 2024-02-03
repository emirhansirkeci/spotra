const handleEvents = (e) => {
  const keyPressed = e.key.toLowerCase();

  const isSpotraOpen = spotraHost.style.visibility == "visible";
  const isEscape = keyPressed === "escape" && isSpotraOpen;

  const keyStatus = {
    enter: keyPressed === "enter",
    close: isEscape,
    swap: e.shiftKey && (e.altKey || e.metaKey) && keyPressed === '"',
    mainShortcut: !e.shiftKey && (e.altKey || e.metaKey) && keyPressed === '"',
    instantCopy: (e.altKey || e.metaKey) && "enter",
  };

  return keyStatus;
};
