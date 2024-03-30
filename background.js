browser.webRequest.onCompleted.addListener((url) => {
    browser.tabs.query({ active: true, currentWindow: true })
        .then((tabs) => {
            let activeTab = tabs[0];
            // Send a message to the content script of the active tab
            browser.tabs.sendMessage(activeTab.id, { greeting: "Hello from background script" + url});
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}, {
    urls: ["https://www.youtube.com/youtubei/v1/*"],
});

