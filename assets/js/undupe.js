// TODO replace this code with actual code

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

    let removed = await browser.tabs.remove(removeTabIds);
    console.log(removed)

})