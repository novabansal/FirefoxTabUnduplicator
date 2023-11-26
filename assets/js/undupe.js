console.log(browser.runtime.getURL("assets/images/icon128.png"));

async function handleSuccess(removeTabIds) {
    console.log("success")
    let notif = await browser.notifications.create({
        "type": "basic",
        "iconUrl": browser.runtime.getURL("assets/images/icon128.png"),
        "title": "Tab Un-duplicator",
        "message": `${removeTabIds.length} tab${removeTabIds.length > 1 ? "s" : ""} removed.`,
    })
}

async function handleFailure(removeTabIds) {
    console.log("failure")
    let notif = await browser.notifications.create({
        "type": "basic",
        "iconUrl": browser.runtime.getURL("assets/images/icon128.png"),
        "title": "Tab Un-duplicator",
        "message": `Failed to remove tabs.`,
    })
}

async function handleNoTabs(removeTabIds) {
    console.log("no tabs")
    let notif = await browser.notifications.create({
        "type": "basic",
        "iconUrl": browser.runtime.getURL("assets/images/icon128.png"),
        "title": "Tab Un-duplicator",
        "message": `No tabs to remove.`,
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
    } else {
        // display alert of how many removed
        let removed = browser.tabs.remove(removeTabIds);
        removed.then((value) => {handleSuccess(removeTabIds)}, (value) => {handleFailure(removeTabIds)})
    }

})