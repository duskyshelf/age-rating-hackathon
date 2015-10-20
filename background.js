// background.js

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  // Send a message to the active tab
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message": "find_location"});
  });
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(request);
    if( request.message === "find_location" ) {
      // chrome.tabs.create({"url": request.url});
      alert("hello");
    }
  }
);

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.method == "getStatus")
      sendResponse({ageParam: localStorage.ageParam});
    else
      sendResponse({}); // snub them.
});

chrome.runtime.onMessage.addListener(function(request) {
    if (request.type === 'show_pop_up_new') {
        chrome.tabs.create({
            url: chrome.extension.getURL('popup.html'),
            active: false
        }, function(tab) {
            // After the tab has been created, open a window to inject the tab
            chrome.windows.create({
                tabId: tab.id,
                type: 'popup',
                focused: true
                // incognito, top, left, ...
            });
        });
    }
});