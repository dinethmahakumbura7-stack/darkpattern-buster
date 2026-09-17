console.log("DarkPattern Buster content script loaded on:", window.location.href);

chrome.runtime.sendMessage({ type: "PING" }, (response) => {
  console.log("Connected to background worker:", response?.status);
});