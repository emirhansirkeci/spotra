const spotraHost = document.createElement("div");
const spotraRoot = spotraHost.attachShadow({ mode: "open" });

Object.assign(spotraHost.style, {
  position: "fixed",
  top: "15%",
  left: "0",
  right: "0",
  width: "100%",
  visibility: "hidden",
  opacity: "0",
  transition: "opacity 100ms ease-in",
  "z-index": "9999",
});

// Import CSS file
const style = document.createElement("style");
const style_url = chrome.runtime.getURL("content/style.css");

style.textContent = `@import url(${style_url})`;
spotraRoot.appendChild(style);
//

// Spotra
const spotraWrapper = document.createElement("div");
spotraWrapper.className = "spotra-wrapper";

const spotraResult = document.createElement("div");
spotraResult.className = "spotra-result";

const translatedText = document.createElement("p");
translatedText.className = "translated-text";

spotraResult.appendChild(translatedText);

const input = document.createElement("input");
input.type = "text";
input.id = "spotra";
input.className = "input";
input.placeholder = "Spotra";
input.spellcheck = false;

const inputWrapper = document.createElement("div");
inputWrapper.className = "input-wrapper";
//

// Swapper
const swapper = document.createElement("div");
swapper.className = "swapper";

const langs = document.createElement("div");
langs.className = "langs";

const fromElement = document.createElement("div");
fromElement.className = "from-element";

const toElement = document.createElement("div");
toElement.className = "to-element";

const langSelector = document.createElement("div");
langSelector.className = "lang-selector";

langs.appendChild(fromElement);
langs.appendChild(toElement);

swapper.appendChild(langs);
swapper.appendChild(langSelector);
//

// A div element that adds a transparent effect to the right of the input
const transparentEffect = document.createElement("div");
transparentEffect.className = "transparent-effect apply-gradient";
//

// Append all elements to the wrappers
inputWrapper.appendChild(input);
inputWrapper.appendChild(swapper);
inputWrapper.appendChild(transparentEffect);

spotraWrapper.appendChild(inputWrapper);
spotraWrapper.appendChild(spotraResult);
//

// Append everything to the root and document to be visible
spotraRoot.appendChild(spotraWrapper);
document.body.appendChild(spotraHost);
//
