const handleEvents = (e) => {
  const keyPressed = e.key.toLowerCase();

  const isSpotraOpen = spotraHost.style.visibility == "visible";
  const isEscape = keyPressed === "escape" && isSpotraOpen;

  const keyStatus = {
    enter: keyPressed === "enter",
    close: isEscape,
    swap: (e.altKey || e.metaKey) && keyPressed === "j",
    mainShortcut: (e.altKey || e.metaKey) && keyPressed === "m",
  };

  return keyStatus;
};
