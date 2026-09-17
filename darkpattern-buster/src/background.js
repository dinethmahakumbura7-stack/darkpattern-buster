chrome.runtime.onInstalled.addListener(() => {
  console.log("DarkPattern Buster Service Worker active.");
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "PING") {
    sendResponse({ status: "PONG" });
  }
});