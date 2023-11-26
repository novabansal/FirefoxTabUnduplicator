// TODO function to parse tab urls to display which ones were removed. restore function using storage.

function handleSuccess(removeTabIds) {
    console.log("success")
    /*let notif = */browser.notifications.create({
        "type": "basic",
        "iconUrl": browser.runtime.getURL("assets/images/icon128.png"),
        "title": "Tab Un-duplicator",
        "message": `${removeTabIds.length} tab${removeTabIds.length > 1 ? "s" : ""} removed.\nRemoved tab${removeTabIds.length > 1 ? "s" : ""} ${removeTabIds.map(element => element.url)}.`,
    })
}

function handleFailure(removeTabIds) {
    console.log("failure")
    /*let notif = */browser.notifications.create({
        "type": "basic",
        "iconUrl": browser.runtime.getURL("assets/images/icon128.png"),
        "title": "Tab Un-duplicator",
        "message": `Failed to remove tabs.`,
    })
}

async function handleNoTabs(removeTabIds) {
    console.log("no tabs")
    /*let notif = */browser.notifications.create({
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
    var removeTabs = []

    for(const tab of tabs) {
        if(encounteredTabUrls.includes(tab.url)) {
            removeTabs.push(tab)
        } else {
            encounteredTabUrls.push(tab.url)
        }
    }

    console.log(encounteredTabUrls)
    console.log(removeTabs)

    if(removeTabs.length === 0) {
        handleNoTabs(removeTabs)
    } else {
        // display alert of how many removed
        let removeIds = removeTabs.map(element => element.id);
        let removed = await browser.tabs.remove(removeIds).then((onResolved) => {handleSuccess(removeTabs)}, (onRejected) => {handleFailure(removeTabs)})
    }

})