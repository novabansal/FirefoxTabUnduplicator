function handleSuccess(removeTabIds) {
    console.log("success")
    /*let notif = */browser.notifications.create({
        "type": "basic",
        "iconUrl": browser.runtime.getURL("assets/images/icon128.png"),
        "title": "Tab Un-duplicator",
        "message": `${removeTabIds.length} tab${removeTabIds.length > 1 ? "s" : ""} removed.\nRemoved tab ids ${removeTabIds}.`,
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
        let removed = await browser.tabs.remove(removeTabIds).then((onResolved) => {handleSuccess(removeTabIds)}, (onRejected) => {handleFailure(removeTabIds)})
    }

})