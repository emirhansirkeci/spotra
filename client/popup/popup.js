const changeMessage = document.getElementById("changeMessage");

const from = document.getElementById("translate-from");
const to = document.getElementById("translate-to");

function setLanguages() {
  chrome.storage.local.set({ translateFrom: from.value });
  chrome.storage.local.set({ translateTo: to.value });
}

function getLanguages() {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(["translateFrom", "translateTo"], (result) => {
      if (chrome.runtime.lastError) reject(chrome.runtime.lastError);
      else resolve([result.translateFrom, result.translateTo]);
    });
  });
}

document.addEventListener("DOMContentLoaded", async function () {
  changeMessage.classList.remove("visible");

  const [localFrom, localTo] = await getLanguages();

  from.value = localFrom ? localFrom : "auto";
  to.value = localTo ? localTo : "en";
});

function setMessage() {
  if (from.value === to.value) {
    changeMessage.classList = "alert alert-danger change-message";
    changeMessage.innerHTML = `<label>You've selected the same language for translation.</label>`;
  } else {
    changeMessage.classList = "alert alert-success change-message";
    changeMessage.innerHTML = `<label>Your translation has been set to ${from.value.toUpperCase()} to ${to.value.toUpperCase()}.</label>`;
  }

  changeMessage.classList.add("visible");
}

function handleChange() {
  setLanguages();
  setMessage();
}

function handleSwap() {
  if (from.value == "auto") return;

  const current = from.value;
  from.value = to.value;
  to.value = current;

  setLanguages();
  setMessage();
}

document.getElementById("swapLanguages").addEventListener("click", handleSwap);

document
  .getElementById("translate-from")
  .addEventListener("change", handleChange);

document
  .getElementById("translate-to")
  .addEventListener("change", handleChange);
