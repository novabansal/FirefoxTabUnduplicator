function handleSuccess(removeTabIds) {
    console.log("success")
    browser.notifications.create("removed-success-notif", {
        type: "basic",
        //iconUrl: browser.runtime.getURL("assets/images/icon128.png"),
        title: "Tab Un-duplicator",
        message: `${removeTabIds.length} tab${removeTabIds.length > 1 ? "s" : ""} removed.`
    })
}

function handleFailure(removeTabIds) {
    console.log("failure")
    browser.notifications.create("removed-failure-notif", {
        type: "basic",
        //iconUrl: browser.runtime.getURL("assets/images/icon128.png"),
        title: "Tab Un-duplicator",
        message: `Failed to remove tabs.`
    })
}

function handleNoTabs(removeTabIds) {
    console.log("no tabs")
    browser.notifications.create("removed-failure-notif", {
        type: "basic",
        //iconUrl: browser.runtime.getURL("assets/images/icon128.png"),
        title: "Tab Un-duplicator",
        message: `No tabs to remove.`
    })
}

browser.browserAction.onClicked.addListener(async (event) => {

    // TODO : active tabs should take priority over inactive tabs

    let tabs = await browser.tabs.query({});

    console.log({tabs})

    var encounteredTabUrls = []
    var removeTabIds = []

    for(const tab of tabs) {
        if(encounteredTabUrls.includes(tab.url)) {
            removeTabIds.push(tab.id)
        } else {
            encounteredTabUrls.push(tab.url)
        }
    }

    console.log(encounteredTabUrls)
    console.log(removeTabIds)

    if(removeTabIds.length === 0) {
        handleNoTabs(removeTabIds)
        notify("hello");
    } else {
        // display alert of how many removed
        let removed = browser.tabs.remove(removeTabIds);
        removed.then(handleSuccess(removeTabIds), handleFailure(removeTabIds))
    }

})